package org.streampipes.connect.rest;

import org.streampipes.connect.management.AdapterManagement;
import org.streampipes.connect.management.IAdapterManagement;
import org.streampipes.model.Response;
import org.streampipes.model.modelconnect.AdapterDescription;
import org.streampipes.model.modelconnect.AdapterSetDescription;
import org.streampipes.model.modelconnect.AdapterStreamDescription;
import org.streampipes.serializers.jsonld.JsonLdTransformer;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;

@Path("/api/v1/")
public class AdapterResource {

    private IAdapterManagement adapterManagement;

    public AdapterResource() {
        adapterManagement = new AdapterManagement();
    }

    public AdapterResource(IAdapterManagement adapterManagement) {
        this.adapterManagement = adapterManagement;
    }

    @POST
    @Path("/invoke/stream")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String invokeStreamAdapter(String ar) {

        AdapterStreamDescription adapterStreamDescription = getAdapterDescription(ar, AdapterStreamDescription.class);

        String resultString = adapterManagement.invokeStreamAdapter(adapterStreamDescription);

        return getResponse(adapterStreamDescription, resultString);
    }

    @DELETE
    @Path("/stop/stream")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String stopStreamAdapter(String ar) {

       AdapterStreamDescription adapterStreamDescription = getAdapterDescription(ar, AdapterStreamDescription.class);

       String resultString = adapterManagement.stopStreamAdapter(adapterStreamDescription);

       return getResponse(adapterStreamDescription, resultString);
    }

    @POST
    @Path("/invoke/set")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String invokeSetAdapter(String ar){

       AdapterSetDescription adapterSetDescription = getAdapterDescription(ar, AdapterSetDescription.class);

       String resultString = adapterManagement.invokeSetAdapter(adapterSetDescription);

       return getResponse(adapterSetDescription, resultString);
    }

    @DELETE
    @Path("/stop/set")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String stopSetAdapter(String ar){
       AdapterSetDescription adapterSetDescription = getAdapterDescription(ar, AdapterSetDescription.class);

       String resultString = adapterManagement.stopSetAdapter(adapterSetDescription);

       return getResponse(adapterSetDescription, resultString);
    }

    public static <T extends AdapterDescription> T getAdapterDescription(String ads, Class<T> theClass) {
        JsonLdTransformer jsonLdTransformer = new JsonLdTransformer();

        T a = null;

        try {
            a = jsonLdTransformer.fromJsonLd(ads, theClass);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return a;
    }

    private String getResponse(AdapterDescription description, String errorMessage) {
        if (errorMessage == null || errorMessage == "") {
            return new Response(description.getUri(), true).toString();
        } else {
            return new Response(description.getUri(), false, errorMessage).toString();
        }
    }

    public void setAdapterManagement(IAdapterManagement adapterManagement) {
        this.adapterManagement = adapterManagement;
    }
}
package de.fzi.cep.sepa.sources.samples.ddm;

import java.util.ArrayList;
import java.util.List;

import de.fzi.cep.sepa.sources.samples.util.Utils;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.http.HttpEntity;
import org.apache.http.client.fluent.Form;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.ontoware.rdf2go.vocabulary.XSD;

import de.fzi.cep.sepa.desc.EventStreamDeclarer;
import de.fzi.cep.sepa.model.impl.EventGrounding;
import de.fzi.cep.sepa.model.impl.EventProperty;
import de.fzi.cep.sepa.model.impl.EventSchema;
import de.fzi.cep.sepa.model.impl.EventStream;
import de.fzi.cep.sepa.model.impl.graph.SEP;
import de.fzi.cep.sepa.sources.samples.config.AkerVariables;
import de.fzi.cep.sepa.sources.samples.config.SourcesConfig;

public class GearLubeOilTemperature implements EventStreamDeclarer {

	
	@Override
	public EventStream declareModel(SEP sep) {
		
		EventStream stream = new EventStream();
		
		EventSchema schema = new EventSchema();
		List<EventProperty> eventProperties = new ArrayList<EventProperty>();
		eventProperties.add(new EventProperty(XSD._long.toString(), "variable_type", "", de.fzi.cep.sepa.commons.Utils.createURI("http://schema.org/Number")));
		eventProperties.add(new EventProperty(XSD._string.toString(), "variable_timestamp", "", de.fzi.cep.sepa.commons.Utils.createURI("http://schema.org/DateTime")));
		eventProperties.add(new EventProperty(XSD._double.toString(), "variable_value", "", de.fzi.cep.sepa.commons.Utils.createURI("http://sepa.event-processing.org/sepa#temperature")));
		
		
		EventGrounding grounding = new EventGrounding();
		grounding.setPort(61616);
		grounding.setUri("tcp://localhost:61616");
		grounding.setTopicName("SEPA.SEP.DDM.GearboxTemperature");
		
		stream.setEventGrounding(grounding);
		schema.setEventProperties(eventProperties);
		stream.setEventSchema(schema);
		stream.setName(AkerVariables.GearLubeOilTemperature.eventName());
		stream.setDescription(AkerVariables.GearLubeOilTemperature.description());
		stream.setUri(sep.getUri() + "/gearLubeTemp");
		stream.setIconUrl(SourcesConfig.iconBaseUrl + "/Temperature_Icon" +"_HQ.png");
		
		return stream;
	}

	@Override
	public void executeStream() {
		// send POST request to event replay util
		// call some generic method which takes a source ID as a parameter and performs the request
		// AkerVariables.GearLubeOilTemperature.tagNumber returns tag number for this event stream
		// topicName denotes the actual topic to subscribe for

        /*----------------Sample-Body---------------------------
        POST: http:// <host>/EventPlayer/api/playback/
        BODY (example):
        {
                "startTime": "2013-11-19T13:00:00+0100",
                "endTime" : "2013-11-19T14:15:00+0100" ,
                "variables" : ["1000692", "1002114"],
                "topic":"some_topic",
                "partner":"aker"
        }
        */

        long[] variables = {AkerVariables.GearLubeOilTemperature.tagNumber()};
        String cont = Utils.performRequest(variables, "some_topic", "121213123", "212342134");

	}

	@Override
	public boolean isExecutable() {
		return true;
	}
}

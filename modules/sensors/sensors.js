angular.module('streamPipesApp')
.controller('SensorCtrl', function($rootScope, $scope, $timeout, $log, $location, $http, restApi, $mdToast, $animate, $mdDialog, $filter) {

	$scope.editingDisabled = true;
	
	$scope.categoryOpt = {displayProp: 'type', idProp: 'type', externalIdProp: 'type'};
	
	$scope.sepas = [];
	$scope.sources = [];
	$scope.actions = [];
		
	$scope.selectedSepa;
	$scope.selectedSource;
	$scope.selectedAction;
	$scope.selectedStream;
	
	$scope.sepaSelected = false;
	$scope.sourceSelected = false;
	$scope.actionSelected = false;
	$scope.streamSelected = false;
	
	$scope.availableEpaCategories = [];
	$scope.availableEcCategories = [];
	
	$scope.selectedCategories = [];
	
	$scope.selectedTab = "SOURCES";
	
	$scope.activeProducerTab = "basics";
	$scope.activeStreamTab = "basics";
	$scope.activeEpaTab = "basics";
	$scope.activeConsumerTab = "basics";
	
	$scope.showHints = false;
	
	$scope.deploymentSettings = [{"elementType" : "SEPA", 
		"outputTypes" :  [{"type" : "IMPLEMENTATION", "description" : "I'd like to generate a runtime implementation."},
		                 {"type" : "DESCRIPTION", "description" : "I'd like to generate the description only."}],
		"runtimeType" : {"title" : "Runtime implementation", "runtimeTypes" :[{"type" : "ALGORITHM", "description" : "Custom implementation"},
						  {"type" : "ESPER", "description" : "Esper"},
						  {"type" : "FLINK", "description" : "Apache Flink"},
						  {"type" : "STORM", "description" : "Apache Storm"}]}},
	  {"elementType" : "SEP", 
			"outputTypes" : [{"type" : "IMPLEMENTATION", "description" : "I'd like to implement an adapter based on this description."},
			                 {"type" : "DESCRIPTION", "description" : "I'd like to generate the description only."},
			                 {"type" : "DIRECT_IMPORT", "description" : "Specified streams are already available on the message broker (no adapter implementation needed)."}],
			"runtimeType" : {"title" : "Adapter type (beta)", "runtimeTypes" : [{"type" : "CUSTOM", "description" : "Custom adapter"},
							  {"type" : "OPC", "description" : "OPC adapter"},
							  {"type" : "FILE", "description" : "File adapter"},
							  {"type" : "MYSQL", "description" : "MySQL adapter"}]}},
	  {"elementType" : "SEC", 
			"outputTypes" : [{"type" : "IMPLEMENTATION", "description" : "I'd like to generate a runtime implementation."},
			                 {"type" : "DESCRIPTION", "description" : "I'd like to generate the description only."},
			                ],
			"runtimeTypes" : {"title" : "Runtime implementation", "runtimeTypes" : [{"type" : "ACTION", "description" : "Custom implementation"},
							  {"type" : "ACTION_FLINK", "description" : "Apache Flink"},
							 ]}}];
	
	$scope.setSelectedTab = function(type) {
		$scope.selectedTab = type;
	}
	
	$scope.toggleEditMode = function() {
		$scope.editingDisabled = !$scope.editingDisabled;
	
	}
	
	$scope.selectProducerTab = function(name) {
		$scope.activeProducerTab = name;
	}
	
	$scope.isProducerTabSelected = function(name) {
		return $scope.activeProducerTab == name;
	}
	
	$scope.getProducerActiveTabCss = function(name) {
		if (name == $scope.activeProducerTab) return "md-fab md-accent";
		else return "md-fab md-accent wizard-inactive";
	}
	
	$scope.selectEpaTab = function(name) {
		$scope.activeEpaTab = name;
	}
	
	$scope.isEpaTabSelected = function(name) {
		return $scope.activeEpaTab == name;
	}
	
	$scope.getEpaActiveTabCss = function(name) {
		if (name == $scope.activeEpaTab) return "md-fab md-accent";
		else return "md-fab md-accent wizard-inactive";
	}
	
	$scope.selectConsumerTab = function(name) {
		$scope.activeConsumerTab = name;
	}
	
	$scope.isConsumerTabSelected = function(name) {
		return $scope.activeConsumerTab == name;
	}
	
	$scope.getConsumerActiveTabCss = function(name) {
		if (name == $scope.activeConsumerTab) return "md-fab md-accent";
		else return "md-fab md-accent wizard-inactive";
	}
		
	
	$scope.removeStream = function(eventStreams, stream) {
		eventStreams.splice(stream, 1);
	}
	
	$scope.loadStreamDetails = function(stream, editingDisabled) {
		$scope.editingDisabled = editingDisabled;
		$scope.streamSelected = true;
		$scope.selectedStream = stream;
	}
	
	$scope.addNewSepa = function() {
		$scope.selectedSepa = {"eventStreams" : [], "name" : "", "staticProperties" : []};
		$scope.sepaSelected = true;
		$scope.editingDisabled = false;
	}
	
	$scope.addNewAction = function() {
		$scope.selectedAction = {"eventStreams" : [], "name" : "", "staticProperties" : []};
		$scope.actionSelected = true;
		$scope.editingDisabled = false;
	}
	
	$scope.addNewSource = function() {
		$scope.selectedSource = undefined;
		$scope.selectedSource = {"eventStreams" : [], "name" : ""};
		$scope.sourceSelected = true;
		$scope.streamSelected = false;
		$scope.selectedStream = "";
		$scope.editingDisabled = false;
		$scope.activeProducerTab = "basics";
		$scope.activeStreamTab = "basics";
	}
	
	$scope.addStream = function(element) {
		element.push({"name" : "", "eventSchema" : {"eventProperties" : []}, "eventGrounding" : {"transportFormats" : [], "transportProtocols" : []}});
		$scope.loadStreamDetails(element[element.length-1]);
	}
	
	$scope.cloneStream = function(eventStreams, stream) {
		var clonedStream = angular.copy(stream);
		clonedStream.uri = "";
		eventStreams.push(clonedStream);
	}
	
	$scope.loadSepaDetails = function(uri, keepIds, editingDisabled) {
		restApi.getSepaDetailsFromOntology(uri, keepIds)
			.success(function(sepaData){
				$scope.selectedSepa = sepaData;
                $scope.sepaSelected = true;
                $scope.editingDisabled = editingDisabled;
            })
            .error(function(msg){
                console.log(msg);
            });
	}
	
	$scope.loadActionDetails = function(uri, keepIds, editingDisabled) {
		restApi.getActionDetailsFromOntology(uri, keepIds)
			.success(function(actionData){
				$scope.selectedAction = actionData;
                $scope.actionSelected = true;
                $scope.editingDisabled = editingDisabled;
            })
            .error(function(msg){
                console.log(msg);
            });
	}
	
	$scope.loadSourceDetails = function(index) {
		$scope.editingDisabled = true;
		$scope.sourceSelected = true;
		$scope.selectedSource = $scope.sources[index];
	}
	
	$scope.loadSepas = function(){
        restApi.getSepasFromOntology()
            .success(function(sepaData){
                $scope.sepas = $filter('orderBy')(sepaData, "name", false);;
            })
            .error(function(msg){
                console.log(msg);
            });
    };
    
    $scope.getSourceDetailsFromOntology = function(sourceId) {
    	restApi.getSourceDetailsFromOntology(sourceId, false) 
    		.success(function(source){
    			$scope.editingDisabled = false;
    			$scope.sourceSelected = true;
    			$scope.selectedSource = source;
    			$scope.selectedSource.uri = "";		
    			angular.forEach($scope.selectedSource.eventStreams, function(stream, key) {
    				stream.uri = "";
    			});
    		})
	        .error(function(msg){
	            console.log(msg);
	        });
    }
    
    $scope.loadSources = function(){
        restApi.getSourcesFromOntology()
            .success(function(sources){
            	
                $scope.sources = $filter('orderBy')(sources, "name", false);
            })
            .error(function(msg){
                console.log(msg);
            });
    };
    
    $scope.loadActions = function(){
        restApi.getActionsFromOntology()
            .success(function(actions){
                $scope.actions = $filter('orderBy')(actions, "name", false);
            })
            .error(function(msg){
                console.log(msg);
            });
    };
    
    $scope.openSourceOptionsDialog = function(elementId, elementData, elementType){
		 $mdDialog.show({
	   	      controller: SourceOptionsDialogController,
	   	      templateUrl: 'modules/sensors/templates/sourceOptionsDialog.tmpl.html',
	   	      parent: angular.element(document.body),
	   	      clickOutsideToClose:true,
	   	      scope:$scope,
	   	      preserveScope:true,
		   	  locals : {
		   		  elementId : elementId,
		   		  elementData : elementData,
		   		  elementType : elementType
		      }
	   	    })
	 }
    
    
    $scope.openDownloadDialog = function(elementId, elementData, elementType){
    	console.log(elementData);
		 $mdDialog.show({
	   	      controller: DownloadDialogController,
	   	      templateUrl: 'modules/sensors/templates/downloadDialog.tmpl.html',
	   	      parent: angular.element(document.body),
	   	      clickOutsideToClose:true,
	   	      scope:$scope,
	   	      preserveScope:true,
		   	  locals : {
		   		  elementId : elementId,
		   		  elementData : elementData,
		   		  elementType : elementType
		      }
	   	    })
	 }
    
    $scope.loadEpaCategories = function() {
    	 restApi.getEpaCategories()
         .success(function(epas){
             $scope.availableEpaCategories = epas;
         });
    }
    
    $scope.loadEcCategories = function() {
   	 restApi.getEcCategories()
        .success(function(ecs){
            $scope.availableEcCategories = ecs;
        });
   }
    
    $scope.loadSepas();
    $scope.loadActions();
    $scope.loadSources();
    $scope.loadEcCategories();
    $scope.loadEpaCategories();
    
})
.filter('startsWithLetter', function () {
    return function (items, fromLetter, toLetter) {
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var firstLetter = item.name.substring(0, 1).toLowerCase();
            if ((!fromLetter || firstLetter >= fromLetter)
                && (!toLetter || firstLetter <= toLetter)) {
                filtered.push(item);
            }
        }
        return filtered;
    };
});
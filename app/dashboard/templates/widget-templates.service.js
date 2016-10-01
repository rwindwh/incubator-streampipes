WidgetTemplates.$inject = ['TableDataModel', 'NumberDataModel', 'LineDataModel', 'VerticalbarDataModel', 'GaugeDataModel', 'TrafficlightDataModel'];

export default function WidgetTemplates(TableDataModel,
                                          NumberDataModel,
                                          LineDataModel,
                                          VerticalbarDataModel,
                                          GaugeDataModel,
                                          TrafficlightDataModel) {
    //Register the new widgets here
    var widgetTypes = {
        table: {
            name: 'table',
            label: 'Table Visualisation',
            directive: 'sp-table-widget',
            dataModel: TableDataModel,
        },
        number: {
            name: 'number',
            label: 'Single Value Visualisation',
            directive: 'sp-number-widget',
            dataModel: NumberDataModel,
        },
        line: {
            name: 'line',
            label: 'Line Chart',
            directive: 'sp-line-widget',
            dataModel: LineDataModel,
        },
        verticalbar: {
            name: 'verticalbar',
            label: 'Vertical Bar Chart',
            directive: 'sp-verticalbar-widget',
            dataModel: VerticalbarDataModel,
        },
        gauge: {
            name: 'gauge',
            label: 'Gauge',
            directive: 'sp-gauge-widget',
            dataModel: GaugeDataModel,
        },
        trafficlight: {
            name: 'trafficlight',
            label: 'Traffic Light',
            directive: 'sp-trafficlight-widget',
            dataModel: TrafficlightDataModel,
        }

    }

    var getDataModel = function (name) {
        return widgetTypes[name].dataModel;
    }

    var getDirectiveName = function (name) {
        return widgetTypes[name].directive;
    }

    var getAllNames = function () {
        var result = [];
        angular.forEach(widgetTypes, function (w) {
            var vis = {};
            vis.name = w.name;
            vis.label = w.label;
            result.push(vis);
        });

        return result;
    }

    return {
        getDataModel: getDataModel,
        getDirectiveName: getDirectiveName,
        getAllNames: getAllNames
    }
};



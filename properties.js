define([
    "qlik",
    'ng!$q'
], function (qlik, $q) {
    "use strict";

    var app = qlik.currApp();
    var getSheetList = function () {
        var defer = $q.defer();
        app.getAppObjectList(function (data) {
            var sheets = [];
            var sortedData = _.sortBy(data.qAppObjectList.qItems, function (item) {
                return item.qData.rank;
            });
            _.each(sortedData, function (item) {
                sheets.push({
                    value: item.qInfo.qId,
                    label: item.qMeta.title
                });
            });
            return defer.resolve(sheets);
        });

        return defer.promise;
    };

    return {
        type: "items",
        component: "accordion",
        items: {
            settings: {
                uses: "settings",
                items: {
                    navbehav: {
                        type: "items",
                        label: "Navigation behavior",
                        items: {
                            selectedSheet: {
                                type: "string",
                                component: "dropdown",
                                label: "Select Sheet",
                                ref: "props.selectedSheet",
                                options: function () {
                                    return getSheetList().then(function (items) {
                                        return items;
                                    });
                                }
                            }
                        }
                    },
                    actions: {
                        type: "items",
                        label: "Actions",
                        items: {
                            actions: {
                                type: "number",
                                component: "dropdown",
                                label: "Actions",
                                ref: "props.action",
                                options: [{
                                    value: 0,
                                    label: "None"
                                }, {
                                    value: 1,
                                    label: "Clear selection in field"
                                }],
                            },
                            fieldclear: {
                                type: "string",
                                label: "Field",
                                ref: "props.fieldClear",
                                expression: "optional",
                                show: function(e){
                                    return e.props.action == 1;
                                }
                            }
                        }
                    }
                }
            }
        }
    };
});
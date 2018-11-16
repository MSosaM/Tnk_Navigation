define( [
	"qlik", 
	"text!./template.html",
	"./initial-properties",
	"./properties",
	"text!./style.css"
], function ( qlik, template, initProps, props, css ) {
	"use strict";
	$("<style>").html(css).appendTo("head");

	var app = qlik.currApp();

		return {
			template: template,
			initialProperties: initProps,
        	definition: props,
			support: {
				snapshot: false,
				export: true,
				exportData: false
			},
			paint: function () {
				return qlik.Promise.resolve();
			},
			controller: ['$scope', function ( $scope ) {

				$scope.GoUrl = function () {
					
					if($scope.layout.props.action == 1){
						app.field($scope.layout.props.fieldClear).clear();
						qlik.navigation.gotoSheet($scope.layout.props.selectedSheet);
					}else{
						qlik.navigation.gotoSheet($scope.layout.props.selectedSheet);
					}
					
				};

				$scope.tIcon = $scope.layout.props.icon === "none" ? false : true;

			}]
		};

	} );
(function() {
	'use strict';//means it'll be strict with us to use every single thing like var, etc.
	
	angular.module('nameCalculator', [])
	.controller('nameCalculatorController', controller);
		controller.$inject = ['$scope', '$filter'];
		
		function controller($scope, $filter){
			$scope.name = "";
			$scope.finalValue = 0;
		
			$scope.calcValue = function(){
				$scope.finalValue = calcStringValue($scope.name);
			};
		
			function calcStringValue(string){
				var val = 0;
				for(var i=0; i<string.length; i++){
					val += string.charCodeAt(i);
				}
				return val;
			};
		
			$scope.upper = function(){
				var upCase = $filter('uppercase');
				$scope.name = upCase($scope.name);
			};
			
			$scope.number = "ua2";
			$scope.changeImage = function(){
				$scope.number = "ua3";
			};
		}
})();
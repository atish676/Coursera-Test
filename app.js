(function() {
	'use strict';//means it'll be strict with us to use every single thing like var, etc.
	
	angular.module('nameCalculator', [])
	.controller('nameCalculatorController'/*name*/, controller/*function name*/)
	.filter('likes', likesFilter)
	.filter('truth', truthFilter);
	
		controller.$inject = ['$scope', '$filter', 'likesFilter'];/*May seem like function name but custom filters are injected are given with nameFilter like atishFilter, lovesFilter, etc. i.e. Filter is necessary to add at end.*/
		
		function controller($scope, $filter, likesFilter){/*Same here*/
			$scope.name = "";
			$scope.finalValue = 0;
			$scope.plate = 50;
		
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
			
			$scope.number = "ua4";
			$scope.changeImage = function(){
				$scope.number = "ua3";
			};
			
			$scope.msg = function(){
				var msg = "Atish loves Rajma Chawal :P";
				var output = $filter('uppercase')(msg);
				return output;
			};
			
			$scope.likesmsg = function(){
				var msg = "Atish loves Rajma Chawal :P";
				msg = likesFilter(msg);
				return msg;
			};
		}
		
		function likesFilter(){
			return function(input){
				input = input || "";
				input = input.replace("loves","likes");
				return input;
			};
		}
		
		function truthFilter(){
			return function(input, target, replace){
				input = input || "";
				input = input.replace(target, replace);
				return input;
			};
		}
})();
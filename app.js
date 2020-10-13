(function() {
	'use strict';
	
			var shoppingList1 = [
				"Maggi", "Biscuits", "Fruitcake", "Cold Drink", "Soup", "Pasta", 
				"Popcorn (Butter Flavour)", "Ice Cream (Chocolate Chip Flavour)"
			];
			
			var shoppingList2 = [
				{
					name: "Maggi",
					quantity: "10"
				},
				{
					name: "Biscuits",
					quantity: "5"
				},
				{
					name: "Fruitcake",
					quantity: "5"
				},
				{
					name: "Cold Drink",
					quantity: "3"
				},
				{
					name: "Soup",
					quantity: "3"
				},
				{
					name: "Pasta",
					quantity: "4"
				}
			];
	
	angular.module('nameCalculator', [])
	.controller('nameCalculatorController', controller)
	.filter('likes', likesFilter)
	.filter('truth', truthFilter);
	
		controller.$inject = ['$scope', '$filter', 'likesFilter', '$timeout'];
		
		function controller($scope, $filter, likesFilter, $timeout){

/*Name value calculator*/
			//$scope.name = "";
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

/*Filter application*/		
			$scope.upper = function(){
				var upCase = $filter('uppercase');
				$scope.name = upCase($scope.name);
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
			
/*Scope usage*/			
			$scope.number = "ua4";
			$scope.changeImage = function(){
				$scope.number = "ua3";
			};
			
/*Digest cycle*/
			$scope.onceCounter = 0;
			$scope.counter = 0;
			$scope.name2 = "ATISH";
			
			$scope.watcherCounter = function(){
				console.log("# of watchers: ",$scope.$$watchersCount);
			};
			
			$scope.countOnce = function(){
				$scope.onceCounter = 1;
			};
			
			$scope.upCounter = function(){
				$timeout(function(){
					$scope.counter++;
					console.log("Incremented");
				},2000);
			};
			
			$scope.$watch(function(){
				console.log("Digest loop fired!");
			})
			
			/*$scope.upCounter = function(){
				setTimeout(function(){
					$scope.counter++;
					console.log("Incremented");
					$scope.$digest(); if this applied then only work.
				},2000);
			}; This wont work
			
			$scope.upCounter = function(){
				setTimeout(function(){
					$scope.$apply(function(){
						$scope.counter++;
						console.log("Incremented");
					});
				},2000);
			};*/
			
/*Loops*/
				$scope.shoppingList1 = shoppingList1;
				$scope.shoppingList2 = shoppingList2;
				
				$scope.addToList = function(){
					var newItem = {
						name: $scope.newItemName,
						quantity: $scope.newItemQuantity
					};
					$scope.shoppingList2.push(newItem);
				};
				
				var seachValue = "Soup";
				function containsFilter(value){
					return value.indexOf(seachValue) !== -1;
				}
				var searchedShoppingList = shoppingList1.filter(containsFilter);
				console.log("Searched Shopping List: ", searchedShoppingList);
				
/*Prototypal Inheritence*/
				var parent = {
					value: "parentValue",
					obj: {
						objValue: "parentObjValue"
					},
					walk: function(){ 
						console.log("Walking!!"); 
					}
				};
				
				var child = Object.create(parent);
				console.log("child.value = ", child.value);
				console.log("child.obj.objValue = ", child.obj.objValue);
				console.log("parent.value = ", parent.value);
				console.log("parent.obj.objValue = ", parent.obj.objValue);
				console.log("Parent = ", parent);
				console.log("Child = ", child);
				
				child.value = "childValue";
				child.obj.objValue = "childObjValue";
				console.log("child.value = ", child.value);
				console.log("child.obj.objValue = ", child.obj.objValue);
				console.log("parent.value = ", parent.value);
				console.log("parent.obj.objValue = ", parent.obj.objValue);
				console.log("Parent = ", parent);
				console.log("Child = ", child);
				
				var grandchild = Object.create(child);
				console.log("Grandchild = ", grandchild);
				grandchild.walk();
		}

/*Custom filter functions*/		
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
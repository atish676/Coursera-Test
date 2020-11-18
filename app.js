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
	.filter('truth', truthFilter)
	.controller('ParentController1', ParentController1)
	.controller('ChildController1', ChildController1)
	.controller('ParentController2', ParentController2)
	.controller('ChildController2', ChildController2)
	.service('ShoppingListService', ShoppingListService)
	.controller('ShoppingListAddController', ShoppingListAddController)
	.controller('ShoppingListShowController', ShoppingListShowController)
	.factory('ShoppingListFactory', ShoppingListFactory)
	.controller('ShoppingListController1', ShoppingListController1)
	.controller('ShoppingListController2', ShoppingListController2)
	.provider('ShoppingListService3', ShoppingListServiceProvider)
	.controller('ShoppingListProviderController', ShoppingListProviderController)
	.config(Config);
	
	
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
		
/*Scope Inheritence*/
		ParentController1.$inject = ['$scope'];
		function ParentController1($scope){
			$scope.parentValue = 1;
			$scope.pc = this;
			$scope.pc.parentValue = 1;
		}
		
		ChildController1.$inject = ['$scope'];
		function ChildController1($scope){
			console.log("$scope.parentValue = ", $scope.parentValue);
			console.log("Child $scope = ", $scope);
			
			$scope.parentValue = 5;
			console.log("CHANGED $scope.parentValue = 5");
			console.log("$scope.parentValue = ", $scope.parentValue);
			console.log("$scope = ", $scope);
			
			console.log("$scope.pc.parentValue = ", $scope.pc.parentValue);
			$scope.pc.parentValue = 5;
			console.log("CHANGED $scope.pc.parentValue = 5");
			console.log("$scope.pc.parentValue = ", $scope.pc.parentValue);
			console.log("$scope = ", $scope);
			
			console.log("$scope.$parent.parentValue = ", $scope.$parent.parentValue);
		}
		
/*Controller As*/
		function ParentController2(){
			var parent = this;
			parent.value = 1;
		}
		
		ChildController2.$inject = ['$scope'];//actually not needed but since we're using console.log so need to use otherwise like ParentController2
		function ChildController2($scope){
			var child = this;
			child.value = 5;
			console.log("ChildController2.$scope = ", $scope);
		}
		
/*Shopping List*/
		ShoppingListAddController.$inject = ['ShoppingListService'];
		function ShoppingListAddController(ShoppingListService){
			var itemAdder = this;
			
			itemAdder.itemName = "";
			itemAdder.itemQuantity = "";
			
			itemAdder.addItem = function(){
				ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
			}
		}
		
		ShoppingListShowController.$inject = ['ShoppingListService'];
		function ShoppingListShowController(ShoppingListService){
			var showList = this;
			
			showList.items = ShoppingListService.getItems();
			
			showList.removeItem = function(itemIndex){
				ShoppingListService.removeItem(itemIndex);
			};
		}
		
		function ShoppingListService(){
			var service = this;
			var items = [];
			
			service.addItem = function(itemName, quantity){
				var item = {
					name: itemName,
					quantity: quantity
				};
				items.push(item);
			};
			
			service.removeItem = function(itemIndex){
				items.splice(itemIndex, 1);
			};
			
			service.getItems = function(){
				return items;
			};
		}
		
/*Factory Function*/
		ShoppingListController1.$inject = ['ShoppingListFactory'];
		function ShoppingListController1(ShoppingListFactory){
			var list1 = this;
			
			var shoppingList = ShoppingListFactory();
			
			list1.items = shoppingList.getItems();
			
			list1.itemName = "";
			list1.itemQuantity = "";
			
			list1.addItem = function(){
				shoppingList.addItem(list1.itemName, list1.itemQuantity);
			}
			
			list1.removeItem = function(itemIndex){
				shoppingList.removeItem(itemIndex);
			}
		}
		
		ShoppingListController2.$inject = ['ShoppingListFactory'];
		function ShoppingListController2(ShoppingListFactory){
			var list2 = this;
			
			var shoppingList = ShoppingListFactory(3);
			
			list2.items = shoppingList.getItems();
			
			list2.itemName = "";
			list2.itemQuantity = "";
			
			list2.addItem = function(){
				try{
					shoppingList.addItem(list2.itemName, list2.itemQuantity);
				} catch(error){
					list2.errorMessage = error.message;
				}
			}
			
			list2.removeItem = function(itemIndex){
				shoppingList.removeItem(itemIndex);
			};
		}
		
		function ShoppingListService2(maxItems){
			var service = this;
			
			var items = [];
			
			service.addItem = function(itemName, quantity){
				if((maxItems === undefined) || (maxItems !== undefined) && (items.length < maxItems)){
					var item = {
						name: itemName,
						quantity: quantity
					};
					items.push(item);
				}
				else{
					throw new Error("Max items (" + maxItems + ") reached.");
				}
			};
			
			service.removeItem = function(itemIndex){
				items.splice(itemIndex,1);
			};
			
			service.getItems = function(){
				return items;
			};
		}
		
		function ShoppingListFactory(){
			var factory = function(maxItems){
				return new ShoppingListService2(maxItems);
			};
			return factory;
		}
		
/*Provider Function*/

		Config.$inject = ['ShoppingListService3Provider'];
		function Config(ShoppingListService3Provider){
			ShoppingListService3Provider.defaults.maxItems = 2;
		}

		ShoppingListProviderController.$inject = ['ShoppingListService3'];
		function ShoppingListProviderController(ShoppingListService3){
			var list = this;
			
			list.items = ShoppingListService3.getItems();
			
			list.itemName = "";
			list.itemQuantity = "";
			
			list.addItem = function(){
				try{
					ShoppingListService3.addItem(list.itemName, list.itemQuantity);
				} catch(error){
					list.errorMessage = error.message;
				}
			};
			
			list.removeItem = function(itemIndex){
				ShoppingListService3.removeItem(itemIndex);
			};
		}
		
		function ShoppingListService3(maxItems){
			var service = this;
			
			var items = [];
			
			service.addItem = function(itemName, quantity){
				if((maxItems === undefined) || (maxItems !== undefined) && (items.length < maxItems)){
					var item = {
						name: itemName,
						quantity: quantity
					};
					items.push(item);
				}
				else{
					throw new Error("Max items (" + maxItems + ") reached.");
				}
			};
			
			service.removeItem = function(itemIndex){
				items.splice(itemIndex,1);
			};
			
			service.getItems = function(){
				return items;
			};
		}
		
		function ShoppingListServiceProvider(){
			var provider = this;
			
			provider.defaults = {
				maxItems: 10
			};
			
			provider.$get = function(){
				var shoppingList = new ShoppingListService3(provider.defaults.maxItems);
				
				return shoppingList;
			};
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
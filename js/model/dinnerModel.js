//DinnerModel Object constructor
var DinnerModel = function() {
 
	// observers
	var pObservers = [];
	// stateController
	var pStateCtrl = null;
	// and selected dishes for the dinner menu
	var pNumberOfGuests = 1;
	// click image and check dish detail
	var pDishId = 1;

	var pState = "homeView";
	// dish id map
	var mapDishesId = [];
	// record the index number in dishes
	var selecteIds = [];
	// record the current menu
	var unSelectedIds = [];
	// 
	var pKeyWord = "";
	//
	var pSearchType = "all";
	// 
	var pDishTypes = ["all", "main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "drink"]

	var pAPIkey = "Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB";
	// get receipes
	var pURLReceipes = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=7&type=%type&query=%filter";

	var pURLRecepieDetails = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=%id&includeNutrition=false"

	var pDishes = [];

	var pMissImgId = [110669, 146557, 698704, 609572];

	this.addObserver = function(observer) {
		// observer is a function from a view
		pObservers.push(observer);
	}

	var notifyObservers = function(updateCase){
		pObservers.forEach(function(observer){
			observer.update(updateCase);
		})
	}

	// get current price
	this.getDishPrice = function(dish) {
		var totalPrice = 0;
		dish.ingredients.forEach(function(ingredient){
			totalPrice += (pNumberOfGuests * ingredient.price )
		})
		return totalPrice;
	}

	this.setNumberOfGuests = function(num) {
		if(num <= 0) return;
		pNumberOfGuests = num;
		notifyObservers("numberOfGuests");
	}
	
	this.getNumberOfGuests = function() {
		return pNumberOfGuests;
	}

	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function(type) {
		//TODO Lab 1
		var typeDishes = [];
		pDishes.forEach(function(dish){
			if(dish.type === type) typeDishes.push(dish);
			else return false;
		})
		return typeDishes;
	}

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		// clear the dish id map
		return pDishes.map(function(dish){ 
			return dish;
		})
	}

	//function that returns a dish of specific ID
	var getDish = function (id, callback=null, errorCallback=null) {
	  for(key in pDishes){
			if(pDishes[key].id == id) {
				if(pDishes[key].ingredients.length == 0){
					var queryURL = pURLRecepieDetails.replace("%id", id);
					$.ajax({
					   type: 'GET',
					   url: queryURL,
					   headers: {
					     'X-Mashape-Key': pAPIkey
					   },
					   dataType: 'json',
					   success: function(data) {
					     callback(data, id);
					   },
					   error: function(error) {
					     errorCallback(error)
					   }
					})
				}
				return pDishes[key];
			}
		}
	}

	this.getCurrentDish = function(callback, errorCallback){
		return getDish(pDishId, callback, errorCallback);
	}

	this.getCurrentDishes = function(){
		return selecteIds.map(function(id){
			var dish = getDish(id);
			return [dish.name, this.getDishPrice(dish), dish.image, dish.description, dish.id];
		}, this);
	}

	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		//TODO Lab 1
		return pDishes.map(function(dish){ return dish.ingredients});
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		//TODO Lab 1
		this.totalPrice = 0;
		selecteIds.forEach(function(id){
			// can not find the id
			if(mapDishesId.indexOf(id) === -1){
				console.log("Warning");
				return false;
			}
			this.totalPrice += this.getDishPrice(getDish(id));
		}, this);
		return this.totalPrice.toFixed(2);
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function() {
		//TODO Lab 1 
		var index = selecteIds.indexOf(pDishId);
		// add to the customer menu
		if(index === -1) selecteIds.push(pDishId);
		index = unSelectedIds.indexOf(pDishId);
		// remove from the main menu
		if(index !== -1) selecteIds.splice(index, 1);
		notifyObservers("addDishToMenu");
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		//TODO Lab 1
		var index = selecteIds.indexOf(id);
		// add to the customer menu
		if(index !== -1) selecteIds.splice(index, 1);
		// index = unSelectedIds.indexOf(id);
		// remove from the main menu
		// if(index === -1) unSelecteIds.push(index);
		notifyObservers("removeDishFromMenu");
	}


	this.dishesUpdate = function(dishes, dishType){
		dishes.results.forEach(function(dish){
			if(mapDishesId.indexOf(dish.id) === -1 && pMissImgId.indexOf(dish.id) === -1){
				pDishes.push({
					"id": dish.id,
					"name": dish.title,
					"type": dishType,
					"image": dishes.baseUri+dish.image,
					"description": "",
					"ingredients": [],
				})
				mapDishesId.push(dish.id);
			}		
		})
		notifyObservers("dishesUpdate");
	}

	this.dishDetailUpdate = function(data, dishId){
		for(key in pDishes){
			if(pDishes[key].id == dishId && pDishes[key].ingredients.length == 0) {
				var price = ((data.pricePerServing/data.servings)/data.extendedIngredients.length).toFixed(2)
				data.extendedIngredients.forEach(function(ingredient){
					pDishes[key].ingredients.push({ 
						'name': ingredient.name,
						'quantity': (ingredient.amount/data.servings).toFixed(2),
						'unit': ingredient.unit,
						'price': price
						});
					pDishes[key].description = data.instructions;
				})
			}
		}
		notifyObservers("dishDetailUpdate");
	}

	//get all types of dishes
	this.getAllDishes = function(type, filter, callback, errorCallback) {
		var queryURL = pURLReceipes.replace("%type", type).replace("%filter", filter);
		$.ajax({
		   type: 'GET',
		   url: queryURL,
		   headers: {
		     'X-Mashape-Key': pAPIkey
		   },
		   dataType: 'json',
		   success: function(data) {
		     callback(data, type);
		   },
		   error: function(error) {
		     errorCallback(error)
		   }
		})
	}

	this.getAllDishTypes = function(){
		// return dishes.map(function(i){ 
		// 	return i.type
		// }).filter(function(item, pos, self){ 
		// 	return self.indexOf(item) == pos
		// });
		return pDishTypes;
	}

	// set dish id for dishDetailView, pass from selectDishView
	this.setDishId = function(dishId){
		if(mapDishesId.indexOf(parseInt(dishId)) === -1){
			return;
		}
		pDishId = parseInt(dishId);
		notifyObservers("setDish");
		return;
	}

	this.setSearchType = function(searchType){
		pSearchType = searchType;
		notifyObservers("searchType");
		return;
	}

	this.getSearchType = function(){
		return pSearchType;
	}

	this.setSearch = function(keyWord, searchType){
		pKeyWord = keyWord;
		pSearchType = searchType;
		notifyObservers("search");
		return;
	}

	this.getFilterDishes = function(){
		return pDishes.filter(function(dish) {
		var found = true;
		if(pKeyWord){
			found = false;
			dish.ingredients.forEach(function(ingredient) {
				if(ingredient.name.indexOf(pKeyWord)!=-1) {
					found = true;
				}
			});
			if(dish.name.indexOf(pKeyWord) != -1)
			{
				found = true;
			}
		}
		if(pSearchType == "all") return found;
	  	return dish.type == pSearchType && found;
	  });
	}
	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	// var dishes = [{
	// 	'id':1,
	// 	'name':'French toast',
	// 	'type':'starter',
	// 	'image':'toast.jpg',
	// 	'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
	// 	'ingredients':[{ 
	// 		'name':'eggs',
	// 		'quantity':0.5,
	// 		'unit':'',
	// 		'price':10
	// 		},{
	// 		'name':'milk',
	// 		'quantity':30,
	// 		'unit':'ml',
	// 		'price':6
	// 		},{
	// 		'name':'brown sugar',
	// 		'quantity':7,
	// 		'unit':'g',
	// 		'price':1
	// 		},{
	// 		'name':'ground nutmeg',
	// 		'quantity':0.5,
	// 		'unit':'g',
	// 		'price':12
	// 		},{
	// 		'name':'white bread',
	// 		'quantity':2,
	// 		'unit':'slices',
	// 		'price':2
	// 		}]
	// 	},{
	// 	'id':2,
	// 	'name':'Sourdough Starter',
	// 	'type':'starter',
	// 	'image':'sourdough.jpg',
	// 	'description':"Here is how you make it... Lore ipsum...",
	// 	'ingredients':[{ 
	// 		'name':'active dry yeast',
	// 		'quantity':0.5,
	// 		'unit':'g',
	// 		'price':4
	// 		},{
	// 		'name':'warm water',
	// 		'quantity':30,
	// 		'unit':'ml',
	// 		'price':0
	// 		},{
	// 		'name':'all-purpose flour',
	// 		'quantity':15,
	// 		'unit':'g',
	// 		'price':2
	// 		}]
	// 	},{
	// 	'id':3,
	// 	'name':'Baked Brie with Peaches',
	// 	'type':'starter',
	// 	'image':'bakedbrie.jpg',
	// 	'description':"Here is how you make it... Lore ipsum...",
	// 	'ingredients':[{ 
	// 		'name':'round Brie cheese',
	// 		'quantity':10,
	// 		'unit':'g',
	// 		'price':8
	// 		},{
	// 		'name':'raspberry preserves',
	// 		'quantity':15,
	// 		'unit':'g',
	// 		'price':10
	// 		},{
	// 		'name':'peaches',
	// 		'quantity':1,
	// 		'unit':'',
	// 		'price':4
	// 		}]
	// 	},{
	// 	'id':100,
	// 	'name':'Meat balls',
	// 	'type':'main dish',
	// 	'image':'meatballs.jpg',
	// 	'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
	// 	'ingredients':[{ 
	// 		'name':'extra lean ground beef',
	// 		'quantity':115,
	// 		'unit':'g',
	// 		'price':20
	// 		},{
	// 		'name':'sea salt',
	// 		'quantity':0.7,
	// 		'unit':'g',
	// 		'price':3
	// 		},{
	// 		'name':'small onion, diced',
	// 		'quantity':0.25,
	// 		'unit':'',
	// 		'price':2
	// 		},{
	// 		'name':'garlic salt',
	// 		'quantity':0.7,
	// 		'unit':'g',
	// 		'price':2
	// 		},{
	// 		'name':'Italian seasoning',
	// 		'quantity':0.6,
	// 		'unit':'g',
	// 		'price':3
	// 		},{
	// 		'name':'dried oregano',
	// 		'quantity':0.3,
	// 		'unit':'g',
	// 		'price':3
	// 		},{
	// 		'name':'crushed red pepper flakes',
	// 		'quantity':0.6,
	// 		'unit':'g',
	// 		'price':3
	// 		},{
	// 		'name':'Worcestershire sauce',
	// 		'quantity':6,
	// 		'unit':'ml',
	// 		'price':7
	// 		},{
	// 		'name':'milk',
	// 		'quantity':20,
	// 		'unit':'ml',
	// 		'price':4
	// 		},{
	// 		'name':'grated Parmesan cheese',
	// 		'quantity':5,
	// 		'unit':'g',
	// 		'price':8
	// 		},{
	// 		'name':'seasoned bread crumbs',
	// 		'quantity':15,
	// 		'unit':'g',
	// 		'price':4
	// 		}]
	// 	},{
	// 	'id':101,
	// 	'name':'MD 2',
	// 	'type':'main dish',
	// 	'image':'bakedbrie.jpg',
	// 	'description':"Here is how you make it... Lore ipsum...",
	// 	'ingredients':[{ 
	// 		'name':'ingredient 1',
	// 		'quantity':1,
	// 		'unit':'pieces',
	// 		'price':8
	// 		},{
	// 		'name':'ingredient 2',
	// 		'quantity':15,
	// 		'unit':'g',
	// 		'price':7
	// 		},{
	// 		'name':'ingredient 3',
	// 		'quantity':10,
	// 		'unit':'ml',
	// 		'price':4
	// 		}]
	// 	},{
	// 	'id':102,
	// 	'name':'MD 3',
	// 	'type':'main dish',
	// 	'image':'meatballs.jpg',
	// 	'description':"Here is how you make it... Lore ipsum...",
	// 	'ingredients':[{ 
	// 		'name':'ingredient 1',
	// 		'quantity':2,
	// 		'unit':'pieces',
	// 		'price':8
	// 		},{
	// 		'name':'ingredient 2',
	// 		'quantity':10,
	// 		'unit':'g',
	// 		'price':7
	// 		},{
	// 		'name':'ingredient 3',
	// 		'quantity':5,
	// 		'unit':'ml',
	// 		'price':4
	// 		}]
	// 	},{
	// 	'id':103,
	// 	'name':'MD 4',
	// 	'type':'main dish',
	// 	'image':'meatballs.jpg',
	// 	'description':"Here is how you make it... Lore ipsum...",
	// 	'ingredients':[{ 
	// 		'name':'ingredient 1',
	// 		'quantity':1,
	// 		'unit':'pieces',
	// 		'price':4
	// 		},{
	// 		'name':'ingredient 2',
	// 		'quantity':12,
	// 		'unit':'g',
	// 		'price':7
	// 		},{
	// 		'name':'ingredient 3',
	// 		'quantity':6,
	// 		'unit':'ml',
	// 		'price':4
	// 		}]
	// 	},{
	// 	'id':200,
	// 	'name':'Chocolat Ice cream',
	// 	'type':'dessert',
	// 	'image':'icecream.jpg',
	// 	'description':"Here is how you make it... Lore ipsum...",
	// 	'ingredients':[{ 
	// 		'name':'ice cream',
	// 		'quantity':100,
	// 		'unit':'ml',
	// 		'price':6
	// 		}]
	// 	},{
	// 	'id':201,
	// 	'name':'Vanilla Ice cream',
	// 	'type':'dessert',
	// 	'image':'icecream.jpg',
	// 	'description':"Here is how you make it... Lore ipsum...",
	// 	'ingredients':[{ 
	// 		'name':'ice cream',
	// 		'quantity':100,
	// 		'unit':'ml',
	// 		'price':6
	// 		}]
	// 	},{
	// 	'id':202,
	// 	'name':'Strawberry',
	// 	'type':'dessert',
	// 	'image':'icecream.jpg',
	// 	'description':"Here is how you make it... Lore ipsum...",
	// 	'ingredients':[{ 
	// 		'name':'ice cream',
	// 		'quantity':100,
	// 		'unit':'ml',
	// 		'price':6
	// 		}]
	// 	}
	// ];

}

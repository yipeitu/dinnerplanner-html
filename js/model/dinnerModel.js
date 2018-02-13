//DinnerModel Object constructor
var DinnerModel = function() {
 
	// observers
	var pObservers = Object();
	// stateController
	var pStateCtrl = null;
	// and selected dishes for the dinner menu
	var pNumberOfGuests = 0;
	// click image and check dish detail
	var pDishId = 1;

	var pState = "homeView";
	// dish id map
	var mapDishesId = [];
	// record the index number in dishes
	var selecteIds = [];
	// record the current menu
	var unSelectedIds = [];
	// dish detail id

	this.setStateCtrl = function(stateCtrl){
		pStateCtrl = stateCtrl;
	}

	this.addObserver = function(obsName, observer) {
		// observer is a function from a view
		pObservers[obsName] = observer;
		console.log("addObserver:", obsName);
	}

	this.notifyObservers = function(obsName, observer) { 
		console.log(obsName);
		switch(obsName){
			case "selectDish":
				// pStateCtrl.changeState(obsName);
				pState = obsName;
				pObservers["homeView"].clear();
				pObservers["pageView"].show();
				pObservers["sideBarView"].show();
				pObservers["selectDishView"].show();
				break;
			case "dinnerConfirm":
				// pStateCtrl.changeState("overView");
				pState = "overView";
				pObservers["sideBarView"].clear();
				pObservers["selectDishView"].clear();
				pObservers["resultView"].show();
				pObservers["statusView"].show();
				pObservers["overView"].show();
				break;
			case "dishDetails":
				// pStateCtrl.changeState("dishDetails");
				pState = "dishDetails";
				pObservers["selectDishView"].clear();
				pObservers["dishDetailsView"].show();
				break;
			case "backToSearch":
				console.log("State:", pState);
				switch(pState){
					case "dishDetails":
						pObservers["dishDetailsView"].clear();
						break;
					case "overView":
						pObservers["resultView"].clear();
						pObservers["statusView"].clear();
						pObservers["overView"].clear();
						break;
				}
				// pStateCtrl.changeState("selectDish");
				pState = "selectDish";
				pObservers["pageView"].show();
				pObservers["sideBarView"].show();
				pObservers["selectDishView"].show();
				break;
			case "addToMenu":
				pObservers["sideBarView"].show();
				break;
			case "numberOfGuests":
				pObservers["sideBarView"].update();
				if(pState == "dishDetails"){
					pObservers["dishDetailsView"].show();
				}
				break;
			case "printOut":
				// pStateCtrl.changeState("receipeView");
				pState = "receipeView";
				pObservers["overView"].clear();
				pObservers["receipeView"].show();
		}
	}

	// get current price
	this.getDishPrice = function(dish) {
		var totalPrice = 0;
		var tempNumberOfGuests = pNumberOfGuests;
		if(tempNumberOfGuests === 0) tempNumberOfGuests = 1;
		dish.ingredients.forEach(function(ingredient){
			totalPrice += (tempNumberOfGuests * ingredient.price )
		})
		return totalPrice;
	}

	this.setNumberOfGuests = function(num) {
		if(num <= 0) return;
		pNumberOfGuests = num;
	}
	
	this.getNumberOfGuests = function() {
		return pNumberOfGuests;
	}

	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function(type) {
		//TODO Lab 1
		var typeDishes = [];
		dishes.forEach(function(dish){
			if(dish.type === type) typeDishes.push(dish);
			else return false;
		})
		return typeDishes;
	}

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		//TODO Lab 1
		// clear the dish id map
		mapDishesId.length = 0;
		return dishes.map(function(dish){ 
			mapDishesId.push(dish.id);
			return dish;
		});
	}


	//function that returns a dish of specific ID
	this.getDish = function (id) {
	  for(key in dishes){
			if(dishes[key].id == id) {
				return dishes[key];
			}
		}
	}

	this.getCurrentDishes = function(){
		return selecteIds.map(function(id){
			var dish = this.getDish(id);
			return [dish.name, this.getDishPrice(dish), dish.image, dish.description];
		}, this);
	}

	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		//TODO Lab 1
		return dishes.map(function(dish){ return dish.ingredients});
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
			this.totalPrice += this.getDishPrice(this.getDish(id));
		}, this);
		return this.totalPrice.toFixed(2);
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
		//TODO Lab 1 
		var index = selecteIds.indexOf(id);
		// add to the customer menu
		if(index === -1) selecteIds.push(id);
		index = unSelectedIds.indexOf(id);
		// remove from the main menu
		if(index !== -1) selecteIds.splice(index, 1);
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		//TODO Lab 1
		var index = selecteIds.indexOf(id);
		// add to the customer menu
		if(index !== -1) selecteIds.splice(index, 1);
		index = unSelectedIds.indexOf(id);
		// remove from the main menu
		if(index === -1) unSelecteIds.push(index);
	}

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (type, filter) {
	  return dishes.filter(function(dish) {
		var found = true;
		if(filter){
			found = false;
			dish.ingredients.forEach(function(ingredient) {
				if(ingredient.name.indexOf(filter)!=-1) {
					found = true;
				}
			});
			if(dish.name.indexOf(filter) != -1)
			{
				found = true;
			}
		}
		if(type == "all") return found;
	  	return dish.type == type && found;
	  });	
	}

	//get all types of dishes
	this.getAllDishTypes = function(){
		return dishes.map(function(i){ 
			return i.type
		}).filter(function(item, pos, self){ 
			return self.indexOf(item) == pos
		});
	}

	// set dish id for dishDetailView, pass from selectDishView
	this.setDishId = function(dishId){
		if(mapDishesId.indexOf(parseInt(dishId)) === -1){
			return false;
		}
		pDishId = dishId;
		return true;
	}

	this.getDishId = function(){
		return pDishId;
	}
	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{ 
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{ 
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];

}

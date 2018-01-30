/** ExampleView Object constructor
 * 
 * This object represents the code for one specific view (in this case the Example view). 
 * 
 * It is responsible for:
 * - constructing the view (e.g. if you need to create some HTML elements procedurally) 
 * - populating the view with the data
 * - updating the view when the data changes
 * 
 * You should create a view Object like this for every view in your UI.
 * 
 * @param {jQuery object} container - references the HTML parent element that contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */ 
var SelectDishView = function (container, model) {
	
	var dropDownMenu = container.find("#dropDownMenu");
	
	// get all types

	var allDishTypes = model.getAllDishTypes();
	

	allDishTypes.forEach(function(typeName){
		dropDownMenu.append('<a class="dropdown-item" href="#">'+typeName+'</a>')
	})
	
	var imageMenu = container.find("#imageMenu");

	// get all dishes
	var allDishes = model.getFullMenu();

	allDishes.forEach(function(dish){
		imageMenu.append(dishTagWithName(dish[0], dish[1], dish[2]))
	})
}


var dishTagWithName = function(id, name, img){
	return '<figure class="figure">' +
				'<img src="images/' + 
				img + 
				'" class="figure-img img-fluid img-thumbnail m-2">' +
				'<figcaption class="figure-caption text-center">' + 
				name +
				'</figcaption></figure>';
}

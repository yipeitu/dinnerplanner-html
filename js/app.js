$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	// And create the instance of ExampleView
	var exampleView = new ExampleView($("#exampleView"), model);

	// create the instance of select dish view
	var selectDishView = new SelectDishView($("#selectDishView"), model);
	
	var id = 2;
	var numberOfGuests = 3;
	// create the instance of dish details
	var dishDetails = new DishDetailsView($("#dishDetailsView"), model, id, numberOfGuests);

	var sideBarView = new SideBarView($("#sideBarView"), model);
	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children 
	 * of the specific view you're working with (see exampleView.js).
	 */

});
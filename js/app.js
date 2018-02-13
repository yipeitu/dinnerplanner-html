$(function() {
	//We instantiate our model
	var model = new DinnerModel();

	var homeView = new HomeView($("#iHomeView"), model);
	model.addObserver("homeView", homeView);

	var sideBarView = new SideBarView($("#iSideBarView"), model);
	model.addObserver("sideBarView", sideBarView);

	var selectDishView = new SelectDishView($("#iMainView"), model);
	model.addObserver("selectDishView", selectDishView);

	var dishDetailsView = new DishDetailsView($("#iMainView"), model);
	model.addObserver("dishDetailsView", dishDetailsView);

	// initalize general state controller
	var stateCtrl = new GeneralStateController(homeView);
	// stateCtrl.registerView("sideBarView", sideBarView);
	// stateCtrl.registerView("selectDishView", selectDishView);
	// stateCtrl.registerView("dishDetailsView", dishDetailsView);

	// model will inform state controller when an event happens
	model.setStateCtrl(stateCtrl);
	stateCtrl.initViewCtrl();

	// And create the instance of ExampleView
	// var exampleView = new ExampleView($("#exampleView"), model);


	// // create the instance of select dish view
	// var selectDishView = new SelectDishView($("#selectDishView"), model);
	
	// var id = 2;
	// var numberOfGuests = 3;
	// // create the instance of dish details
	// var dishDetails = new DishDetailsView($("#dishDetailsView"), model, id, numberOfGuests);

	// var sideBarView = new SideBarView($("#sideBarView"), model);

	// var dinnerOverView = new DinnerOverView($("#dinnerOverView"), model);

	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children 
	 * of the specific view you're working with (see exampleView.js).
	 */

});

var GeneralStateController = function(view){
	var pState = "homeView";
	// functions: show and hide
	var pViews = {pState: view};

	this.initViewCtrl = function(){
		for ([state, view] of Object.entries(pViews)) {
		  view.ctrlInitialize();
		}
	}

	this.registerView = function(viewName, view){
		pViews[viewName] = view;
	}

	// call from controllers
	this.changeState = function(state){
		console.log(pState+" -> "+state);
		// pViews[this.pState].hide();
		// pViews[pState].show();
		pState = state;
		console.log(pState+" -> "+state);
	}

	// get currentState
	this.currentState = function(){
		return this.pState;
	}
}
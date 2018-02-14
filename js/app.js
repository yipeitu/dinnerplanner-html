$(function() {
	//We instantiate our model
	var model = new DinnerModel();

	var homeView = new HomeView($("#iHome"), model);
	model.addObserver("homeView", homeView);

	var pageView = new PageView($("#iPage"));
	model.addObserver("pageView", pageView);

	var sideBarView = new SideBarView($("#iSideBarView"), model);
	model.addObserver("sideBarView", sideBarView);

	var selectDishView = new SelectDishView($("#iMainView"), model);
	model.addObserver("selectDishView", selectDishView);

	var dishDetailsView = new DishDetailsView($("#iMainView"), model);
	model.addObserver("dishDetailsView", dishDetailsView);

	var resultView = new ResultView($("#iResult"), model);
	model.addObserver("resultView", resultView);

	var statusView = new StatusView($("#iStatusView"), model);
	model.addObserver("statusView", statusView);

	var overView = new DinnerOverView($("#iOverView"), model);
	model.addObserver("overView", overView);

	var receipeView = new ReceipeView($("#iOverView"), model);
	model.addObserver("receipeView", receipeView);

	// initalize general state controller
	var stateCtrl = new GeneralStateController(homeView);
	// stateCtrl.registerView("sideBarView", sideBarView);
	// stateCtrl.registerView("selectDishView", selectDishView);
	// stateCtrl.registerView("dishDetailsView", dishDetailsView);

	// model will inform state controller when an event happens
	model.setStateCtrl(stateCtrl);
	stateCtrl.initViewCtrl();

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
	}

	// get currentState
	this.getState = function(){
		return this.pState;
	}
}
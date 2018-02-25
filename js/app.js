$(function() {
	var model = new DinnerModel();

	var controller = new GeneralController();

	var homeView = new HomeView($("#iHome"), model);
	controller.addView(homeView);
	var homeViewCtrl = new HomeViewCtrl(homeView, model, controller);

	var sideBarView = new SideBarView($("#iSideBarView"), model);
	controller.addView(sideBarView);
	var sideBarCtrl = new SideBarCtrl(sideBarView, model, controller);

	var selectDishView = new SelectDishView($("#iSelectView"), model);
	controller.addView(selectDishView);
	var selectDishCtrl = new SelectDishCtrl(selectDishView, model, controller);

	var dishDetailsView = new DishDetailsView($("#iDetailView"), model);
	controller.addView(dishDetailsView);
	var dishDetailsCtrl = new DishDetailsCtrl(dishDetailsView, model, controller);

	var statusView = new StatusView($("#iStatusView"), model);
	controller.addView(statusView);
	var statusCtrl = new StatusCtrl(statusView, model, controller);

	var overView = new DinnerOverView($("#iOverView"), model);
	controller.addView(overView);
	var overViewCtrl = new OverViewCtrl(overView, model, controller);

	var receipeView = new ReceipeView($("#iResult"), model);
	controller.addView(receipeView);
	
	controller.addScreen("search", [sideBarView, selectDishView]);
	controller.addScreen("detail", [sideBarView, dishDetailsView]);
	controller.addScreen("overview", [statusView, overView]);
	controller.addScreen("printout", [statusView, receipeView]);
});

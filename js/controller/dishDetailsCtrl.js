var DishDetailsCtrl = function (pView, pModel, pCtrl) {
	
	pView.btnBack.on("click", function(){
		pCtrl.showScreen("search");
	})

	pView.btnAdd.on("click", function(event){
		// add current dish to menu
		pModel.addDishToMenu();
	})

}
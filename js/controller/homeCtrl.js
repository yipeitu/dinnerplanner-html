var HomeViewCtrl = function (pView, pModel, pCtrl) {

	pView.iCreateNewDinner.click(function(){
		pCtrl.showScreen("search");
	})
}
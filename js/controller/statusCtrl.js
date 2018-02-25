var StatusCtrl = function (pView, pModel, pCtrl) {

	pView.btnBack.on("click", function(){
		pCtrl.showScreen("search");
	})
	
}
var OverViewCtrl = function (pView, pModel, pCtrl) {
	
	pView.btnPrint.on("click", function(){
		pCtrl.showScreen("printout");
	})
}
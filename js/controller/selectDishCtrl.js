var SelectDishCtrl = function (pView, pModel, pCtrl) {
	
	pView.menuDropDown.on("click", function(event){
		pModel.setSearchType(event.target.innerText);
	});

	pView.btnSearch.on("click", function(event){
		pModel.setSearch(pView.keyWord.val(), pView.searchType.text());
	});

	pView.imageMenu.on("click", function(){
		pModel.setDishId(event.target.id.split("_")[1]);
		pCtrl.showScreen("detail");
	});
}
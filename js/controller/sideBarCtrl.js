var SideBarCtrl = function (pView, pModel, pCtrl) {
	pView.btnGuest.on("click", function(){
		switch(event.target.id){
			case "iPlusGuest":
				pModel.setNumberOfGuests(pModel.getNumberOfGuests()+1);
				break;
			case "iMinusGuest":
				pModel.setNumberOfGuests(pModel.getNumberOfGuests()-1);
				break;
		}
		
	})

	pView.btnConfirm.on("click", function(){
		if(pModel.getTotalMenuPrice() <= 0){
			console.log("totalPrice 0")
			return;
		}
		pCtrl.showScreen("overview");
	})

	// for mobile
	pView.toggleMenu.on("click", function(){
		if(pView.btnGuest.hasClass("d-none")){
			pView.btnGuest.removeClass("d-none")
		} else {
			pView.btnGuest.addClass("d-none");
		}
		
		if(pView.orderDishes.hasClass("d-none")){
			pView.orderDishes.removeClass("d-none")
		} else {
			pView.orderDishes.addClass("d-none");
		}

		if(pView.btnConfirm.hasClass("d-none")){
			pView.btnConfirm.removeClass("d-none")
		} else {
			pView.btnConfirm.addClass("d-none");
		}
	})

	// remove ordered dishes
	pView.orderDishes.on("click", function(event){
		pModel.removeDishFromMenu(parseInt(event.target.parentNode.id.split("_")[1]));
	})
}
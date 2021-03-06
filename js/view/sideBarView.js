var SideBarView = function (pView, pModel) {

	this.btnGuest = pView.find('#iBtnGuest');

	this.btnConfirm = pView.find("#iBtnConfirm");
	
	this.toggleMenu = pView.find("#iToggle");

	this.orderDishes = pView.find("#iOrderDishes");

	var orderView = function(dishName, totalPrice, id=""){
	return `<div class="d-flex" id=${id}>
			<div class="col-xs-3 mr-auto p-2">
				${dishName == "Dish Name"? dishName:dishName.slice(0, 18)+"..."}
			</div>
			<div class="col-xs-3 ml-auto p-2">
				${totalPrice}
			</div>
			</div>`;
	};

	var ordersUpdate = function(){
		var orderDishes = pView.find("#iOrderDishes");
		orderDishes.empty();
		orderDishes.append(orderView("Dish Name", "Cost"));
		var currentDishes = pModel.getCurrentDishes();
		// btnConfirm.addAttr("disabled");
		if( typeof currentDishes !== "undefined"){
			currentDishes.forEach(function(dish){
				orderDishes.append(orderView(dish[0], dish[1].toFixed(2), "order_"+dish[4]));
			})
		}
		var iTotalPrice = pView.find("#iTotalPrice");
		iTotalPrice[0].innerHTML = pModel.getTotalMenuPrice();
		var mTotalPrice = pView.find("#mTotalPrice");
		mTotalPrice[0].innerHTML = pModel.getTotalMenuPrice();
	}

	this.update = function(updateCase){
		if(updateCase == "numberOfGuests"){
			var numberOfGuests = pView.find("#numberOfGuests");
			numberOfGuests.html(pModel.getNumberOfGuests());
			ordersUpdate();
		}
		// if(updateCase == "addDishToMenu" || updateCase == "removeDishFromMenu"){
		if(["addDishToMenu", "removeDishFromMenu"].indexOf(updateCase) != -1){
			ordersUpdate();
		}
	}

	this.show = function(){
		pView.show();
	}

	this.hide = function(){
		pView.hide();
	}

	pModel.addObserver(this);
}



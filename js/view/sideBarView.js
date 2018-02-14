var SideBarView = function (pView, pModel) {

	this.ctrlInitialize = function(){
		var btnGuest = pView.find('#iBtnGuest:not(.bound)');
		btnGuest.addClass('bound').on('click', ctrlGuestView.bind(this));

		var btnConfirm = pView.find("#iBtnConfirm:not(.bound)");
		btnConfirm.addClass('bound').on("click", ctrlConfirm.bind(this));
		
		var toggleMenu = pView.find("#iToggle:not(.bound)");
		toggleMenu.addClass('bound').on("click", ctrlToggle);
	}

	var ctrlGuestView = function(event) {
		switch(event.target.id){
			case "iPlusGuest":
				pModel.setNumberOfGuests(pModel.getNumberOfGuests()+1);
				break;
			case "iMinusGuest":
				pModel.setNumberOfGuests(pModel.getNumberOfGuests()-1);
				break;
		}
		var numberOfGuests = pView.find("#numberOfGuests");
		numberOfGuests.html(pModel.getNumberOfGuests());
		pModel.notifyObservers("numberOfGuests", pView);
	};

	var ctrlConfirm = function(event) {
		if(pModel.getTotalMenuPrice() <= 0){
			console.log("totalPrice 0")
			return;
		}
		pModel.notifyObservers("dinnerConfirm", pView);
	};

	var ctrlToggle = function(event){
		var btnGuest = pView.find('#iBtnGuest');
		if(btnGuest.hasClass("d-none")){
			btnGuest.removeClass("d-none")
		} else {
			btnGuest.addClass("d-none");
		}
		
		var orderDishes = pView.find("#iOrderDishes");
		if(orderDishes.hasClass("d-none")){
			orderDishes.removeClass("d-none")
		} else {
			orderDishes.addClass("d-none");
		}
		var btnConfirm = pView.find("#iBtnConfirm");
		if(btnConfirm.hasClass("d-none")){
			btnConfirm.removeClass("d-none")
		} else {
			btnConfirm.addClass("d-none");
		}
		// $(this).toggleClass("on");
		// $("#iOrderDishes").slideToggle();
	}

	var orderView = function(dishName, totalPrice){
	return `<div class="d-flex">
			<div class="col-xs-3 mr-auto p-2">
				${dishName}
			</div>
			<div class="col-xs-3 ml-auto p-2">
				${totalPrice}
			</div>
			</div>`;
	};

	this.clear = function(){
		pView.empty();
	}

	this.show = function(){
		console.log(pView);
		pView[0].innerHTML = `
		      	<div class="container align-items-center">
		      		<div class="d-flex align-items-center justify-content-between">
		      			<span class="align-middle text-left h2">My Dinner</span>
		      			<div class="d-block d-sm-none text-right align-items-center" id="iTotalPrice">SEK 0.00</div>
		      			<div id="iToggle" class="d-block d-sm-none">
						  <div class="one"></div>
						  <div class="two"></div>
						  <div class="three"></div>
						</div>
		      		</div>
					<div class="d-none d-sm-block" id="iBtnGuest">
					    <div class="h4">People: <span id="numberOfGuests" class="mr-sm-3">${pModel.getNumberOfGuests()}</span>
					    <div class="btn-group">
					    	<button id="iMinusGuest" class="btn btn-secondary">-</button>
					    	<button id="iPlusGuest" class="btn btn-secondary">+</button>
					    </div>
						</p>
					</div>
		      	</div>

		      	<!-- dinner overview panel-->
				
					<div class="d-none d-sm-block bg-light text-dark border" id="iOrderDishes">
						
					</div>
				<p class="d-none d-sm-block text-right mt-2" id="iTotalPrice">SEK 0.00</p>
				<div class="d-inline-flex">
					<button id="iBtnConfirm" class="d-none d-sm-block btn btn-warning btn-lg btn-block mt-2">Confirm Dinner</button>
				</div>
			`;
		this.update();
		this.ctrlInitialize();
	}
	
	this.update = function(){
		var orderDishes = pView.find("#iOrderDishes");
		
		orderDishes.empty();
		// orderDishes.append(`<div class="col text-left m-1">
		// 					Dish Name
		// 				</div>
		// 				<div class="col text-right m-1">
		// 					Cost
		// 				</div>`)
		orderDishes.append(orderView("Dish Name", "Cost"))
		var currentDishes = pModel.getCurrentDishes();
		// btnConfirm.addAttr("disabled");
		if( typeof currentDishes !== "undefined"){
			currentDishes.forEach(function(dish){
				orderDishes.append(orderView(dish[0], dish[1].toFixed(2)));
			})
		}
		var totalPrice = pView.find("#iTotalPrice");
		
		totalPrice[0].innerHTML = "SEK " + pModel.getTotalMenuPrice();
	}

}



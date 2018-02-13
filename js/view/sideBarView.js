var SideBarView = function (pView, pModel) {

	this.ctrlInitialize = function(){
		var btnGuest = pView.find('#iBtnGuest:not(.bound)');
		btnGuest.addClass('bound').on('click', ctrlGuestView.bind(this));

		var btnConfirm = pView.find("#iBtnConfirm:not(.bound)");
		btnConfirm.addClass('bound').on("click", ctrlConfirm.bind(this));
		// btnCreate.addEventListener('click', this.ctrlCreateNewDinner);
		// this.penguinView.onClickGetPenguin = this.onClickGetPenguin.bind(this);
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
		// get the current total price and convert to float
		// var totalPrice = parseFloat(pView.find("#iTotalPrice").html());
		if(pModel.getTotalMenuPrice() <= 0){
			console.log("totalPrice 0")
			return;
		}
		pModel.notifyObservers("dinnerConfirm", pView);
	};

	var orderView = function(dishName, totalPrice){
	return `<div class="row">
			<div class="col text-left m-1">
				${dishName}</div>
			<div class="col text-right m-1">
				${totalPrice.toFixed(2)}</div>
			</div>`;
	};

	this.clear = function(){
		pView.empty();
	}

	this.show = function(){
		console.log(pView);
		pView[0].innerHTML = `
		      	<div class="container align-items-center">
		      		<div class="row">
		      			<span class="align-middle text-left h2">My Dinner</span>
		      		</div>
					<div class="row" id="iBtnGuest">
					    <p>People: <span id="numberOfGuests">${pModel.getNumberOfGuests()}</span>
					    <div class="btn-group">
					    	<button id="iMinusGuest" class="btn btn-secondary">-</button>
					    	<button id="iPlusGuest" class="btn btn-secondary">+</button>
					    </div>
						</p>
					</div>
		      	</div>

		      	<!-- dinner overview panel-->
				<nav class="collapse.show text-center">
					<div class="row bg-light text-dark border" id="iOrderDishes">
						
					</div>
				</nav>
				<p class="text-right mt-2" id="iTotalPrice">SEK 0.00</p>
				<button id="iBtnConfirm" class="btn btn-secondary btn-lg btn-block mt-2">Confirm Dinner</button>
			`;
		this.update();
		this.ctrlInitialize();
	}
	
	this.update = function(){
		var orderDishes = pView.find("#iOrderDishes");
		
		orderDishes.empty();
		orderDishes.append(`<div class="col text-left m-1">
							Dish Name
						</div>
						<div class="col text-right m-1">
							Cost
						</div>`)
		var currentDishes = pModel.getCurrentDishes();
		if( typeof currentDishes !== "undefined"){
			currentDishes.forEach(function(dish){
				orderDishes.append(orderView(dish[0], dish[1]));
			})
		}
		var totalPrice = pView.find("#iTotalPrice");
		
		totalPrice[0].innerHTML = "SEK " + pModel.getTotalMenuPrice();
	}
	// var numberOfGuests = container.find("#numberOfGuests");
	// numberOfGuests.html(3); 

	// var orderTableView = container.find("#orderTableView");

	// var totalPrice = 18;

	// orderTableView.append(orderView("Sourdough Starter", 18));

	// var totalPriceView = container.find("#totalPriceView");

	// totalPriceView.html(" "+totalPrice.toFixed(2))

}



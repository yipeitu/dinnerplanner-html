var SideBarView = function (pView, pModel) {

	this.ctrlInitialize = function(){
		var btnGuest = pView.find('#iBtnGuest');
		btnGuest.on('click', ctrlGuestView.bind(this));

		var btnConfirm = pView.find("#iBtnConfirm");
		btnConfirm.on("click", ctrlConfirm.bind(this));
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
		this.update();
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
		pView.innerHTML = `<div class="col-12 col-md-3 col-xl-2 py-md-3 bd-sidebar" id="iSideBarView">
		      	<!-- side bar -->
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
						<div class="col text-left m-1">
							Dish Name
						</div>
						<div class="col text-right m-1">
							Cost
						</div>
					</div>
				</nav>
				<p class="text-right mt-2">SEK <span id="iTotalPrice">SEK 0.00</span></p>
					<button id="iBtnConfirm" class="btn btn-secondary btn-lg btn-block mt-2">Confirm Dinner</button>
			</div>`;
		this.update();
		this.ctrlInitialize();
	}
	
	this.update = function(){
		var orderDishes = pView.find("#iOrderDishes");
		var currentDishes = pModel.getCurrentDishes();
		if( typeof currentDishes !== "undefined"){
			currentDishes.forEach(function(dish){
				orderDishes.append(orderView(dish[0], dish[1]));
			})
		}
		var totalPrice = pView.find("#iTotalPrice");
		totalPrice.innerHTML = "SEK " + pModel.getTotalMenuPrice();
	}
	// var numberOfGuests = container.find("#numberOfGuests");
	// numberOfGuests.html(3); 

	// var orderTableView = container.find("#orderTableView");

	// var totalPrice = 18;

	// orderTableView.append(orderView("Sourdough Starter", 18));

	// var totalPriceView = container.find("#totalPriceView");

	// totalPriceView.html(" "+totalPrice.toFixed(2))

}



var DishDetailsView = function (pView, pModel) {
	
	var dishImgData = function(dish){
		return`<figure class="figure">
				<img src="images/${dish.image}" class="figure-img img-fluid img-thumbnail m-2">
				<figcaption class="figure-caption text-center">${dish.description}</figcaption></figure>`;
	}

	var ingredientView = function(numberOfGuests, number, unit, ingredient, price){
		return `<div class="row m-1">
		<div class="col-4 text-left">
			${(numberOfGuests * number).toFixed(2)} unit
		</div>
		<div class="col-5 text-left"> 
			${ingredient}
		</div>
		<div class="col-1 text-center">SEK</div><div class="col-2 text-right">
			${(numberOfGuests * price).toFixed(2)}
		</div></div>`;
	}

	var numberOfGuestsUpdate = function(number){
		var numberOfGuestsView = pView.find("#iNumberOfGuests");
		numberOfGuestsView[0].innerHTML = "INGREDIENTS FOR "+ number + " PEOPLE";
	}

	this.ctrlInitialize = function(){
		
		var btnBack = pView.find('#iBtnBackToSearch:not(.bound)');
		btnBack.addClass('bound').on('click', ctrlBackToSearch);

		var btnAdd = pView.find('#iAddToMenu:not(.bound)');
		btnAdd.addClass('bound').on('click', ctrlAddToMenu.bind(this));
		
	}

	var ctrlBackToSearch = function(event){
		pModel.notifyObservers("backToSearch", pView);
	}

	var ctrlAddToMenu = function(event){
		pModel.addDishToMenu(this.dish.id);
		pModel.notifyObservers("addToMenu", pView);
	}

	this.update = function(){
		var dishView = pView.find("#iDishName");
		var dishImg = pView.find("#iDishImg");
		this.dish = pModel.getDish(pModel.getDishId());

		dishView[0].innerHTML = this.dish.name;
		dishImg[0].innerHTML = dishImgData(this.dish);

		var ingredientTable = pView.find("#iIngredientTable");

		var numberOfGuests = pModel.getNumberOfGuests();
		if(numberOfGuests == 0) numberOfGuests = 1;
		numberOfGuestsUpdate(numberOfGuests);
		
		var pTotalPrice = 0;
		this.dish.ingredients.forEach(function(ingredient){
			pTotalPrice += (numberOfGuests * ingredient.price);
			ingredientTable.append(ingredientView(numberOfGuests, ingredient.quantity,
			ingredient.unit, ingredient.name, ingredient.price))
		})

		var ingredientsPrice = pView.find("#iIngredientsPrice");
		ingredientsPrice.html(pTotalPrice.toFixed(2));
	}

	this.clear = function(){
		pView.empty();
	}

	this.show = function(){
		pView[0].innerHTML = `<div class="container-fluid">
			     	<div class="row">
			     	<div class="col">
			     		<div class="row m-1" id="iDishName">

			     		</div>
			     		<div class="row m-1" id="iDishImg">
			     			
			     		</div>
			     		<div class="row m-1">
			     			<button id="iBtnBackToSearch" class="btn btn-warning btn-lg btn-array-left">back to search</button>
			     		</div>
			     	</div>
			     	<div class="col border border-dark m-1" style="background-color: yellow">
			     		<div class="row m-1" id="iNumberOfGuests">
			     			INGREDIENTS FOR 1 PERSON
			     		</div>
			     		<hr style="width: 100%; height: 1px; background-color:black;" />
			     		<div id="iIngredientTable">
			     		</div>
			     		<hr style="width: 100%; height: 1px; background-color:black;" />
			     		<div class="row m-1">
			     			<div class="col-9 text-left">
		    					<button id="iAddToMenu" class="btn btn-warning btn-lg">add to menu</button>
		    				</div>
		    				<div class="col-1 text-center">
		    					SEK
		    				</div>
		    				<div class="col-2 text-right" id="iIngredientsPrice">
		    					0.00
		    				</div>
			     		</div>
			     	</div>
			     	</div>
			     	<div class="col-12">
			     		<h1>PREPARATION</h1>
			     	</div>
			     </div>`;
		this.update();
		this.ctrlInitialize();
	}
}




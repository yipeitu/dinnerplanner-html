var DishDetailsView = function (pView, pModel) {
	
	this.btnBack = pView.find('#iBtnBackToSearch');
	
	this.btnAdd = pView.find('#iAddToMenu');

	this.dish = pModel.getCurrentDish();

	var dishImgData = function(dish){
		return`<figure class="figure">
				<div class="figure-img img-fluid img-thumbnail m-2 csImgDetail" style="background-image: url('images/${dish.image}')"></div>
				<figcaption class="figure-caption text-left">${dish.description}</figcaption></figure>`;
	}

	var ingredientView = function(numberOfGuests, number, unit, ingredient, price){
		return `<div class="d-flex m-1">
		<div class="mr-auto text-left">
			${(numberOfGuests * number).toFixed(2)+" "+unit}
		</div>
		<div class="mr-auto"> 
			${ingredient}
		</div>
		<div class="ml-auto">SEK</div><div class="text-right">
			${(numberOfGuests * price).toFixed(2)}
		</div></div>`;
	}

	var numberOfGuestsUpdate = function(){
		var numberOfGuestsView = pView.find("#iNumberOfGuests");
		numberOfGuestsView[0].innerHTML = "INGREDIENTS FOR "+ pModel.getNumberOfGuests() + " PEOPLE";
	}

	this.update = function(updateCase){
		if(updateCase == "numberOfGuests"){
			var ingredientTable = pView.find("#iIngredientTable");
			ingredientTable.empty();
			var numberOfGuests = pModel.getNumberOfGuests();
			numberOfGuestsUpdate();
			
			var pTotalPrice = 0;
			this.dish.ingredients.forEach(function(ingredient){
				pTotalPrice += (numberOfGuests * ingredient.price);
				ingredientTable.append(ingredientView(numberOfGuests, ingredient.quantity,
				ingredient.unit, ingredient.name, ingredient.price))
			})

			var ingredientsPrice = pView.find("#iIngredientsPrice");
			ingredientsPrice.html(pTotalPrice.toFixed(2));
		}
	}

	this.show = function(){
		var dishView = pView.find("#iDishName");
		var dishImg = pView.find("#iDishImg");
		this.dish = pModel.getCurrentDish();

		dishView[0].innerHTML = this.dish.name;
		dishImg[0].innerHTML = dishImgData(this.dish);

		this.update("numberOfGuests");
		pView.show();
	}

	this.hide = function(){
		pView.hide();
	}

	pModel.addObserver(this);
}




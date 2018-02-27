var DishDetailsView = function (pView, pModel) {
	
	this.btnBack = pView.find('#iBtnBackToSearch');
	
	this.btnAdd = pView.find('#iAddToMenu');

	// this.dish = pModel.getCurrentDish();

	this.loading = pView.find("#loadingDetails");

	var dishImgData = function(dish){
		if(dish.description==""){
			return`<figure class="figure">
				<div class="figure-img img-fluid img-thumbnail m-2 csImgDetail" style="background-image: url('${dish.image}')"></div>
				<figcaption class="figure-caption text-left" id="description"><div class="loader"></div></figcaption></figure>`;
		} else{
			return`<figure class="figure">
				<div class="figure-img img-fluid img-thumbnail m-2 csImgDetail" style="background-image: url('${dish.image}')"></div>
				<figcaption class="figure-caption text-left" id="description">${dish.description}</figcaption></figure>`;
		}
	}

	var ingredientView = function(numberOfGuests, number, unit, ingredient, price){
		return `<div class="d-flex m-1">
		<div class="mr-auto text-left">
			${(numberOfGuests * number).toFixed(2)+" "+unit}
		</div>
		<div class="text-right"> 
			${ingredient}
		</div>
		</div>`;
		// return `<div class="d-flex m-1">
		// <div class="mr-auto text-left">
		// 	${(numberOfGuests * number).toFixed(2)+" "+unit}
		// </div>
		// <div class="mr-auto"> 
		// 	${ingredient}
		// </div>
		// <div class="ml-auto">SEK</div><div class="text-right">
		// 	${(numberOfGuests * price).toFixed(2)}
		// </div>
		// </div>`;
	}

	var numberOfGuestsUpdate = function(){
		var numberOfGuestsView = pView.find("#iNumberOfGuests");
		numberOfGuestsView[0].innerHTML = "INGREDIENTS FOR "+ pModel.getNumberOfGuests() + " PEOPLE";
	}

	this.callback = function(data, dishId){
		pModel.dishDetailUpdate(data[0], dishId);
	}

	this.error = function(error){
		pView.find("#loadingDetails").hide();
		pView.find("#description").hide();
		pView.find("#errorDetails").show();
	}

	this.update = function(updateCase){
		if(updateCase == "numberOfGuests" || updateCase == "dishDetailUpdate"){
			var ingredientTable = pView.find("#iIngredientTable");
			ingredientTable.empty();
			var numberOfGuests = pModel.getNumberOfGuests();
			numberOfGuestsUpdate();
			
			var dish = pModel.getCurrentDish(this.callback, this.error);
			var pTotalPrice = 0;
			if(dish.ingredients.length !== 0){
				pView.find("#loadingDetails").hide();
				dish.ingredients.forEach(function(ingredient){
				pTotalPrice += (numberOfGuests * ingredient.price);
				ingredientTable.append(ingredientView(numberOfGuests, ingredient.quantity,
				ingredient.unit, ingredient.name, ingredient.price))
				})

				var ingredientsPrice = pView.find("#iIngredientsPrice");
				ingredientsPrice.html(pTotalPrice.toFixed(2));
				
				var description = pView.find("#description");
				description.html(dish.description);

				pView.find("#loadingDetails").hide();
				pView.find("#description").hide();
				ingredientTable.show();
			} else {
				pView.find("#loadingDetails").show();
				pView.find("#description").show();
				ingredientTable.hide();
				return;
			}

		}
	}

	this.show = function(){
		var dishView = pView.find("#iDishName");
		var dishImg = pView.find("#iDishImg");
		var dish = pModel.getCurrentDish(this.callback, this.error);

		dishView[0].innerHTML = dish.name;
		dishImg[0].innerHTML = dishImgData(dish);

		this.update("numberOfGuests");
		pView.find("#loadingDetails").show();
		pView.find("#description").show();
		pView.find("#errorDetails").hide();
		pView.show();
	}

	this.hide = function(){
		pView.hide();
	}

	pModel.addObserver(this);
}




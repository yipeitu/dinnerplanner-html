var DinnerOverView = function (pView, pModel) {

	this.btnPrint = pView.find('#iResultPrintout');

	this.update = function(updateCase){
		if(updateCase == "numberOfGuests" || updateCase == "addDishToMenu"){
			var imageResult = pView.find("#iResultImage");
			imageResult.empty();
			var currentDishes = pModel.getCurrentDishes();
			if( typeof currentDishes !== "undefined"){
				currentDishes.forEach(function(dish){
					imageResult.append(`<figure class="figure m-4 my-xs-2 ml-xs-1">
							  <div class="figure-img img-fluid rounded csImg" style="background-image: url('${dish[2]}')"></div>
				              <figcaption class="figure-caption text-center">${dish[0].slice(0, 23)+"..."}</figcaption>
				              <p class="text-right">${dish[1].toFixed(2)+" SEK"}</p>
				            </figure>`);
				})
			}
			var finalPrice = pView.find("#iFinalPrice");
			finalPrice[0].innerHTML = pModel.getTotalMenuPrice();
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


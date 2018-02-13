var DinnerOverView = function (pView, pModel) {

	this.ctrlInitialize = function(){
		var btnCreate = pView.find('#iResultPrintout:not(.bound)');
		btnCreate.addClass('bound').on('click', ctrlPrintout.bind(this));
	}

	var ctrlPrintout = function(){
		pModel.notifyObservers("printOut", pView);
	}

	this.clear = function(){
		pView.empty();
	}

	this.show = function(){
		pView[0].innerHTML = `<div class="col-10" id="iResultImage">
			            
			        </div>
			        <div class="col-2 text-left border-left border-dark">
			            <p>Total:</p>
			            <p>${pModel.getTotalMenuPrice() + " SEK"}</p>
			        </div>
			        <hr style="width: 100%; height: 1px; background-color:black;" />

					<div class="row">
				        <div class="col text-center">
							<button id="iResultPrintout" class="btn btn-warning btn-lg ">Print Full Receipe</button>
				        </div>
					</div>`;
		var imageResult = pView.find("#iResultImage");
		var currentDishes = pModel.getCurrentDishes();
		if( typeof currentDishes !== "undefined"){
			currentDishes.forEach(function(dish){
				imageResult.append(`<figure class="figure m-lg-3">
			              <img src="images/${dish[2]}" class="figure-img img-fluid rounded" alt="A generic square placeholder image with rounded corners in a figure.">
			              <figcaption class="figure-caption text-center">${dish[0]}</figcaption>
			              <p class="text-right">${dish[1].toFixed(2)+" SEK"}</p>
			            </figure>`);
			})
		}
		this.ctrlInitialize();
	}
}


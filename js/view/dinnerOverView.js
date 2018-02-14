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
		pView[0].innerHTML = `
					<div class="d-flex justify-content-around">
						<div class="row flex-xl-nowrap justify-content-center" id="iResultImage">
				            
				        </div>
				        <div class="d-flex align-items-center text-left border-left border-dark">
				            <div class="ml-2">
					            <div class="h5">Total:</div>
					            <div class="h5">${pModel.getTotalMenuPrice() + " SEK"}</div class="h5">
					        </div>
				        </div>
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
				imageResult.append(`<figure class="figure m-4 my-xs-2 ml-xs-1">
						  <div class="figure-img img-fluid rounded csImg" style="background-image: url('images/${dish[2]}')"></div>
			              <figcaption class="figure-caption text-center">${dish[0]}</figcaption>
			              <p class="text-right">${dish[1].toFixed(2)+" SEK"}</p>
			            </figure>`);
			})
		}
		this.ctrlInitialize();
	}
}


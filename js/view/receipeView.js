var ReceipeView = function (pView, pModel) {
	
	this.clear = function(){
		pView.empty();
	}

	this.show = function(){
		pView[0].innerHTML = `<div class="container-fluid" id="iPrintout"></div>`;
		var printOut = pView.find("#iPrintout");
		var currentDishes = pModel.getCurrentDishes();
		if( typeof currentDishes !== "undefined"){
			currentDishes.forEach(function(dish){
				printOut.append(`<div class="row">
          <div class="col-6">
            <div class="row">
              <div class="col-auto">
                <img src="images/${dish[2]}" class="figure-img img-fluid rounded">
              </div>
              <div class="col">
                <h1>${dish[0]}</h1>
                <p>${dish[3]}</p>
              </div>
            </div>

          </div>

          <div class="col-6">
            <h3>
              Preparation
            </h3>
            <p>
              ${dish[3]}
            </p>
          </div>
        </div>
      </div>`);
			})
		}
	}
}


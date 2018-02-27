var ReceipeView = function (pView, pModel) {

  this.update = function(updateCase){
    if(["numberOfGuests", "addToMenu", "removeDishFromMenu"].indexOf(updateCase) !== -1){
      var printOut = pView.find("#iPrintout");
      printOut.empty();
      var currentDishes = pModel.getCurrentDishes();
      if( typeof currentDishes !== "undefined"){
        currentDishes.forEach(function(dish){
          printOut.append(`
            <div class="row flex-xl-nowrap justify-content-between">
              <div class="row flex-xl-nowrap">
                <div class="d-flex justify-content-center">
                    <div class="figure-img img-fluid rounded csImgReceipe" style="background-image: url('${dish[2]}')"></div>
                </div>
                <div class="ml-2 d-flex flex-column">
                  <div class="h3">${dish[0]}</div>
                  <p>${dish[3]}</p>
                </div>
              </div>

              <div class="ml-3 col-sm-6 flex-column">
                <div class="h5">
                  Preparation
                </div>
                <p>
                  ${dish[3]}
                </p>
              </div>
            </div>`);
        })
      }
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


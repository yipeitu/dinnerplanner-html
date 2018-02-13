var SelectDishView = function (pView, pModel) {

	var pSearchType = "all";
	

	var dropDownType = function(typeName){
		return `<a class="dropdown-item" href="#">${typeName}</a>`;
	}

	var dishTagWithName = function(id, name, img){
		// could i set the id on <figure>?
		return `<figure class="figure">
					<img src="images/${img}" class="figure-img img-fluid img-thumbnail m-2" id=iDish_${id}>
					<figcaption class="figure-caption text-center">${name}</figcaption>
				</figure>`;
	}

	var appendDishImage = function(imageMenu, dishes){
		dishes.forEach(function(dish){
			imageMenu.append(dishTagWithName(dish.id, dish.name, dish.image));
		})
	}

	var updateDishes = function(keyWord){
		// get all dishes
		var imageMenu = pView.find("#iImageMenu")
		imageMenu.empty();

		var dishes = pModel.getAllDishes(pSearchType, keyWord);
		if(pSearchType != "all" && keyWord.length == 0){
			dishes = pModel.getSelectedDish(pSearchType);
		}
		else if(keyWord.length == 0 && keyWord == "all"){
			dishes = pModel.getFullMenu();
		}
		appendDishImage(dishes);
	}

	
	var ctrlInitialize = function(){
		var menuDropDown = pView.find('#iMenuDropDown');
		menuDropDown.on("click", ctrlDropDown);

		var btnSearch = pView.find("#iBtnSearch");
		btnSearch.on("click", ctrlSearch);

		var imageMenu = pView.find("#iImageMenu");
		imageMenu.on("click", ctrlImage);
	}

	var ctrlDropDown = function(event){
		var btnDropDown = pView.find("#iBtnDropDown");
		btnDropDown[0].innerHTML = event.target.innerText;
		pSearchType = btnDropDown[0].innerHTML;
	}

	var ctrlSearch = function(event){
		var keyWord = pView.find("#iKeyWord").val();
		updateDishes(keyWord);
	}

	var ctrlImage = function(event){
		if(pModel.setDishId(event.target.id.split("_")[1])){
			pModel.notifyObservers("dishDetails", pView);
		}
	}

	this.clear = function(){
		pView.empty();
	}

	this.show = function(){
		pView[0].innerHTML = `<div>
			    	<section class="text-center mb-5">
				      <div class="container">
				        <div class="text-left" style="font-size:2em">FIND A DISH</div>
				        <div class="row-fluid d-flex align-middle align-items-center">
				        	<div class="mr-3">
				      			<label class="sr-only" for="enterKeyWords">EnterKeyWords</label>
		      					<input type="text" id="iKeyWord" placeholder="Enter key word">
			      			</div>
				      		<div class="mr-3">
							  <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
							    <span id="iBtnDropDown">all</span>
							  </button>
							  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="iMenuDropDown">
							    <a class="dropdown-item" href="#">all</a>
							  </div>
							</div>
							<div class="mr-3">
			      				<button id="iBtnSearch" class="btn btn-warning btn-md ">search</button>
			      			</div>
				        </div>
				      </div>
				    </section>
			      	<div class="container text-center text-lg-left" id="iImageMenu">
			      	</div>
			     </div>`;
		this.imageMenu = pView.find("#iImageMenu");
		
		var dropDownMenu = pView.find("#iMenuDropDown");
		// get all types
		pModel.getAllDishTypes().forEach(function(typeName){
			dropDownMenu.append(dropDownType(typeName));
		})
		// get all dishes
		appendDishImage(this.imageMenu, pModel.getFullMenu());
		ctrlInitialize();
	}
	
}




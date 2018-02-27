var SelectDishView = function (pView, pModel) {

	this.menuDropDown = pView.find('#iMenuDropDown');
	
	this.btnSearch = pView.find("#iBtnSearch");
	
	this.imageMenu = pView.find("#iImageMenu");
	
	this.keyWord = pView.find("#iKeyWord");

	this.searchType = pView.find("#iBtnDropDown");

	this.loading = pView.find("#loadingReceipe");

	var dropDownType = function(typeName){
		return `<a class="dropdown-item" href="#">${typeName}</a>`;
	}

	var dishTagWithName = function(id, name, img){
		return `<figure class="figure">
					<div class="img img-fluid img-thumbnail m-2 csImg" id=iDish_${id} style="background-image: url('${img}')"></div>
					<figcaption class="figure-caption text-center">${name.slice(0, 18)+"..."}</figcaption>
				</figure>`;
	}

	var appendDishImage = function(imageMenu, dishes){
		dishes.forEach(function(dish){
			imageMenu.append(dishTagWithName(dish.id, dish.name, dish.image));
		})
	}

	this.callback = function(data, type){
		pModel.dishesUpdate(data, type);
	}

	this.error = function(error){
		pView.find("#loadingReceipe").hide();
		pView.find("#errorReceipe").show();
	}

	this.update = function(updateCase){
		if(updateCase == "setDishId"){
			console.log("setDishId");
		}
		else if(updateCase == "search"){
			var btnDropDown = pView.find("#iBtnDropDown");
			btnDropDown[0].innerHTML = pModel.getSearchType();
			var imageMenu = pView.find("#iImageMenu")
			imageMenu.empty();
			var dishes = pModel.getFilterDishes();
			appendDishImage(imageMenu, dishes);
		}
		else if(updateCase == "searchType"){
			var btnDropDown = pView.find("#iBtnDropDown");
			btnDropDown[0].innerHTML = pModel.getSearchType();
		}
		else if(updateCase == "dishesUpdate"){
			this.imageMenu.empty();
			appendDishImage(this.imageMenu, pModel.getFullMenu());
			this.loading.hide();
			this.imageMenu.show();
		}
	}

	this.show = function(){
		var dropDownMenu = pView.find("#iMenuDropDown");
		dropDownMenu.empty();
		var dishTypes = pModel.getAllDishTypes();
		dishTypes.forEach(function(typeName){
			dropDownMenu.append(dropDownType(typeName));
			if(typeName != "all") pModel.getAllDishes(typeName, "", this.callback, this.error);
		}, this);
		pView.find("#loadingReceipe").show();
		pView.find("#errorReceipe").hide();
		pView.show();
	}

	this.hide = function(){
		pView.hide();
	}

	pModel.addObserver(this);
}




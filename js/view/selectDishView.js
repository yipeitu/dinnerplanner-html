var SelectDishView = function (pView, pModel) {

	this.menuDropDown = pView.find('#iMenuDropDown');
	
	this.btnSearch = pView.find("#iBtnSearch");
	
	this.imageMenu = pView.find("#iImageMenu");
	
	this.keyWord = pView.find("#iKeyWord");

	this.searchType = pView.find("#iBtnDropDown");

	var dropDownType = function(typeName){
		return `<a class="dropdown-item" href="#">${typeName}</a>`;
	}

	var dishTagWithName = function(id, name, img){
		return `<figure class="figure">
					<div class="img img-fluid img-thumbnail m-2 csImg" id=iDish_${id} style="background-image: url('images/${img}')"></div>
					<figcaption class="figure-caption text-center">${name}</figcaption>
				</figure>`;
	}

	var appendDishImage = function(imageMenu, dishes){
		dishes.forEach(function(dish){
			imageMenu.append(dishTagWithName(dish.id, dish.name, dish.image));
		})
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
	}

	this.show = function(){
		var dropDownMenu = pView.find("#iMenuDropDown");
		dropDownMenu.empty();
		var dishTypes = ["all"].concat(pModel.getAllDishTypes());
		dishTypes.forEach(function(typeName){
			dropDownMenu.append(dropDownType(typeName));
		})
		this.imageMenu.empty();
		// get all dishes
		appendDishImage(this.imageMenu, pModel.getFullMenu());
		pView.show();
	}

	this.hide = function(){
		pView.hide();
	}

	pModel.addObserver(this);
}




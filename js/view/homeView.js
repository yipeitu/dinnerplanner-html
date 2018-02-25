var HomeView = function (pView, pModel) {

	this.iCreateNewDinner = pView.find('#iCreateNewDinner');

	this.update = function(){
		this.show();
	}

	this.show = function(){
		pView.show();
	}

	this.hide = function(){
		pView.hide();
	}
}


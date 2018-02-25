var StatusView = function (pView, pModel) {

	this.btnBack = pView.find('#iResultBackToSearch');

	this.update = function(updateCase){
		if(updateCase == "numberOfGuests"){
			var numberOfGuests = pView.find("#iNumberOfGuests");
			numberOfGuests[0].innerHTML = pModel.getNumberOfGuests();
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



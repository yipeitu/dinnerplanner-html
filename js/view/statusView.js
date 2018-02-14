var StatusView = function (pView, pModel) {

	this.ctrlInitialize = function(){
		var btnBack = pView.find('#iResultBackToSearch:not(.bound)');
		btnBack.addClass('bound').on('click', ctrlBack);
	}

	var ctrlBack = function(event) {
		pModel.notifyObservers("backToSearch", pView);
	};

	this.clear = function(){
		pView.empty();
	}

	this.show = function(){
		pView[0].innerHTML = ` <div class="h2">
			          My Dinner: ${pModel.getNumberOfGuests()} people
			        </div>
			        <div class="col text-right">
			          <button id="iResultBackToSearch" class="btn btn-warning btn-lg btn-array-left">back to search</button>
			        </div>`;
		this.ctrlInitialize();
	}

}



var HomeView = function (pView, pModel) {
	
	// var pView = view;
	// var pModel = model;

	this.ctrlInitialize = function(){
		var btnCreate = pView.find('#iCreateNewDinner');
		btnCreate.on('click', ctrlCreateNewDinner.bind(this));
		// btnCreate.addEventListener('click', this.ctrlCreateNewDinner);
		// this.penguinView.onClickGetPenguin = this.onClickGetPenguin.bind(this);
	}

	var ctrlCreateNewDinner = function(event){
		pModel.notifyObservers("selectDish", pView);
	}

	this.clear = function(){
		pView.empty();
	}

	this.show = function(){
		pView.innerHTML = `<div class="d-none d-sm-block p-5"></div>
			<div class="text-center">
				<p class="mt-5 mb-5 ml-1 mr-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
			</div>
			<div class="d-none d-sm-block p-5"></div>
			<div class="text-center">
				<button id="iCreateNewDinner" class="btn btn-warning btn-lg">Create new dinner</button>
			</div>`;
	}
}


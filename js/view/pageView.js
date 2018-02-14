var PageView = function (pView, pModel) {
	
	this.clear = function(){
		pView.attr("hidden", "true");
	}

	this.show = function(){
		pView.removeAttr('hidden');
		this.update();
	}

	this.update = function(){
		pView.innerHTML = `<div class="row flex-xl-nowrap">
					<div class="col-sm-4 bd-sidebar" id="iSideBarView">
				      	
					</div>
				    <main class="col-sm-8 bd-content" id="iMainView">
				    	
				    </main>
				</div>`;
	}
}


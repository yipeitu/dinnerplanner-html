var ResultView = function (pView, pModel) {
	
	this.clear = function(){
		pView.attr("hidden", "true");
	}

	this.show = function(){
		pView.removeAttr("hidden");
		this.update();
	}

	this.update = function(){
		pView.innerHTML = `<div class="d-flex justify-content-between" id="iStatusView">
			        
			    </div>
			    <hr style="width: 100%; height: 1px; background-color:black;" />
			    <div id="iOverView">
				    
				</div>`;
	}
}


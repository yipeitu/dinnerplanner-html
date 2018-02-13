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
					<div class="col-12 col-md-3 col-xl-2 py-md-3 bd-sidebar" id="iSideBarView">
				      	<div class="container align-items-center">
				      		<div class="row">
				      			<span class="align-middle text-left h2">My Dinner</span>
				      		</div>
							<div class="row" id="iBtnGuest">
							    <p>People: <span id="numberOfGuests">0</span>
							    <div class="btn-group">
							    	<button id="iMinusGuest" class="btn btn-secondary">-</button>
							    	<button id="iPlusGuest" class="btn btn-secondary">+</button>
							    </div>
								</p>
							</div>
				      	</div>
						<nav class="collapse.show text-center">
							<div class="row bg-light text-dark border" id="iOrderDishes">
								<div class="col text-left m-1">
									Dish Name
								</div>
								<div class="col text-right m-1">
									Cost
								</div>
							</div>
							<p class="text-right mt-2" id="iTotalPrice">SEK 0.00</p>
							<button id="iBtnConfirm" class="btn btn-secondary btn-lg btn-block mt-2">Confirm Dinner</button>
						</nav>
					</div>
				    <main class="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content" id="iMainView">
				    	<div>
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
					     </div>
				    </main>
				</div>`;
	}
}


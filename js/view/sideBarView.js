/** ExampleView Object constructor
 * 
 * This object represents the code for one specific view (in this case the Example view). 
 * 
 * It is responsible for:
 * - constructing the view (e.g. if you need to create some HTML elements procedurally) 
 * - populating the view with the data
 * - updating the view when the data changes
 * 
 * You should create a view Object like this for every view in your UI.
 * 
 * @param {jQuery object} container - references the HTML parent element that contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */ 
var SideBarView = function (container, model) {
	
	var numberOfGuests = container.find("#numberOfGuests");
	numberOfGuests.html(3); 

	var orderTableView = container.find("#orderTableView");

	var totalPrice = 0;

	orderTableView.append(orderView("Sourdough Starter", 18));

	var totalPriceView = container.find("#totalPriceView");

	totalPriceView.html(totalPrice.toFixed(2))

}

var orderView = function(dishName, totalPrice){
	return '<div class="row"><div class="col text-left m-1">' +
				dishName + '</div><div class="col text-right m-1">' +
				totalPrice.toFixed(2) + '</div></div>';
}

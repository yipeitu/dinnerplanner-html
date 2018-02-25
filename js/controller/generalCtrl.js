var GeneralController = function() {

    var pViews = [];
    var pScreens = {};
    
    var hideAll = function(){
        pViews.forEach(function(view){
            view.hide();
        });
    }
    
    this.addView = function(view){
        pViews.push(view);
    }

    this.addScreen = function(name, views) {
        pScreens[name] = views;
    }

    this.showScreen = function(name) {
        hideAll();
        for(var key in pScreens[name]){
            pScreens[name][key].show();
        }
    }
}
var FDOMA = function(){

};

FDOMA.prototype.properties = [
    "href"
];
var FDOMBuilder = function(selector){
    if(selector){
        this._rootElement = document.querySelector(selector);
    }
    else{
        this._rootElement = document.body;
    }
    this._currentElement = this._rootElement;
};

FDOMBuilder.prototype.child = function(elem){
    // Check element exists
    if(FDOMBuilder.elements[elem]){
        var domBuilderElement = new FDOMBuilder.elements[elem]();
        // Create element and anchor it to current element
        var child = document.createElement(elem);
        this._currentElement.appendChild(child);
        this._currentElement = child;
        // Add functionality to the current fluent API for the element working on
        this.setProperties(domBuilderElement);
    }
    else{
        throw "Element is not listed";
    }


};

FDOMBuilder.prototype.endChild = function(){
    if(this._currentElement == this._rootElement){
        throw "Cannot end child, your current element is root";
    }
    this._currentElement = this._currentElement.parentElement;
};

FDOMBuilder.prototype.setProperties = function(elementType){
    debugger;
    var properties = elementType.properties;
};

FDOMBuilder.elements = {
    "img": FDOMImg,
    "a": FDOMA,
    "div": FDOMDiv,
    "input": FDOMInput,
    "form": FDOMForm
};
var FDOMDiv = function(){

};
var FDOMForm = function(){

};
var FDOMImg = function(){

};
var FDOMInput = function(){

};
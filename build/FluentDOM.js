var FDOMA = function(){

};

FDOMA.prototype.properties = [
    "download",
    "href",
    "media",
    "target"
];
var FDOMDiv = function(){

};

FDOMDiv.prototype.properties = [
    "alt",
    "longdesc",
    "src"
];
var FDOMForm = function(){

};

FDOMForm.prototype.properties = [
    "action",
    "autocomplete",
    "method",
    "name",
    "novalidate",
    "target"
];
var FDOMImg = function(){

};

FDOMImg.prototype.properties = [
    "src"
];
var FDOMInput = function(){

};

FDOMInput.prototype.properties = [
    "autocomplete",
    "autofocus",
    "checked",
    "dirname",
    "disabled",
    "form",
    "formnovalidate",
    "name",
    "placeholder",
    "required",
    "readonly",
    "type",
    "value"
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
        // Unset previous current element properties
        var currentElementType = FDOMBuilder.elements[this._currentElement.nodeName.toLowerCase()];
        if(currentElementType){
            var currentElementBuilder = new FDOMBuilder.elements[this._currentElement.nodeName.toLowerCase()]();
            this.unsetProperties(currentElementBuilder);
        }
        // Retrieve new DOM element
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
    // Return builder
    return this;
};

FDOMBuilder.prototype.endChild = function(){
    if(this._currentElement == this._rootElement){
        throw "Cannot end child, your current element is root";
    }
    // Unset previous current element properties
    var currentElementType = FDOMBuilder.elements[this._currentElement.nodeName.toLowerCase()];
    if(currentElementType){
        var currentElementBuilder = new FDOMBuilder.elements[this._currentElement.nodeName.toLowerCase()]();
        this.unsetProperties(currentElementBuilder);
    }
    // Set new current element
    this._currentElement = this._currentElement.parentElement;
    // Set new current element properties
    var parentElementType = FDOMBuilder.elements[this._currentElement];
    if(parentElementType){
        var newElementBuilder = new parentElementType();
        this.setProperties(newElementBuilder);
    }
    // Return builder
    return this;
};

FDOMBuilder.prototype.setProperties = function(elementType){
    var properties = elementType.properties;
    for(var i in properties){
        var property = properties[i];
        this.setProperty(property);
    }
};

FDOMBuilder.prototype.setProperty = function(property){
    this[property] = function(value){
        if(value){
            this._currentElement[property] = value;
        }
        // Return builder after value asignament
        return this;
    };
};

FDOMBuilder.prototype.unsetProperties = function(elementType){
    var properties = elementType.properties;
    for(var i in properties){
        var property = properties[i];
        delete this[property];
    }
};

/* Common methods for any DOM element */
FDOMBuilder.prototype.id = function(value){
    if(value){
        this._currentElement.id = value;
    }
    // Return builder after value asignament
    return this;
};

FDOMBuilder.prototype.addClass = function(value){
    if(value){
        this._currentElement.className += value;
    }
    return this;
};

FDOMBuilder.prototype.removeClass = function(value){
    if(value){
        this._currentElement.className = this._currentElement.className.replace(value, "");
    }
    return this;
};

FDOMBuilder.prototype.title = function(value){
    this._currentElement.title = value;
    return this;
};

FDOMBuilder.prototype.css = function(property, value){
    //TODO split style attr and add/remove property/value
    this._currentElement.style = value;
    return this;
};

FDOMBuilder.prototype.text = function(value){
    this._currentElement.innerText = value;
    return this;
};

FDOMBuilder.elements = {
    "img": FDOMImg,
    "a": FDOMA,
    "div": FDOMDiv,
    "input": FDOMInput,
    "form": FDOMForm
};
/**
 * @fileoverview FDOMElements
 * @author Haritz medina
 * @license GPLv2
 *
 * @module com.haritzmedina.fluentdom.elements
 */

/**
 * Anchor element of DOM-API
 * @module com.haritzmedina.fluentdom.elements
 * @class FDOMA
 */
var FDOMA = function(){

};

/**
 * Anchor Tag element properties
 * @see http://www.w3schools.com/tags/tag_a.asp
 * @type {string[]}
 */
FDOMA.prototype.properties = [
    "download",
    "href",
    "media",
    "target"
];

/**
 * Div element of DOM-API
 * @module com.haritzmedina.fluentdom.elements
 * @class FDOMDiv
 */
var FDOMDiv = function(){

};

/**
 * Div Tag element properties
 * @see http://www.w3schools.com/tags/tag_div.asp
 * @type {string[]}
 */
FDOMDiv.prototype.properties = [
    "alt",
    "longdesc",
    "src"
];

/**
 * Form element of DOM-API
 * @module com.haritzmedina.fluentdom.elements
 * @class FDOMForm
 */
var FDOMForm = function(){

};

/**
 * Form Tag element properties
 * @see http://www.w3schools.com/tags/tag_form.asp
 * @type {string[]}
 */
FDOMForm.prototype.properties = [
    "action",
    "autocomplete",
    "method",
    "name",
    "novalidate",
    "target"
];

/**
 * Form element of DOM-API
 * @module com.haritzmedina.fluentdom.elements
 * @class FDOMInput
 */
var FDOMInput = function(){

};

/**
 * Input Tag element properties
 * @see http://www.w3schools.com/tags/tag_input.asp
 * @type {string[]}
 */
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

/**
 * Img element of DOM-API
 * @module com.haritzmedina.fluentdom.elements
 * @class FDOMImg
 */
var FDOMImg = function(){

};

/**
 * Img Tag element properties
 * @see http://www.w3schools.com/tags/tag_img.asp
 * @type {string[]}
 */
FDOMImg.prototype.properties = [
    "src"
];


/**
 * @fileoverview FDOMBuilder
 * @author Haritz medina
 * @license GPLv2
 *
 * @module com.haritzmedina.fluentdom
 */

/**
 * Fluent API to generate DOM elements
 * @class FDOMBuilder
 */

var FDOMBuilder = function(selector){
    if(selector){
        this._rootElement = document.querySelector(selector);
    }
    else{
        this._rootElement = document.body;
    }
    this._currentElement = this._rootElement;
};

/**
 * Create a child element giving its tag name
 * @param elem A tag name (see actually accepted values)
 * @see FDOMBuilder.elements
 * @returns {FDOMBuilder}
 */
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

/**
 * Close child element creation and return to its parentNode
 * @throws If the current node is the root node it cannot be closed
 * @returns {FDOMBuilder}
 */
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

/**
 * Set current element type functions to the builder wrapper
 * @param elementType
 */
FDOMBuilder.prototype.setProperties = function(elementType){
    var properties = elementType.properties;
    for(var i in properties){
        if(properties.hasOwnProperty(i)){
            var property = properties[i];
            this.setProperty(property);
        }
    }
};

/**
 * Set a property to the builder wrapper for the current element
 * @param property
 */
FDOMBuilder.prototype.setProperty = function(property){
    this[property] = function(value){
        if(value){
            this._currentElement[property] = value;
        }
        // Return builder after value asignament
        return this;
    };
};

/**
 * Unset properties of the current element to the builder
 * @param elementType
 */
FDOMBuilder.prototype.unsetProperties = function(elementType){
    var properties = elementType.properties;
    for(var i in properties){
        if(properties.hasOwnProperty(i)){
            var property = properties[i];
            delete this[property];
        }
    }
};

/* Common methods for any DOM element */

/**
 * Add id tag to the current element
 * @param value unique id
 * @returns {FDOMBuilder}
 */
FDOMBuilder.prototype.id = function(value){
    if(value){
        this._currentElement.id = value;
    }
    // Return builder after value asignament
    return this;
};

/**
 * Add class to the current element
 * @param value A class name
 * @returns {FDOMBuilder}
 */
FDOMBuilder.prototype.addClass = function(value){
    if(value){
        this._currentElement.className += value;
    }
    return this;
};

/**
 * Remove class to the current element
 * @param value A class name
 * @returns {FDOMBuilder}
 */
FDOMBuilder.prototype.removeClass = function(value){
    if(value){
        this._currentElement.className = this._currentElement.className.replace(value, "");
    }
    return this;
};

/**
 * Set a title to the current element
 * @param value A title string
 * @returns {FDOMBuilder}
 */
FDOMBuilder.prototype.title = function(value){
    this._currentElement.title = value;
    return this;
};

/**
 * Set a style property value
 * @param property Name of the property (eg. width, background-color)
 * @param value Value of the style property (eg. 200px, #FFFFFF)
 * @returns {FDOMBuilder}
 */
FDOMBuilder.prototype.css = function(property, value){
    this._currentElement.style[property] = value;
    return this;
};

/**
 * Add text content to the current element
 * @param value
 * @returns {FDOMBuilder}
 */
FDOMBuilder.prototype.text = function(value){
    this._currentElement.innerText = value;
    return this;
};

/**
 * Actually accepted DOM elements
 * @type {{img: FDOMImg, a: FDOMA, div: FDOMDiv, input: FDOMInput, form: FDOMForm}}
 */
FDOMBuilder.elements = {
    "img": FDOMImg,
    "a": FDOMA,
    "div": FDOMDiv,
    "input": FDOMInput,
    "form": FDOMForm
};
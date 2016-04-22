var FDOMBuilder = function(selector){
    this._rootElement = document.querySelector(selector);
};

FDOMBuilder.prototype.createElem = function(elem){
    var child = this._root.createElement(elem);
    this._root.appendChild(child);
};
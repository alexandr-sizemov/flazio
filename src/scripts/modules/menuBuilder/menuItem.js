var $ = require("jquery");
// var _ = require("underscore");

var MenuItem = function (parentId, order) {
	this.id = parentId + '-item-' + this.getRandomInt();
	this.order = order;
	this.label = 'ITEM';
	this.html = this.getHtml();
};

MenuItem.prototype.getHtml = function(){
	var item = $('<div/>',{
		id: this.id,
		class: 'menu-element'
	});
	
	$('<a/>', {
	    class: 'menu-item',
	    href: '#',
	    text: this.label
	}).appendTo(item);

	$('<input/>', {
		class: 'text-item hide',
		value: this.label
	}).appendTo(item);

	$('<span/>',{
		class: 'remove-item  hide'
	}).text('x').appendTo(item);

	return item;
};

MenuItem.prototype.setLabel = function(label){
	this.label = label;
	$('#' + this.id + ' > .menu-item').text(label);
};


MenuItem.prototype.getTextInputId = function(){
	return this.id + ' input';
};

MenuItem.prototype.getRemoveButtonId = function(){
	return this.id + ' .remove-item';
};

MenuItem.prototype.getRandomInt = function() {
	var min = 0,
		max = 100000000;
  	return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = MenuItem;
var $ = require("jquery");
var _ = require("lodash");
var MenuItem = require("./menuItem");

var MenuBuilder = function (id, containerId) {
	this.items = [];
	this.id = id;
	this.containerId = containerId;
	this.buildHtml();
};

MenuBuilder.prototype.addItem = function() {
	console.log('addItem');
	var newItem = new MenuItem(this.id, this.items.length);
	this.items.push(newItem);

	newItem.html.appendTo('#'+this.id)
		.on('dblclick', function(){
			$('#'+newItem.getTextInputId()).removeClass('hide');
			$('#'+newItem.getTextInputId()).focus();
		})
		.on('mouseenter', function(){
			$('#'+newItem.getRemoveButtonId()).removeClass('hide');
		})
		.on('mouseleave', function(){
			$('#'+newItem.getRemoveButtonId()).addClass('hide');
		});

	$('#'+newItem.getRemoveButtonId()).on('click',_.bind(function () {
		this.removeItem(newItem.id);
	},this));

	$('#'+newItem.getTextInputId())
		.on('keyup', function(event){
			if( event.which == 13 ) {
			    newItem.setLabel(this.value);
			    $('#'+newItem.getTextInputId()).addClass('hide');
			}
		})
		.focusout(function(){
			newItem.setLabel(this.value);
			$('#'+newItem.getTextInputId()).addClass('hide');
		});
	$('#' + this.id).sortable()
		.on('sortstop', _.bind(function(e, ui){
			this.sortItems(ui.item.context.id);
		},this));
};

MenuBuilder.prototype.sortItems = function(id) {
	var movedElement = _.remove(this.items,function(item){
		return item.id === id;
	});
	var index = null, i = 0;
	$('#' + this.id + ' .menu-element')
		.each(function(menuElement){
			if(menuElement.id === id){
				index = i;
			}
			i++;
		});
	this.items.splice(index,0, movedElement[0]);
};

MenuBuilder.prototype.removeItem = function(id) {
	_.remove(this.items,function(item){
		return item.id === id;
	});
	$('#'+id).remove();
};

MenuBuilder.prototype.buildHtml = function() {

	var alignLeft = $('<div/>',{
		class: 'align-left fa fa-align-left'
	}).on('click',_.bind(function(){
		$('#' + this.id).css('justify-content','flex-start');
	},this));
	var alignRight = $('<div/>',{
		class: 'align-right fa fa-align-right'
	}).on('click',_.bind(function(){
		$('#' + this.id).css('justify-content','flex-end');
	},this));
	var alignCenter = $('<div/>',{
		class: 'align-center fa fa-align-center'
	}).on('click',_.bind(function(){
		$('#' + this.id).css('justify-content','center');
	},this));
	var menuControls = $('<div/>',{
		class: 'menu-controls hide'
	});
	var addButton = $('<div/>',{
		class: 'add-item',
		text: '+'
	});
	var menuContainer = $('<div/>',{
		id: this.id,
		class: 'menu'
	})
	.on('mouseenter', function(){
		menuControls.removeClass('hide');
	})
	.on('mouseleave', function(){
		menuControls.addClass('hide');
	});

	addButton.appendTo(menuControls);
	alignLeft.appendTo(menuControls);
	alignCenter.appendTo(menuControls);
	alignRight.appendTo(menuControls);

	menuControls.appendTo(menuContainer);
	menuContainer.appendTo('#' + this.containerId);
		
	addButton.on('click',_.bind(function(){
		this.addItem();
	},this));

	$('#' + this.id).appendTo('#' + this.containerId);
};


MenuBuilder.prototype.getItems = function() {
	return this.items;
};
module.exports = MenuBuilder;
var $ = require("jquery");
var Quill = require("quill");
var _ = window._ =  require("lodash");

var templateUrl = '/scripts/modules/textEditorBuilder/template/editor.html'

var TextEditorBuilder = function (containerId) {
	this.linkExpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
	this.linkRegex = new RegExp(this.linkExpression);

	this.containerId = containerId;
	this.textToolbarId = 'text-editor-toolbar-' + this.getRandomInt();
	this.textBoxId = 'text-editor-box-' + this.getRandomInt();
	this.editor = null;

	this.loadEditor();
};

TextEditorBuilder.prototype.loadEditor = function() {
	$('#' + this.containerId).load(templateUrl,  _.bind( function(){
		$('#' + this.containerId + ' .toolbar').attr('id', this.textToolbarId);
		$('#' + this.containerId + ' .text-box-content').attr('id', this.textBoxId);

		this.editor = new Quill('#' + this.textBoxId, {
			modules: {
		    	'authorship': { authorId: 'galadriel', enabled: true },
		    	'multi-cursor': true,
		    	'toolbar': { container: '#' + this.textToolbarId },
				'link-tooltip': true
		  	},
		  	theme: 'snow'
		});
		this.enableLinkDetection();
		$('#'+this.textToolbarId).addClass('hide');

		$('#'+this.containerId).focusin(_.bind(function(){
			$('#'+this.textToolbarId).removeClass('hide');
		},this));

		$(document).mouseup(_.bind(function (e){
		    var container = $('#' + this.containerId);
		    if (!container.is(e.target) && container.has(e.target).length === 0){
		        $('#' + this.textToolbarId).addClass('hide');
		    }
		}, this));

	},this));
};

TextEditorBuilder.prototype.enableLinkDetection = function() {
	this.editor.on('text-change', _.bind( function(delta, source) {
		if (source == 'user') {
		    var text = this.editor.getText(0);
		    var regexResult = text.match(this.linkExpression);
		    if(!_.isNull(regexResult)){
		    	regexResult.forEach(_.bind(function(linkText){
			    	console.log(linkText);
			    	var index = text.indexOf(linkText);
			    	this.editor.deleteText(
			    		index,
			    		index + linkText.length
			    	);
			    	this.editor.insertText(
			    		index,
			    		linkText,
			    		{
							link: linkText
					});
		    	},this));
		    }
		}
	},this));
};

TextEditorBuilder.prototype.setHtml = function(html) {
	this.editor.setHtml(html);
};

TextEditorBuilder.prototype.getHtml = function() {
	return this.editor.getHtml();
};

TextEditorBuilder.prototype.getRandomInt = function() {
	var min = 0,
		max = 100000000;
  	return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = TextEditorBuilder;
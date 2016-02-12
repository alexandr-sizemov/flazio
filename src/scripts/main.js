var $ = window.jQuery = require("jquery");
var _ = window._ = require("lodash");
require("jquery-ui");

var MenuBuilder = require("./modules/menuBuilder/menuBuilder");
var TextEditorBuilder = require("./modules/textEditorBuilder/textEditorBuilder");
var sampleData = require("./sampledata/sample.json");

$(document).ready(function() {
	var menuBuilder = new MenuBuilder('main-menu-1', 'menu-box-1');
	var menuBuilder = new MenuBuilder('main-menu-2', 'menu-box-2');
	var textEditor1 = new TextEditorBuilder('text-box-container-1');
	var textEditor2 = new TextEditorBuilder('text-box-container-2');
	var textEditor3 = new TextEditorBuilder('text-box-container-3');
});



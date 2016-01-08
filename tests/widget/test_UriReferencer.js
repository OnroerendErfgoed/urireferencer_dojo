require([
	'urireferencer/Urireferencer',
	'dojo/domReady!'
], function (
	Urireferencer
) {

	var widget = new Urireferencer({
		uriUrl: 'https://dev-id.erfgoed.net/registry',
		checkUri: 'https://dev-id.erfgoed.net/actoren/1'
	}, 'widgetNode');
	widget.startup();
});
require([
	'urireferencer/Urireferencer',
	'dojo/domReady!'
], function (
	Urireferencer
) {
	var baseUrl= "https://dev-id.erfgoed.net/registry/references?uri=";
	var ssoToken = 'u2_654897';

	var widget = new Urireferencer({
		uriUrl: baseUrl,
		ssoToken: ssoToken,
		checkUri: 'https://dev-id.erfgoed.net/actoren/1'
	}, 'widgetNode');
	widget.startup();
});
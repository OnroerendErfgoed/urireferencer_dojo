# urireferencer_dojo

Dojo widget that intereacts with a [UriRegistry](https://github.com/OnroerendErfgoed/uriregistry) .

Usage:
```javascript
   var widget = new Urireferencer({
       uriUrl: 'https://dev-id.erfgoed.net/registry',
       checkUri: 'https://dev-id.erfgoed.net/actoren/1'
   }, 'widgetNode');
```

You can run and test this widget locally:
 - clone this repository
 - run 'npm install' from the root dir
 - run 'bower install' from the root dir
 - run 'grunt run' from the root dir
 - browse to the [test page](http://localhost:8080/tests/widget/test_UriReferencer.html) 

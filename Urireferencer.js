define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/text!./templates/Urireferencer.html',
  './controllers/UriController'
], function (
  declare,
  lang,
  array,
  WidgetBase,
  TemplatedMixin,
  template,
  UriController
) {
  return declare([WidgetBase, TemplatedMixin], {

    templateString: template,
    uriUrl: null,
    controller: null,
    ssoToken: null,
    checkUri: null,

    postCreate: function () {
      this.inherited(arguments);
      this.controller = new UriController({
        uriUrl: this.uriUrl,
        ssoToken: this.ssoToken
      })
    },

    startup: function () {
      this.controller.checkUri(this.checkUri).then(lang.hitch(this, function(data) {
        console.log(data);
        this.dataNode.innerHTML = data.count;
      }))
    }
  });
});

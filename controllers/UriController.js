/**
 * @module controllers/UriController
 */
define([
  'dojo/_base/declare',
  'dojo/request/xhr'
], function(
  declare,
  xhr
) {
  return declare(null, /** @lends module:controllers/UriController# */ {

    uriUrl: null,
    ssoToken: null,

    /**
     * Module die instaat voor de 'ajax calls' die naar de server gemaakt worden voor het controleren van de uri.
     * @constructs
     * @param args Options
     */
    constructor: function (args) {
      declare.safeMixin(this, args);
    },

    checkUri: function(uri) {
      return xhr(this.uriUrl + uri, {
        method: 'GET',
        handleAs: 'json',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
    }

  });
});
/**
 * @module controllers/ImageController
 */
define([
  'dojo/_base/declare',
  'dojo/_base/xhr'
], function (
  declare,
  _xhr
) {
  return declare(null, {
    _target: '/images',

    getImageKoppelingen: function (id) {
      return _xhr.get({
        url: this._target + '/' + id + '/koppelingen',
        handleAs: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
    }
  });
});

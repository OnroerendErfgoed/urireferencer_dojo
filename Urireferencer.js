define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/text!./templates/Urireferencer.html',
  './controllers/UriController',
  'dojo/dom-construct',
  'dojo/dom-class',
  'dojo/on',
  'dojo/query',
  'dojo/NodeList-traverse'
], function (
  declare,
  lang,
  array,
  WidgetBase,
  TemplatedMixin,
  template,
  UriController,
  domConstruct,
  domClass,
  on,
  query
) {
  return declare([WidgetBase, TemplatedMixin], {

    templateString: template,
    uriUrl: null,
    controller: null,
    checkUri: null,
    totalCount: 0,

    postCreate: function () {
      this.inherited(arguments);
      this.controller = new UriController({
        uriUrl: this.uriUrl
      });
    },

    startup: function () {
      this.controller.checkUri(this.checkUri).then(lang.hitch(this, function(data) {
        this.referenceCount.innerHTML = data.count;

        if (data.zichtbaarheid_tekst) {
          this.zichtbaarheidsNode.innerHTML = data.zichtbaarheid_tekst;
          domClass.remove(this.zichtbaarheidsNodeContainer, 'hide');
        }

        array.forEach(data.applications, lang.hitch(this, function(app) {
          this._createExpanderElement(app);
        }));
        this.referenceLoadingMessage.style.display = 'none';
        this.expanderControls.style.display = 'inline-block';
      }));
    },

    recheckUri: function(uri) {
      this.referenceLoadingMessage.style.display = 'block';
      this.expanderControls.style.display = 'none';
      domClass.add(this.zichtbaarheidsNodeContainer, 'hide');
      domConstruct.empty(this.expanderContainer);

      this.controller.checkUri(uri).then(lang.hitch(this, function(data) {
        this.referenceCount.innerHTML = data.count;
        
        if (data.zichtbaarheid_tekst) {
          this.zichtbaarheidsNode.innerHTML = data.zichtbaarheid_tekst;
          domClass.remove(this.zichtbaarheidsNodeContainer, 'hide');
        }

        array.forEach(data.applications, lang.hitch(this, function(app) {
          this._createExpanderElement(app);
        }));
        this.referenceLoadingMessage.style.display = 'none';
        this.expanderControls.style.display = 'inline-block';
      }));
    },

    _createExpanderElement: function(app) {
      var exp = domConstruct.create('div', { 'class': 'expander' }, this.expanderContainer);
      var header = domConstruct.create('div', { 'class': 'expander-header' }, exp);
      var content = domConstruct.create('div', { 'class': 'expander-content' }, exp);

      domConstruct.create('div', { 'class': 'expander-icon' }, header);

      var title = '<strong>' + app.title + '</strong>&nbsp;<small>(' +
        (app.count ? app.count : (app.success ? '0' : 'fout bij controleren')) + ' referenties)</small>';

      domConstruct.create('h5', { innerHTML: title }, header);

      var ul = domConstruct.create('ul', { 'class': 'nodisk', style: 'padding-left: 20px;' }, content);

      if (
        app.success &&
        app.has_references // jshint ignore:line
      ) {
        array.forEach(app.items, lang.hitch(this, function(item) {
          domConstruct.create('li', { innerHTML: '<i class="fa fa-angle-right"></i>&nbsp;<a target="_blank" href="' +
            item.uri + '">' + item.title + '</a>'}, ul);
        }));
      } else {
        if (!app.success) {
          domConstruct.create('li', { innerHTML: 'Er ging iets mis bij het controleren van de referenties.'}, ul);
        } else {
          domConstruct.create('li', { innerHTML: 'Er zijn geen referenties gevonden.'}, ul);
        }
      }

      on(header, 'click', lang.hitch(this, function(evt) {
        this._toggleExpander(evt);
      }));
    },

    _toggleExpander: function(evt) {
      evt ? evt.preventDefault() : null;
      var expander = evt.target.closest('.expander');
      //var container = expander.closest('.expander-container');

      // Close other expanded elements // Excluded here because of showAll/closeAll
      //query(container).children('.expander').forEach(function(child) {
      //  if (child != expander) {
      //    if (domClass.contains(child, 'expander-expanded')){
      //      domClass.remove(child, 'expander-expanded');
      //    }
      //  }
      //});

      // Toggle this element
      if (domClass.contains(expander, 'expander-expanded')) {
        domClass.remove(expander, 'expander-expanded');
      } else {
        domClass.add(expander, 'expander-expanded');
      }
    },

    _openAll: function(evt) {
      evt ? evt.preventDefault() : null;
      query(this.expanderContainer).children('.expander').forEach(function(child) {
        domClass.add(child, 'expander-expanded');
      });
    },

    _closeAll: function(evt) {
      evt ? evt.preventDefault() : null;
      query(this.expanderContainer).children('.expander').forEach(function(child) {
        domClass.remove(child, 'expander-expanded');
      });
    }
  });
});

define('nodes/components/driver-linode/component', ['exports', 'shared/mixins/node-driver'], function (exports, _nodeDriver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjaWYgbmVlZEFQSVRva2VufX0KICA8Zm9ybT4KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIgci1tYjIwIj4KICAgICAgPHNwYW4+QWNjb3VudCBBY2Nlc3M8L3NwYW4+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InJvdyBmb3JtLWdyb3VwIj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jb250cm9sLXN0YXRpYyI+QVBJIFRva2VuKjwvbGFiZWw+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMTAiPgogICAgICAgIHt7aW5wdXQgdHlwZT0icGFzc3dvcmQiIHZhbHVlPW1vZGVsLmxpbm9kZUNvbmZpZy50b2tlbiBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiIHBsYWNlaG9sZGVyPSJZb3VyIExpbm9kZSBBUEl2NCBUb2tlbiJ9fQogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5DcmVhdGUgYSBQZXJzb25hbCBBY2Nlc3MgVG9rZW4gYXQKICAgICAgICAgIDxhIHRhcmdldD0iX2JsYW5rIiBocmVmPSJodHRwczovL2Nsb3VkLmxpbm9kZS5jb20vcHJvZmlsZS90b2tlbnMiPkxpbm9kZSBDbG91ZCBNYW5hZ2VyPC9hPiwgY2xpY2sgeW91ciB1c2VybmFtZSwgZ28gdG8gTXkgUHJvZmlsZSDihpIgQWRkIGEgUGVyc29uYWwgQWNjZXNzIFRva2VuPC9wPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogICAge3t0b3AtZXJyb3JzIGVycm9ycz1lcnJvcnN9fQogICAgPGRpdiBjbGFzcz0iZm9vdGVyLWFjdGlvbnMiPgogICAgICB7eyNpZiBnZXR0aW5nRGF0YX19CiAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBiZy1wcmltYXJ5IGJ0bi1kaXNhYmxlZCI+CiAgICAgICAgPGkgY2xhc3M9Imljb24gaWNvbi1zcGlubmVyIGljb24tc3BpbiI+PC9pPiB7e3QgJ2dlbmVyaWMubG9hZGluZyd9fTwvYnV0dG9uPgogICAgICB7e2Vsc2V9fQogICAgICA8YnV0dG9uIHt7YWN0aW9uICJnZXREYXRhIiB9fSBjbGFzcz0iYnRuIGJnLXByaW1hcnkiIGRpc2FibGVkPXt7bm90IG1vZGVsLmxpbm9kZUNvbmZpZy50b2tlbn19PkNvbmZpZ3VyZSBTZXJ2ZXI8L2J1dHRvbj4KICAgICAge3svaWZ9fQogICAgICA8YnV0dG9uIHt7YWN0aW9uICJjYW5jZWwifX0gY2xhc3M9ImJ0biBiZy10cmFuc3BhcmVudCI+e3t0ICdnZW5lcmljLmNhbmNlbCd9fTwvYnV0dG9uPgogICAgPC9kaXY+CiAgPC9mb3JtPgogIHt7ZWxzZX19CiAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHx9fQogICAge3shLS0gVGhpcyBsaW5lIHNob3dzIHRoZSBkcml2ZXIgdGl0bGUgd2hpY2ggeW91IGRvbid0IGhhdmUgdG8gY2hhbmdlIGl0IC0tfX0KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIgbWItMjAiPjxzcGFuPnt7ZHJpdmVyT3B0aW9uc1RpdGxlfX08L3NwYW4+PC9kaXY+CgogICAge3shLS0gQW4gZXhhbXBsZSBpbnB1dCBvcHRpb24gLS19fQogICAgPGRpdiBjbGFzcz0icm93IGJveCBtdC0yMCI+CiAgICAgIDxoND5JbnN0YW5jZSBPcHRpb25zPC9oND4KICAgIHt7IS0tIFN0YXJ0IG9mIExpbm9kZSBPcHRpb25zIC0tfX0KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0yIGNvbC1pbmxpbmUiPgogICAgICAgICAgPGxhYmVsPlJlZ2lvbjwvbGFiZWw+CiAgICAgICAgPC9kaXY+CgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgogICAgICAgIDxzZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIgb25jaGFuZ2U9e3thY3Rpb24gKG11dCBtb2RlbC5saW5vZGVDb25maWcucmVnaW9uKSB2YWx1ZT0idGFyZ2V0LnZhbHVlIiB9fT4KICAgICAgICAgIHt7I2VhY2ggcmVnaW9uQ2hvaWNlcyBhcyB8Y2hvaWNlfH19CiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3tjaG9pY2UuaWR9fSBzZWxlY3RlZD17e2VxIG1vZGVsLmxpbm9kZUNvbmZpZy5yZWdpb24gY2hvaWNlLmlkfX0+e3tjaG9pY2UubGFiZWx9fTwvb3B0aW9uPgogICAgICAgICAge3svZWFjaH19CiAgICAgICAgPC9zZWxlY3Q+CiAgICAgICAgPC9kaXY+CgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTIgY29sLWlubGluZSI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImZvcm0tY29udHJvbC1zdGF0aWMiPkluc3RhbmNlIFR5cGU8L2xhYmVsPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgogICAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17e2FjdGlvbiAobXV0IG1vZGVsLmxpbm9kZUNvbmZpZy5pbnN0YW5jZVR5cGUpIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19PgogICAgICAgICAgICB7eyNlYWNoIHNpemVDaG9pY2VzIGFzIHxjaG9pY2V8fX0KICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXt7Y2hvaWNlLmlkfX0gc2VsZWN0ZWQ9e3tlcSBtb2RlbC5saW5vZGVDb25maWcuaW5zdGFuY2VUeXBlIGNob2ljZS5pZH19Pnt7Y2hvaWNlLmxhYmVsfX0gLSB7e2Nob2ljZS52Y3B1c319IHZDUFVzLCB7e2Nob2ljZS5tZW1vcnl9fUdCIE1lbW9yeSwge3tjaG9pY2UuZGlza319R0IgRGlzayBzcGFjZTwvb3B0aW9uPgogICAgICAgICAgICB7ey9lYWNofX0KICAgICAgICAgIDwvc2VsZWN0PgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0yIGNvbC1pbmxpbmUiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJmb3JtLWNvbnRyb2wtc3RhdGljIj5JbWFnZTwvbGFiZWw+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNCI+CiAgICAgICAgICA8c2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiIG9uY2hhbmdlPXt7YWN0aW9uIChtdXQgbW9kZWwubGlub2RlQ29uZmlnLmltYWdlKSB2YWx1ZT0idGFyZ2V0LnZhbHVlIiB9fT4KICAgICAgICAgICAge3sjZWFjaCBpbWFnZUNob2ljZXMgYXMgfGNob2ljZXx9fQogICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3tjaG9pY2UuaWR9fSBzZWxlY3RlZD17e2VxIG1vZGVsLmxpbm9kZUNvbmZpZy5pbWFnZSBjaG9pY2UuaWR9fT57e2Nob2ljZS5sYWJlbH19PC9vcHRpb24+CiAgICAgICAgICAgIHt7L2VhY2h9fQogICAgICAgICAgPC9zZWxlY3Q+CiAgICAgICAgPC9kaXY+CiAgICAgICAge3sjdW5sZXNzIHByb2ZpbGUucmVzdHJpY3RlZCB9fQogICAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMiBjb2wtaW5saW5lIj4KICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJmb3JtLWNvbnRyb2wtc3RhdGljIj5UYWdzIHNlcGFyYXRlZCBieSBjb21tYSAoT3B0aW9uYWwpPC9sYWJlbD4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNCI+CiAgICAgICAgICAgIHt7IGlucHV0IGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIgdmFsdWU9bW9kZWwubGlub2RlQ29uZmlnLnRhZ3MgfX0KICAgICAgICAgIDwvZGl2PgogICAgICAgIHt7L3VubGVzc319CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTIgY29sLWlubGluZSI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImZvcm0tY29udHJvbC1zdGF0aWMiPlN0YWNrU2NyaXB0IChPcHRpb25hbCk8L2xhYmVsPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgogICAgICAgICAge3sgaW5wdXQgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIiBwbGFjZWhvbGRlcj0iRXhhbXBsZXM6ICd1c2VybmFtZS9TdGFja3NjcmlwdCBMYWJlbCcgb3IgJzEyMzQ1JyIgdmFsdWU9bW9kZWwubGlub2RlQ29uZmlnLnN0YWNrc2NyaXB0IH19CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMiBjb2wtaW5saW5lIj4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jb250cm9sLXN0YXRpYyI+U3RhY2tTY3JpcHQgRGF0YSBhcyBKU09OIChPcHRpb25hbCk8L2xhYmVsPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgogICAgICAgICAge3sgdGV4dGFyZWEgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIiB2YWx1ZT1tb2RlbC5saW5vZGVDb25maWcuc3RhY2tzY3JpcHREYXRhIH19CiAgICAgICAgPC9kaXY+CgogICAgICA8L2Rpdj4KICAgIHt7IS0tIEVuZCBvZiBMaW5vZGUgT3B0aW9ucyAtLX19CiAgICA8L2Rpdj4KCiAgICB7eyEtLSBUaGlzIGZvbGxvd2luZyBjb250YWlucyB0aGUgTmFtZSwgTGFiZWxzIGFuZCBFbmdpbmUgT3B0aW9ucyBmaWVsZHMgLS19fQogICAgPGRpdiBjbGFzcz0ib3Zlci1ociI+PHNwYW4+e3t0ZW1wbGF0ZU9wdGlvbnNUaXRsZX19PC9zcGFuPjwvZGl2PgoKICAgIHt7Zm9ybS1uYW1lLWRlc2NyaXB0aW9uCiAgICAgIG1vZGVsPW1vZGVsCiAgICAgIG5hbWVSZXF1aXJlZD10cnVlCiAgICB9fQoKICAgIHt7Zm9ybS11c2VyLWxhYmVscwogICAgICBpbml0aWFsTGFiZWxzPWxhYmVsUmVzb3VyY2UubGFiZWxzCiAgICAgIHNldExhYmVscz0oYWN0aW9uICdzZXRMYWJlbHMnKQogICAgICBleHBhbmRBbGw9ZXhwYW5kQWxsCiAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgfX0KCiAgICB7e2Zvcm0tZW5naW5lLW9wdHMKICAgICAgbWFjaGluZT1tb2RlbAogICAgICBzaG93RW5naW5lVXJsPXNob3dFbmdpbmVVcmwKICAgIH19CiAge3svYWNjb3JkaW9uLWxpc3R9fQoKCiAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgZXJyb3JzIHByb2R1Y2VkIGJ5IHZhbGlkYXRlKCkgaW4gdGhlIGNvbXBvbmVudCAtLX19CiAge3t0b3AtZXJyb3JzIGVycm9ycz1lcnJvcnN9fQoKICB7eyEtLSBUaGlzIGNvbXBvbmVudCBzaG93cyB0aGUgQ3JlYXRlIGFuZCBDYW5jZWwgYnV0dG9ucyAtLX19CiAge3tzYXZlLWNhbmNlbCBzYXZlPSJzYXZlIiBjYW5jZWw9ImNhbmNlbCJ9fQogIHt7L2lmfX0KPC9zZWN0aW9uPgo=";

  var computed = Ember.computed;
  var get = Ember.get;
  var set = Ember.set;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;
  var observer = Ember.observer;

  var defaultRadix = 10;
  var defaultBase = 1024;
  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'linode',
    needAPIToken: true,
    config: alias('model.linodeConfig'),
    app: service(),

    init: function init() {
      var decodedLayout = window.atob(LAYOUT);
      var template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-linode/template'
      });
      set(this, 'layout', template);

      this._super.apply(this, arguments);
    },

    bootstrap: function bootstrap() {
      var config = get(this, 'globalStore').createRecord({
        type: 'linodeConfig',
        token: null,
        instanceType: 'g6-standard-4',
        region: 'us-east',
        image: 'linode/ubuntu16.04lts',
        uaPrefix: 'Rancher',
        tags: '',
        authorizedUsers: '',
        createPrivateIp: false,
        stackscript: '',
        stackscriptData: ''
      });

      set(this, 'model.linodeConfig', config);
    },

    validate: function validate() {
      this._super();
      var errors = get(this, 'errors') || [];
      if (!get(this, 'model.name')) {
        errors.push('Name is required');
      }

      if (!this.get('model.linodeConfig.instanceType')) {
        errors.push('Specifying a linode Instance Type is required');
      }

      if (!this.get('model.linodeConfig.image')) {
        errors.push('Specifying a linode Image is required');
      }

      if (!this.get('model.linodeConfig.region')) {
        errors.push('Specifying a linode Region is required');
      }

      if (get(errors, 'length')) {
        set(this, 'errors', errors);
        return false;
      } else {
        set(this, 'errors', null);
        return true;
      }
    },

    actions: {
      getData: function getData() {
        this.set('gettingData', true);
        var that = this;
        Promise.all([this.apiRequest('/v4/profile')]).then(function (responses) {
          that.setProperties({
            errors: [],
            needAPIToken: false,
            restricted: responses[0].restricted
          });
        }).then(function () {

          Promise.all([that.apiRequest('/v4/regions'), that.apiRequest('/v4/images'), that.apiRequest('/v4/linode/types')]).then(function (responses) {
            that.setProperties({
              errors: [],
              gettingData: false,
              regionChoices: responses[0].data.map(function (region) {
                region.label = region.id.slice(0, 4).toUpperCase() + region.id.slice(4) + " (" + region.country.toUpperCase() + ")";return region;
              }).sort(function (a, b) {
                return String.prototype.localeCompare(a, b);
              }),
              imageChoices: responses[1].data.filter(function (image) {
                return (/^linode.(ubuntu18.04|ubuntu16.04|debian9)/.test(image.id)
                );
              }),
              sizeChoices: responses[2].data.filter(function (size) {
                return !/nanode/.test(size.id);
              }).map(function (image) {
                image.disk /= 1024;image.memory /= 1024;return image;
              })
            });
          }).catch(function (err) {
            err.then(function (msg) {
              that.setProperties({
                errors: ['Error received from Linode: ' + msg.errors[0].reason],
                gettingData: false
              });
            });
          });
        }).catch(function (err) {
          err.then(function (msg) {
            that.setProperties({
              errors: ['Error received from Linode: ' + msg.errors[0].reason],
              gettingData: false,
              needAPIToken: true
            });
          });
        });
      }
    },
    apiRequest: function apiRequest(path) {
      return fetch('https://api.linode.com' + path, {
        headers: {
          'Authorization': 'Bearer ' + this.get('model.linodeConfig.token')
        }
      }).then(function (res) {
        return res.ok ? res.json() : Promise.reject(res.json());
      });
    }
  });
});;
define('ui/components/driver-linode/component', ['exports', 'nodes/components/driver-linode/component'], function (exports, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});
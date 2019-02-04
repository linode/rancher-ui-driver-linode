define('nodes/components/driver-linode/component', ['exports', 'shared/mixins/node-driver'], function (exports, _nodeDriver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjaWYgbmVlZEFQSVRva2VufX0KICA8Zm9ybT4KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIgci1tYjIwIj4KICAgICAgPHNwYW4+QWNjb3VudCBBY2Nlc3M8L3NwYW4+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InJvdyBmb3JtLWdyb3VwIj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jb250cm9sLXN0YXRpYyI+QVBJIFRva2VuKjwvbGFiZWw+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMTAiPgogICAgICAgIHt7aW5wdXQgdHlwZT0icGFzc3dvcmQiIHZhbHVlPW1vZGVsLmxpbm9kZUNvbmZpZy50b2tlbiBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiIHBsYWNlaG9sZGVyPSJZb3VyIExpbm9kZSBBUEl2NCBUb2tlbiJ9fQogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5DcmVhdGUgYSBQZXJzb25hbCBBY2Nlc3MgVG9rZW4gYXQKICAgICAgICAgIDxhIHRhcmdldD0iX2JsYW5rIiBocmVmPSJodHRwczovL2Nsb3VkLmxpbm9kZS5jb20vcHJvZmlsZS90b2tlbnMiPkxpbm9kZSBDbG91ZCBNYW5hZ2VyPC9hPiwgY2xpY2sgeW91ciB1c2VybmFtZSwgZ28gdG8gTXkgUHJvZmlsZSDihpIgQWRkIGEgUGVyc29uYWwgQWNjZXNzIFRva2VuPC9wPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogICAge3t0b3AtZXJyb3JzIGVycm9ycz1lcnJvcnN9fQogICAgPGRpdiBjbGFzcz0iZm9vdGVyLWFjdGlvbnMiPgogICAgICB7eyNpZiBnZXR0aW5nRGF0YX19CiAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBiZy1wcmltYXJ5IGJ0bi1kaXNhYmxlZCI+CiAgICAgICAgPGkgY2xhc3M9Imljb24gaWNvbi1zcGlubmVyIGljb24tc3BpbiI+PC9pPiB7e3QgJ2dlbmVyaWMubG9hZGluZyd9fTwvYnV0dG9uPgogICAgICB7e2Vsc2V9fQogICAgICA8YnV0dG9uIHt7YWN0aW9uICJnZXREYXRhIiB9fSBjbGFzcz0iYnRuIGJnLXByaW1hcnkiIGRpc2FibGVkPXt7bm90IG1vZGVsLmxpbm9kZUNvbmZpZy50b2tlbn19PkNvbmZpZ3VyZSBTZXJ2ZXI8L2J1dHRvbj4KICAgICAge3svaWZ9fQogICAgICA8YnV0dG9uIHt7YWN0aW9uICJjYW5jZWwifX0gY2xhc3M9ImJ0biBiZy10cmFuc3BhcmVudCI+e3t0ICdnZW5lcmljLmNhbmNlbCd9fTwvYnV0dG9uPgogICAgPC9kaXY+CiAgPC9mb3JtPgogIHt7ZWxzZX19CiAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHx9fQogICAge3shLS0gVGhpcyBsaW5lIHNob3dzIHRoZSBkcml2ZXIgdGl0bGUgd2hpY2ggeW91IGRvbid0IGhhdmUgdG8gY2hhbmdlIGl0IC0tfX0KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIgbWItMjAiPjxzcGFuPnt7ZHJpdmVyT3B0aW9uc1RpdGxlfX08L3NwYW4+PC9kaXY+CgogICAge3shLS0gQW4gZXhhbXBsZSBpbnB1dCBvcHRpb24gLS19fQogICAgPGRpdiBjbGFzcz0icm93IGJveCBtdC0yMCI+CiAgICAgIDxoND5JbnN0YW5jZSBPcHRpb25zPC9oND4KICAgIHt7IS0tIFN0YXJ0IG9mIExpbm9kZSBPcHRpb25zIC0tfX0KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0yIGNvbC1pbmxpbmUiPgogICAgICAgICAgPGxhYmVsPlJlZ2lvbjwvbGFiZWw+CiAgICAgICAgPC9kaXY+CgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgogICAgICAgIDxzZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIgb25jaGFuZ2U9e3thY3Rpb24gKG11dCBtb2RlbC5saW5vZGVDb25maWcucmVnaW9uKSB2YWx1ZT0idGFyZ2V0LnZhbHVlIiB9fT4KICAgICAgICAgIHt7I2VhY2ggcmVnaW9uQ2hvaWNlcyBhcyB8Y2hvaWNlfH19CiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3tjaG9pY2UuaWR9fSBzZWxlY3RlZD17e2VxIG1vZGVsLmxpbm9kZUNvbmZpZy5yZWdpb24gY2hvaWNlLmlkfX0+e3tjaG9pY2UuaWR9fSAoe3tjaG9pY2UuY291bnRyeX19KTwvb3B0aW9uPgogICAgICAgICAge3svZWFjaH19CiAgICAgICAgPC9zZWxlY3Q+CiAgICAgICAgPC9kaXY+CgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTIgY29sLWlubGluZSI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImZvcm0tY29udHJvbC1zdGF0aWMiPkluc3RhbmNlIFR5cGU8L2xhYmVsPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgogICAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17e2FjdGlvbiAobXV0IG1vZGVsLmxpbm9kZUNvbmZpZy5pbnN0YW5jZVR5cGUpIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19PgogICAgICAgICAgICB7eyNlYWNoIHNpemVDaG9pY2VzIGFzIHxjaG9pY2V8fX0KICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXt7Y2hvaWNlLmlkfX0gc2VsZWN0ZWQ9e3tlcSBtb2RlbC5saW5vZGVDb25maWcuaW5zdGFuY2VUeXBlIGNob2ljZS5pZH19Pnt7Y2hvaWNlLmxhYmVsfX0gLSB7e2Nob2ljZS52Y3B1c319IHZDUFVzLCB7e2Nob2ljZS5tZW1vcnl9fUdCIE1lbW9yeSwge3tjaG9pY2UuZGlza319R0IgRGlzayBzcGFjZTwvb3B0aW9uPgogICAgICAgICAgICB7ey9lYWNofX0KICAgICAgICAgIDwvc2VsZWN0PgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0yIGNvbC1pbmxpbmUiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJmb3JtLWNvbnRyb2wtc3RhdGljIj5JbWFnZTwvbGFiZWw+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNCI+CiAgICAgICAgICA8c2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiIG9uY2hhbmdlPXt7YWN0aW9uIChtdXQgbW9kZWwubGlub2RlQ29uZmlnLmltYWdlKSB2YWx1ZT0idGFyZ2V0LnZhbHVlIiB9fT4KICAgICAgICAgICAge3sjZWFjaCBpbWFnZUNob2ljZXMgYXMgfGNob2ljZXx9fQogICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3tjaG9pY2UuaWR9fSBzZWxlY3RlZD17e2VxIG1vZGVsLmxpbm9kZUNvbmZpZy5pbWFnZSBjaG9pY2UuaWR9fT57e2Nob2ljZS5sYWJlbH19PC9vcHRpb24+CiAgICAgICAgICAgIHt7L2VhY2h9fQogICAgICAgICAgPC9zZWxlY3Q+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAge3shLS0gRW5kIG9mIExpbm9kZSBPcHRpb25zIC0tfX0KICAgIDwvZGl2PgoKICAgIHt7IS0tIFRoaXMgZm9sbG93aW5nIGNvbnRhaW5zIHRoZSBOYW1lLCBMYWJlbHMgYW5kIEVuZ2luZSBPcHRpb25zIGZpZWxkcyAtLX19CiAgICA8ZGl2IGNsYXNzPSJvdmVyLWhyIj48c3Bhbj57e3RlbXBsYXRlT3B0aW9uc1RpdGxlfX08L3NwYW4+PC9kaXY+CgogICAge3tmb3JtLW5hbWUtZGVzY3JpcHRpb24KICAgICAgbW9kZWw9bW9kZWwKICAgICAgbmFtZVJlcXVpcmVkPXRydWUKICAgIH19CgogICAge3tmb3JtLXVzZXItbGFiZWxzCiAgICAgIGluaXRpYWxMYWJlbHM9bGFiZWxSZXNvdXJjZS5sYWJlbHMKICAgICAgc2V0TGFiZWxzPShhY3Rpb24gJ3NldExhYmVscycpCiAgICAgIGV4cGFuZEFsbD1leHBhbmRBbGwKICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICB9fQoKICAgIHt7Zm9ybS1lbmdpbmUtb3B0cwogICAgICBtYWNoaW5lPW1vZGVsCiAgICAgIHNob3dFbmdpbmVVcmw9c2hvd0VuZ2luZVVybAogICAgfX0KICB7ey9hY2NvcmRpb24tbGlzdH19CgoKICB7eyEtLSBUaGlzIGNvbXBvbmVudCBzaG93cyBlcnJvcnMgcHJvZHVjZWQgYnkgdmFsaWRhdGUoKSBpbiB0aGUgY29tcG9uZW50IC0tfX0KICB7e3RvcC1lcnJvcnMgZXJyb3JzPWVycm9yc319CgogIHt7IS0tIFRoaXMgY29tcG9uZW50IHNob3dzIHRoZSBDcmVhdGUgYW5kIENhbmNlbCBidXR0b25zIC0tfX0KICB7e3NhdmUtY2FuY2VsIHNhdmU9InNhdmUiIGNhbmNlbD0iY2FuY2VsIn19CiAge3svaWZ9fQo8L3NlY3Rpb24+Cg==";

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
      var genRootPass = function genRootPass() {
        return Array(36).fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$').map(function (x) {
          return x[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * (x.length + 1))];
        }).join('');
      };

      var config = get(this, 'globalStore').createRecord({
        type: 'linodeConfig',
        token: null,
        instanceType: 'g6-standard-4',
        region: 'us-east',
        image: 'linode/ubuntu18.04',

        uaPrefix: 'RKE'
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
        Promise.all([this.apiRequest('/v4/regions'), this.apiRequest('/v4/images'), this.apiRequest('/v4/linode/types')]).then(function (responses) {
          that.setProperties({
            errors: [],
            needAPIToken: false,
            gettingData: false,
            regionChoices: responses[0].data,
            imageChoices: responses[1].data.filter(function (image) {
              return (/ubuntu1[68]/.test(image.id)
              );
            }),
            sizeChoices: responses[2].data.filter(function (size) {
              return !/nanode/.test(size.id);
            })
          });
        }).catch(function (err) {
          err.then(function (msg) {
            that.setProperties({
              errors: ['Error received from Linode: ' + msg.error.message],
              gettingData: false
            });
          });
        });
      }
    },

    apiRequest: function apiRequest(path) {
      return fetch('https://api.linode.com' + path, {
        headers: {
          'Authorization': 'Bearer ' + this.get('model.linodeConfig.apiToken')
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
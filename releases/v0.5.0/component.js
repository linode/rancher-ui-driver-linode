"use strict";

define("nodes/components/driver-linode/component", ["exports", "shared/mixins/node-driver"], function (exports, _nodeDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHx9fQogICB7eyNpZiAoZXEgc3RlcCAxKX19CiAgICAgIHt7I2FjY29yZGlvbi1saXN0LWl0ZW0KICAgICAgICAgdGl0bGU9KHQgIm1vZGFsQWRkQ2xvdWRLZXkubGlub2RlLnRva2VuLmxhYmVsIikKICAgICAgICAgZGV0YWlsPSh0ICJtb2RhbEFkZENsb3VkS2V5Lmxpbm9kZS50b2tlbi5oZWxwIiBodG1sU2FmZT10cnVlKQogICAgICAgICBleHBhbmRBbGw9ZXhwYW5kQWxsCiAgICAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgICAgICBleHBhbmRPbkluaXQ9dHJ1ZQogICAgICB9fQogICAgICAgIHt7Zm9ybS1hdXRoLWNsb3VkLWNyZWRlbnRpYWwKICAgICAgICAgIGRyaXZlck5hbWU9ZHJpdmVyTmFtZQogICAgICAgICAgcGFyc2VBbmRDb2xsZWN0RXJyb3JzPShhY3Rpb24gImVycm9ySGFuZGxlciIpCiAgICAgICAgICBwcmltYXJ5UmVzb3VyY2U9cHJpbWFyeVJlc291cmNlCiAgICAgICAgICBjbG91ZENyZWRlbnRpYWxzPWNsb3VkQ3JlZGVudGlhbHMKICAgICAgICAgIGZpbmlzaEFuZFNlbGVjdENsb3VkQ3JlZGVudGlhbD0oYWN0aW9uICJmaW5pc2hBbmRTZWxlY3RDbG91ZENyZWRlbnRpYWwiKQogICAgICAgICAgcHJvZ3Jlc3NTdGVwPShhY3Rpb24gImF1dGhMaW5vZGUiKQogICAgICAgICAgY2FuY2VsPShhY3Rpb24gImNhbmNlbCIpCiAgICAgICAgICBjcmVhdGVMYWJlbD0ibW9kYWxBZGRDbG91ZEtleS5saW5vZGUuYXV0aEFjY291bnRCdXR0b24iCiAgICAgICAgfX0KICAgICAge3svYWNjb3JkaW9uLWxpc3QtaXRlbX19CiAgICB7e3RvcC1lcnJvcnMgZXJyb3JzPWVycm9yc319CiAge3tlbHNlfX0KICB7eyNhY2NvcmRpb24tbGlzdCBzaG93RXhwYW5kQWxsPWZhbHNlIGFzIHwgYWwgZXhwYW5kRm4gfH19CiAgICB7eyEtLSBUaGlzIGxpbmUgc2hvd3MgdGhlIGRyaXZlciB0aXRsZSB3aGljaCB5b3UgZG9uJ3QgaGF2ZSB0byBjaGFuZ2UgaXQgLS19fQogICAgPGRpdiBjbGFzcz0ib3Zlci1ociI+PHNwYW4+e3tkcml2ZXJPcHRpb25zVGl0bGV9fTwvc3Bhbj48L2Rpdj4KICAgICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbQogICAgICAgIHRpdGxlPSJJbnN0YW5jZSBPcHRpb25zIgogICAgICAgIGRldGFpbD0iQ29uZmlndXJlIHRoZSBvcHRpb25zIGZvciB0aGUgTGlub2RlIEluc3RhbmNlcyB0aGF0IHdpbGwgYmUgY3JlYXRlZCBieSB0aGlzIHRlbXBsYXRlLiIKICAgICAgICBleHBhbmRBbGw9ZXhwYW5kQWxsCiAgICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICAgICAgZXhwYW5kT25Jbml0PXRydWUKICAgICAgfX0KICAgICAge3shLS0gU3RhcnQgb2YgTGlub2RlIE9wdGlvbnMgLS19fQogICAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlJlZ2lvbjwvbGFiZWw+CiAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIgb25jaGFuZ2U9e3thY3Rpb24gKG11dCBtb2RlbC5saW5vZGVDb25maWcucmVnaW9uKSB2YWx1ZT0idGFyZ2V0LnZhbHVlIiB9fT4KICAgICAgICAgICAgICB7eyNlYWNoIHJlZ2lvbkNob2ljZXMgYXMgfGNob2ljZXx9fQogICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17e2Nob2ljZS5pZH19IHNlbGVjdGVkPXt7ZXEgbW9kZWwubGlub2RlQ29uZmlnLnJlZ2lvbiBjaG9pY2UuaWR9fT57e2Nob2ljZS5sYWJlbH19PC9vcHRpb24+CiAgICAgICAgICAgICAge3svZWFjaH19CiAgICAgICAgICAgIDwvc2VsZWN0PgogICAgICAgICAgPC9kaXY+CgogICAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5JbnN0YW5jZSBUeXBlPC9sYWJlbD4KICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17e2FjdGlvbiAobXV0IG1vZGVsLmxpbm9kZUNvbmZpZy5pbnN0YW5jZVR5cGUpIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19PgogICAgICAgICAgICAgIHt7I2VhY2ggc2l6ZUNob2ljZXMgYXMgfGNob2ljZXx9fQogICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17e2Nob2ljZS5pZH19IHNlbGVjdGVkPXt7ZXEgbW9kZWwubGlub2RlQ29uZmlnLmluc3RhbmNlVHlwZSBjaG9pY2UuaWR9fT57e2Nob2ljZS5sYWJlbH19IC0ge3tjaG9pY2UudmNwdXN9fSB2Q1BVcywge3tjaG9pY2UubWVtb3J5fX1HQiBNZW1vcnksIHt7Y2hvaWNlLmRpc2t9fUdCIERpc2sgc3BhY2U8L29wdGlvbj4KICAgICAgICAgICAgICB7ey9lYWNofX0KICAgICAgICAgICAgPC9zZWxlY3Q+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5JbWFnZTwvbGFiZWw+CiAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIgb25jaGFuZ2U9e3thY3Rpb24gKG11dCBtb2RlbC5saW5vZGVDb25maWcuaW1hZ2UpIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19PgogICAgICAgICAgICAgIHt7I2VhY2ggaW1hZ2VDaG9pY2VzIGFzIHxjaG9pY2V8fX0KICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3tjaG9pY2UuaWR9fSBzZWxlY3RlZD17e2VxIG1vZGVsLmxpbm9kZUNvbmZpZy5pbWFnZSBjaG9pY2UuaWR9fT57e2Nob2ljZS5sYWJlbH19PC9vcHRpb24+CiAgICAgICAgICAgICAge3svZWFjaH19CiAgICAgICAgICAgIDwvc2VsZWN0PgogICAgICAgICAgPC9kaXY+CiAgICAgICAgICB7eyN1bmxlc3MgcHJvZmlsZS5yZXN0cmljdGVkIH19CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5UYWdzPC9sYWJlbD4KICAgICAgICAgICAgICB7eyBpbnB1dCBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiIHBsYWNlaG9sZGVyPSJFeGFtcGxlczogdGFnQSwgdGFnQiwgdGFnQyIgdmFsdWU9bW9kZWwubGlub2RlQ29uZmlnLnRhZ3MgfX0KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICB7ey91bmxlc3N9fQogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlByaXZhdGUgSVA8L2xhYmVsPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJjaGVja2JveCI+CiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPnt7aW5wdXQgdHlwZT0iY2hlY2tib3giIGNoZWNrZWQ9bW9kZWwubGlub2RlQ29uZmlnLmNyZWF0ZVByaXZhdGVJcH19IEFkZCBhIFByaXZhdGUgSVA8L2xhYmVsPgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KICAgICAge3shLS0gRW5kIG9mIExpbm9kZSBPcHRpb25zIC0tfX0KICAgICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbQogICAgICAgIHRpdGxlPSJBdXRoZW50aWNhdGlvbiIKICAgICAgICBkZXRhaWw9IkNvbmZpZ3VyZSBMaW5vZGUgdXNlciBTU0ggS2V5cyBhbmQgYSBwYXNzd29yZCBmb3IgdGhlICdyb290JyB1c2VyIGFjY291bnQiCiAgICAgICAgZXhwYW5kQWxsPWV4cGFuZEFsbAogICAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgICAgIGV4cGFuZE9uSW5pdD1mYWxzZQogICAgICB9fQogICAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0xMiI+CiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5QYXNzd29yZCBmb3IgdGhlICJyb290IiB1c2VyPC9sYWJlbD4KICAgICAgICAgICAge3sgaW5wdXQKICAgICAgICAgICAgICB0eXBlPSJwYXNzd29yZCIKICAgICAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgdmFsdWU9bW9kZWwubGlub2RlQ29uZmlnLnJvb3RQYXNzCiAgICAgICAgICAgIH19CiAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTEyIj4KICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkxpbm9kZSBVc2VybmFtZXM8L2xhYmVsPgogICAgICAgICAgICB7eyBpbnB1dCBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiIHBsYWNlaG9sZGVyPSJ5b3VydXNlcm5hbWUiIHZhbHVlPW1vZGVsLmxpbm9kZUNvbmZpZy5hdXRob3JpemVkVXNlcnMgfX0KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KICAgICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbQogICAgICAgIHRpdGxlPSJTdGFja1NjcmlwdHMiCiAgICAgICAgZGV0YWlsPSJDb25maWd1cmUgYSBTdGFja1NjcmlwdCB0byBydW4gb24gZmlyc3QgYm9vdCIKICAgICAgICBleHBhbmRBbGw9ZXhwYW5kQWxsCiAgICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICAgICAgZXhwYW5kT25Jbml0PWZhbHNlCiAgICAgIH19CiAgICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTEyIj4KICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlN0YWNrU2NyaXB0ICg8YSBocmVmPSJodHRwczovL2Nsb3VkLmxpbm9kZS5jb20vc3RhY2tzY3JpcHRzIiB0YXJnZXQ9Il9ibGFuayIgcmVsPSJub2ZvbGxvdyBub3JlZmVycmVyIG5vb3BlbmVyIj5tYW5hZ2UgeW91ciBTdGFja1NjcmlwdHM8L2E+KTwvbGFiZWw+CiAgICAgICAgICAgIHt7IGlucHV0CiAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgcGxhY2Vob2xkZXI9IkV4YW1wbGVzOiAndXNlcm5hbWUvU3RhY2tzY3JpcHQgTGFiZWwnIG9yICcxMjM0NSciCiAgICAgICAgICAgIHZhbHVlPW1vZGVsLmxpbm9kZUNvbmZpZy5zdGFja3NjcmlwdAogICAgICAgICAgICB9fQogICAgICAgICAgPC9kaXY+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0xMiI+CiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5TdGFja1NjcmlwdCBWYXJpYWJsZXM8L2xhYmVsPgogICAgICAgICAgICB7eyB0ZXh0YXJlYSBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiIHBsYWNlaG9sZGVyPSd7ICJleGFtcGxlIjogInZhbHVlIiwgImpzb24iOiB0cnVlIH0nIHZhbHVlPW1vZGVsLmxpbm9kZUNvbmZpZy5zdGFja3NjcmlwdERhdGEgfX0KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KICAgICAge3shLS0gRW5kIG9mIExpbm9kZSBPcHRpb25zIC0tfX0KCiAgICB7eyEtLSBUaGlzIGZvbGxvd2luZyBjb250YWlucyB0aGUgTmFtZSwgTGFiZWxzIGFuZCBFbmdpbmUgT3B0aW9ucyBmaWVsZHMgLS19fQogICAgPGRpdiBjbGFzcz0ib3Zlci1ociI+PHNwYW4+e3t0ZW1wbGF0ZU9wdGlvbnNUaXRsZX19PC9zcGFuPjwvZGl2PgoKICAgIHt7Zm9ybS1uYW1lLWRlc2NyaXB0aW9uCiAgICAgIG1vZGVsPW1vZGVsCiAgICAgIG5hbWVSZXF1aXJlZD10cnVlCiAgICB9fQoKICAgIHt7Zm9ybS11c2VyLWxhYmVscwogICAgICBpbml0aWFsTGFiZWxzPWxhYmVsUmVzb3VyY2UubGFiZWxzCiAgICAgIHNldExhYmVscz0oYWN0aW9uICdzZXRMYWJlbHMnKQogICAgICBleHBhbmRBbGw9ZXhwYW5kQWxsCiAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgfX0KCiAgICB7e2Zvcm0tZW5naW5lLW9wdHMKICAgICAgbWFjaGluZT1tb2RlbAogICAgICBzaG93RW5naW5lVXJsPXNob3dFbmdpbmVVcmwKICAgIH19CiAge3svYWNjb3JkaW9uLWxpc3R9fQoKCiAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgZXJyb3JzIHByb2R1Y2VkIGJ5IHZhbGlkYXRlKCkgaW4gdGhlIGNvbXBvbmVudCAtLX19CiAge3t0b3AtZXJyb3JzIGVycm9ycz1lcnJvcnN9fQoKICB7eyEtLSBUaGlzIGNvbXBvbmVudCBzaG93cyB0aGUgQ3JlYXRlIGFuZCBDYW5jZWwgYnV0dG9ucyAtLX19CiAge3tzYXZlLWNhbmNlbCBzYXZlPShhY3Rpb24gInNhdmUiKSBlZGl0aW5nPWVkaXRpbmcgY2FuY2VsPShhY3Rpb24gImNhbmNlbCIpfX0KICB7ey9pZn19CiAge3svYWNjb3JkaW9uLWxpc3R9fQo8L3NlY3Rpb24+Cg==";
  var computed = Ember.computed;
  var get = Ember.get;
  var set = Ember.set;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;
  var observer = Ember.observer;
  var hash = Ember.RSVP.hash;
  var defaultRadix = 10;
  var defaultBase = 1024;
  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'linode',
    step: 1,
    config: alias('model.linodeConfig'),
    app: service(),
    intl: service(),
    linode: service(),
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
        instanceType: 'g6-standard-4',
        region: 'us-east',
        image: 'linode/ubuntu18.04',
        uaPrefix: 'Rancher',
        tags: '',
        authorizedUsers: '',
        createPrivateIp: true,
        stackscript: '',
        stackscriptData: '',
        rootPass: null
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

      if (!this.validateCloudCredentials()) {
        errors.push(this.intl.t('nodeDriver.cloudCredentialError'));
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
      finishAndSelectCloudCredential: function finishAndSelectCloudCredential(cred) {
        if (cred) {
          set(this, 'model.cloudCredentialId', get(cred, 'id'));
          this.send('authLinode');
        }
      },
      authLinode: function authLinode(cb) {
        var _this = this;

        var auth = {
          type: 'cloud',
          token: get(this, 'model.cloudCredentialId')
        };
        hash({
          regions: this.linode.request(auth, 'regions'),
          images: this.linode.request(auth, 'images'),
          sizes: this.linode.request(auth, 'linode/types')
        }).then(function (responses) {
          _this.setProperties({
            errors: [],
            step: 2,
            restricted: responses.regions.restricted,
            regionChoices: responses.regions.data.map(function (region) {
              region.label = region.id.slice(0, 4).toUpperCase() + region.id.slice(4) + " (" + region.country.toUpperCase() + ")";
              return region;
            }).sort(function (a, b) {
              return String.prototype.localeCompare(a, b);
            }),
            imageChoices: responses.images.data.filter(function (image) {
              return /^linode.(ubuntu22.04|ubuntu20.04|ubuntu18.04|ubuntu16.04|debian10|debian9)/.test(image.id) && !image.id.includes('kube');
            }).sort(function (a, b) {
              return a.id > b.id;
            }),
            sizeChoices: responses.sizes.data.map(function (size) {
              size.disk /= 1024;
              size.memory /= 1024;
              return size;
            })
          });
        }).catch(function (err) {
          var errors = get(_this, 'errors') || [];

          if (err && err.body && err.body.errors && err.body.errors[0]) {
            errors.push("Error received from Linode: ".concat(err.body.errors[0].reason));
          } else {
            errors.push("Error received from Linode");
          }

          _this.setProperties({
            errors: errors
          });

          cb();
        });
      }
    }
  });
});;
"use strict";

define("ui/components/driver-linode/component", ["exports", "nodes/components/driver-linode/component"], function (exports, _component) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});

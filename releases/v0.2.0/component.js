define('nodes/components/driver-linode/component', ['exports', 'shared/mixins/node-driver'], function (exports, _nodeDriver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHx9fQogICB7eyNpZiAoZXEgc3RlcCAxKX19CiAgICA8ZGl2IGNsYXNzPSJib3ggbXQtMjAiPgogICAgICA8aDQ+QWNjb3VudCBBY2Nlc3M8L2g0PgoKICAgICAgPGRpdiBjbGFzcz0icm93IGlubGluZS1mb3JtIj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5BUEkgVG9rZW57e2ZpZWxkLXJlcXVpcmVkfX08L2xhYmVsPgogICAgICAgICAge3sjaW5wdXQtb3ItZGlzcGxheSBlZGl0YWJsZT0obm90IGRhdGFGZXRjaGVkKSB2YWx1ZT1tb2RlbC5saW5vZGVDb25maWcudG9rZW4gb2JmdXNjYXRlPXRydWV9fQogICAgICAgICAgICB7e2lucHV0IHR5cGU9InBhc3N3b3JkIiBuYW1lPSJwYXNzd29yZCIgdmFsdWU9bW9kZWwubGlub2RlQ29uZmlnLnRva2VuIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIgcGxhY2Vob2xkZXI9IllvdXIgTGlub2RlIEFQSXY0IFRva2VuIiB9fQogICAgICAgICAge3svaW5wdXQtb3ItZGlzcGxheX19CiAgICAgICAgICA8cCBjbGFzcz0idGV4dC1pbmZvIj5DcmVhdGUgYSBQZXJzb25hbCBBY2Nlc3MgVG9rZW4gdXNpbmcgdGhlCiAgICAgICAgICAgIDxhIHRhcmdldD0iX2JsYW5rIiBocmVmPSJodHRwczovL2Nsb3VkLmxpbm9kZS5jb20vcHJvZmlsZS90b2tlbnMiIHJlbD0ibm9mb2xsb3cgbm9yZWZlcnJlciBub29wZW5lciI+TGlub2RlIENsb3VkIE1hbmFnZXI8L2E+CiAgICAgICAgICA8L3A+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgICB7e3RvcC1lcnJvcnMgZXJyb3JzPWVycm9yc319CiAgICA8ZGl2IGNsYXNzPSJmb290ZXItYWN0aW9ucyI+CiAgICAgIHt7I2lmIGdldHRpbmdEYXRhfX0KICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYmctcHJpbWFyeSBidG4tZGlzYWJsZWQiPjxpIGNsYXNzPSJpY29uIGljb24tc3Bpbm5lciBpY29uLXNwaW4iPjwvaT4ge3t0ICdnZW5lcmljLmxvYWRpbmcnfX08L2J1dHRvbj4KICAgICAge3tlbHNlfX0KICAgICAgICA8YnV0dG9uIHt7YWN0aW9uICJhdXRoTGlub2RlIiB9fSBjbGFzcz0iYnRuIGJnLXByaW1hcnkiIGRpc2FibGVkPXt7bm90IG1vZGVsLmxpbm9kZUNvbmZpZy50b2tlbn19Pk5leHQ6IENvbmZpZ3VyZSBJbnN0YW5jZXM8L2J1dHRvbj4KICAgICAge3svaWZ9fQogICAgICA8YnV0dG9uIHt7YWN0aW9uICJjYW5jZWwifX0gY2xhc3M9ImJ0biBiZy10cmFuc3BhcmVudCI+e3t0ICdnZW5lcmljLmNhbmNlbCd9fTwvYnV0dG9uPgogICAgPC9kaXY+CiAge3tlbHNlfX0KICB7eyNhY2NvcmRpb24tbGlzdCBzaG93RXhwYW5kQWxsPWZhbHNlIGFzIHwgYWwgZXhwYW5kRm4gfH19CiAgICB7eyEtLSBUaGlzIGxpbmUgc2hvd3MgdGhlIGRyaXZlciB0aXRsZSB3aGljaCB5b3UgZG9uJ3QgaGF2ZSB0byBjaGFuZ2UgaXQgLS19fQogICAgPGRpdiBjbGFzcz0ib3Zlci1ociI+PHNwYW4+e3tkcml2ZXJPcHRpb25zVGl0bGV9fTwvc3Bhbj48L2Rpdj4KICAgICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbQogICAgICAgIHRpdGxlPSJJbnN0YW5jZSBPcHRpb25zIgogICAgICAgIGRldGFpbD0iQ29uZmlndXJlIHRoZSBvcHRpb25zIGZvciB0aGUgTGlub2RlIEluc3RhbmNlcyB0aGF0IHdpbGwgYmUgY3JlYXRlZCBieSB0aGlzIHRlbXBsYXRlLiIKICAgICAgICBleHBhbmRBbGw9ZXhwYW5kQWxsCiAgICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICAgICAgZXhwYW5kT25Jbml0PXRydWUKICAgICAgfX0KICAgICAge3shLS0gU3RhcnQgb2YgTGlub2RlIE9wdGlvbnMgLS19fQogICAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlJlZ2lvbjwvbGFiZWw+CiAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIgb25jaGFuZ2U9e3thY3Rpb24gKG11dCBtb2RlbC5saW5vZGVDb25maWcucmVnaW9uKSB2YWx1ZT0idGFyZ2V0LnZhbHVlIiB9fT4KICAgICAgICAgICAgICB7eyNlYWNoIHJlZ2lvbkNob2ljZXMgYXMgfGNob2ljZXx9fQogICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17e2Nob2ljZS5pZH19IHNlbGVjdGVkPXt7ZXEgbW9kZWwubGlub2RlQ29uZmlnLnJlZ2lvbiBjaG9pY2UuaWR9fT57e2Nob2ljZS5sYWJlbH19PC9vcHRpb24+CiAgICAgICAgICAgICAge3svZWFjaH19CiAgICAgICAgICAgIDwvc2VsZWN0PgogICAgICAgICAgPC9kaXY+CgogICAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5JbnN0YW5jZSBUeXBlPC9sYWJlbD4KICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17e2FjdGlvbiAobXV0IG1vZGVsLmxpbm9kZUNvbmZpZy5pbnN0YW5jZVR5cGUpIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19PgogICAgICAgICAgICAgIHt7I2VhY2ggc2l6ZUNob2ljZXMgYXMgfGNob2ljZXx9fQogICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17e2Nob2ljZS5pZH19IHNlbGVjdGVkPXt7ZXEgbW9kZWwubGlub2RlQ29uZmlnLmluc3RhbmNlVHlwZSBjaG9pY2UuaWR9fT57e2Nob2ljZS5sYWJlbH19IC0ge3tjaG9pY2UudmNwdXN9fSB2Q1BVcywge3tjaG9pY2UubWVtb3J5fX1HQiBNZW1vcnksIHt7Y2hvaWNlLmRpc2t9fUdCIERpc2sgc3BhY2U8L29wdGlvbj4KICAgICAgICAgICAgICB7ey9lYWNofX0KICAgICAgICAgICAgPC9zZWxlY3Q+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5JbWFnZTwvbGFiZWw+CiAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIgb25jaGFuZ2U9e3thY3Rpb24gKG11dCBtb2RlbC5saW5vZGVDb25maWcuaW1hZ2UpIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19PgogICAgICAgICAgICAgIHt7I2VhY2ggaW1hZ2VDaG9pY2VzIGFzIHxjaG9pY2V8fX0KICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3tjaG9pY2UuaWR9fSBzZWxlY3RlZD17e2VxIG1vZGVsLmxpbm9kZUNvbmZpZy5pbWFnZSBjaG9pY2UuaWR9fT57e2Nob2ljZS5sYWJlbH19PC9vcHRpb24+CiAgICAgICAgICAgICAge3svZWFjaH19CiAgICAgICAgICAgIDwvc2VsZWN0PgogICAgICAgICAgPC9kaXY+CiAgICAgICAgICB7eyN1bmxlc3MgcHJvZmlsZS5yZXN0cmljdGVkIH19CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5UYWdzPC9sYWJlbD4KICAgICAgICAgICAgICB7eyBpbnB1dCBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiIHBsYWNlaG9sZGVyPSJFeGFtcGxlczogdGFnQSwgdGFnQiwgdGFnQyIgdmFsdWU9bW9kZWwubGlub2RlQ29uZmlnLnRhZ3MgfX0KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICB7ey91bmxlc3N9fQogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlByaXZhdGUgSVA8L2xhYmVsPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJjaGVja2JveCI+CiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPnt7aW5wdXQgdHlwZT0iY2hlY2tib3giIGNoZWNrZWQ9bW9kZWwubGlub2RlQ29uZmlnLmNyZWF0ZVByaXZhdGVJcH19IEFkZCBhIFByaXZhdGUgSVA8L2xhYmVsPgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KICAgICAge3shLS0gRW5kIG9mIExpbm9kZSBPcHRpb25zIC0tfX0KICAgICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbQogICAgICAgIHRpdGxlPSJBdXRoZW50aWNhdGlvbiIKICAgICAgICBkZXRhaWw9IkNvbmZpZ3VyZSBMaW5vZGUgdXNlciBTU0ggS2V5cyBhbmQgYSBwYXNzd29yZCBmb3IgdGhlICdyb290JyB1c2VyIGFjY291bnQiCiAgICAgICAgZXhwYW5kQWxsPWV4cGFuZEFsbAogICAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgICAgIGV4cGFuZE9uSW5pdD1mYWxzZQogICAgICB9fQogICAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0xMiI+CiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5QYXNzd29yZCBmb3IgdGhlICJyb290IiB1c2VyPC9sYWJlbD4KICAgICAgICAgICAge3sgaW5wdXQKICAgICAgICAgICAgICB0eXBlPSJwYXNzd29yZCIKICAgICAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgdmFsdWU9bW9kZWwubGlub2RlQ29uZmlnLnJvb3RQYXNzCiAgICAgICAgICAgIH19CiAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTEyIj4KICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkxpbm9kZSBVc2VybmFtZXM8L2xhYmVsPgogICAgICAgICAgICB7eyBpbnB1dCBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiIHBsYWNlaG9sZGVyPSJ5b3VydXNlcm5hbWUiIHZhbHVlPW1vZGVsLmxpbm9kZUNvbmZpZy5hdXRob3JpemVkVXNlcnMgfX0KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KICAgICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbQogICAgICAgIHRpdGxlPSJTdGFja1NjcmlwdHMiCiAgICAgICAgZGV0YWlsPSJDb25maWd1cmUgYSBTdGFja1NjcmlwdCB0byBydW4gb24gZmlyc3QgYm9vdCIKICAgICAgICBleHBhbmRBbGw9ZXhwYW5kQWxsCiAgICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICAgICAgZXhwYW5kT25Jbml0PWZhbHNlCiAgICAgIH19CiAgICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTEyIj4KICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlN0YWNrU2NyaXB0ICg8YSBocmVmPSJodHRwczovL2Nsb3VkLmxpbm9kZS5jb20vc3RhY2tzY3JpcHRzIiB0YXJnZXQ9Il9ibGFuayIgcmVsPSJub2ZvbGxvdyBub3JlZmVycmVyIG5vb3BlbmVyIj5tYW5hZ2UgeW91ciBTdGFja1NjcmlwdHM8L2E+KTwvbGFiZWw+CiAgICAgICAgICAgIHt7IGlucHV0CiAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgcGxhY2Vob2xkZXI9IkV4YW1wbGVzOiAndXNlcm5hbWUvU3RhY2tzY3JpcHQgTGFiZWwnIG9yICcxMjM0NSciCiAgICAgICAgICAgIHZhbHVlPW1vZGVsLmxpbm9kZUNvbmZpZy5zdGFja3NjcmlwdAogICAgICAgICAgICB9fQogICAgICAgICAgPC9kaXY+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0xMiI+CiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5TdGFja1NjcmlwdCBWYXJpYWJsZXM8L2xhYmVsPgogICAgICAgICAgICB7eyB0ZXh0YXJlYSBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiIHBsYWNlaG9sZGVyPSd7ICJleGFtcGxlIjogInZhbHVlIiwgImpzb24iOiB0cnVlIH0nIHZhbHVlPW1vZGVsLmxpbm9kZUNvbmZpZy5zdGFja3NjcmlwdERhdGEgfX0KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KICAgICAge3shLS0gRW5kIG9mIExpbm9kZSBPcHRpb25zIC0tfX0KCiAgICB7eyEtLSBUaGlzIGZvbGxvd2luZyBjb250YWlucyB0aGUgTmFtZSwgTGFiZWxzIGFuZCBFbmdpbmUgT3B0aW9ucyBmaWVsZHMgLS19fQogICAgPGRpdiBjbGFzcz0ib3Zlci1ociI+PHNwYW4+e3t0ZW1wbGF0ZU9wdGlvbnNUaXRsZX19PC9zcGFuPjwvZGl2PgoKICAgIHt7Zm9ybS1uYW1lLWRlc2NyaXB0aW9uCiAgICAgIG1vZGVsPW1vZGVsCiAgICAgIG5hbWVSZXF1aXJlZD10cnVlCiAgICB9fQoKICAgIHt7Zm9ybS11c2VyLWxhYmVscwogICAgICBpbml0aWFsTGFiZWxzPWxhYmVsUmVzb3VyY2UubGFiZWxzCiAgICAgIHNldExhYmVscz0oYWN0aW9uICdzZXRMYWJlbHMnKQogICAgICBleHBhbmRBbGw9ZXhwYW5kQWxsCiAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgfX0KCiAgICB7e2Zvcm0tZW5naW5lLW9wdHMKICAgICAgbWFjaGluZT1tb2RlbAogICAgICBzaG93RW5naW5lVXJsPXNob3dFbmdpbmVVcmwKICAgIH19CiAge3svYWNjb3JkaW9uLWxpc3R9fQoKCiAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgZXJyb3JzIHByb2R1Y2VkIGJ5IHZhbGlkYXRlKCkgaW4gdGhlIGNvbXBvbmVudCAtLX19CiAge3t0b3AtZXJyb3JzIGVycm9ycz1lcnJvcnN9fQoKICB7eyEtLSBUaGlzIGNvbXBvbmVudCBzaG93cyB0aGUgQ3JlYXRlIGFuZCBDYW5jZWwgYnV0dG9ucyAtLX19CiAge3tzYXZlLWNhbmNlbCBzYXZlPSJzYXZlIiBjYW5jZWw9ImNhbmNlbCJ9fQogIHt7L2lmfX0KICB7ey9hY2NvcmRpb24tbGlzdH19Cjwvc2VjdGlvbj4K";

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
    step: 1,
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

      if (get(errors, 'length')) {
        set(this, 'errors', errors);
        return false;
      } else {
        set(this, 'errors', null);
        return true;
      }
    },

    actions: {
      authLinode: function authLinode() {
        this.set('gettingData', true);
        var that = this;
        Promise.all([this.apiRequest('/v4/profile')]).then(function (responses) {
          that.setProperties({
            errors: [],
            step: 2,
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
              step: 1
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
/*!!!!!!!!!!!Do not change anything between here (the DRIVERNAME placeholder will be automatically replaced at buildtime)!!!!!!!!!!!*/
import NodeDriver from 'shared/mixins/node-driver';

// do not remove LAYOUT, it is replaced at build time with a base64 representation of the template of the hbs template
// we do this to avoid converting template to a js file that returns a string and the cors issues that would come along with that
const LAYOUT;
/*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/


/*!!!!!!!!!!!GLOBAL CONST START!!!!!!!!!!!*/
// EMBER API Access - if you need access to any of the Ember API's add them here in the same manner rather then import them via modules, since the dependencies exist in rancher we dont want to expor the modules in the amd def
const computed = Ember.computed;
const get = Ember.get;
const set = Ember.set;
const alias = Ember.computed.alias;
const service = Ember.inject.service;
const observer = Ember.observer;

const defaultRadix = 10;
const defaultBase = 1024;
/*!!!!!!!!!!!GLOBAL CONST END!!!!!!!!!!!*/



/*!!!!!!!!!!!DO NOT CHANGE START!!!!!!!!!!!*/
export default Ember.Component.extend(NodeDriver, {
driverName: '%%DRIVERNAME%%',
needAPIToken: true,
config: alias('model.%%DRIVERNAME%%Config'),
app: service(),

init() {
  // This does on the fly template compiling, if you mess with this :cry:
  const decodedLayout = window.atob(LAYOUT);
  const template = Ember.HTMLBars.compile(decodedLayout, {
    moduleName: 'nodes/components/driver-%%DRIVERNAME%%/template'
  });
  set(this, 'layout', template);

  this._super(...arguments);

},
/*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/

// Write your component here, starting with setting 'model' to a machine with your config populated
bootstrap: function () {
  // bootstrap is called by rancher ui on 'init', you're better off doing your setup here rather then the init function to ensure everything is setup correctly
  let config = get(this, 'globalStore').createRecord({
    type: '%%DRIVERNAME%%Config',
    token: null,
    instanceType: 'g6-standard-4', // 4 GB Ram
    region: 'us-east', // Newark
    image: 'linode/ubuntu16.04lts',
    uaPrefix: 'Rancher',
    tags: '',
    authorizedUsers: '',
    createPrivateIp: true,
    stackscript: '',
    stackscriptData: '',
    rootPass: null,
  });

  set(this, 'model.%%DRIVERNAME%%Config', config);
},

// Add custom validation beyond what can be done from the config API schema
validate() {
  // Get generic API validation errors
  this._super();
  var errors = get(this, 'errors') || [];
  if (!get(this, 'model.name')) {
    errors.push('Name is required');
  }

  if (!this.get('model.%%DRIVERNAME%%Config.instanceType') ) {
    errors.push('Specifying a %%DRIVERNAME%% Instance Type is required');
  }

  if (!this.get('model.%%DRIVERNAME%%Config.image') ) {
    errors.push('Specifying a %%DRIVERNAME%% Image is required');
  }

  if (!this.get('model.%%DRIVERNAME%%Config.region') ) {
    errors.push('Specifying a %%DRIVERNAME%% Region is required');
  }

  // Set the array of errors for display,
  // and return true if saving should continue.
  if (get(errors, 'length')) {
    set(this, 'errors', errors);
    return false;
  } else {
    set(this, 'errors', null);
    return true;
  }
},
// Any computed properties or custom logic can go here
actions: {
  getData() {
    this.set('gettingData', true);
    let that = this;
    Promise.all([this.apiRequest('/v4/profile')]).then(function (responses) {
      that.setProperties({
        errors: [],
        needAPIToken: false,
        restricted: responses[0].restricted,
      })
    }).then(function () {

      Promise.all([that.apiRequest('/v4/regions'), that.apiRequest('/v4/images'), that.apiRequest('/v4/linode/types')]).then(function (responses) {
        that.setProperties({
          errors: [],
          gettingData: false,
          regionChoices: responses[0].data.map(region => { region.label = region.id.slice(0,4).toUpperCase() + region.id.slice(4) + " (" + region.country.toUpperCase() + ")";  return region }).sort((a,b)=>String.prototype.localeCompare(a,b)),
          imageChoices: responses[1].data.filter(image => /^linode.(ubuntu18.04|ubuntu16.04|debian9)/.test(image.id)),
          sizeChoices: responses[2].data.filter(size => !/nanode/.test(size.id)).map(image => { image.disk/=1024; image.memory/=1024; return image } ),
        })
      }).catch(function (err) {
          err.then(function (msg) {
            that.setProperties({
              errors: ['Error received from Linode: ' + msg.errors[0].reason ],
              gettingData: false,
            });
          });
      });

    }).catch(function (err) {
      err.then(function (msg) {
        that.setProperties({
          errors: ['Error received from Linode: ' + msg.errors[0].reason ],
          gettingData: false,
          needAPIToken: true,
        });
      });
    });
  },
},
apiRequest: function (path) {
  return fetch('https://api.linode.com' + path, {
    headers: {
      'Authorization': 'Bearer ' + this.get('model.%%DRIVERNAME%%Config.token'),
    },
  }).then(res => res.ok ? res.json() : Promise.reject(res.json()));
},
});

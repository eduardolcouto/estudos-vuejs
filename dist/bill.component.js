"use strict";

window.billComponent = Vue.extend({
  template: "\n              <nav class=\"navbar navbar-default\">\n              <div class=\"container-fluid\">\n                <div class=\"navbar-header\">\n                  <a class=\"navbar-brand\" href=\"#\">\n                    Brand\n                  </a>\n                </div>\n                <div class=\"collapse navbar-collapse\" >\n                  <ul class=\"nav navbar-nav\">\n                    <li  v-for=\"o in menus\" >\n                      <a v-link=\"{name: o.routeName}\">{{o.name}}</a>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n            </nav>\n          <router-view></router-view>\n  ",
  data: function data() {
    return {
      menus: [{ name: "Contas a Pagar", routeName: 'bill-pay.list' }, { name: "Contas a Receber", routeName: 'bill-receive.list' }]
    };
  }
});
"use strict";

window.billComponent = Vue.extend({
  template: "\n      <style>\n          .semContasCadastradas{\n            color: cyan;\n          }\n\n          .semContasDevidas, .pago{\n            color: green;\n          }\n\n          .comConstasDevidas, .naoPago{\n            color: red;\n          }\n      </style>\n\n            <ul class=\"nav navbar-nav\">\n              <li  v-for=\"o in menus\" >\n                <a v-link=\"{name: o.routeName}\">{{o.name}}</a>\n              </li>\n            </ul>\n          <router-view></router-view>\n  ",
  data: function data() {
    return {
      menus: [{ name: "Contas a Pagar", routeName: 'bill-pay.list' }, { name: "Contas a Receber", routeName: 'bill-receive.list' }]
    };
  }
});
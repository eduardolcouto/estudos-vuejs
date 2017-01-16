"use strict";

window.billPayMenuComponent = Vue.extend({
  template: "\n          <nav>\n            <ul v-for=\"o in menus\">\n              <li >\n                <a v-link=\"{name: o.routeName}\" >{{o.name}}</a>\n              </li>\n            </ul>\n          </nav>\n  ",
  data: function data() {
    return {
      menus: [
      // {id:0, name: "Listar Contas", url:'/bills'},
      // {id:1, name: "Criar Conta", url: '/bill/create'},
      { id: 0, name: "Listar Contas", routeName: 'bill-pay.list' }, { id: 1, name: "Criar Conta", routeName: 'bill-pay.create' }]
    };
  }
});
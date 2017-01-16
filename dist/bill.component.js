'use strict';

window.billComponent = Vue.extend({
  template: '\n      <ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropDown">\n        <li v-for="item in o.items">\n          <a v-link="{name: item.routeName}" >{{item.name}}</a>\n        </li>\n      </ul>\n\n      <div class="navbar-fixed">\n          <nav>\n            <div class="nav-wrapper">\n              <div class="row">\n                <div class="col s12">\n                  <a href="#" class="brand-logo right">Logo</a>\n                  <a href="#" data-activates="nav-mobile" class="button-collapse">\n                    <i class="material-icons">menu</i>\n                  </a>\n\n                  <ul  class="left left hide-on-med-and-down">\n                      <li  v-for="o in menus">\n                        <a v-if="o.dropdonwID" class="dropdown-button" href="!#" v-bind:data-activates="o.dropdonwID">\n                          {{o.name}} <i class="material-icons right">arrow_drop_down</i>\n                        </a>\n                        <a v-else v-link="{name: o.routeName}">{{o.name}}</a>\n                      </li>\n                   </ul>\n\n                  <ul id="nav-mobile" class="side-nav">\n                      <li  v-for="o in menus" >\n                        <a v-link="{name: o.routeName}">{{o.name}}</a>\n                      </li>\n                  </ul>\n\n                 </div>\n               </div>\n            </div>\n          </nav>\n     </div>\n          <router-view></router-view>\n  ',
  created: function created() {
    $(document).ready(function () {
      $('.button-collapse').sideNav();
      $('.dropdown-button').dropdown();
    });
  },
  data: function data() {
    return {
      menus: [{ name: "Contas a Pagar", routeName: 'bill-pay.list', dropdonwID: 'bill-pay' }, { name: "Contas a Receber", routeName: 'bill-receive.list', dropdonwID: 'bill-receive' }],
      menusDropDown: [{
        id: 'bill-pay', items: [{ id: 0, name: "Listar Contas", routeName: 'bill-pay.list' }, { id: 1, name: "Criar Conta", routeName: 'bill-pay.create' }]
      }, {
        id: 'bill-receive', items: [{ id: 0, name: "Listar Contas", routeName: 'bill-receive.list' }, { id: 1, name: "Criar Conta", routeName: 'bill-receive.create' }]
      }]
    };
  }
});
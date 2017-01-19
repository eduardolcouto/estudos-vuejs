'use strict';

window.billComponent = Vue.extend({
  template: '\n<ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropDown">\n  <li v-for="item in o.items">\n    <a v-link="{name: item.routeName}"> {{item.name}} </a>\n  </li>\n</ul>\n\n<div class="navbar-fixed">\n  <nav class="">\n    <div class="nav-wrapper">\n      <div class="row">\n        <div class="col s12">\n          <a href="#" class = "brand-logo right">Logo</a>\n          <a href="#" data-activates="nav-mobile" class="button-collapse">\n            <i class="material-icons">menu</i>\n          </a>\n          <ul  class="left hide-on-med-and-down">\n            <li v-for="o in menus">\n                  <a class="dropdown-button" href="!#" v-bind:data-activates="o.dropdonwId">\n                      {{o.name}}\n                      <i class="material-icons right">arrow_drop_down</i>\n                  </a>\n            </li>\n          </ul>\n          <ul id="nav-mobile" class="side-nav">\n            <li v-for="o in menus">\n              <a class="dropdown-button" v-link="{name: o.routeName}">\n                  {{o.name}}\n              </a>\n            </li>\n          </ul>\n        </div><!-- col s12-->\n      </div><!-- row -->\n    </div><!-- nav-wrapper-->\n  </nav>\n</div><!-- navbar-fixed-->\n\n<router-view></router-view>\n  ',
  created: function created() {
    $(document).ready(function () {
      $('.button-collapse').sideNav();
      $('.dropdown-button').dropdown();
    });
  },
  data: function data() {
    return {
      menus: [{ name: 'Contas a Pagar', routeName: 'bill-pay.list', dropdonwId: 'bill-pay' }, { name: 'Contas a Receber', routeName: 'bill-receive.list', dropdonwId: 'bill-receive' }],
      menusDropDown: [{
        id: 'bill-pay', items: [{ id: 0, name: 'Listar Contas', routeName: 'bill-pay.list' }, { id: 1, name: 'Criar Conta', routeName: 'bill-pay.create' }]
      }, {
        id: 'bill-receive', items: [{ id: 0, name: 'Listar Contas', routeName: 'bill-receive.list' }, { id: 1, name: 'Criar Conta', routeName: 'bill-receive.create' }]
      }]
    };
  }
});
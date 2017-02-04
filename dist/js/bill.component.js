'use strict';

window.billComponent = Vue.extend({
  template: '\n<ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropDown">\n  <li v-for="item in o.items">\n    <a v-link="{name: item.routeName}"> {{item.name}} </a>\n  </li>\n</ul>\n<header>\n  <nav class="top-nav" :class="colorBase">\n    <div class="">\n      <div class="nav-wrapper">\n        <a class="page-title right">Controle Financeiro</a>\n      </div>\n      <div class="container">\n        <a href="#" data-activates="nav-mobile" class="button-collapse full hide-on-large-only">\n          <i class="material-icons">menu</i>\n        </a>\n      </div>\n    </div>\n  </nav>\n<ul id="nav-mobile" class="side-nav fixed">\n  <li>\n    <div class="userView">\n      <div class="background">\n        <img src="dist/img/bg.jpg">\n      </div>\n      <a href="#!user"><img class="circle" src="http://www.gravatar.com/avatar/d82d96deac93f5fa1fb48cb4b3c75961.jpg"></a>\n      <a href="#!name"><span class="white-text name">Eduardo Couto</span></a>\n      <a href="#!email"><span class="white-text email">eduardo.lcouto@gmail.com</span></a>\n    </div>\n  </li>\n  <li>\n    <ul class="collapsible" data-collapsible="accordion">\n      <li v-for="menu in menuSideNav">\n        <div class="collapsible-header" v-bind:class="menu.colorBase"><i class="material-icons">{{menu.icon}}</i>{{menu.name}}</div>\n        <div class="collapsible-body"  v-for="subMenu in menu.subMenu">\n          <a  href="#" @click.prevent="carregarPagina(subMenu.routeName, menu.colorBase)" > {{subMenu.name}} </a>\n        </ul>\n      </li>\n      <!--<li>\n        <div class="collapsible-header"><i class="material-icons">assessment</i>Relat\xF3rio</div>\n        <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>\n      </li>-->\n    </ul>\n  </li>\n</ul>\n</header>\n<main>\n  <router-view></router-view>\n</main>\n\n\n  ',
  created: function created() {
    $(document).ready(function () {
      $('.button-collapse').sideNav();
      $('.dropdown-button').dropdown();
    });
  },

  methods: {
    carregarPagina: function carregarPagina(rota, colorBase) {
      this.colorBase = colorBase;
      this.$router.go({ name: rota });
    }
  },
  data: function data() {
    return {
      colorBase: '',
      menus: [{ name: 'Contas a Pagar', routeName: 'bill-pay.list', dropdonwId: 'bill-pay' }, { name: 'Contas a Receber', routeName: 'bill-receive.list', dropdonwId: 'bill-receive' }],
      menusDropDown: [{
        id: 'bill-pay', items: [{ id: 0, name: 'Listar Contas', routeName: 'bill-pay.list' }, { id: 1, name: 'Criar Conta', routeName: 'bill-pay.create' }]
      }, {
        id: 'bill-receive', items: [{ id: 0, name: 'Listar Contas', routeName: 'bill-receive.list' }, { id: 1, name: 'Criar Conta', routeName: 'bill-receive.create' }]
      }],
      menuSideNav: [{
        name: 'Contas a Pagar',
        routeName: 'bill-pay.list',
        dropdonwId: 'bill-pay',
        icon: 'call_made',
        colorBase: 'red darken-1',
        subMenu: [{ id: 0, name: 'Listar Contas', routeName: 'bill-pay.list' }, { id: 1, name: 'Criar Conta', routeName: 'bill-pay.create' }] }, {
        name: 'Contas a Receber',
        routeName: 'bill-receive.list',
        dropdonwId: 'bill-receive',
        icon: 'call_received',
        colorBase: 'green lighten-2',
        subMenu: [{ id: 0, name: 'Listar Contas', routeName: 'bill-receive.list' }, { id: 1, name: 'Criar Conta', routeName: 'bill-receive.create' }] }]

    };
  }
});
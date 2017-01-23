window.billComponent = Vue.extend({
  template: `
<header>
  <nav class="top-nav">
    <div class="container">
      <div class="nav-wrapper">
        <a class="page-title">Controle Financeiro</a>
      </div>
      <div class="container">
        <a href="#" data-activates="nav-mobile" class="button-collapse full hide-on-large-only">
          <i class="material-icons">menu</i>
        </a>
      </div>
    </div>
  </nav>

<ul id="nav-mobile" class="side-nav fixed">
  <li>
    <div class="userView">
      <div class="background">
        <img src="dist/img/bg.jpg">
      </div>
      <a href="#!user"><img class="circle" src="http://www.gravatar.com/avatar/d82d96deac93f5fa1fb48cb4b3c75961.jpg"></a>
      <a href="#!name"><span class="white-text name">Eduardo Couto</span></a>
      <a href="#!email"><span class="white-text email">eduardo.lcouto@gmail.com</span></a>
    </div>
  </li>
  <li>
    <ul class="collapsible" data-collapsible="accordion">
      <li v-for="menu in menuSideNav">
        <div class="collapsible-header"><i class="material-icons">call_received</i>{{menu.name}}</div>
        <div class="collapsible-body"  v-for="subMenu in menu.subMenu">
          <a v-link="{name: subMenu.routeName}" > {{subMenu.name}} </a>
        </ul>

      </li>
      <li>
        <div class="collapsible-header"><i class="material-icons">assessment</i>Relatório</div>
        <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
      </li>
    </ul>
  </li>
</ul>
</header>
<main>
  <div class="">
    <router-view></router-view>
  </div>
</main>
  `,
  created(){
    $(document).ready(function(){
        $('.button-collapse').sideNav();
        $('.dropdown-button').dropdown();
    });
  },
  data(){
    return {
      menus:[
        {name: 'Contas a Pagar', routeName:'bill-pay.list', dropdonwId: 'bill-pay'},
        {name: 'Contas a Receber', routeName: 'bill-receive.list', dropdonwId: 'bill-receive'},
      ],
      menusDropDown:[
        {
          id: 'bill-pay', items:[
            {id:0, name: 'Listar Contas', routeName:'bill-pay.list'},
            {id:1, name: 'Criar Conta', routeName: 'bill-pay.create'},
          ]
        },
        {
          id: 'bill-receive', items:[
            {id:0, name: 'Listar Contas', routeName:'bill-receive.list'},
            {id:1, name: 'Criar Conta', routeName: 'bill-receive.create'},
          ]
        },
      ],
      menuSideNav:[
        {name: 'Contas a Pagar', routeName:'bill-pay.list', dropdonwId: 'bill-pay', subMenu:[
          {id:0, name: 'Listar Contas', routeName:'bill-pay.list'},
          {id:1, name: 'Criar Conta', routeName: 'bill-pay.create'}
        ]},
        {name: 'Contas a Receber', routeName: 'bill-receive.list', dropdonwId: 'bill-receive', subMenu:[
          {id:0, name: 'Listar Contas', routeName:'bill-receive.list'},
          {id:1, name: 'Criar Conta', routeName: 'bill-receive.create'},
        ]},
      ]
    };
  }
});

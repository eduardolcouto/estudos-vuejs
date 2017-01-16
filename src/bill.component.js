window.billComponent = Vue.extend({
  template: `
      <ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropDown">
        <li v-for="item in o.items">
          <a v-link="{name: item.routeName}" >{{item.name}}</a>
        </li>
      </ul>

     
     <nav>
      <div class="nav-wrapper">
        <div class="row">
          <div class="col s12">
            <a href="#" class = "brand-logo right">Logo</a>
            <a href="#" data-activates="nav-mobile" class="button-collapse">
              <i class="material-icons">menu</i>
            </a>
            <ul  class="left hide-on-med-and-down">
              <li v-for="o in menus">
                <a class="dropdown-button" href="!#" v-bind:data-activates="o.dropdonwId">
                    {{o.name}} <i class="material-icons">arrow_drop_down</i>
                </a> 
              </li>
            </ul>
  
            <ul id="nav-mobile" class="side-nav">
              <li v-for="o in menus">
                <a class="dropdown-button" v-link="{name: o.routeName}">
                    {{o.name}}
                </a> 
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <router-view></router-view>
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
    };
  }
});

window.billPayMenuComponent = Vue.extend({
  template: `
          <nav>
            <ul v-for="o in menus">
              <li >
                <a v-link="{name: o.routeName}" :class="{'btn btn-primary':o.id == 0, 'btn btn-success': o.id == 1}">{{o.name}}</a>
              </li>
            </ul>
          </nav>
  `,
  data: function(){
    return {
      menus:[
        // {id:0, name: "Listar Contas", url:'/bills'},
        // {id:1, name: "Criar Conta", url: '/bill/create'},
        {id:0, name: "Listar Contas", routeName:'bill.list'},
        {id:1, name: "Criar Conta", routeName: 'bill.create'},
      ],
    };
  }
});

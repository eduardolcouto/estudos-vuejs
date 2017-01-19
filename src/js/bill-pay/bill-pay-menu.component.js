window.billPayMenuComponent = Vue.extend({
  template: `
          <nav>
            <ul v-for="o in menus">
              <li >
                <a v-link="{name: o.routeName}" >{{o.name}}</a>
              </li>
            </ul>
          </nav>
  `,
  data(){
    return {
      menus:[
        // {id:0, name: "Listar Contas", url:'/bills'},
        // {id:1, name: "Criar Conta", url: '/bill/create'},
        {id:0, name: "Listar Contas", routeName:'bill-pay.list'},
        {id:1, name: "Criar Conta", routeName: 'bill-pay.create'},
      ],
    };
  }
});

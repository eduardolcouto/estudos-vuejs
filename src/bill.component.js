window.billComponent = Vue.extend({
  template: `
      <style>
          .semContasCadastradas{
            color: cyan;
          }

          .semContasDevidas, .pago{
            color: green;
          }

          .comConstasDevidas, .naoPago{
            color: red;
          }
      </style>

            <ul class="nav navbar-nav">
              <li  v-for="o in menus" >
                <a v-link="{name: o.routeName}">{{o.name}}</a>
              </li>
            </ul>
          <router-view></router-view>
  `,
  data(){
    return {
      menus:[
        {name: "Contas a Pagar", routeName:'bill-pay.list'},
        {name: "Contas a Receber", routeName: 'bill-receive.list'},
      ],
    };
  }
});

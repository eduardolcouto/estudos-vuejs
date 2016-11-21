window.billComponent = Vue.extend({
  template: `
              <nav class="navbar navbar-default">
              <div class="container-fluid">
                <div class="navbar-header">
                  <a class="navbar-brand" href="#">
                    Brand
                  </a>
                </div>
                <div class="collapse navbar-collapse" >
                  <ul class="nav navbar-nav">
                    <li  v-for="o in menus" >
                      <a v-link="{name: o.routeName}">{{o.name}}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          <router-view></router-view>
  `,
  data: function(){
    return {
      menus:[
        {name: "Contas a Pagar", routeName:'bill.list'},
        {name: "Contas a Receber", routeName: 'bill.create'},
      ],
    };
  }
});

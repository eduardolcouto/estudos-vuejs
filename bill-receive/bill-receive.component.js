window.billReceiveComponent = Vue.extend({
  // components:{
  //   'menu-component': billPayMenuComponent,
  // },
  template: `<div class="container">
                <h1>{{ title }}</h1>
                <router-view></router-view>
            </div>`,
    data:function(){
        return {
            title: 'Contas a Receber'
      };
    },

});

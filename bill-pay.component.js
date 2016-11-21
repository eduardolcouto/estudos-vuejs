window.billPayComponent = Vue.extend({
  components:{
    'menu-component': billPayMenuComponent,
  },
  template: `<div class="container">
                <h1>{{ title }}</h1>
                <h3 :class="{'text-muted': status === false, 'text-success': status === 0, 'text-danger': status > 0}">
                  {{ status | statusGeneral}}
                </h3>
                <menu-component></menu-component>
                <router-view></router-view>
            </div>`,
    data:function(){
        return {
            title: 'Contas a pagar',
            count: 0,
      };
    },
    computed:{
      status: function(){
        var count = 0;
        var billListComponent = this.$root.$children[0];
        if(billListComponent.billsPay.length == 0){
          return false;
        }
        for(var i in billListComponent.billsPay){
          if (!billListComponent.billsPay[i].done) {
            count++;
          }
        }
        return count;
      },
  }
});

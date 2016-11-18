window.appComponent = Vue.extend({
  components:{
    'menu-component': menuComponent,
    'bill-list-component': billListComponent,
    'bill-create-component': billCreateComponent
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
        var billListComponent = this.$refs.billListComponent;
        if(billListComponent.bills.length == 0){
          return false;
        }
        for(var i in billListComponent.bills){
          if (!billListComponent.bills[i].done) {
            count++;
          }
        }
        return count;
      },
  },
  methods:{},
  events:{
    'change-bill': function(bill){
      this.$broadcast('change-bill',bill);
    }
  }
});
Vue.component('app-component', appComponent);

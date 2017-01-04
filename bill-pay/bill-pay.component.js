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
    http:{
      root:'http://127.0.0.1:8888/api',
    },
    data:function(){
        return {
            title: 'Contas a pagar',
            count: 0,
            status: 0,
      };
    },
  methods:{
    calculateStatus: function(bills){
      var count = 0;
            if(!bills.length){
              this.status = false;
            }
            for(var i in bills){
              if (!bills[i].done) {
                count++;
              }
            }
            this.status = count;
    },
    updateStatus: function(){
      this.$http.get('bills').then(function(response){
        this.calculateStatus(response.data);
      });
    }
  },

created: function() {
    this.updateStatus();
 },

 events:{
   'change-status': function(){
     this.updateStatus();
   }
 }
});

window.billReceiveComponent = Vue.extend({
  components:{
    'menu-component': billReceiveMenuComponent,
  },
  template: `<div class="container">
                <h1>{{ title }}</h1>
                <h3 :class="{'text-muted': status === false, 'text-success': status === 0, 'text-danger': status > 0}">
                  {{ status | statusGeneral}}
                </h3>
                <h3>
                  {{total | currency 'R$ '}}
                </h3>
                <menu-component></menu-component>
                <router-view></router-view>
            </div>`,

    data:function(){
        return {
            title: 'Contas a Receber',
            count: 0,
            status: 0,
            total: 0,
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
      var self = this;
      Receive.query().then(function(response){
        self.calculateStatus(response.data);
      });
    },

    updateTotal: function(){
      var self = this;
      Receive.total().then(function(response){
        self.total = response.data.total;
      });
    }
  },

created: function() {
    this.updateStatus();
    this.updateTotal();
 },

 events:{
   'change-info': function(){
     this.updateStatus();
     this.updateTotal();
   }
 }
});

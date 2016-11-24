window.dashboardComponent = Vue.extend({
  template: `
              <div class="container-fluid">
              <div class="well">
              <h2>Saldo total da Conta</h2>
              <h3>{{saldo | currency 'R$ '}}</h3>
              </div>
              </div>
  `,
  computed:{
      saldo: function(){
        var saldo = 0;
        var billListComponent = this.$root.$children[0];
        if(billListComponent.billsPay.length == 0){
          return saldo;
        }
        for(var i in billListComponent.billsPay){
            saldo += billListComponent.billsPay[i].value ;
        return saldo;
      }
  }
}
});

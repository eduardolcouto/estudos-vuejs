"use strict";

window.dashboardComponent = Vue.extend({
  template: "\n              <div class=\"container-fluid\">\n              <div class=\"well\">\n              <h2>Saldo total da Conta</h2>\n              <h3>{{saldo | currency 'R$ '}}</h3>\n              </div>\n              </div>\n  ",
  computed: {
    saldo: function saldo() {
      var saldo = 0;
      var billListComponent = this.$root.$children[0];
      if (billListComponent.billsPay.length == 0) {
        return saldo;
      }
      for (var i in billListComponent.billsPay) {
        saldo += billListComponent.billsPay[i].value;
        return saldo;
      }
    }
  }
});
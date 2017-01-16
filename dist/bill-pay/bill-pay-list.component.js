"use strict";

window.billPayListComponent = Vue.extend({
  template: "\n        <div class=\"container\">\n            <table>\n              <thead>\n                <tr>\n                  <th>#</th>\n                  <th>Date</th>\n                  <th>Descripton</th>\n                  <th>Value</th>\n                  <th>Done?</th>\n                  <th>A\xE7\xE3o</th>\n                </tr>\n                </thead>\n                <tbody>\n                  <tr v-for=\"(index, bill) in bills\">\n                    <td>{{index+1}}</td>\n                    <td>{{bill.date_due | formatDate}}</td>\n                    <td>{{bill.name | formatString}}</td>\n                    <td>{{bill.value | formatNumber}}</td>\n                    <td :class=\"{'pago': bill.done, 'naoPago': !bill.done}\">\n                      {{bill.done | doneLabel }}\n                    </td>\n                    <td>\n                      <a v-link=\"{name: 'bill-pay.update',params: {id:bill.id} }\" >Editar</a>\n                      <a href=\"#\" @click.prevent=\"removeBill(index, bill)\">Remover</a>\n                    </td>\n                  </tr>\n                </tbody>\n    \n            </table>\n        <div>\n  ",
  data: function data() {
    return {
      bills: []
    };
  },

  methods: {
    removeBill: function removeBill(index, bill) {
      var _this = this;

      var remove = confirm("Deseja realmente excluir a conta?");
      if (remove) {
        Bill.delete({ id: bill.id }).then(function () {
          _this.bills.$remove(bill);
          _this.$dispatch('change-info');
        });
      }
    }
  },
  created: function created() {
    var _this2 = this;

    Bill.query().then(function (response) {
      _this2.bills = response.data;
    });
  }
});
"use strict";

window.billPayListComponent = Vue.extend({
  template: "\n        <table class=\"table\">\n          <thead>\n            <tr>\n              <th>#</th>\n              <th>Date</th>\n              <th>Descripton</th>\n              <th>Value</th>\n              <th>Done?</th>\n              <th>A\xE7\xE3o</th>\n            </tr>\n            </thead>\n            <tbody>\n              <tr v-for=\"(index, bill) in bills\">\n                <td>{{index+1}}</td>\n                <td>{{bill.date_due}}</td>\n                <td>{{bill.name}}</td>\n                <td>{{bill.value | currency 'R$ '}}</td>\n                <td :class=\"{'bg-success': bill.done, 'bg-danger': !bill.done}\">\n                  {{bill.done | doneLabel }}\n                </td>\n                <td>\n                  <a v-link=\"{name: 'bill-pay.update',params: {id:bill.id} }\" class=\"btn-sm btn-warning\">Editar</a>\n                  <a href=\"#\" @click.prevent=\"removeBill(index, bill)\" class=\"btn-sm btn-danger\">Remover</a>\n                </td>\n              </tr>\n            </tbody>\n\n        </table>\n  ",
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
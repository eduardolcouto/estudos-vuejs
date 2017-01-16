'use strict';

window.billPayCreateComponent = Vue.extend({
  template: '\n      <h3>Criar Conta</h3>\n      <form name="form" @submit.prevent="submit">\n        <div>\n          <label for="vencimento">Vencimento:</label>\n            <input name="vencimento" type="text" v-model="bill.date_due | formatDate">\n          <label for="names">Nome</label>\n            <select name="nomes" v-model="bill.name | formatString">\n              <option v-for="o in names" value="{{o}}">{{o}}</option>\n            </select>\n          <label for="valor">Valor</label>\n            <input name="valor" type="text" v-model="bill.value | formatNumber">\n          <label for="status">Paga:</label>\n          <input type="checkbox" v-model="bill.done">\n          <br>\n          <input type="submit" value="Enviar">\n        </div>\n      </form>\n  ',
  data: function data() {
    return {
      names: ['CONTA DE LUZ', 'CONTA DE ÁGUA', 'CONTA DE TELEFONE', 'SUPERMERCADO'],
      formType: 'insert',
      bill: new BillClass()
    };
  },

  methods: {
    submit: function submit() {
      var _this = this;

      var data = this.bill.toJSON();
      if (this.formType == 'insert') {
        Bill.save({}, data).then(function () {
          _this.$dispatch('change-info');
          _this.$router.go({ name: 'bill-pay.list' });
        });
      } else {
        Bill.update({ id: this.bill.id }, data).then(function () {
          _this.$dispatch('change-info');
          _this.$router.go({ name: 'bill-pay.list' });
        });
      }
    },
    getBill: function getBill(id) {
      var _this2 = this;

      Bill.get({ id: id }).then(function (response) {
        _this2.bill = new BillClass(response.data);
      });
    }
  },
  created: function created() {
    if (this.$route.name == 'bill-pay.update') {
      this.formType = 'update';
      this.getBill(this.$route.params.id);
    }
  }
});
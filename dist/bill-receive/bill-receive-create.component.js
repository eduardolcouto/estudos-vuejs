'use strict';

window.billReceiveCreateComponent = Vue.extend({
  template: '\n      <h3>Criar Conta</h3>\n      <form name="form" @submit.prevent="submit">\n        <div>\n          <label for="vencimento">Vencimento:</label>\n            <input name="vencimento" type="text" v-model="bill.date_due | formatDate \'en\'">\n          <label for="names">Nome</label>\n            <select name="nomes" v-model="bill.name | formatString">\n              <option v-for="o in names" value="{{o}}">{{o}}</option>\n            </select>\n          <label for="valor">Valor</label>\n            <input name="valor" type="text" v-model="bill.value | formatNumber \'en\'">\n          <label for="status">Recebida:</label>\n          <input type="checkbox" v-model="bill.done">\n          <br>\n          <input type="submit" value="Enviar">\n        </div>\n      </form>\n  ',
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
        Receive.save({}, data).then(function () {
          _this.$dispatch('change-info');
          _this.$router.go({ name: 'bill-receive.list' });
        });
      } else {
        Receive.update({ id: this.bill.id }, data).then(function () {
          _this.$dispatch('change-info');
          _this.$router.go({ name: 'bill-receive.list' });
        });
      }
    },
    getBill: function getBill(id) {
      var _this2 = this;

      Receive.get({ id: id }).then(function (response) {
        _this2.bill = new BillClass(response.data);
      });
    }
  },
  created: function created() {
    if (this.$route.name == 'bill-receive.update') {
      this.formType = 'update';
      this.getBill(this.$route.params.id, 'receive');
    }
  }
});
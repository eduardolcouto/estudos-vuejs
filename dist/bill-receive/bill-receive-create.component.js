'use strict';

window.billReceiveCreateComponent = Vue.extend({
  template: '\n      <h3>Criar Conta</h3>\n      <form name="form" @submit.prevent="submit">\n        <div class="form-group">\n          <label for="vencimento">Vencimento:</label>\n            <input name="vencimento" type="text" v-model="bill.date_due" class="form-control">\n          <label for="names">Nome</label>\n            <select name="nomes" v-model="bill.name" class="form-control">\n              <option v-for="o in names" value="{{o}}">{{o}}</option>\n            </select>\n          <label for="valor">Valor</label>\n            <input name="valor" type="text" v-model="bill.value" class="form-control">\n          <label for="status">Recebida:</label>\n          <input type="checkbox" v-model="bill.done">\n          <br>\n          <input type="submit" value="Enviar">\n        </div>\n      </form>\n  ',
  data: function data() {
    return {
      names: ['Conta de luz', 'Conta de \xE1gua', 'Conta de telefone', 'Supermercado'],
      formType: 'insert',
      bill: {
        date_due: '',
        name: '',
        value: 0,
        done: 0
      }
    };
  },

  methods: {
    submit: function submit() {
      var _this = this;

      if (this.formType == 'insert') {
        Receive.save({}, this.bill).then(function () {
          _this.$dispatch('change-info');
          _this.$router.go({ name: 'bill-receive.list' });
        });
      } else {
        Receive.update({ id: this.bill.id }, this.bill).then(function () {
          _this.$dispatch('change-info');
          _this.$router.go({ name: 'bill-receive.list' });
        });
      }
    },
    getBill: function getBill(id) {
      var _this2 = this;

      Receive.get({ id: id }).then(function (response) {
        _this2.bill = response.data;
      });
      //  this.bill = this.$root.$children[0].billsPay[index];
    }
  },
  created: function created() {
    if (this.$route.name == 'bill-receive.update') {
      this.formType = 'update';
      this.getBill(this.$route.params.id, 'receive');
    }
  }
});
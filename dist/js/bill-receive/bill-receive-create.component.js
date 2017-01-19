'use strict';

window.billReceiveCreateComponent = Vue.extend({
  template: '\n\n  <div class="container">\n        <h4 v-if="formType == \'insert\'">Criar Conta</h4>\n        <h4 v-else>Editar Conta</h4>\n        <form name="form" @submit.prevent="submit">\n          <div class="row">\n            <div class="input-field col s6">\n              <label for="vencimento" class="active">Vencimento</label>\n              <input id="vencimento" name="vencimento" type="text" v-model="bill.date_due | formatDate">\n            </div>\n            <div class="input-field col s6">\n            <label for="valor" class="active">Valor</label>\n              <input id="valor" name="valor" type="text" v-model="bill.value | formatNumber">\n            </div>\n          </div><!-- row -->\n\n          <div class="row">\n            <div class="col s6">\n              <label for="nomes" class="active">Nome</label>\n              <select id="nomes" name="nomes" v-model="bill.name | formatString" class="browser-default">\n                <option value="0" disabled selected>Escolha um nome</option>\n                <option v-for="o in names" value="{{o}}">{{o}}</option>\n              </select>\n            </div>\n            <div class="input-field col s6">\n              <input type="checkbox" v-model="bill.done" id="status">\n              <label for="status">Recebida</label>\n            </div>\n          </div><!-- row -->\n          <div class="row">\n            <input v-if="formType == \'insert\'" type="submit" value="Enviar" class="btn">\n            <input v-else type="submit" value="Atualizar" class="btn">\n          </div>\n        </form>\n  </div>\n\n  ',
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
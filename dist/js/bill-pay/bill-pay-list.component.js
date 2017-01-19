'use strict';

window.billPayListComponent = Vue.extend({
  components: {
    'modal': window.modalComponent
  },
  template: '\n  <div class="section">\n    <div class="container">\n      <div class="row">\n        <div class="col s12">\n          <table class="bordered highlight responsive-table z-depth-3">\n            <thead>\n              <tr>\n                <th>#</th>\n                <th>Date</th>\n                <th>Descripton</th>\n                <th>Value</th>\n                <th>Done?</th>\n                <th>A\xE7\xE3o</th>\n              </tr>\n              </thead>\n              <tbody>\n                <tr v-for="(index, bill) in bills" class="hoverable">\n                  <td>{{index+1}}</td>\n                  <td>{{bill.date_due | formatDate}}</td>\n                  <td>{{bill.name | formatString}}</td>\n                  <td>{{bill.value | formatNumber}}</td>\n                  <td class="white-text center-align" :class="{\'green lighten-2\': bill.done, \'red lighten-2\': !bill.done}">\n                    {{bill.done | doneLabel }}\n\n                  </td>\n                  <td>\n                    <a v-link="{name: \'bill-pay.update\',params: {id:bill.id} }" class="btn waves-effect btn-flat teal lighten-2">\n                      <i class="material-icons white-text">edit</i>\n                    </a>\n                    <a href="#" @click.prevent="modalDelete(bill)" class="btn waves-effect btn-flat red lighten-2">\n                      <i class="material-icons white-text">delete</i>\n                    </a>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div><!-- col s12-->\n        </div><!-- row-->\n        <div class="fixed-action-btn">\n          <a v-link="{name: \'bill-pay.create\'}" class="btn-floating btn-large waves-effect waves-light red hide-on-small-only "><i class="material-icons">add</i></a>\n          <a v-link="{name: \'bill-pay.create\'}"" class="btn-floating btn-small waves-effect waves-light red hide-on-med-and-up"><i class="material-icons">add</i></a>\n        </div> <!-- fixed-action-btn-->\n    </div><!-- container-->\n  </div><!-- section-->\n\n  <modal :modal.id="modal">\n    <div slot="content">\n      <div class="section"\n        ><h4>Confirma\xE7\xE3o de exclus\xE3o</h4>\n        <p>\n          <strong>Tem certeza que deseja excluir essa conta?</strong>\n        </p>\n      </div>\n      <div class="divider"></div>\n      <div class="section">\n        <p>Name: <strong>{{billToDelete.name | formatString}}</strong></p>\n        <p>Value: <strong>{{billToDelete.value | formatNumber}}</strong></p>\n        <p>Date Due: <strong>{{billToDelete.date_due | formatDate}}</strong></p>\n      </div>\n    </div>\n    <div slot="footer">\n      <button class="btn btn-flat waves-effect grey lighten-2 waves-red modal-close modal-action ">N\xC3O</button>\n      <button class="btn btn-flat waves-effect orange lighten-2 modal-close modal-action " @click.prevent="removeBill(bill)" >SIM</button>\n    </div>\n  </modal>\n  ',
  data: function data() {
    return {
      bills: [],
      billToDelete: null,
      modal: 'modal-delete'
    };
  },

  methods: {
    removeBill: function removeBill() {
      var _this = this;

      Receive.delete({ id: this.billToDelete.id }).then(function () {
        _this.bills.$remove(_this.billToDelete);
        _this.$dispatch('change-info');
      });

      billToDelete = null;
    },
    modalDelete: function modalDelete(bill) {
      this.billToDelete = bill;
      $('div[modal="modal-delete"]').modal('open');
    }
  },
  created: function created() {
    var _this2 = this;

    Bill.query().then(function (response) {
      _this2.bills = response.data;
    });
  }
});
'use strict';

window.billReceiveComponent = Vue.extend({
  components: {
    'menu-component': billReceiveMenuComponent
  },
  template: '\n          <div class="container">\n                <h3>{{ title }}</h3>\n                <div class="row">\n                    <div class="col s6">\n                        <div class="card" :class="{\'white black-text\': status === false, \'green white-text\': status === 0, \'red white-text \': status > 0}">\n                            <div class="card-content">\n                                <span class="card-title"><i class="material-icons">account_balance</i></span>\n                                <p >\n                                  {{ status | statusGeneralReceive}}\n                                </p>\n                             </div>\n                         </div>\n                     </div>\n\n                    <div class="col s6">\n                        <div class="card ">\n                            <div class="card-content">\n                            <span class="card-title"><i class="material-icons">payment</i></span>\n                                <p>\n                                    {{total | formatNumber}}\n                                 </p>\n                            </div>\n                        </div>\n                     </div>\n                </div>\n\n                </div>\n\n                <router-view></router-view>',

  data: function data() {
    return {
      title: 'Contas a Receber',
      count: 0,
      status: 0,
      total: 0
    };
  },

  methods: {
    calculateStatus: function calculateStatus(bills) {
      var count = 0;
      if (!bills.length) {
        this.status = false;
      }
      for (var i in bills) {
        if (!bills[i].done) {
          count++;
        }
      }
      this.status = count;
    },
    updateStatus: function updateStatus() {
      var _this = this;

      Receive.query().then(function (response) {
        _this.calculateStatus(response.data);
      });
    },
    updateTotal: function updateTotal() {
      var _this2 = this;

      Receive.total().then(function (response) {
        _this2.total = response.data.total;
      });
    }
  },

  created: function created() {
    this.updateStatus();
    this.updateTotal();
  },


  events: {
    'change-info': function changeInfo() {
      this.updateStatus();
      this.updateTotal();
    }
  }
});
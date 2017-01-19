'use strict';

window.billPayComponent = Vue.extend({
  components: {
    'menu-component': billPayMenuComponent
  },
  template: '\n<div class="section">\n  <div class="container">\n      <h4>{{ title }}</h4>\n      <div class="row">\n          <div class="col s6">\n              <div class="card hoverable" :class="{\'white black-text\': status === false, \'green white-text\': status === 0, \'red white-text \': status > 0}">\n                  <div class="card-content">\n                      <span class="card-title"><i class="material-icons">account_balance</i></span>\n                      <h5>\n                        {{ status | statusGeneral}}\n                      </h5>\n                   </div>\n               </div>\n           </div>\n\n          <div class="col s6">\n              <div class="card hoverable">\n                  <div class="card-content">\n                  <span class="card-title"><i class="material-icons">payment</i></span>\n                      <h5>\n                          {{total | formatNumber}}\n                       </h5>\n                  </div>\n              </div>\n           </div>\n      </div>\n  </div>\n</div>\n<div class="divider"></div>\n    <router-view></router-view>\n',

  data: function data() {
    return {
      title: 'Contas a pagar',
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

      Bill.query().then(function (response) {
        _this.calculateStatus(response.data);
      });
    },
    updateTotal: function updateTotal() {
      var _this2 = this;

      Bill.total().then(function (response) {
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
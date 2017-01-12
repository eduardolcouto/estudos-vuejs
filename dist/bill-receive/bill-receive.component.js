'use strict';

window.billReceiveComponent = Vue.extend({
  components: {
    'menu-component': billReceiveMenuComponent
  },
  template: '<div class="container">\n                <h1>{{ title }}</h1>\n                <h3 :class="{\'text-muted\': status === false, \'text-success\': status === 0, \'text-danger\': status > 0}">\n                  {{ status | statusGeneralReceive}}\n                </h3>\n                <h3>\n                  {{total | currency \'R$ \'}}\n                </h3>\n                <menu-component></menu-component>\n                <router-view></router-view>\n            </div>',

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
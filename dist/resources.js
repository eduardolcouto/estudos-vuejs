'use strict';

Vue.http.options.root = 'http://127.0.0.1:8888/api';

window.Bill = Vue.resource('pay/bills{/id}', {}, {
  total: { method: 'GET', url: 'pay/bills/total' }
});

window.Receive = Vue.resource('receive/bills{/id}', {}, {
  total: { method: 'GET', url: 'receive/bills/total' }
});
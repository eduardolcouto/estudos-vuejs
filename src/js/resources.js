Vue.http.options.root = 'http://127.0.0.1:8888/api';

let BillPay = Vue.resource('pay/bills{/id}',{},{
  total: {method: 'GET', url: 'pay/bills/total'}
});

let BillReceive = Vue.resource('receive/bills{/id}',{},{
  total: {method: 'GET', url: 'receive/bills/total'}
});

export{BillPay, BillReceive};

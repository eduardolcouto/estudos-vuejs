import './bootstrap';

import BillPayComponent from './bill-pay/bill-pay.vue';
import BillPayListComponent from './bill-pay/bill-pay-list.vue';
import BillPayCreateComponent from './bill-pay/bill-pay-create.vue';
import BillReceiveComponent from './bill-receive/bill-receive.vue';
import BillReceiveListComponent from './bill-receive/bill-receive-list.vue';
import BillReceiveCreateComponent from './bill-receive/bill-receive-create.vue';
import BillComponent from './bill.vue';
import DashboardComponent from './dashboard.vue';


let VueRouter = require('vue-router');
let router = new VueRouter();

router.map({
    '/bill-pays': {
        component: BillPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: BillPayListComponent
            },
            '/create': {
                name: 'bill-pay.create',
                component: BillPayCreateComponent
            },
            '/:id/update': {
                name: 'bill-pay.update',
                component: BillPayCreateComponent
            }
        }
    },
    //reveive

    '/bill-receives': {
        component: BillReceiveComponent,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: BillReceiveListComponent
            },
            '/create': {
                name: 'bill-receive.create',
                component: BillReceiveCreateComponent
            },
            '/:id/update': {
                name: 'bill-receive.update',
                component: BillReceiveCreateComponent
            }
        }
    },
    //default
    '/': {
        name: 'dashboard',
        component: DashboardComponent
    },
    '*': {
        component: BillPayListComponent
    },
});

router.start({
        components: {
            'bill-component': BillComponent,
        }
    },
    '#app');

router.redirect({
    '*': '/'
});
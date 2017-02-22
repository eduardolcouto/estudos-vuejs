require('../img/bg.jpg');
require('../sass/app.scss');
require('./filters');
require('./resources');

require(
    [   './bill-pay/bill-pay.component',
        './bill-pay/bill-pay-list.component',
        './bill-pay/bill-pay-create.component',
        './bill-receive/bill-receive.component',
        './bill-receive/bill-receive-list.component',
        './bill-receive/bill-receive-create.component',
        './bill.component',
        './dashboard.component'
    ],
    function (
              billPayComponent,
              billPayListComponent,
              billPayCreateComponent,
              billReceiveComponent,
              billReceiveListComponent,
              billReceiveCreateComponent,
              billComponent,
              dashboardComponent) {

        let router = new VueRouter();

        router.map({
            '/bill-pays': {
                component: billPayComponent,
                subRoutes: {
                    '/': {
                        name: 'bill-pay.list',
                        component: billPayListComponent
                    },
                    '/create': {
                        name: 'bill-pay.create',
                        component: billPayCreateComponent
                    },
                    '/:id/update': {
                        name: 'bill-pay.update',
                        component: billPayCreateComponent
                    }
                }
            },
            //reveive

            '/bill-receives': {
                component: billReceiveComponent,
                subRoutes: {
                    '/': {
                        name: 'bill-receive.list',
                        component: billReceiveListComponent
                    },
                    '/create': {
                        name: 'bill-receive.create',
                        component: billReceiveCreateComponent
                    },
                    '/:id/update': {
                        name: 'bill-receive.update',
                        component: billReceiveCreateComponent
                    }
                }
            },
            //default
            '/': {
                name: 'dashboard',
                component: dashboardComponent
            },
            '*': {
                component: billPayListComponent
            },
        });

        router.start({
                components: {
                    'bill-component': billComponent,
                }
            },
            '#app');

        router.redirect({
            '*': '/'
        });

    }
)

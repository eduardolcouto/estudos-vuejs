var router = new VueRouter();

router.map({
  '/bill-pays':{
      component : billPayComponent,
      subRoutes:{
        '/':{
          name: 'bill-pay.list',
          component: billPayListComponent
        },
        '/create':{
          name: 'bill-pay.create',
          component: billPayCreateComponent
        },
        '/:id/update':{
          name: 'bill-pay.update',
          component: billPayCreateComponent
        }
      }
  },
  //reveive

  '/bill-receives':{
      component : billReceiveComponent,
      subRoutes:{
        '/':{
          name: 'bill-receive.list',
          component: billReceiveListComponent
        },
        '/create':{
          name: 'bill-receive.create',
          component: billReceiveCreateComponent
        },
        '/:id/update':{
          name: 'bill-receive.update',
          component: billReceiveCreateComponent
        }
      }
  },

  //defult
  '/':{
    name:'dashboard',
    component: dashboardComponent
  },
  '*':{
    component: billPayListComponent
  },





});

router.start({
  components:{
    'bill-component': billComponent,
  }
},
'#app');

router.redirect({
  '*': '/'
});

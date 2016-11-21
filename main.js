var router = new VueRouter();
var mainComponent = Vue.extend({
  components:{
    'bill-component': billComponent
  },
  template: '<bill-component></bill-component>',
  data: function(){
    return {
      billsPay:[
        {date_due:'20/08/2016', name:'Combustivel',value:25.99, done: 1},
        {date_due:'22/08/2016', name:'Luz',value:10.66, done: 0},
        {date_due:'24/08/2016', name:'Agua',value:5.50, done: 0},
        {date_due:'25/08/2016', name:'Telefone',value:150.00, done: 1},
      ],
    };
  }
});
router.map({
  '/bill-pays':{
      component : billPayComponent,
      subRoutes:{
        '/':{
          name: 'bill.list',
          component: billPayListComponent
        },
        '/create':{
          name: 'bill.create',
          component: billPayCreateComponent
        },
        '/:index/update':{
          name: 'bill.update',
          component: billPayCreateComponent
        },
      }
  }

  // '*':{
  //   component: billPayListComponent
  // }
});

router.start({
  components:{
    'main-component': mainComponent,
  }
},
'#app');

// router.redirect({
//   '*': '/bills'
// });

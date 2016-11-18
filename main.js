var router = new VueRouter();
var mainComponent = Vue.extend({
  components:{
    'app-component': appComponent
  },
  template: '<app-component>,</app-component>',
  data: function(){
    return {
      bills:[
        {date_due:'20/08/2016', name:'Combustivel',value:25.99, done: 1},
        {date_due:'22/08/2016', name:'Luz',value:10.66, done: 0},
        {date_due:'24/08/2016', name:'Agua',value:5.50, done: 0},
        {date_due:'25/08/2016', name:'Telefone',value:150.00, done: 1},
      ],
    };
  }
});
router.map({
  '/bills':{
    name: 'bill.list',
    component: billListComponent
  },
  '/bill/create':{
    name: 'bill.create',
    component: billCreateComponent
  },
  '*':{
    component: billListComponent
  }
});

router.start({
  components:{
    'main-component': mainComponent,
  }
},
'#app');

router.redirect({
  '*': '/bills'
});

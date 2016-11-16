Vue.filter('doneLabel',function(value){
  return value == 0 ?'Não Paga':'Paga';
});

Vue.filter('statusGeneral', function(value){
  if(value === false){
    return "Nenhuma conta cadastrada!";
  }

  if(!value){
    return "Nenhum conta a pagar!";
  }else{
    return "Existem "+value+" contas a pagar!";
  }
});

var app = new Vue ({
  el: "#app",
  data:{
    title: 'Contas a pagar',
    menus:[
      {id:0, name: "Listar Contas"},
      {id:1, name: "Criar Conta"},
    ],
    bill:{
      date_due: '',
      name: '',
      value: 0,
      done: 0
    },
    bills:[
      {date_due:'20/08/2016', name:'Combustivel',value:25.99, done: 1},
      {date_due:'22/08/2016', name:'Luz',value:10.66, done: 0},
      {date_due:'24/08/2016', name:'Agua',value:5.50, done: 0},
      {date_due:'25/08/2016', name:'Telefone',value:150.00, done: 1},
    ],
    names:[
      'Combustivel',
      'Luz',
      'Agua',
      'Telefone',
    ],
    activedView: 0,
    formType: 'insert',
    count: 0,

  },
  computed:{
    status: function(){
      var count = 0;
      if(this.bills.length == 0){
        return false;
      }
      for(var i in this.bills){
        if (!this.bills[i].done) {
          count++;
        }
      }
      return count;
    },
  },
  methods:{
    showView: function(id){
      if(id == 1){
        this.formType = 'insert';
      }
      this.activedView = id;
    },
    submit: function(){
      if(this.formType == 'insert'){
          this.bills.push(this.bill);
      }
      this.bill = {
        date_due: '',
        name: '',
        value: 0,
        done: 0
      } ;

      this.activedView = 0;
    },
    loadBill: function(bill){
      this.bill = bill;
      this.activedView = 1;
      this.formType = 'update';
    },
    removeBill: function(index,bill){
      var remove = confirm("Deseja realmente excluir a conta?");
      if(remove){
        //this.bills.splice(index,1);
        this.bills.$remove(bill);
      }
    }
  }
});

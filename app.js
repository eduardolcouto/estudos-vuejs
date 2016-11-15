Vue.filter('doneLabel',function(value){
  return value == 0 ?'Não Paga':'Paga';
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
      this.count = 0;
      if(this.bills.length == 0){
        this.count = -1;
        return "Nenhuma conta cadastrada!!";
      }
      for(var i in this.bills){
        if (!this.bills[i].done) {
          this.count++;
        }
      }
      return !this.count ? "Nenhum conta a pagar." : "Existem "+this.count+" contas a serem pagas!";
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
    removeBill: function(index){
      var remove = window.confirm("Deseja realmente excluir a conta?");
      if(remove){
        this.bills.splice(index,1);
      }
    }
  }
});

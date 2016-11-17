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

var menuComponent = Vue.extend({
  template: `
          <nav>
            <ul v-for="o in menus">
              <li v-if="this.activedView != o.id">
                <a href="javascript:void(0)" v-on:click="showView(o.id)" :class="{'btn btn-primary':o.id == 0, 'btn btn-success': o.id == 1}">{{o.name}}</a>
              </li>
            </ul>
          </nav>
  `,
  props:['activedView'],
  data: function(){
    return {
      menus:[
        {id:0, name: "Listar Contas"},
        {id:1, name: "Criar Conta"},
      ],
    };
  },
  methods:{
    showView: function(id){
      if(id == 1){
        this.$parent.formType = 'insert';
      }
      this.$parent.activedView = id;
    },
  }
});

var billListComponent = Vue.extend({
  template: `
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Descripton</th>
              <th>Value</th>
              <th>Done?</th>
              <th>Ação</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(index, bill) in bills">
                <td>{{index}}</td>
                <td>{{bill.date_due}}</td>
                <td>{{bill.name}}</td>
                <td>{{bill.value | currency 'R$ '}}</td>
                <td :class="{'bg-success': bill.done, 'bg-danger': !bill.done}">
                  {{bill.done | doneLabel }}
                </td>
                <td>
                  <a href="#" @click.prevent="loadBill(bill)" class="btn-sm btn-warning">Editar</a>
                  <a href="#" @click.prevent="removeBill(index, bill)" class="btn-sm btn-danger">Remover</a>
                </td>
              </tr>
            </tbody>

        </table>
  `,
  data: function(){
    return {
      bills:[
        {date_due:'20/08/2016', name:'Combustivel',value:25.99, done: 1},
        {date_due:'22/08/2016', name:'Luz',value:10.66, done: 0},
        {date_due:'24/08/2016', name:'Agua',value:5.50, done: 0},
        {date_due:'25/08/2016', name:'Telefone',value:150.00, done: 1},
      ],
    };
  },
  methods:{
    loadBill: function(bill){
      this.$parent.bill = bill;
      this.$parent.activedView = 1;
      this.$parent.formType = 'update';
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

var billCreateComponent = Vue.extend({
  template:`
      <h3>Criar Conta</h3>
      <form name="form" @submit.prevent="submit">
        <div class="form-group">
          <label for="vencimento">Vencimento:</label>
            <input name="vencimento" type="text" v-model="bill.date_due" class="form-control">
          <label for="names">Nome</label>
            <select name="nomes" v-model="bill.name" class="form-control">
              <option v-for="o in names" value="{{o}}">{{o}}</option>
            </select>
          <label for="valor">Valor</label>
            <input name="valor" type="text" v-model="bill.value" class="form-control">
          <label for="status">Paga:</label>
          <input type="checkbox" v-model="bill.done">
          <br>
          <input type="submit" value="Enviar">
        </div>
      </form>
  `,
  props:[
    'bill',
    'formType'
  ],
  data:function(){
    return {
      names:[
        'Combustivel',
        'Luz',
        'Agua',
        'Telefone',
      ],
    }
  },
  methods:{
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
        this.$parent.activedView = 0;
      }
}

});

var appComponent = Vue.extend({
  components:{
    'menu-component': menuComponent,
    'bill-list-component': billListComponent,
    'bill-create-component': billCreateComponent
  },
  template: `<div class="container">
                <h1>{{ title }}</h1>
                <h3 :class="{'text-muted': status === false, 'text-success': status === 0, 'text-danger': status > 0}">
                  {{ status | statusGeneral}}
                </h3>
                <menu-component v-bind:actived-view="activedView"></menu-component>
                <div v-if="activedView == 0">
                  <bill-list-component></bill-list-component>
                </div>
                <div v-if="activedView == 1">
                  <bill-create-component v-bind:bill="bill" v-bind:form-type="formType"></bill-create-component>
                </div>
              </div>`,
    data:function(){
        return {
            title: 'Contas a pagar',
            bill:{
              date_due: '',
              name: '',
              value: 0,
              done: 0
            },
            activedView: 0,
            formType: 'insert',
            count: 0,
      };
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
  methods:{}
});
Vue.component('app-component', appComponent);

var app = new Vue ({
  el: "#app",
});

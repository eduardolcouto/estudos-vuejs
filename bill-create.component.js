window.billCreateComponent = Vue.extend({
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
  data:function(){
    return {
      names:[
        'Combustivel',
        'Luz',
        'Agua',
        'Telefone',
      ],
      formType: 'insert',
      bill:{
        date_due: '',
        name: '',
        value: 0,
        done: 0
      },
    }
  },
  methods:{
    submit: function(){
        if(this.formType == 'insert'){
            this.$root.$children[0].bills.push(this.bill);
        }
        this.bill = {
          date_due: '',
          name: '',
          value: 0,
          done: 0
        };
        this.$router.go({name: 'bill.list'});
      }
    },
    events:{
      'change-bill': function(bill){
        this.bill = bill;
      }
    }

});

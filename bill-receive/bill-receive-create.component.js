window.billReceiveCreateComponent = Vue.extend({
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
        'Conta de luz',
        'Conta de \u00e1gua',
        'Conta de telefone',
        'Supermercado',
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
        var self = this;
        var resource = this.$resource('bills{/id}');

        if(this.formType == 'insert'){
          Receive.save({},this.bill).then(function(){
                self.$dispatch('change-info');
                self.$router.go({name: 'bill-pay.list'});
              });
        }else{
          Receive.update({id: this.bill.id},this.bill).then(function(){
              self.$dispatch('change-info');
              self.$router.go({name: 'bill-pay.list'});
            });
        }
      },
      getBill: function(id){
        var self = this;
        var resource = this.$resource('bills{/id}');
        Receive.get({id: id}).then(function(response){
          self.bill = response.data;
        })
      //  this.bill = this.$root.$children[0].billsPay[index];
      }
    },
  created: function(){
    if (this.$route.name == 'bill-pay.update') {
      this.formType = 'update';
      this.getBill(this.$route.params.id);
    }
  },

});

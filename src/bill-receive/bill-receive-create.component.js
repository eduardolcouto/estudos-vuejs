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
          <label for="status">Recebida:</label>
          <input type="checkbox" v-model="bill.done">
          <br>
          <input type="submit" value="Enviar">
        </div>
      </form>
  `,
  data(){
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
    submit(){
        if(this.formType == 'insert'){
          Receive.save({},this.bill).then(() => {
                this.$dispatch('change-info');
                this.$router.go({name: 'bill-receive.list'});
              });
        }else{
          Receive.update({id: this.bill.id},this.bill).then(() => {
              this.$dispatch('change-info');
              this.$router.go({name: 'bill-receive.list'});
            });
        }
      },
      getBill(id){
        Receive.get({id: id}).then((response) => {
          this.bill = response.data;
        })
      //  this.bill = this.$root.$children[0].billsPay[index];
      }
    },
  created(){
    if (this.$route.name == 'bill-receive.update') {
      this.formType = 'update';
      this.getBill(this.$route.params.id,'receive');
    }
  },

});

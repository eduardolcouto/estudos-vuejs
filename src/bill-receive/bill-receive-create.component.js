window.billReceiveCreateComponent = Vue.extend({
  template:`
      <h3>Criar Conta</h3>
      <form name="form" @submit.prevent="submit">
        <div>
          <label for="vencimento">Vencimento:</label>
            <input name="vencimento" type="text" v-model="bill.date_due | formatDate 'en'">
          <label for="names">Nome</label>
            <select name="nomes" v-model="bill.name | formatString">
              <option v-for="o in names" value="{{o}}">{{o}}</option>
            </select>
          <label for="valor">Valor</label>
            <input name="valor" type="text" v-model="bill.value | formatNumber 'en'">
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
        'CONTA DE LUZ',
        'CONTA DE ÁGUA',
        'CONTA DE TELEFONE',
        'SUPERMERCADO',
      ],
      formType: 'insert',
      bill: new BillClass(),
    }
  },
  methods:{
    submit(){
        let data = this.bill.toJSON();
        if(this.formType == 'insert'){
          Receive.save({},data).then(() => {
                this.$dispatch('change-info');
                this.$router.go({name: 'bill-receive.list'});
              });
        }else{
          Receive.update({id: this.bill.id}, data).then(() => {
              this.$dispatch('change-info');
              this.$router.go({name: 'bill-receive.list'});
            });
        }
      },
      getBill(id){
        Receive.get({id: id}).then((response) => {
          this.bill = new BillClass(response.data);
        })
      }
    },
  created(){
    if (this.$route.name == 'bill-receive.update') {
      this.formType = 'update';
      this.getBill(this.$route.params.id,'receive');
    }
  },

});

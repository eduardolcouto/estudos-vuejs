window.billPayCreateComponent = Vue.extend({
  template:`
      <h3>Criar Conta</h3>
      <form name="form" @submit.prevent="submit">
        <div>
          <label for="vencimento">Vencimento:</label>
            <input name="vencimento" type="text" v-model="bill.date_due | formatDate">
          <label for="names">Nome</label>
            <select name="nomes" v-model="bill.name | formatString">
              <option v-for="o in names" value="{{o}}">{{o}}</option>
            </select>
          <label for="valor">Valor</label>
            <input name="valor" type="text" v-model="bill.value | formatNumber">
          <label for="status">Paga:</label>
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
          Bill.save({},data).then(() => {
                this.$dispatch('change-info');
                this.$router.go({name: 'bill-pay.list'});
              });
        }else{
          Bill.update({id: this.bill.id},data).then(() => {
              this.$dispatch('change-info');
              this.$router.go({name: 'bill-pay.list'});
            });
        }
      },
      getBill(id){
        Bill.get({id: id}).then((response) => {
          this.bill = new BillClass(response.data);
        });
      }
    },
  created(){
    if (this.$route.name == 'bill-pay.update') {
      this.formType = 'update';
      this.getBill(this.$route.params.id);
    }
  },

});

let BillClass = require('../bill_class').default;

module.exports = {
  template:`

  <div class="container">
        <h4 v-if="formType == 'insert'">Criar Conta</h4>
        <h4 v-else>Editar Conta</h4>
        <form name="form" @submit.prevent="submit">
          <div class="row">
            <div class="input-field col s6">
              <label for="vencimento" class="active">Vencimento</label>
              <input id="vencimento" name="vencimento" type="text" v-model="bill.date_due | formatDate">
            </div>
            <div class="input-field col s6">
            <label for="valor" class="active">Valor</label>
              <input id="valor" name="valor" type="text" v-model="bill.value | formatNumber">
            </div>
          </div><!-- row -->

          <div class="row">
            <div class="col s6">
              <label for="nomes" class="active">Nome</label>
              <select id="nomes" name="nomes" v-model="bill.name | formatString" class="browser-default">
                <option value="0" disabled selected>Escolha um nome</option>
                <option v-for="o in names" value="{{o}}">{{o}}</option>
              </select>
            </div>
            <div class="input-field col s6">
              <input type="checkbox" v-model="bill.done" id="status">
              <label for="status">Recebida</label>
            </div>
          </div><!-- row -->
          <div class="row">
            <input v-if="formType == 'insert'" type="submit" value="Enviar" class="btn">
            <input v-else type="submit" value="Atualizar" class="btn">
          </div>
        </form>
  </div>

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

};

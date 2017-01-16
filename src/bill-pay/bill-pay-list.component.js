window.billPayListComponent = Vue.extend({
  template: `
        <table border = 1 cellpadding=5>
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
                <td>{{index+1}}</td>
                <td>{{bill.date_due | formatDate}}</td>
                <td>{{bill.name | formatString}}</td>
                <td>{{bill.value | formatNumber}}</td>
                <td :class="{'pago': bill.done, 'naoPago': !bill.done}">
                  {{bill.done | doneLabel }}
                </td>
                <td>
                  <a v-link="{name: 'bill-pay.update',params: {id:bill.id} }" >Editar</a>
                  <a href="#" @click.prevent="removeBill(index, bill)">Remover</a>
                </td>
              </tr>
            </tbody>

        </table>
  `,
  data(){
    return {
      bills: []
    };
  },
  methods:{
    removeBill(index,bill){
      let remove = confirm("Deseja realmente excluir a conta?");
      if(remove){
        Bill.delete({id: bill.id}).then(() => {
          this.bills.$remove(bill);
          this.$dispatch('change-info');
        });

      }
    }
  },
  created(){
    Bill.query().then((response) => {
      this.bills = response.data;
    });
  }
});

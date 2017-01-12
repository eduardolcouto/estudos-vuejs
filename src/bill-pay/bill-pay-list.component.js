window.billPayListComponent = Vue.extend({
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
                <td>{{index+1}}</td>
                <td>{{bill.date_due}}</td>
                <td>{{bill.name}}</td>
                <td>{{bill.value | currency 'R$ '}}</td>
                <td :class="{'bg-success': bill.done, 'bg-danger': !bill.done}">
                  {{bill.done | doneLabel }}
                </td>
                <td>
                  <a v-link="{name: 'bill-pay.update',params: {id:bill.id} }" class="btn-sm btn-warning">Editar</a>
                  <a href="#" @click.prevent="removeBill(index, bill)" class="btn-sm btn-danger">Remover</a>
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
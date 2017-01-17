window.billPayListComponent = Vue.extend({
  template: `
  <div class="container">
    <div class="row">
      <div class="col s12">
        <table class="bordered highlight responsive-table">
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
                  <a v-link="{name: 'bill-pay.update',params: {id:bill.id} }" class="btn waves-effect btn-flat teal lighten-2">
                    <i class="material-icons white-text">edit</i>
                  </a>
                  <a href="#" @click.prevent="removeBill(index, bill)" class="btn waves-effect btn-flat red lighten-2">
                    <i class="material-icons white-text">delete</i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div><!-- col s12-->
      </div><!-- row-->
      <div class="fixed-action-btn">
        <a v-link="{name: 'bill-pay.create'}" class="btn-floating btn-large waves-effect waves-light red hide-on-small-only "><i class="material-icons">add</i></a>
        <a v-link="{name: 'bill-pay.create'}"" class="btn-floating btn-small waves-effect waves-light red hide-on-med-and-up"><i class="material-icons">add</i></a>
      </div> <!-- fixed-action-btn-->
  </div><!-- container-->
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

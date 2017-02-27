let modalComponent = require('../modal.component');

module.exports = {
  components:{
    'modal' : modalComponent,
  },
  template: `
  <div class="section"> <!-- List COmponente -->
    <div class="container">
      <div class="row">
        <div class="col s12">
          <table class="bordered highlight responsive-table z-depth-3">
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
                <tr v-for="(index, bill) in bills" class="hoverable">
                  <td>{{index+1}}</td>
                  <td>{{bill.date_due | formatDate}}</td>
                  <td>{{bill.name | formatString}}</td>
                  <td>{{bill.value | formatNumber}}</td>
                  <td class="white-text center-align" :class="{'green lighten-2': bill.done, 'red lighten-2': !bill.done}">
                    {{bill.done | doneReceive }}

                  </td>
                  <td class="">
                    <a v-link="{name: 'bill-receive.update',params: {id:bill.id} }" class="btn waves-effect btn-flat teal lighten-2">
                      <i class="material-icons white-text">edit</i>
                    </a>
                    <a href="#!" @click.prevent="modalDelete(bill)" class="btn waves-effect btn-flat red lighten-2">
                      <i class="material-icons white-text">delete</i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div><!-- col s12-->
        </div><!-- row-->
        <div class="fixed-action-btn">
          <a v-link="{name: 'bill-receive.create'}" class="btn-floating btn-large waves-effect waves-light red hide-on-small-only "><i class="material-icons">add</i></a>
          <a v-link="{name: 'bill-receive.create'}" class="btn-floating btn-small waves-effect waves-light red hide-on-med-and-up"><i class="material-icons">add</i></a>
        </div> <!-- fixed-action-btn-->
    </div><!-- container-->
  </div><!-- section-->

  <modal :modal.id="modal">
    <div slot="content v-if="billToDelete">">
      <div class="section"
        ><h4>Confirmação de exclusão</h4>
        <p>
          <strong>Tem certeza que deseja excluir essa conta?</strong>
        </p>
      </div>
      <div class="divider"></div>
      <div class="section">
        <p>Name: <strong>{{billToDelete.name | formatString}}</strong></p>
        <p>Value: <strong>{{billToDelete.value | formatNumber}}</strong></p>
        <p>Date Due: <strong>{{billToDelete.date_due | formatDate}}</strong></p>
      </div>
    </div>
    <div slot="footer">
      <button class="btn btn-flat waves-effect grey lighten-2 waves-red modal-close modal-action ">NÃO</button>

      <button class="btn btn-flat waves-effect orange lighten-2 modal-close modal-action " @click.prevent="removeBill(bill)" >SIM</button>
    </div>
  </modal>

  `,
  data(){
    return {
      bills: [],
      billToDelete: null,
      modal: 'modal-delete'
    };
  },
  methods:{
    removeBill(){

        Receive.delete({id: this.billToDelete.id}).then(() => {
          this.bills.$remove(this.billToDelete);
          this.$dispatch('change-info');
        });

        billToDelete = null;

    },
    modalDelete(bill){
      this.billToDelete = bill;
      $('div[modal="modal-delete"]').modal('open');
    }
  },
  created(){
    Receive.query().then((response) => {
      this.bills = response.data;
    });
  }
};

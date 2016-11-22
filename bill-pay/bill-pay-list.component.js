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
                <td>{{index}}</td>
                <td>{{bill.date_due}}</td>
                <td>{{bill.name}}</td>
                <td>{{bill.value | currency 'R$ '}}</td>
                <td :class="{'bg-success': bill.done, 'bg-danger': !bill.done}">
                  {{bill.done | doneLabel }}
                </td>
                <td>
                  <a v-link="{name: 'bill-pay.update',params: {index:index} }" class="btn-sm btn-warning">Editar</a>
                  <a href="#" @click.prevent="removeBill(index, bill)" class="btn-sm btn-danger">Remover</a>
                </td>
              </tr>
            </tbody>

        </table>
  `,
  data: function(){
    return {
      bills: this.$root.$children[0].billsPay
    };
  },
  methods:{
    removeBill: function(index,bill){
      var remove = confirm("Deseja realmente excluir a conta?");
      if(remove){
        //this.bills.splice(index,1);
        this.bills.$remove(bill);
      }
    }
  },
  events:{
  }
});

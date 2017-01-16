window.billPayComponent = Vue.extend({
  components:{
    'menu-component': billPayMenuComponent,
  },
  template: `<div>
                <h1>{{ title }}</h1>
                <h3 :class="{'semContasCadastradas': status === false, 'semContasDevidas': status === 0, 'comConstasDevidas': status > 0}">
                  {{ status | statusGeneral}}
                </h3>
                <h3>
                  {{total | formatNumber}}
                </h3>
              
                <router-view></router-view>
            </div>`,

    data(){
        return {
            title: 'Contas a pagar',
            count: 0,
            status: 0,
            total: 0,
      };
    },
  methods:{
    calculateStatus(bills){
      let count = 0;
            if(!bills.length){
              this.status = false;
            }
            for(let i in bills){
              if (!bills[i].done) {
                count++;
              }
            }
            this.status = count;
    },
    updateStatus(){
      Bill.query().then((response) => {
        this.calculateStatus(response.data);
      });
    },

    updateTotal(){
      Bill.total().then((response) => {
        this.total = response.data.total;
      });
    }
  },

created() {
    this.updateStatus();
    this.updateTotal();
 },

 events:{
   'change-info'(){
     this.updateStatus();
     this.updateTotal();
   }
 }
});

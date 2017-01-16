window.billReceiveComponent = Vue.extend({
  components:{
    'menu-component': billReceiveMenuComponent,
  },
  template: `<div>
                <h1>{{ title }}</h1>
                <h3 :class="{'semContasCadastradas': status === false, 'semContasDevidas': status === 0, 'comConstasDevidas': status > 0}">
                  {{ status | statusGeneralReceive}}
                </h3>
                <h3>
                  {{total | formatNumber}}
                </h3>
                <menu-component></menu-component>
                <router-view></router-view>
            </div>`,

    data(){
        return {
            title: 'Contas a Receber',
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
      Receive.query().then((response)=>{
        this.calculateStatus(response.data);
      });
    },

    updateTotal(){
      Receive.total().then((response)=>{
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

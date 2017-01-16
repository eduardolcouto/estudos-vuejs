window.billPayComponent = Vue.extend({
  components:{
    'menu-component': billPayMenuComponent,
  },
  template: `<div class="container">
                <h3>{{ title }}</h3>
                <div class="row">
                    <div class="col s6">
                        <div class="card" :class="{'white black-text': status === false, 'green white-text': status === 0, 'red white-text ': status > 0}">
                            <div class="card-content">
                                <span class="card-title"><i class="material-icons">account_balance</i></span>
                                <p >
                                  {{ status | statusGeneral}}
                                </p>
                             </div> 
                         </div>
                     </div>
        
                    <div class="col s6">
                        <div class="card ">
                            <div class="card-content">
                            <span class="card-title"><i class="material-icons">payment</i></span>
                                <p>
                                    {{total | formatNumber}}
                                 </p>
                            </div> 
                        </div>
                     </div>
                </div>
                
                
              
                <router-view></router-view>
            `,

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

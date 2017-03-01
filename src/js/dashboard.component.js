import {BillPay, BillReceive} from './resources';
import Chart from 'chart.js';

export default {
  template: `

<div>
  <div class="row">
    <div class="col s12 m6">

          <div class="card">
            <div class="card-content">
              <span class="card-title"><strong>Saldo Total da Conta<strong></span>
              <p>
                <h4>{{saldoTotal | formatNumber}}</h4>
              </p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
            </div>
          </div>


    </div>
    <div class="col s12 m6"> 
      <div class="card">
            <div class="card-content">
              <span class="card-title">Gráfico </span>
              <p>
                <canvas id="myChart" width="100%" height="100%"></canvas>
              </p>
            </div>
            <div class="card-action">

            </div>
          </div>
    </div>
  </div>
</div>
         
  `,
  data(){
    return{
      saldoTotal: 0,
      totalReceive: 0,
      totaPay: 0
    }
  },
  methods:{
      getSaldoTotal(){
        BillReceive.total().then((response)=>{
          this.totalReceive = response.data.total;
          this.saldoTotal = this.totalReceive;
        });
        BillPay.total().then((response) => {
          this.totaPay = response.data.total;
           this.saldoTotal =  this.totalReceive - this.totaPay;
           this.barChart();
        });

      },

      barChart(){
        var ctx = $("#myChart");
        var MyChart = new Chart(
          ctx,
          {
            type: 'bar',
            data:{
              labels:['Receives', 'Pays'],
              datasets:[{
                label: 'Totais',
                data:[this.totalReceive, this.totaPay],
                backgroundColor:[
                  'green',
                  'red'
                ],
                borderWidth: 1
              }]
            },
            options:{
              scales:{
                yAxes:[{
                  ticks:{
                    beginAtZero: true
                  }
                }]
              }
            }
          }
        );
      }
  },
  ready(){
    this.getSaldoTotal();
            
  }
};

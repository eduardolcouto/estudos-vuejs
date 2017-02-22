webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BillClass = __webpack_require__(36);

module.exports = {
  template: '\n<div class="container">\n      <h4 v-if="formType == \'insert\'">Criar Conta</h4>\n      <h4 v-else>Editar Conta</h4>\n      <form name="form" @submit.prevent="submit">\n        <div class="row">\n          <div class="input-field col s6">\n            <label for="vencimento" class="active">Vencimento</label>\n            <input id="vencimento" name="vencimento" type="text" v-model="bill.date_due | formatDate">\n          </div>\n          <div class="input-field col s6">\n          <label for="valor" class="active">Valor</label>\n            <input id="valor" name="valor" type="text" v-model="bill.value | formatNumber">\n          </div>\n        </div><!-- row -->\n\n        <div class="row">\n          <div class="col s6">\n            <label for="nomes" class="active">Nome</label>\n            <select id="nomes" name="nomes" v-model="bill.name | formatString" class="browser-default">\n              <option value="0" disabled selected>Escolha um nome</option>\n              <option v-for="o in names" value="{{o}}">{{o}}</option>\n            </select>\n          </div>\n          <div class="input-field col s6">\n            <input type="checkbox" v-model="bill.done" id="status">\n            <label for="status">Paga</label>\n          </div>\n        </div><!-- row -->\n        <div class="row">\n          <input v-if="formType == \'insert\'" type="submit" value="Enviar" class="btn">\n          <input v-else type="submit" value="Atualizar" class="btn">\n        </div>\n      </form>\n</div>\n\n\n  ',
  data: function data() {
    return {
      names: ['CONTA DE LUZ', 'CONTA DE ÁGUA', 'CONTA DE TELEFONE', 'SUPERMERCADO'],
      formType: 'insert',
      bill: new BillClass()
    };
  },

  methods: {
    submit: function submit() {
      var _this = this;

      var data = this.bill.toJSON();
      if (this.formType == 'insert') {
        Bill.save({}, data).then(function () {
          _this.$dispatch('change-info');
          _this.$router.go({ name: 'bill-pay.list' });
        });
      } else {
        Bill.update({ id: this.bill.id }, data).then(function () {
          _this.$dispatch('change-info');
          _this.$router.go({ name: 'bill-pay.list' });
        });
      }
    },
    getBill: function getBill(id) {
      var _this2 = this;

      Bill.get({ id: id }).then(function (response) {
        _this2.bill = new BillClass(response.data);
      });
    }
  },
  created: function created() {
    if (this.$route.name == 'bill-pay.update') {
      this.formType = 'update';
      this.getBill(this.$route.params.id);
    }

    $(document).ready(function () {});
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var modalComponent = __webpack_require__(37);

module.exports = {
  components: {
    'modal': modalComponent
  },
  template: '\n  <div class="section">\n    <div class="container">\n      <div class="row">\n        <div class="col s12">\n          <table class="bordered highlight responsive-table z-depth-3">\n            <thead>\n              <tr>\n                <th>#</th>\n                <th>Date</th>\n                <th>Descripton</th>\n                <th>Value</th>\n                <th>Done?</th>\n                <th>A\xE7\xE3o</th>\n              </tr>\n              </thead>\n              <tbody>\n                <tr v-for="(index, bill) in bills" class="hoverable">\n                  <td>{{index+1}}</td>\n                  <td>{{bill.date_due | formatDate}}</td>\n                  <td>{{bill.name | formatString}}</td>\n                  <td>{{bill.value | formatNumber}}</td>\n                  <td class="white-text center-align" :class="{\'green lighten-2\': bill.done, \'red lighten-2\': !bill.done}">\n                    {{bill.done | doneLabel }}\n\n                  </td>\n                  <td>\n                    <a v-link="{name: \'bill-pay.update\',params: {id:bill.id} }" class="btn waves-effect btn-flat teal lighten-2">\n                      <i class="material-icons white-text">edit</i>\n                    </a>\n                    <a href="#" @click.prevent="modalDelete(bill)" class="btn waves-effect btn-flat-cst">\n                      <i class="material-icons white-text">delete</i>\n                    </a>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div><!-- col s12-->\n        </div><!-- row-->\n        <div class="fixed-action-btn">\n          <a v-link="{name: \'bill-pay.create\'}" class="btn-floating btn-large waves-effect waves-light red hide-on-small-only "><i class="material-icons">add</i></a>\n          <a v-link="{name: \'bill-pay.create\'}" class="btn-floating btn-small waves-effect waves-light red hide-on-med-and-up"><i class="material-icons">add</i></a>\n        </div> <!-- fixed-action-btn-->\n    </div><!-- container-->\n  </div><!-- section-->\n\n  <modal :modal.id="modal">\n    <div slot="content">\n      <div class="section"\n        ><h4>Confirma\xE7\xE3o de exclus\xE3o</h4>\n        <p>\n          <strong>Tem certeza que deseja excluir essa conta?</strong>\n        </p>\n      </div>\n      <div class="divider"></div>\n      <div class="section">\n        <p>Name: <strong>{{billToDelete.name | formatString}}</strong></p>\n        <p>Value: <strong>{{billToDelete.value | formatNumber}}</strong></p>\n        <p>Date Due: <strong>{{billToDelete.date_due | formatDate}}</strong></p>\n      </div>\n    </div>\n    <div slot="footer">\n      <button class="btn btn-flat waves-effect grey lighten-2 waves-red modal-close modal-action ">N\xC3O</button>\n      <button class="btn btn-flat waves-effect orange lighten-2 modal-close modal-action " @click.prevent="removeBill(bill)" >SIM</button>\n    </div>\n  </modal>\n  ',
  data: function data() {
    return {
      bills: [],
      billToDelete: null,
      modal: 'modal-delete'
    };
  },

  methods: {
    removeBill: function removeBill() {
      var _this = this;

      Receive.delete({ id: this.billToDelete.id }).then(function () {
        _this.bills.$remove(_this.billToDelete);
        _this.$dispatch('change-info');
      });

      this.billToDelete = null;
    },
    modalDelete: function modalDelete(bill) {
      this.billToDelete = bill;
      $('div[modal="modal-delete"]').modal('open');
    }
  },
  created: function created() {
    var _this2 = this;

    Bill.query().then(function (response) {
      _this2.bills = response.data;
    });
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: '\n<div class="section">\n  <div class="container">\n      <h4>{{ title }}</h4>\n      <div class="row">\n          <div class="col s6">\n              <div class="card hoverable" :class="{\'white black-text\': status === false, \'green white-text\': status === 0, \'red white-text \': status > 0}">\n                  <div class="card-content">\n                      <span class="card-title"><i class="material-icons">account_balance</i></span>\n                      <h5>\n                        {{ status | statusGeneral}}\n                      </h5>\n                   </div>\n               </div>\n           </div>\n\n          <div class="col s6">\n              <div class="card hoverable">\n                  <div class="card-content">\n                  <span class="card-title"><i class="material-icons">payment</i></span>\n                      <h5>\n                          {{total | formatNumber}}\n                       </h5>\n                  </div>\n              </div>\n           </div>\n      </div>\n  </div>\n</div>\n<div class="divider"></div>\n    <router-view></router-view>\n',

  data: function data() {
    return {
      title: 'Contas a pagar',
      count: 0,
      status: 0,
      total: 0
    };
  },

  methods: {
    calculateStatus: function calculateStatus(bills) {
      var count = 0;
      if (!bills.length) {
        this.status = false;
      }
      for (var i in bills) {
        if (!bills[i].done) {
          count++;
        }
      }
      this.status = count;
    },
    updateStatus: function updateStatus() {
      var _this = this;

      Bill.query().then(function (response) {
        _this.calculateStatus(response.data);
      });
    },
    updateTotal: function updateTotal() {
      var _this2 = this;

      Bill.total().then(function (response) {
        _this2.total = response.data.total;
      });
    }
  },

  created: function created() {
    this.updateStatus();
    this.updateTotal();
  },


  events: {
    'change-info': function changeInfo() {
      this.updateStatus();
      this.updateTotal();
    }
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BillClass = __webpack_require__(36);

module.exports = {
  template: '\n\n  <div class="container">\n        <h4 v-if="formType == \'insert\'">Criar Conta</h4>\n        <h4 v-else>Editar Conta</h4>\n        <form name="form" @submit.prevent="submit">\n          <div class="row">\n            <div class="input-field col s6">\n              <label for="vencimento" class="active">Vencimento</label>\n              <input id="vencimento" name="vencimento" type="text" v-model="bill.date_due | formatDate">\n            </div>\n            <div class="input-field col s6">\n            <label for="valor" class="active">Valor</label>\n              <input id="valor" name="valor" type="text" v-model="bill.value | formatNumber">\n            </div>\n          </div><!-- row -->\n\n          <div class="row">\n            <div class="col s6">\n              <label for="nomes" class="active">Nome</label>\n              <select id="nomes" name="nomes" v-model="bill.name | formatString" class="browser-default">\n                <option value="0" disabled selected>Escolha um nome</option>\n                <option v-for="o in names" value="{{o}}">{{o}}</option>\n              </select>\n            </div>\n            <div class="input-field col s6">\n              <input type="checkbox" v-model="bill.done" id="status">\n              <label for="status">Recebida</label>\n            </div>\n          </div><!-- row -->\n          <div class="row">\n            <input v-if="formType == \'insert\'" type="submit" value="Enviar" class="btn">\n            <input v-else type="submit" value="Atualizar" class="btn">\n          </div>\n        </form>\n  </div>\n\n  ',
  data: function data() {
    return {
      names: ['CONTA DE LUZ', 'CONTA DE ÁGUA', 'CONTA DE TELEFONE', 'SUPERMERCADO'],
      formType: 'insert',
      bill: new BillClass()
    };
  },

  methods: {
    submit: function submit() {
      var _this = this;

      var data = this.bill.toJSON();
      if (this.formType == 'insert') {
        Receive.save({}, data).then(function () {
          _this.$dispatch('change-info');
          _this.$router.go({ name: 'bill-receive.list' });
        });
      } else {
        Receive.update({ id: this.bill.id }, data).then(function () {
          _this.$dispatch('change-info');
          _this.$router.go({ name: 'bill-receive.list' });
        });
      }
    },
    getBill: function getBill(id) {
      var _this2 = this;

      Receive.get({ id: id }).then(function (response) {
        _this2.bill = new BillClass(response.data);
      });
    }
  },
  created: function created() {
    if (this.$route.name == 'bill-receive.update') {
      this.formType = 'update';
      this.getBill(this.$route.params.id, 'receive');
    }
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var modalComponent = __webpack_require__(37);

module.exports = {
  components: {
    'modal': modalComponent
  },
  template: '\n  <div class="section"> <!-- List COmponente -->\n    <div class="container">\n      <div class="row">\n        <div class="col s12">\n          <table class="bordered highlight responsive-table z-depth-3">\n            <thead>\n              <tr>\n                <th>#</th>\n                <th>Date</th>\n                <th>Descripton</th>\n                <th>Value</th>\n                <th>Done?</th>\n                <th>A\xE7\xE3o</th>\n              </tr>\n              </thead>\n              <tbody>\n                <tr v-for="(index, bill) in bills" class="hoverable">\n                  <td>{{index+1}}</td>\n                  <td>{{bill.date_due | formatDate}}</td>\n                  <td>{{bill.name | formatString}}</td>\n                  <td>{{bill.value | formatNumber}}</td>\n                  <td class="white-text center-align" :class="{\'green lighten-2\': bill.done, \'red lighten-2\': !bill.done}">\n                    {{bill.done | doneReceive }}\n\n                  </td>\n                  <td class="">\n                    <a v-link="{name: \'bill-receive.update\',params: {id:bill.id} }" class="btn waves-effect btn-flat teal lighten-2">\n                      <i class="material-icons white-text">edit</i>\n                    </a>\n                    <a href="#!" @click.prevent="modalDelete(bill)" class="btn waves-effect btn-flat red lighten-2">\n                      <i class="material-icons white-text">delete</i>\n                    </a>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div><!-- col s12-->\n        </div><!-- row-->\n        <div class="fixed-action-btn">\n          <a v-link="{name: \'bill-receive.create\'}" class="btn-floating btn-large waves-effect waves-light red hide-on-small-only "><i class="material-icons">add</i></a>\n          <a v-link="{name: \'bill-receive.create\'}" class="btn-floating btn-small waves-effect waves-light red hide-on-med-and-up"><i class="material-icons">add</i></a>\n        </div> <!-- fixed-action-btn-->\n    </div><!-- container-->\n  </div><!-- section-->\n\n  <modal :modal.id="modal">\n    <div slot="content">\n      <div class="section"\n        ><h4>Confirma\xE7\xE3o de exclus\xE3o</h4>\n        <p>\n          <strong>Tem certeza que deseja excluir essa conta?</strong>\n        </p>\n      </div>\n      <div class="divider"></div>\n      <div class="section">\n        <p>Name: <strong>{{billToDelete.name | formatString}}</strong></p>\n        <p>Value: <strong>{{billToDelete.value | formatNumber}}</strong></p>\n        <p>Date Due: <strong>{{billToDelete.date_due | formatDate}}</strong></p>\n      </div>\n    </div>\n    <div slot="footer">\n      <button class="btn btn-flat waves-effect grey lighten-2 waves-red modal-close modal-action ">N\xC3O</button>\n\n      <button class="btn btn-flat waves-effect orange lighten-2 modal-close modal-action " @click.prevent="removeBill(bill)" >SIM</button>\n    </div>\n  </modal>\n\n  ',
  data: function data() {
    return {
      bills: [],
      billToDelete: null,
      modal: 'modal-delete'
    };
  },

  methods: {
    removeBill: function removeBill() {
      var _this = this;

      Receive.delete({ id: this.billToDelete.id }).then(function () {
        _this.bills.$remove(_this.billToDelete);
        _this.$dispatch('change-info');
      });

      billToDelete = null;
    },
    modalDelete: function modalDelete(bill) {
      this.billToDelete = bill;
      $('div[modal="modal-delete"]').modal('open');
    }
  },
  created: function created() {
    var _this2 = this;

    Receive.query().then(function (response) {
      _this2.bills = response.data;
    });
  }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: '\n  <div class="section">\n    <div class="container">\n        <h4>{{ title }}</h4>\n        <div class="row">\n            <div class="col s6">\n                <div class="card hoverable" :class="{\'white black-text\': status === false, \'green white-text\': status === 0, \'red white-text \': status > 0}">\n                    <div class="card-content">\n                        <span class="card-title"><i class="material-icons">account_balance</i></span>\n                        <h5>\n                          {{ status | statusGeneralReceive}}\n                        </h5>\n                     </div>\n                 </div>\n             </div>\n\n            <div class="col s6">\n                <div class="card ">\n                    <div class="card-content hoverable">\n                    <span class="card-title"><i class="material-icons">payment</i></span>\n                        <h5>\n                            {{total | formatNumber}}\n                         </h5>\n                    </div>\n                </div>\n             </div>\n        </div>\n    </div>\n  </div>\n  <div class="divider"></div>\n\n  <router-view></router-view>\n  ',

  data: function data() {
    return {
      title: 'Contas a Receber',
      count: 0,
      status: 0,
      total: 0
    };
  },

  methods: {
    calculateStatus: function calculateStatus(bills) {
      var count = 0;
      if (!bills.length) {
        this.status = false;
      }
      for (var i in bills) {
        if (!bills[i].done) {
          count++;
        }
      }
      this.status = count;
    },
    updateStatus: function updateStatus() {
      var _this = this;

      Receive.query().then(function (response) {
        _this.calculateStatus(response.data);
      });
    },
    updateTotal: function updateTotal() {
      var _this2 = this;

      Receive.total().then(function (response) {
        _this2.total = response.data.total;
      });
    }
  },

  created: function created() {
    this.updateStatus();
    this.updateTotal();
  },


  events: {
    'change-info': function changeInfo() {
      this.updateStatus();
      this.updateTotal();
    }
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: '\n<ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropDown">\n  <li v-for="item in o.items">\n    <a v-link="{name: item.routeName}"> {{item.name}} </a>\n  </li>\n</ul>\n<header>\n  <nav class="top-nav" :class="colorBase">\n    <div class="">\n      <div class="nav-wrapper">\n        <a class="page-title right">Controle Financeiro</a>\n      </div>\n      <div class="container">\n        <a href="#" data-activates="nav-mobile" class="button-collapse full hide-on-large-only">\n          <i class="material-icons">menu</i>\n        </a>\n      </div>\n    </div>\n  </nav>\n<ul id="nav-mobile" class="side-nav fixed">\n  <li>\n    <div class="userView">\n      <div class="background">\n        <img src="dist/img/bg.jpg">\n      </div>\n      <a href="#!user"><img class="circle" src="http://www.gravatar.com/avatar/d82d96deac93f5fa1fb48cb4b3c75961.jpg"></a>\n      <a href="#!name"><span class="white-text name">Eduardo Couto</span></a>\n      <a href="#!email"><span class="white-text email">eduardo.lcouto@gmail.com</span></a>\n    </div>\n  </li>\n  <li>\n    <ul class="collapsible" data-collapsible="accordion">\n      <li v-for="menu in menuSideNav">\n        <div class="collapsible-header" v-bind:class="menu.colorBase"><i class="material-icons">{{menu.icon}}</i>{{menu.name}}</div>\n        <div class="collapsible-body"  v-for="subMenu in menu.subMenu">\n          <a  href="#" @click.prevent="carregarPagina(subMenu.routeName, menu.colorBase)" > {{subMenu.name}} </a>\n        </ul>\n      </li>\n      <!--<li>\n        <div class="collapsible-header"><i class="material-icons">assessment</i>Relat\xF3rio</div>\n        <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>\n      </li>-->\n    </ul>\n  </li>\n</ul>\n</header>\n<main>\n  <router-view></router-view>\n</main>\n\n\n  ',

  ready: function ready() {
    $('.button-collapse').sideNav();
    $('.dropdown-button').dropdown();
    $('.collapsible').collapsible();
  },

  methods: {
    carregarPagina: function carregarPagina(rota, colorBase) {
      this.colorBase = colorBase;
      this.$router.go({ name: rota });
    }
  },
  data: function data() {
    return {
      colorBase: '',
      menus: [{ name: 'Contas a Pagar', routeName: 'bill-pay.list', dropdonwId: 'bill-pay' }, { name: 'Contas a Receber', routeName: 'bill-receive.list', dropdonwId: 'bill-receive' }],
      menusDropDown: [{
        id: 'bill-pay', items: [{ id: 0, name: 'Listar Contas', routeName: 'bill-pay.list' }, { id: 1, name: 'Criar Conta', routeName: 'bill-pay.create' }]
      }, {
        id: 'bill-receive', items: [{ id: 0, name: 'Listar Contas', routeName: 'bill-receive.list' }, { id: 1, name: 'Criar Conta', routeName: 'bill-receive.create' }]
      }],
      menuSideNav: [{
        name: 'Contas a Pagar',
        routeName: 'bill-pay.list',
        dropdonwId: 'bill-pay',
        icon: 'call_made',
        colorBase: 'red darken-1',
        active: '',
        subMenu: [{ id: 0, name: 'Listar Contas', routeName: 'bill-pay.list' }, { id: 1, name: 'Criar Conta', routeName: 'bill-pay.create' }] }, {
        name: 'Contas a Receber',
        routeName: 'bill-receive.list',
        dropdonwId: 'bill-receive',
        icon: 'call_received',
        colorBase: 'green lighten-2',
        active: 'active',
        subMenu: [{ id: 0, name: 'Listar Contas', routeName: 'bill-receive.list' }, { id: 1, name: 'Criar Conta', routeName: 'bill-receive.create' }] }]

    };
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: "\n              <div class=\"container-fluid\">\n              <div class=\"well\">\n              <h2>Saldo total da Conta</h2>\n              <h3>{{saldo | currency 'R$ '}}</h3>\n              </div>\n              </div>\n  ",
  computed: {
    saldo: function saldo() {
      var saldo = 0;
      var billListComponent = this.$root.$children[0];
      if (billListComponent.billsPay.length == 0) {
        return saldo;
      }
      for (var i in billListComponent.billsPay) {
        saldo += billListComponent.billsPay[i].value;
        return saldo;
      }
    }
  }
};

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function BillClass() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BillClass);

    this.date_due = '';
    this.name = '';
    this.value = 0;
    this.done = false;

    Object.assign(this, data);
  }

  _createClass(BillClass, [{
    key: 'toJSON',
    value: function toJSON() {
      console.log(this.date_due);
      return {
        date_due: this.getDateDue(this.date_due).toISOString(),
        name: this.name,
        value: this.value,
        done: this.done
      };
    }
  }, {
    key: 'getDateDue',
    value: function getDateDue(date) {
      if (!(date instanceof Date)) {
        date = new Date(date);
      }
      return date;
    }
  }]);

  return BillClass;
}();

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  template: '\n<!-- Modal Structure -->\n<div :id="modal.id" class="modal">\n  <div class="modal-content">\n    <slot name="content"></slot>\n  </div>\n  <div class="modal-footer">\n    <slot name="footer"></slot>\n  </div>\n</div>\n',
  props: {
    modal: {
      type: Object,
      default: function _default() {
        return {
          id: ''
        };
      }
    }
  },
  ready: function ready() {
    var id = this.modal.id;
    $(document).ready(function () {
      $('.modal').modal();
    });
  }
};

/***/ })
]);
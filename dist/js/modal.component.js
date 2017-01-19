'use strict';

window.modalComponent = Vue.extend({
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
});
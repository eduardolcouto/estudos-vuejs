'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Vue.filter('doneLabel', function (value) {
    return value == 0 ? 'Não Paga' : 'Paga';
});

Vue.filter('doneReceive', function (value) {
    return value == 0 ? 'Não Recebida' : 'Recebida';
});

Vue.filter('statusGeneral', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada!";
    }

    if (!value) {
        return "Nenhum conta a pagar!";
    } else {
        return "Existem " + value + " contas a pagar!";
    }
});

Vue.filter('statusGeneralReceive', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada!";
    }

    if (!value) {
        return "Nenhum conta a receber!";
    } else {
        return "Existem " + value + " contas a receber!";
    }
});

Vue.filter('formatNumber', {
    read: function read(value) {
        var number = 0;
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) != undefined) {
            var numberMatch = value.toString().match(/\d+(\.{1}\d{1,2){0,1}/g);
            number = numberMatch ? numberMatch[0] : number;
        }

        return Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        }).format(number);
    },
    write: function write(value) {
        var number = 0;
        if (value.length > 0) {
            number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }

        return number;
    }
});
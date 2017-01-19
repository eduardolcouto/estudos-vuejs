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
        return value + " contas a pagar!";
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
        var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : navigator.language;

        var number = 0;
        var currencyCode = lang == 'pt-BR' ? 'BRL' : 'USD';
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined) {
            var numberMatch = value.toString().match(/\d+(\.{1}\d{1,2){0,1}/g);
            number = numberMatch ? numberMatch[0] : number;
        }

        return Intl.NumberFormat(lang, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: currencyCode
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

Vue.filter('formatDate', {
    read: function read(value) {
        var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : navigator.language;

        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined) {
            if (!(value instanceof Date)) {
                var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                var dateString = dateRegex ? dateRegex[0] : dateRegex;
                if (dateString) {
                    value = new Date(dateString + "T03:00:00");
                } else {
                    return value;
                }
            }
            return new Intl.DateTimeFormat(lang).format(value).split('T')[0];
        }
        return value;
    },
    write: function write(value) {
        var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if (dateRegex) {
            var dateString = dateRegex[0];
            var date = new Date(dateString.split('/').reverse().join('-') + 'T03:00:00');
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        return value;
    }
});

Vue.filter('formatString', {
    read: function read(value) {
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined) {
            return value.toUpperCase();
        }
    },
    write: function write(value) {
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined) {
            return value.toLowerCase();
        }
    }
});
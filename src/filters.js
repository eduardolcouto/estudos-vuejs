Vue.filter('doneLabel',function(value){
  return value == 0 ?'Não Paga':'Paga';
});

Vue.filter('doneReceive',function(value){
    return value == 0 ?'Não Recebida':'Recebida';
});

Vue.filter('statusGeneral', function(value){
  if(value === false){
    return "Nenhuma conta cadastrada!";
  }

  if(!value){
    return "Nenhum conta a pagar!";
  }else{
    return "Existem "+value+" contas a pagar!";
  }
});


Vue.filter('statusGeneralReceive', function(value){
    if(value === false){
        return "Nenhuma conta cadastrada!";
    }

    if(!value){
        return "Nenhum conta a receber!";
    }else{
        return "Existem "+value+" contas a receber!";
    }
});

Vue.filter('formatNumber',{
    read(value){
        let number = 0;
        if (value && typeof value !== undefined){
            let numberMatch = value.toString().match(/\d+(\.{1}\d{1,2){0,1}/g);
            number = numberMatch ? numberMatch[0] : number;
        }

        return Intl.NumberFormat('pt-BR',{
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        }).format(number);
    },
    write(value){
        let number = 0;
        if (value.length > 0){
            number = value.replace(/[^\d\,]/g,'').replace(/\,/g,'.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }

        return number;

    }
});

Vue.filter('formatDate',{
    read(value){
        if(value && typeof value !== undefined){
            if(!(value instanceof Date)){
                let dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                let dateString = dateRegex ? dateRegex[0] : dateRegex;
                if(dateString){
                    value = new Date(dateString + "T03:00:00");
                }else{
                    return value;
                }
            }
            return new Intl.DateTimeFormat('pt-BR').format(value).split(' ')[0]
        }
        return value;
    },
    write(value){
        let dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if(dateRegex){
            let dateString = dateRegex[0];
            let date = new Date(dateString.split('/').reverse().join('-')+ 'T03:00:00');
            if(!isNaN(date.getTime())){
                return date;
            }
        }
        return value;
    }
})
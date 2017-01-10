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

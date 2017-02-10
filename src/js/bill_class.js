class BillClass{
  constructor(data = {}){
    this.date_due = '';
    this.name = '';
    this.value = 0;
    this.done = false;

    Object.assign(this,data);
  };

  toJSON(){
    console.log(this.date_due);
    return{
      date_due: this.getDateDue(this.date_due).toISOString(),
      name: this.name,
      value: this.value,
      done: this.done
    }
  };
  getDateDue(date){
    if(!(date instanceof Date)){
        date = new Date(date);
    }
    return date;
  }
}

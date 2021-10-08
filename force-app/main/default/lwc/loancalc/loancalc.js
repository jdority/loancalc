import { LightningElement, track } from 'lwc';
export default class CalculatorInLwc extends LightningElement {
    @track principalNumber;
    @track interestNumber;
    @track monthsNumber;
    resultValue;
    interestrate;
    monthlyrate;
    payment;

    handleNumberPChange(event) {
        this.principalNumber = parseInt(event.target.value);
    }
    handleNumberIChange(event) {
        this.interestNumber = parseInt(event.target.value);
    }
    handleNumberMChange(event) {
        this.monthsNumber = parseInt(event.target.value);
    }


    calculate() {
        this.interestrate = this.interestNumber/100;
        this.monthlyrate = this.interestrate/12;

        
        this.payment = this.monthlyrate;
        //this.payment = this.principalNumber * (monthlyrate/(1-Math.pow(1+monthlyrate, -1)));
        //this.payment = this.principalNumber * (monthlyrate/(1-Math.pow(1+monthlyrate, -monthsNumber)));
            
   
       this.resultValue = this.payment;
       
    }

}
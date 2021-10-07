import { LightningElement, track } from 'lwc';
export default class CalculatorInLwc extends LightningElement {
    @track principalNumber;
    @track interestNumber;
    @track monthsNumber;
    resultValue;
    handleNumberPChange(event) {
        this.principalNumber = parseInt(event.target.value);
    }
    handleNumberIChange(event) {
        this.interestNumber = parseInt(event.target.value);
    }
    handleNumberMChange(event) {
        this.monthsNumber = parseInt(event.target.value);
    }





    addition() {
        this.resultValue = parseInt(this.principalNumber) + parseInt(this.interestNumber);
    }
    multification() {
        this.resultValue = this.principalNumber * this.interestNumber;
    }
    subtraction() {
        this.resultValue = this.principalNumber - this.interestNumber;
    }
    division() {
        this.resultValue = this.principalNumber / this.interestNumber;
    }
}
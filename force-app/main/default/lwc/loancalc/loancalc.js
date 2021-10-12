import { LightningElement, track, api } from 'lwc';

export default class CalculatorInLwc extends LightningElement {
    @track principalNumber;
    @track interestNumber;
    @track monthsNumber;
    @track totalPayment;
    @track totalInterest;
    @api keyField = "number";
    @api rows = [];
    @api columns = [
            {
                label: 'Payment #',
                fieldName: 'number',
                type: 'number'
            },
            {
                label: 'Balance',
                fieldName: 'balance',
                type: 'currency'
            },
            {
                label: 'Payment Amount', 
                fieldName: 'payment',
                type: 'currency'
            },
            {
                label: 'Interest',
                fieldName: 'interest',
                type: 'currency'
            },
            {
                label: 'Principal',
                fieldName: 'principal',
                type: 'currency'
            }
        ];

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
        let result = this.amortize(this.principalNumber,this.interestrate,this.monthsNumber);
        let payments = result.paymentList;
        this.totalPayment=result.totalPayment;
        this.totalInterest=result.totalInterest;

        console.log(payments);
        console.log('Eat Turkey');
 
        this.rows = payments.slice();
        console.log(this.rows);
        
    }

    amortize(balance, interestRate, terms) {

        let result={};
        result.loanAmount=balance;
        let monthlyRate = interestRate/12;
        //Calculate the payment
        let payment = balance * (monthlyRate/(1-Math.pow(1+monthlyRate, -terms)));
                
        let paymentList = [];
        for (var count = 0; count < terms; ++count)	{ 
            let paymentItem = {};
            
            //in-loop interest amount holder
            let interest = 0;
            let monthlyPrincipal = 0;

            let paymentInterest = balance * monthlyRate;
            monthlyPrincipal = payment - paymentInterest; //fixed (was interest)
            
            paymentItem.number = count + 1;
            paymentItem.payment = payment.toFixed(2);
            paymentItem.balance = balance.toFixed(2);  
            paymentItem.interest = paymentInterest.toFixed(2);
            paymentItem.principal = (payment - paymentInterest).toFixed(2);
            paymentItem.principalText=paymentItem.principal;
            paymentList.push(paymentItem);
            
            //update the balance for each loop iteration
            balance = balance - monthlyPrincipal;	
            
        }
        result.paymentList=paymentList;
        result.totalPayment=(payment*terms).toFixed(2);
        result.totalInterest=(result.totalPayment-result.loanAmount).toFixed(2);
        return result;
      }

}


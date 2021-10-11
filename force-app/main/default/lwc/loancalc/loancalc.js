import { LightningElement, track, api } from 'lwc';

export default class CalculatorInLwc extends LightningElement {
    @track principalNumber;
    @track interestNumber;
    @track monthsNumber;

    @api keyField = "number";
    @api rows = [];
    @api columns = [
            {
                label: 'Payment Number',
                fieldName: 'number',
                type: 'number'
            },
            {
                label: 'Balance',
                fieldName: 'balance',
                type: 'currency'
            },
            {
                label: 'Payment', 
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
        let payments = this.amortize(this.principalNumber,this.interestrate,this.monthsNumber);
        console.log(payments);
        console.log('Eat Turkey');
 
        this.rows = payments.slice();
        console.log(this.rows);
        
    }

    amortize(balance, interestRate, terms) {
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
            paymentList.push(paymentItem);
            
            //update the balance for each loop iteration
            balance = balance - monthlyPrincipal;	
            
        }
        return paymentList;
      }

}
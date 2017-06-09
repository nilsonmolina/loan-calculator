var LoanController = (function() {
    var data = {
        monthlyPayments: 0,
        totalAmount: 0,
        loanCost: 0
    };

    var bindEvents = function() {
        document.getElementById('button').addEventListener('click', calculateLoan);
    };

    var calculateLoan = function() {
        var loan = parseFloat(document.getElementById('principal').value);
        var rate = parseFloat(document.getElementById('interest').value);
        var term = parseFloat(document.getElementById('time').value);

        data.monthlyPayments = getMonthlyPayments(loan, rate, term);
        data.totalAmount = data.monthlyPayments * term;
        data.loanCost = data.totalAmount - loan;

        showResults();
    };

    var getMonthlyPayments = function (principal, rate, numberOfPayments) {
        var effectiveRate = (rate / 100) / 12;
        return principal * (effectiveRate / (1 - Math.pow(1 + effectiveRate, -numberOfPayments)));
    };

    var showResults = function() {
        console.log('monthlyPayments:', data.monthlyPayments);
        console.log('totalAmount:', data.totalAmount);
        console.log('cost:', data.loanCost);

        document.getElementById('monthly').textContent  = '$' + data.monthlyPayments.toFixed(2);
        document.getElementById('total').textContent  = '$' + data.totalAmount.toFixed(2);
        document.getElementById('cost').textContent  = '$' + data.loanCost.toFixed(2);
    };

    return {
        init: function() {
            bindEvents();
            setTimeout(function(){
                document.querySelector('.calculator').classList.toggle('hidden');
            }, 250);

        }
    };
})();

LoanController.init();

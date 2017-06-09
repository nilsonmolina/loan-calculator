var LoanController = (function() {
    var data = {
        monthlyPayments: 0,
        totalAmount: 0,
        loanCost: 0
    };

    var input = {
        loan: 0,
        rate: 0,
        term: 0
    };

    var table = document.getElementById('resultsTable');

    var bindEvents = function() {
        document.getElementById('button').addEventListener('click', calculateLoan);
    };

    var calculateLoan = function() {
        input.loan = parseFloat(document.getElementById('principal').value);
        input.rate = parseFloat(document.getElementById('interest').value);
        input.term = parseFloat(document.getElementById('time').value);

        data.monthlyPayments = getMonthlyPayments(input.loan, input.rate, input.term);
        data.totalAmount = data.monthlyPayments * input.term;
        data.loanCost = data.totalAmount - input.loan;

        showResults();
    };

    var getMonthlyPayments = function(principal, rate, numberOfPayments) {
        var effectiveRate = (rate / 100) / 12;
        return principal * (effectiveRate / (1 - Math.pow(1 + effectiveRate, -numberOfPayments)));
    };

    var showResults = function() {
      // var row = table.insertRow(table.rows.length);
        var row = table.insertRow(1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        cell1.innerHTML = parseCurrency(input.loan) + ' @'+ input.rate + '% for ' + input.term + ' months';
        cell2.innerHTML = parseCurrency(data.monthlyPayments);
        cell3.innerHTML = parseCurrency(data.totalAmount);
        cell4.innerHTML = parseCurrency(data.loanCost);
    };

    var parseCurrency = function(value) {
      return parseFloat(value.toFixed(2)).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      });
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

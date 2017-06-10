var LoanController = (function() {
  var data = {
    monthlyPayments: 0,
    totalAmount: 0,
    loanCost: 0,
    loan: 0,
    rate: 0,
    term: 0
  };
  var dom = {
    table: document.getElementById('resultsTable'),
    loan: document.getElementById('principal'),
    rate: document.getElementById('interest'),
    term: document.getElementById('time'),
    calculatorDiv: document.querySelector('.calculator'),
    button: document.getElementById('button')
  };

  var bindEvents = function() {
    dom.button.addEventListener('click', function() {
      getUserInput();
      // Check for errors.
      if (document.querySelector('.error') !== null) {
        return;
      }
      calculateLoan();
      outputResults();
      dom.loan.select();
    });

    dom.loan.addEventListener('focusout', function() {
      isNaN(parseFloat(dom.loan.value)) ? dom.loan.classList.add('error') : dom.loan.classList.remove('error');
    });

    dom.rate.addEventListener('focusout', function() {
      isNaN(parseFloat(dom.rate.value)) ? dom.rate.classList.add('error') : dom.rate.classList.remove('error');
    });

    dom.term.addEventListener('focusout', function() {
      isNaN(parseFloat(dom.term.value)) ? dom.term.classList.add('error') : dom.term.classList.remove('error');
    });

    dom.loan.addEventListener('keyup', checkIfEnter);
    dom.rate.addEventListener('keyup', checkIfEnter);
    dom.term.addEventListener('keyup', checkIfEnter);

  };

  var getUserInput = function() {
    clearErrors();
    data.loan = parseFloat(dom.loan.value);
    data.rate = parseFloat(dom.rate.value);
    data.term = parseFloat(dom.term.value);
    validateData();
  };

  var validateData = function() {
    if (isNaN(data.term)){
      dom.term.classList.add('error');
      dom.term.select();
    } if (isNaN(data.rate)){
      dom.rate.classList.add('error');
      dom.rate.select();
    } if (isNaN(data.loan)){
      dom.loan.classList.add('error');
      dom.loan.select();
    }
  };

  var clearErrors = function() {
    dom.loan.classList.remove('error');
    dom.rate.classList.remove('error');
    dom.term.classList.remove('error');
  };

  var calculateLoan = function() {
    data.monthlyPayments = getMonthlyPayments(data.loan, data.rate, data.term);
    data.totalAmount = data.monthlyPayments * data.term;
    data.loanCost = data.totalAmount - data.loan;
  }

  var getMonthlyPayments = function(principal, rate, numberOfPayments) {
    var effectiveRate = (rate / 100) / 12;
    return principal * (effectiveRate / (1 - Math.pow(1 + effectiveRate, -numberOfPayments)));
  };

  var outputResults = function() {
    var row = dom.table.insertRow(1); //inserts row at the beginning of the table, after header row

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = parseCurrency(data.loan) + ' @'+ data.rate + '% for ' + data.term + ' months';
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

  var checkIfEnter = function(e) {
    if(e.keyCode === 13){
      dom.button.click();
    }
  };

  return {
    init: function() {
      bindEvents();
      setTimeout(function(){
          dom.calculatorDiv.classList.toggle('hidden');
          dom.loan.select();
      }, 250);
    }
  };
})();

LoanController.init();

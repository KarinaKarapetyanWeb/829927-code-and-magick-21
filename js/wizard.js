'use strict';

(function () {

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var coatColorInput = document.querySelector('input[name=coat-color]');
  var eyesColorInput = document.querySelector('input[name=eyes-color]');
  var fireballColorInput = document.querySelector('input[name=fireball-color]');
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  var randomCoatColor = 'rgb(101, 137, 164)';
  var randomEyeColor = 'black';
  var randomFireballColor;

  var getRank = function (wizard) {
    let rank = 0;

    // с цветом пальто все работает

    // if (wizard.colorCoat === randomCoatColor) {
    //   rank += 2;
    // }

    // с цветом глаз нет, не могу понять, в чем проблема
    // я решила заккоментировать, чтобы он показывал магов только с одинаковым цветом глаз

    if (wizard.colorEyes === randomEyeColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(window.util.wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  // не работает переопределение переменной color, которую я подставляю в качестве параметра при выхове функции colorize, то есть всегда остается значение  цвета по умолчанию

  // var colorize = function (element, data, color, input) {
  //   element.addEventListener('click', function () {
  //     color = window.util.getRandomItem(data);
  //     input.value = color;

  //     if (element.tagName.toLowerCase() === 'div') {
  //       element.style.backgroundColor = color;
  //     } else {
  //       updateWizards();
  //       element.style.fill = color;
  //     }
  //   });
  // };

  // colorize(wizardCoat, COAT_COLORS, randomCoatColor, coatColorInput);

  // colorize(wizardEyes, EYES_COLORS, randomEyeColor, eyesColorInput);

  // colorize(wizardFireball, FIREBALL_COLORS, randomFireballColor, fireballColorInput);

  // поэтому пришлось переписать функцию таким образом

  var colorize = function (element, data, input) {
    element.addEventListener('click', function () {
      const color = window.util.getRandomItem(data);

      switch (element) {
        case wizardCoat:
          randomCoatColor = color;
          break;
        case wizardEyes:
          randomEyeColor = color;
          break;
        case wizardFireball:
          randomFireballColor = color;
          break;
      }

      input.value = color;

      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        updateWizards();
        element.style.fill = color;
      }
    });
  };

  var successHandler = function () {
    updateWizards();
  };

  colorize(wizardCoat, COAT_COLORS, coatColorInput);

  colorize(wizardEyes, EYES_COLORS, eyesColorInput);

  colorize(wizardFireball, FIREBALL_COLORS, fireballColorInput);

  window.backend.load(successHandler, window.errorHandler);
})();

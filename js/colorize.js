'use strict';

(function () {
  window.colorize = function (element, data, color, input) {
    element.addEventListener('click', function () {
      color = window.util.getRandomItem(data);
      input.value = color;
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
    });
  };
})();

'use strict';

(function () {

  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var CLOUD_TEXT_1 = 'Ура вы победили!';
  var CLOUD_TEXT_2 = 'Список результатов:';
  var CLOUD_TEXT_FONT = '16px "PT Mono"';
  var TEXT_HEIGHT = 16;
  var BAR_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderCloudText = function (ctx, x, y, cloudFont, text, baseline) {
    ctx.fillStyle = '#000';
    ctx.font = cloudFont;
    ctx.textBaseline = baseline;
    ctx.fillText(text, x, y);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  var getBarColor = function (name) {
    var barColor = 'hsl(223,' + Math.random() * 100 + '%, 44%)';

    if (name === "Вы") {
      barColor = 'rgba(255, 0, 0, 1)';
    }
    return barColor;
  };

  window.renderStatistics = function (ctx, names, times) {

    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
    renderCloudText(ctx, CLOUD_X + GAP * 5, CLOUD_Y + GAP * 2, CLOUD_TEXT_FONT, CLOUD_TEXT_1, 'hanging');
    renderCloudText(ctx, CLOUD_X + GAP * 5, CLOUD_Y + GAP * 4, CLOUD_TEXT_FONT, CLOUD_TEXT_2, 'hanging');

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {

      var currentBarHeight = (BAR_HEIGHT * times[i]) / maxTime;
      var startCoordX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;

      renderCloudText(ctx, startCoordX, CLOUD_Y + CLOUD_HEIGHT - GAP * 2, CLOUD_TEXT_FONT, names[i], 'bottom');

      renderCloudText(ctx, startCoordX, CLOUD_Y + CLOUD_HEIGHT - GAP * 4 - TEXT_HEIGHT - currentBarHeight, CLOUD_TEXT_FONT, times[i].toFixed(), 'bottom');

      ctx.fillStyle = getBarColor(names[i]);

      ctx.fillRect(startCoordX, CLOUD_Y + CLOUD_HEIGHT - GAP * 3 - TEXT_HEIGHT - currentBarHeight, BAR_WIDTH, currentBarHeight);
    }

  };

})();

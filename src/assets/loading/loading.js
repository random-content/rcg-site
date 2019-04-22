window.loadingData = {
  activeColor: null,
  lastColorChange: null,
  appLoaded: false
};

window.onload = function() {
  function getRandomColor() {
    var colors = [
      'orange',
      'green',
      'blue',
      'purple',
      'red'
    ];

    var index = Math.floor(Math.random() * colors.length);

    return colors[index];
  }

  var loadingClasses = document.getElementById('loadingLogo').classList;
  var initialColor = getRandomColor();

  loadingClasses.add(initialColor);
  window.loadingData.activeColor = initialColor;

  var interval = setInterval(function() {
    if (window.loadingData.appLoaded) {
      clearInterval(interval);
      return;
    }

    var newColor = getRandomColor();
    while (newColor === window.loadingData.activeColor) {
      newColor = getRandomColor();
    }

    loadingClasses.remove('orange', 'green', 'blue', 'purple', 'red');
    loadingClasses.add(newColor);

    window.loadingData.activeColor = newColor;
    window.loadingData.lastColorChange = Date.now();
  }, 250);
};

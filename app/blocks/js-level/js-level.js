var sliderElem = document.querySelector('.js-level__scale');
var thumbElem = document.querySelector('.js-level__pointer');

thumbElem.onmousedown = function(e) {
  var thumbCoords = getCoords(thumbElem);
  var shiftX = e.pageX - thumbCoords.left;
  // shiftY здесь не нужен, слайдер двигается только по горизонтали

  var sliderCoords = getCoords(sliderElem);
	//  вычесть координату родителя, т.к. position: relative

  document.onmousemove = function(e) {
		var newLeft = e.pageX - shiftX - sliderCoords.left;
    // курсор ушёл вне слайдера
    if (newLeft < 0) {
      newLeft = 0;
    }
    var rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    thumbElem.style.left = newLeft + 'px';
  }

  document.onmouseup = function() {
    document.onmousemove = document.onmouseup = null;
  };

  return false; // disable selection start (cursor change)
};


sliderElem.onclick = function(e) {
	// Что бы работало на touch устройствах
  var sliderCoords = getCoords(sliderElem);

	sliderElem.onclick = function (e) {
		var newLeft = e.pageX - 10 - sliderCoords.left;
		if (newLeft < 0) {
      newLeft = 0;
    }
    var rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }
		
		thumbElem.style.left = newLeft + 'px';
	}
};

thumbElem.ondragstart = function() {
  return false;
};

function getCoords(elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};

const sliderElem = document.querySelector('.js-level__scale');
const thumbElem = document.querySelector('.js-level__pointer');

function getCoords(elem) { // кроме IE8-
	const box = elem.getBoundingClientRect();

	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
}

thumbElem.onmousedown = function (e) {
	const thumbCoords = getCoords(thumbElem);
	const shiftX = e.pageX - thumbCoords.left;
  // shiftY здесь не нужен, слайдер двигается только по горизонтали

	const sliderCoords = getCoords(sliderElem);
	//  вычесть координату родителя, т.к. position: relative

	document.onmousemove = function (f) {
		let newLeft = f.pageX - shiftX - sliderCoords.left;
    // курсор ушёл вне слайдера
		if (newLeft < 0) {
			newLeft = 0;
		}
		const rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;
		if (newLeft > rightEdge) {
			newLeft = rightEdge;
		}

		thumbElem.style.left = newLeft + 'px';
	};

	document.onmouseup = function () {
		document.onmousemove = document.onmouseup = null;
	};

	return false; // disable selection start (cursor change)
};


sliderElem.onclick = function () {
	// Что бы работало на touch устройствах
	const sliderCoords = getCoords(sliderElem);

	sliderElem.onclick = function (c) {
		let newLeft = c.pageX - 10 - sliderCoords.left;

		if (newLeft < 0) {
			newLeft = 0;
		}

		const rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;
		if (newLeft > rightEdge) {
			newLeft = rightEdge;
		}

		thumbElem.style.left = newLeft + 'px';
	};
};

thumbElem.ondragstart = function () {
	return false;
};

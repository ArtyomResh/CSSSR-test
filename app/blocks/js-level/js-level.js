document.querySelector('.js-level__scale').onclick = function (e) {
	const x = e.pageX;

	const pointer = document.querySelector('.js-level__pointer');
	pointer.style.marginLeft = x - 135 + 'px';
};

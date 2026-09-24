(function () {
	var navigation = document.getElementById('navigation');
	if (!navigation) {
		return;
	}

	var toggle = navigation.querySelector('.nav-toggle');
	if (!toggle) {
		return;
	}

	var setScrollState = function () {
		document.body.classList.toggle('has-scrolled', window.scrollY > 4);
	};

	setScrollState();
	window.addEventListener('scroll', setScrollState, { passive: true });

	toggle.addEventListener('click', function () {
		var isOpen = navigation.classList.toggle('is-open');
		document.body.classList.toggle('nav-open', isOpen);
		toggle.setAttribute('aria-expanded', String(isOpen));
		toggle.querySelector('.nav-toggle-label').textContent = isOpen ? 'Close' : 'Menu';
	});
})();

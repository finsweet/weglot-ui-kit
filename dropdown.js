var Webflow = Webflow || [];
Webflow.push(function () {

const dropdownElements = document.querySelectorAll("[weglot='dropdown']");
Weglot.on('initialized', () => {
	dropdownElements.forEach(dropdown => {
	    initializeSwitchers(dropdown);
		updateSwitcherLanguage(window.Weglot.getCurrentLang(), dropdown);
	});
});
Weglot.on('languageChanged', (activeLanguage) => {
	dropdownElements.forEach(dropdown => {
		updateSwitcherLanguage(activeLanguage, dropdown);
	});
});

function initializeSwitchers(dropdown) {
	const languageOptions = dropdown.querySelectorAll(".w-dropdown-list a");
	languageOptions.forEach((link) => {
		// Make sure the language option isn't translated
		link.setAttribute('data-wg-notranslate', '');
		// Add the click listener
		link.addEventListener('click', handleClick);
	});
	function handleClick(e) {
		e.preventDefault();
		const langOption = e.target.closest(`a[lang]`);
		if (!langOption) {
			return;
		}
		Weglot.switchTo(langOption.getAttribute('lang'));
	}
}

function updateSwitcherLanguage(newLanguage, dropdown) {
	const newLanguageLinks = dropdown.querySelectorAll(
		`.w-dropdown-list a[lang="${newLanguage}"]`
	);
	const oldToggles = dropdown.querySelectorAll(".w-dropdown-toggle");
	
	if (!newLanguageLinks.length || !oldToggles) {
		return;
	}
	
	let oldSrc = dropdown
		.querySelector(`.w-dropdown-toggle [weglot='flag']`);
		
		if(oldSrc) {
			oldSrc = oldSrc.getAttribute('src');
			const newSrc = dropdown
				.querySelector(`.w-dropdown-list a[lang="${newLanguage}"] img`)
				.getAttribute('src');
			newLanguageLinks.forEach((link) => {
                const image = link.querySelector("[weglot='flag']");
				image.src = oldSrc;
			});
			oldToggles.forEach((toggle) => {
				const image = toggle.querySelector("[weglot='flag']");
				image.src = newSrc;
			});
		}
		
	const oldText = dropdown.querySelector(`.w-dropdown-toggle [weglot='text']`).innerText;
	const oldLanguage = dropdown
		.querySelector(".w-dropdown-toggle")
		.getAttribute('lang');

	
	const newText = dropdown.querySelector(
		`.w-dropdown-list a[lang="${newLanguage}"] [weglot='text']`
	).innerText;

	newLanguageLinks.forEach((link) => {
		const text = link.querySelector("[weglot='text']");
		text.innerText = oldText;
		link.setAttribute('lang', oldLanguage);
	});
	oldToggles.forEach((toggle) => {
		const text = toggle.querySelector("[weglot='text']");
		text.innerText = newText;
		toggle.setAttribute('lang', newLanguage);
	});
}
});

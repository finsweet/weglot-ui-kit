/**
 * Handles Weglot language switcher dropdowns in Webflow.
 * {@link https://weglot-2-0-ui-kit.webflow.io/}
 */
var Webflow = Webflow || [];
Webflow.push(function () {
  const dropdownElements = document.querySelectorAll("[weglot='dropdown']");

  window.Weglot.on("initialized", () => {
    dropdownElements.forEach((dropdown) => {
      const currentLang = window.Weglot.getCurrentLang();

      initializeSwitcher(dropdown);
      updateSwitcherLanguage(currentLang, dropdown);
    });
  });

  window.Weglot.on("languageChanged", (activeLanguage) => {
    dropdownElements.forEach((dropdown) => {
      updateSwitcherLanguage(activeLanguage, dropdown);
    });
  });

  /**
   * Initializes a language switcher dropdown
   * @param {Element} dropdown
   */
  function initializeSwitcher(dropdown) {
    const languageOptions = dropdown.querySelectorAll(".w-dropdown-list a");

    languageOptions.forEach((link) => {
      // Make sure the language option isn't translated
      link.setAttribute("data-wg-notranslate", "");
      // Add the click listener
      link.addEventListener("click", handleClick);
    });

    function handleClick(e) {
      e.preventDefault();

      const langOption = e.target.closest(`a[lang]`);
      if (!langOption) return;

      const newLang = langOption.getAttribute("lang");

      window.Weglot.switchTo(newLang);
    }
  }

  /**
   * Updates the language switcher dropdown
   * @param {string} newLanguage
   * @param {Element} dropdown
   */
  function updateSwitcherLanguage(newLanguage, dropdown) {
    const newLanguageLinks = dropdown.querySelectorAll(
      `.w-dropdown-list a[lang="${newLanguage}"]`
    );
    const toggles = dropdown.querySelectorAll(".w-dropdown-toggle");

    if (!newLanguageLinks.length || !toggles.length) {
      return;
    }

    const oldFlag = dropdown.querySelector(
      `.w-dropdown-toggle [weglot='flag']`
    );

    if (oldFlag) {
      const oldFlagSrc = oldFlag.getAttribute("src");
      const newFlagSrc = dropdown
        .querySelector(`.w-dropdown-list a[lang="${newLanguage}"] img`)
        ?.getAttribute("src");

      newLanguageLinks.forEach((link) => {
        const image = link.querySelector("[weglot='flag']");
        image.src = oldFlagSrc;
      });

      toggles.forEach((toggle) => {
        const image = toggle.querySelector("[weglot='flag']");
        image.src = newFlagSrc;
      });
    }

    const oldText = dropdown.querySelector(
      `.w-dropdown-toggle [weglot='text']`
    ).innerText;
    const oldLanguage = dropdown
      .querySelector(".w-dropdown-toggle")
      ?.getAttribute("lang");

    const newText = dropdown.querySelector(
      `.w-dropdown-list a[lang="${newLanguage}"] [weglot='text']`
    ).innerText;

    newLanguageLinks.forEach((link) => {
      const text = link.querySelector("[weglot='text']");
      if (!text) return;

      text.innerText = oldText;

      link.setAttribute("lang", oldLanguage);
    });

    toggles.forEach((toggle) => {
      const text = toggle.querySelector("[weglot='text']");
      if (!text) return;

      text.innerText = newText;

      toggle.setAttribute("lang", newLanguage);
    });
  }
});

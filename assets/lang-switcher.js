/**
 * Language Switcher - Clean Dropdown with Google Translate
 * Matches the style of main signalpilot.io site
 */

(function() {
  'use strict';

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh-CN', name: '中文 (简体)', flag: '🇨🇳' },
    { code: 'zh-TW', name: '中文 (繁體)', flag: '🇹🇼' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'no', name: 'Norsk', flag: '🇳🇴' },
    { code: 'da', name: 'Dansk', flag: '🇩🇰' },
    { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
    { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
    { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
    { code: 'ro', name: 'Română', flag: '🇷🇴' },
    { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
    { code: 'bg', name: 'Български', flag: '🇧🇬' }
  ];

  let currentLang = 'en';
  let translateElement = null;

  // Get current language from cookie or URL
  function getCurrentLanguage() {
    const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (match && match[1]) {
      return match[1];
    }
    return 'en';
  }

  // Change language
  function changeLanguage(langCode) {
    if (langCode === 'en') {
      // Reset to English
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      location.reload();
    } else {
      // Set language cookie
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
      location.reload();
    }
  }

  // Create dropdown menu
  function createDropdownMenu() {
    const menu = document.createElement('div');
    menu.className = 'lang-dropdown-menu';
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-label', 'Language selection');

    currentLang = getCurrentLanguage();

    languages.forEach(lang => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('role', 'menuitem');
      button.setAttribute('data-lang', lang.code);
      button.innerHTML = `${lang.flag} ${lang.name}`;

      if (lang.code === currentLang) {
        button.classList.add('active');
        button.setAttribute('aria-current', 'true');
      }

      button.addEventListener('click', () => {
        changeLanguage(lang.code);
      });

      menu.appendChild(button);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.lang-dropdown') && menu.classList.contains('active')) {
        menu.classList.remove('active');
      }
    });

    return menu;
  }

  // Initialize
  function init() {
    const container = document.getElementById('google_translate_element');
    if (!container) return;

    // Replace container content with our button
    container.className = 'lang-dropdown';

    // Get current language info
    currentLang = getCurrentLanguage();
    const currentLangObj = languages.find(l => l.code === currentLang) || languages[0];

    // Create toggle button
    const button = document.createElement('button');
    button.id = 'langToggle';
    button.className = 'btn btn-ghost btn-sm';
    button.type = 'button';
    button.setAttribute('aria-label', 'Select language');
    button.setAttribute('aria-haspopup', 'true');
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = `<span>${currentLangObj.flag}</span><span style="margin-left: 0.2rem">${currentLangObj.code.toUpperCase().split('-')[0]}</span>`;

    // Create dropdown menu and append to body
    const menu = createDropdownMenu();
    document.body.appendChild(menu);

    // Toggle menu
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = menu.classList.contains('active');
      menu.classList.toggle('active');
      button.setAttribute('aria-expanded', !isActive);
    });

    container.innerHTML = '';
    container.appendChild(button);

    // Load Google Translate in background
    loadGoogleTranslate();
  }

  // Load Google Translate script silently
  function loadGoogleTranslate() {
    // Add the translate element hidden
    const hiddenDiv = document.createElement('div');
    hiddenDiv.id = 'google_translate_element_hidden';
    hiddenDiv.style.display = 'none';
    document.body.appendChild(hiddenDiv);

    window.googleTranslateElementInit = function() {
      translateElement = new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: languages.map(l => l.code).join(','),
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element_hidden');
    };

    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = function() {
      console.warn('Failed to load Google Translate');
    };
    document.head.appendChild(script);
  }

  // Force remove Google Translate banner (aggressive cleanup)
  function removeGoogleBanner() {
    // Remove the banner iframe
    const banners = document.querySelectorAll('.goog-te-banner-frame, iframe.goog-te-banner-frame, iframe.skiptranslate');
    banners.forEach(banner => {
      if (banner && banner.parentNode) {
        banner.parentNode.removeChild(banner);
      }
    });

    // Reset body position
    document.body.style.top = '0';
    document.body.style.position = 'relative';

    // Remove any classes Google adds
    document.body.classList.remove('translated-ltr', 'translated-rtl');
  }

  // Run cleanup repeatedly to catch delayed injections
  setInterval(removeGoogleBanner, 100);

  // Also run on mutation
  const observer = new MutationObserver(() => {
    removeGoogleBanner();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

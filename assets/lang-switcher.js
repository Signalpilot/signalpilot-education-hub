/**
 * Language Switcher - Clean Dropdown with Google Translate
 * Matches the exact implementation of main signalpilot.io site
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

  // Helper: Get base domain (from main site)
  function baseDomain(host) {
    const p = host.split('.');
    return p.length > 2 ? p.slice(-2).join('.') : host;
  }

  // Helper: Set cookie with domain support (from main site)
  function setCookie(name, value, days, domain) {
    let expires = '';
    if (days) {
      const d = new Date();
      d.setTime(d.getTime() + days * 864e5);
      expires = '; expires=' + d.toUTCString();
    }
    const dom = domain ? '; domain=' + domain : '';
    document.cookie = name + '=' + value + expires + '; path=/' + dom;
  }

  // Set Google Translate cookie (from main site)
  function setGoogTrans(langCode) {
    const target = (langCode === 'zh') ? 'zh-CN' : langCode;
    const val = '/en/' + target;
    setCookie('googtrans', val, 365);
    const root = '.' + baseDomain(location.hostname.replace(/^www\./, ''));
    setCookie('googtrans', val, 365, root);
  }

  // Apply language and direction attributes (from main site)
  function applyDirLang(langCode) {
    document.documentElement.lang = (langCode === 'zh') ? 'zh-CN' : langCode;
    document.documentElement.dir = (langCode === 'ar' || langCode === 'he') ? 'rtl' : 'ltr';
  }

  // Get current language from cookie or localStorage
  function getCurrentLanguage() {
    // Check localStorage first
    const stored = localStorage.getItem('sp_lang');
    if (stored && stored !== 'en') {
      return stored;
    }

    // Check cookie
    const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (match && match[1]) {
      return match[1];
    }

    return 'en';
  }

  // Change language (from main site approach)
  function changeLanguage(langCode) {
    if (langCode === 'en') {
      // Reset to English
      localStorage.removeItem('sp_lang');
      setCookie('googtrans', '', -1);
      const root = '.' + baseDomain(location.hostname.replace(/^www\./, ''));
      setCookie('googtrans', '', -1, root);
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
      location.reload();
    } else {
      // Save to localStorage
      localStorage.setItem('sp_lang', langCode);

      // Set cookies and attributes
      setGoogTrans(langCode);
      applyDirLang(langCode);

      // Reload page
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

    // Apply language attributes on page load
    const lang = getCurrentLanguage();
    if (lang && lang !== 'en') {
      applyDirLang(lang);
    }

    // Load Google Translate in background
    loadGoogleTranslate();
  }

  // Load Google Translate script silently (matches main site approach)
  function loadGoogleTranslate() {
    // Only load if we have a non-English language selected
    const lang = getCurrentLanguage();
    if (!lang || lang === 'en') return;

    // Add the translate element hidden off-screen (main site approach)
    const hiddenDiv = document.createElement('div');
    hiddenDiv.id = 'google_translate_container';
    hiddenDiv.style.position = 'absolute';
    hiddenDiv.style.left = '-9999px';
    hiddenDiv.setAttribute('aria-hidden', 'true');
    document.body.appendChild(hiddenDiv);

    window.googleTranslateElementInit = function() {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: languages.map(l => l.code).join(','),
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false  // KEY! Prevents Google's UI from showing
      }, 'google_translate_container');
    };

    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = function() {
      console.warn('Failed to load Google Translate');
    };
    document.head.appendChild(script);
  }

  // Aggressive banner cleanup
  function cleanupGoogleUI() {
    // Remove banner frames
    const frames = document.querySelectorAll('.goog-te-banner-frame, iframe.goog-te-banner-frame, .skiptranslate');
    frames.forEach(f => {
      if (f.parentNode) f.parentNode.removeChild(f);
    });

    // Reset body position
    document.body.style.top = '0';
    document.body.style.position = 'relative';

    // Remove body top attribute that Google adds
    if (document.body.hasAttribute('style')) {
      const style = document.body.getAttribute('style');
      if (style && style.includes('top:')) {
        document.body.setAttribute('style', style.replace(/top:\s*[^;]+;?/g, ''));
      }
    }
  }

  // Run cleanup multiple times to catch delayed injections
  window.addEventListener('load', () => {
    cleanupGoogleUI();
    setTimeout(cleanupGoogleUI, 500);
    setTimeout(cleanupGoogleUI, 1000);
    setTimeout(cleanupGoogleUI, 2000);
  });

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

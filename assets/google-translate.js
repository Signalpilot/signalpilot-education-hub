/**
 * Google Translate Widget Initialization
 * Provides multi-language translation for all site pages
 */

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      includedLanguages: 'es,fr,de,it,pt,ru,zh-CN,zh-TW,ja,ko,ar,hi,tr,pl,nl,sv,no,da,fi,cs,el,he,id,th,vi,uk,ro,hu,bg,hr,sk,sl',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
      multilanguagePage: false
    },
    'google_translate_element'
  );
}

// Load Google Translate script
(function() {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  script.onerror = function() {
    console.warn('Failed to load Google Translate');
  };
  document.head.appendChild(script);
})();

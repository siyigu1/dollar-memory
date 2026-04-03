/**
 * i18n — bilingual support (English / Chinese)
 */
(function () {
  var translations = {
    en: {
      // Nav
      'nav.home': 'Home',
      'nav.bio': 'Memories',
      'nav.letters': 'Letters',
      'nav.zen': 'Be with Dollar',
      'nav.zenExit': 'Back',

      // Countdown
      'countdown.pre': 'Memorial service ends in',
      'countdown.cyberLife': 'Dollar has lived in this cyber space for',
      'countdown.ended': 'The memorial service has concluded \u2665 Thank you for being here.',
      'countdown.d': 'd',
      'countdown.h': 'h',
      'countdown.m': 'm',
      'countdown.s': 's',

      // Hero
      'hero.epitaph': 'Rest peacefully. We will always remember you.',

      // Tribute
      'tribute.text': 'This space is a tribute to a life that brought so many joys to those around him. We built it in hopes that he could live on happily in this little cyber world, doing his favourite thing: napping on a couch on a sunny fall afternoon. Whether you knew him in life or are meeting him here for the first time, please feel free to send him a small gift using the buttons below. Each one is a way of saying: we remember you, and there was love before your life, during it, and always after.',

      // Gifts
      'gift.flower': 'Flowers',
      'gift.food': 'Dog Can',
      'gift.cookie': 'Dog Cookie',
      'gift.ball': 'Ball',
      'gift.letter': 'Write a Letter',

      // Bio
      'bio.photos': 'Photo Memories',
      'bio.addPhotos': 'Add photos to the assets/ folder and update CONFIG.photos in js/app.js',

      // Letters
      'letters.title': 'Letters to',
      'letters.write': 'Write a Letter',
      'letters.name': 'Your Name',
      'letters.words': 'Your Words',
      'letters.placeholder': 'Dear',
      'letters.submit': 'Leave This Letter',

      // About
      'nav.about': 'About',
      'about.title': 'About This Site',
      'about.desc': 'This cyber memorial was created in loving memory of Dollar Zhu (2011–2026), a Shih Tzu who filled our lives with fifteen years of joy, laughter, and unconditional love.',
      'about.by': 'Created by Siyi & Hao',
      'about.x': 'X (Twitter)',
      'about.xhs': 'Xiaohongshu',
      'about.email': 'Email',
      'about.tech': 'Built with WebGL, Supabase, and hosted on Cloudflare Pages.',

      // Footer
      'footer.text': 'Made with love. Forever remembered.',

      // Page title
      'title': 'In Loving Memory for Dollar',
    },
    zh: {
      // Nav
      'nav.home': '首页',
      'nav.bio': '回忆',
      'nav.letters': '信件',
      'nav.zen': '陪陪多多',
      'nav.zenExit': '返回',

      // Countdown
      'countdown.pre': '追思会倒计时',
      'countdown.cyberLife': '多多已在这个世界生活了',
      'countdown.ended': '追思会已结束 ♥ 感谢您的到来',
      'countdown.d': '天',
      'countdown.h': '时',
      'countdown.m': '分',
      'countdown.s': '秒',

      // Hero
      'hero.epitaph': '这里永远住着一只最忠实的狗狗。',

      // Tribute
      'tribute.text': '这个空间是为了纪念多多，一只曾经给我们带来许多快乐的狗狗。我们建造了这个小小的网络世界，希望他能在这里快乐地生活，做他最喜欢的事情：在暖洋洋的午后阳光里，睡在沙发上打盹儿。无论您是否认识他，欢迎通过下方的按钮给他送上一份小礼物。每一份礼物都是在说：我们不会忘记你，我们爱你，我们永远想念你。',

      // Gifts
      'gift.flower': '鲜花',
      'gift.food': '狗罐头',
      'gift.cookie': '狗饼干',
      'gift.ball': '球球',
      'gift.letter': '写些什么',

      // Bio
      'bio.about': '关于',
      'bio.breed': '品种',
      'bio.treat': '最爱的零食',
      'bio.photos': '照片回忆',
      'bio.addPhotos': '将照片添加到 assets/ 文件夹，并在 js/app.js 中更新 CONFIG.photos',

      // Letters
      'letters.title': '给',
      'letters.titleSuffix': '的信',
      'letters.write': '写一封信',
      'letters.name': '你的名字',
      'letters.words': '你的话',
      'letters.placeholder': '亲爱的',
      'letters.submit': '留下这封信',

      // About
      'nav.about': '关于',
      'about.title': '关于本站',
      'about.desc': '这个赛博纪念空间是为了纪念多多（2011–2026），一只陪伴了我们十五年的西施犬，给我们的生活带来了无尽的欢笑与爱。',
      'about.by': '由Siyi和Hao创建',
      'about.x': 'X (推特)',
      'about.xhs': '小红书',
      'about.email': '电子邮件',
      'about.tech': '使用 WebGL 和 Supabase 构建，托管于 Cloudflare Pages。',

      // Footer
      'footer.text': '用爱制作。永远铭记。',

      // Page title
      'title': '永远怀念多多',
    }
  };

  // URL param ?lang=zh takes priority, then localStorage, then default en
  var urlLang = new URLSearchParams(window.location.search).get('lang');
  var currentLang = (urlLang === 'zh' || urlLang === 'en') ? urlLang : (localStorage.getItem('memorial_lang') || 'en');

  function t(key) {
    return (translations[currentLang] && translations[currentLang][key])
      || (translations.en[key])
      || key;
  }

  function getLang() {
    return currentLang;
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('memorial_lang', lang);
    // Update URL param so the link is shareable
    var url = new URL(window.location);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url.toString());
    // Update all static elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    // Update page title
    document.title = t('title');
    // Update lang button text
    var langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.textContent = currentLang === 'en' ? '\u4E2D\u6587' : 'EN';
  }

  function toggleLang() {
    setLang(currentLang === 'en' ? 'zh' : 'en');
  }

  // Expose globally
  window.i18n = { t: t, getLang: getLang, setLang: setLang, toggleLang: toggleLang };

  // Init on load
  document.addEventListener('DOMContentLoaded', function () {
    setLang(currentLang);

    var langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.addEventListener('click', function () {
      toggleLang();
      // Re-render current page to update dynamic content
      if (window.reRenderPage) window.reRenderPage();
    });
  });
})();

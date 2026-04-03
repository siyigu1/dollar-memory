/**
 * Main application logic
 * - SPA router
 * - Scroll reveal
 * - Letters storage
 * - Lightbox
 * - Zen mode (be with Dollar)
 * - i18n integration
 */
(function () {
  // ===== Configuration =====
  const CONFIG = {
    name: 'Dollar Zhu',
    nameZh: '多多',
    birthDate: 'January 11th, 2011',
    passDate: 'April 2nd, 2026',
    birthDateZh: '2011年1月11日',
    passDateZh: '2026年4月2日',
    epitaph: 'Rest peacefully. We will always remember you.',
    breed: 'Shih Tzu',
    favoriteFood: 'Treats',
    favoritePlace: 'The couch',
    personality: 'Loyal, playful, and endlessly loving.',
    bio: "Write your dog's story here.",
    photos: [
      'assets/photos/fullsizerender.jpg',
      'assets/photos/img_0011.jpg',
      'assets/photos/img_0015.jpg',
      'assets/photos/img_0032.jpg',
      'assets/photos/img_0062.jpg',
      'assets/photos/img_0064.jpg',
      'assets/photos/img_0065.jpg',
      'assets/photos/img_0068.jpg',
      'assets/photos/img_0070.jpg',
      'assets/photos/img_0084.jpg',
      'assets/photos/img_0087.jpg',
      'assets/photos/img_0113.jpg',
      'assets/photos/img_0363.jpg',
      'assets/photos/img_0379.jpg',
      'assets/photos/img_0383.jpg',
      'assets/photos/img_0425.jpg',
      'assets/photos/img_0426.jpg',
      'assets/photos/img_0427.jpg',
      'assets/photos/img_0428.jpg',
      'assets/photos/img_0582.jpg',
      'assets/photos/img_0606.jpg',
      'assets/photos/img_0607.jpg',
      'assets/photos/img_0935.jpg',
      'assets/photos/img_0958.jpg',
      'assets/photos/img_0959.jpg',
      'assets/photos/img_1065.jpg',
      'assets/photos/img_1066.jpg',
      'assets/photos/img_1067_2.jpg',
      'assets/photos/img_1067.jpg',
      'assets/photos/img_1372.jpg',
      'assets/photos/img_1436.jpg',
      'assets/photos/img_1443.jpg',
      'assets/photos/img_1486.jpg',
      'assets/photos/img_1497.jpg',
      'assets/photos/img_1793.jpg',
      'assets/photos/img_1869.jpg',
      'assets/photos/img_2027.jpg',
      'assets/photos/img_2043.jpg',
      'assets/photos/img_2627.jpg',
      'assets/photos/img_2642.jpg',
      'assets/photos/img_2643.jpg',
      'assets/photos/img_2651.jpg',
      'assets/photos/img_2652.jpg',
      'assets/photos/img_2653.jpg',
      'assets/photos/img_2721.jpg',
      'assets/photos/img_2884.jpg',
      'assets/photos/img_2886.jpg',
      'assets/photos/img_2887.jpg',
      'assets/photos/img_2890.jpg',
      'assets/photos/img_2891.jpg',
      'assets/photos/img_2892.jpg',
      'assets/photos/img_2976.jpg',
      'assets/photos/img_3118.jpg',
      'assets/photos/img_3119.jpg',
      'assets/photos/img_6852.jpg',
    ],
    preloadedLetters: [
      {
        author: 'Siyi',
        authorZh: 'Siyi',
        date: '2026-04-02',
        content: "Dollar was the first dog we ever had. I still remember the very first time I saw him \u2014 the moment the door opened, this little puppy came bounding toward us, full of joy and impossibly fast. I knew right then: it was him. Round and tiny, like a little black-and-white ball. From that day on, we became Dollar's mom and dad, and we held that title for a full fifteen years.\n\nDollar was a people dog. He loved being around us more than anything. He was also wonderfully silly \u2014 when we played ball, all you had to do was tuck it behind him and he'd completely lose track of it. He'd paw around in confusion, butt sticking up, his little tail wagging so fast it almost blurred, goofy and impossibly cute. He never failed to make me laugh out loud.\n\nDollar was also incredibly stubborn. Once he made up his mind about something, nobody could change it. When we first graduated and lived in a condo, there was a small mail slot in the front door. Somehow he decided it was his sworn enemy. Every time the mail came through, he would bark at full volume and battle the mail carrier to the bitter end. Looking back, I really do owe that mail carrier an apology. I wonder if they still remember the little loud-mouthed dog behind the street-side door on the ground floor \u2014 and whether they ever think of him too.\n\nDollar was both fearless and a total coward. At home, he was king. A tiny Shih Tzu who had our Border Collie \u2014 several times his size \u2014 completely under his command. He was the undisputed top dog of the house. Outside, he'd bark his head off at any dog, person, or car passing in the distance. But the moment another dog actually came close to investigate, he'd instantly cower behind us, as if the tough guy act had never happened \u2014 a coward through and through, and completely unashamed of it.\n\nDollar was adorable. Everyone who met him called him \"puppy\" \u2014 from the day he was born all the way to fifteen, even when he was old and could barely walk. When we first got him, our cameras were full of nothing but his photos. The most common ones were probably of him sleeping with me. Whenever I napped on the couch, he'd curl into a little ball and nestle right at my knees, or on my chest. The moment I lay down, he'd appear. It had become our unspoken ritual over the years.\n\nBut as I write these words now, I ask myself: when was the last time Dollar and I napped together on the couch? It seems like it's been many years. Maybe it was when my son was born \u2014 the child became the center of our lives, and the dog quietly faded into the background. We still walked him every day, still fed him every day, but the time we gave him grew less and less. Dollar seemed to accept this silently. He withdrew from the center of our lives without protest, just lying quietly beside us, waiting for those rare moments when we'd notice him and give his head a pat or scratch his chin.\n\nDollar walked alongside us for a full fifteen years, from college all the way to now. When we first adopted him, even knowing that a dog's lifespan is far shorter than a human's, a decade-plus felt infinite to a college student about to graduate. It was a countless stretch of beautiful life ahead; it was the excitement and eagerness of taking the reins of your own life for the first time. Fifteen years from now? That's ages away \u2014 who would bother to think that far? Looking back today, fifteen years really is a long time. Long enough that Dollar had become part of the roots of this family. He was there for so many of our milestones: graduating, moving, finding jobs, getting married, promotions, having a baby \u2014 he was such a small creature, yet he appeared in every single memory. And yet fifteen years is also so very short. It passed in what felt like the blink of an eye. It doesn't feel like enough. There was still so much to do with him, so much left to share. But suddenly, he was gone. It's as if just as my life was about to turn to a new page, I instinctively looked back for him \u2014 and he was nowhere to be found.\n\nSo I wanted to write this, because at least this way, more people will know that there once existed a little dog named Dollar. If he can no longer continue to exist in the depth of time, then perhaps I can extend his presence across the breadth of space. In general relativity, time and space are equivalent \u2014 so maybe, in doing this, I can help little Dollar achieve a kind of immortality in another dimension. And maybe then he'll know that in this dimension, I really do miss him.",
        contentZh: "多多是我们养的第一只小狗，我到现在也还记得当年第一次见到他的样子，一开门，就看到有一只小狗朝我们欢快又迅速地跑过来。我当时就想，就他了，圆圆的小小的，像一个黑白相间的圆球。从那天起，我们就当上了多多的爸爸妈妈，这一当就当了整整15年。\n\n多多亲人，最喜欢和人玩。他又笨笨的，玩球的时候只要一往身后塞，他就找不到了。他傻愣愣的，到处扒拉，撅着屁股和快要摇出幻影的小尾巴，蠢蠢的特别可爱，总是能逗得我哈哈大笑。\n\n多多还十分固执，认定的事情任谁也没有办法拉回来。当时我们刚毕业时住的condo门上有一个投递信件的小窗口。他不知怎的认定了那是他的宿敌，每次有信进来的时候，他总是要用最大的嗓门和邮递员battle到底，现在想想还是很对不起负责我家的邮递员的，不知道他现在还记不记得一楼靠大街那侧的门里面的那一只大嗓门小狗，会不会也偶尔想起他？\n\n多多既胆大又胆小。在家里的时候他就是大王，小小一只西施，把比他体型大好几圈的边牧训得服服帖帖，是家里的狗大王，出了门以后对着远处路过的狗、人、车那也是扯着嗓门乱叫。但要是有其他狗好奇靠近他，他就立马怂怂地躲在我们身后，仿佛刚才逞威风的不是他，怂得坦坦荡荡。\n\n多多长得可爱。别人见到它永远叫他puppy，从他0岁一直叫到15岁，老了走不动了也是puppy。刚养他的时候，相机里全是他的照片，当中拍的最多的大概就是他陪我一起睡觉的情形。每当我在沙发上睡午觉的时候，他就会团成一团，窝在我的膝盖这儿，或者是胸口这儿。这要我一躺下，他就出现，这早已成为我们多年的的默契。\n\n但是现在写下这些文字的时候，我问自己，上一次和多多一起睡在沙发上又是什么时候的事情了呢？好像已经很多年没有过了。可能是从家里哥哥出生吧，孩子成了我们生活的主旋律，狗狗就渐渐从生活当中隐身了。纵然每天都遛狗，每天都喂他，但是分给他的时候也越来越少。多多似乎也默默地接受了这一切，他悄悄地从我们的生活中退出，只是静静地趴在我们身边，等待着我们偶尔发现他时能摸摸他的头，挠挠他的下巴。\n\n多多陪着我们走过了整整15年，从大学一直走到如今。刚领养他的时候，纵使知道狗狗的寿命远不如人类，但是十多年在一个即将毕业的大学生的眼里那是无限的未知；是数不尽的美好人生；是对自己驾驭自己人生的兴奋和跃跃欲试。十几年以后？那还早着呢，谁又会去细想呢。今天回过头来看，15年真的很长，长到多多早就是这个家的根的一部分了，他参与了我们很多的重要人生节点：毕业，搬家，找工作，结婚，升职，生娃，等等等等，他是那样小的一只，每一个回忆的片段里却都有他；15年又真的很短，就这么一晃而过，感觉还没有够，还有那么多可以和他一起做，还有那么多想要和他分享，但他却忽然已经不在了。就好像在我的人生又要翻过新的一页时，我习惯性地回头想要找他，却发现身后哪儿都没有他了。\n\n所以我想要写下这篇文字，因为这样至少能让更多人的知道，曾经这世界上存在过一条叫做多多的小狗。他不能在时间的深度上继续存在，那么就增加他在空间的广度上的存在，因为在广义相对论里时间和空间是等价的，所以我这么做，是不是能够在另一个维度上让小狗多多实现永生呢？这样他是否能知道，在这个维度里的我真的很想他。",
      },
    ],
  };

  window.SITE_CONFIG = CONFIG;

  function t(key) { return window.i18n ? window.i18n.t(key) : key; }
  function lang() { return window.i18n ? window.i18n.getLang() : 'en'; }
  function dogName() { return lang() === 'zh' && CONFIG.nameZh ? CONFIG.nameZh : CONFIG.name; }

  // ===== Router =====
  const routes = { '#/': renderHome, '#/bio': renderBio, '#/letters': renderLetters, '#/about': renderAbout };

  function navigate() {
    const hash = window.location.hash || '#/';
    const render = routes[hash] || renderHome;
    const app = document.getElementById('app');
    app.innerHTML = '';
    render(app);
    updateNav(hash);
    window.scrollTo(0, 0);
    requestAnimationFrame(initReveal);
    // Second pass to catch elements that weren't laid out yet
    setTimeout(initReveal, 100);
  }

  // Expose for i18n re-render
  window.reRenderPage = navigate;

  function updateNav(hash) {
    document.querySelectorAll('.nav a[href]').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === hash);
    });
  }

  // ===== Zen mode =====
  var zenActive = false;

  function toggleZen() {
    zenActive = !zenActive;
    document.body.classList.toggle('zen-mode', zenActive);
    var btn = document.getElementById('zen-btn');
    if (btn) btn.textContent = zenActive ? t('nav.zenExit') : t('nav.zen');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var zenBtn = document.getElementById('zen-btn');
    if (zenBtn) zenBtn.addEventListener('click', toggleZen);
  });

  // ===== Service countdown / cyber life counter =====
  const SERVICE_END = new Date('2026-04-09T00:00:00');
  const CYBER_BIRTH = new Date('2026-04-02T09:35:00-04:00'); // Apr 2 2026 9:35am ET

  function formatTimeParts(diff) {
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff / 3600000) % 24);
    var mins = Math.floor((diff / 60000) % 60);
    var secs = Math.floor((diff / 1000) % 60);
    return days + '<span class="countdown-label">' + t('countdown.d') + '</span> '
      + hours + '<span class="countdown-label">' + t('countdown.h') + '</span> '
      + mins + '<span class="countdown-label">' + t('countdown.m') + '</span> '
      + secs + '<span class="countdown-label">' + t('countdown.s') + '</span>';
  }

  function getCountdownText() {
    var now = new Date();
    var diff = SERVICE_END - now;
    if (diff <= 0) {
      // Service ended — show how long Dollar has lived in cyber space
      var cyberLife = now - CYBER_BIRTH;
      return formatTimeParts(cyberLife);
    }
    return formatTimeParts(diff);
  }

  function getCountdownPreText() {
    var now = new Date();
    if (SERVICE_END - now <= 0) {
      return t('countdown.cyberLife');
    }
    return t('countdown.pre');
  }

  // ===== Gift system =====
  function getGiftCounts() {
    return JSON.parse(localStorage.getItem('memorial_gifts') || '{}');
  }

  function addGift(key) {
    var counts = getGiftCounts();
    counts[key] = (counts[key] || 0) + 1;
    localStorage.setItem('memorial_gifts', JSON.stringify(counts));
    return counts[key];
  }

  function getGiftTotal() {
    var counts = getGiftCounts();
    var total = 0;
    for (var k in counts) total += counts[k];
    return total;
  }

  function getGiftTotalText() {
    var total = getGiftTotal();
    if (lang() === 'zh') {
      return dogName() + ' 已收到 ' + total + ' 份礼物';
    }
    return dogName() + ' has received ' + total + ' gift' + (total !== 1 ? 's' : '') + ' so far';
  }

  // ===== Home Page =====
  function renderHome(container) {
    var photoEl = '<div class="hero-tomb"><img src="assets/tomb_final.png" alt="Dollar Zhu" /></div>';

    // Start with cached local counts, then update from backend
    var gifts = getGiftCounts();
    var giftItems = [
      { key: 'flower', emoji: '\uD83D\uDC90', labelKey: 'gift.flower' },
      { key: 'food', emoji: '\uD83E\uDD6B', labelKey: 'gift.food' },
      { key: 'cookie', emoji: '\uD83C\uDF6A', labelKey: 'gift.cookie' },
      { key: 'ball', emoji: '\uD83C\uDFBE', labelKey: 'gift.ball' },
    ];

    var giftButtonsHtml = giftItems.map(function (g) {
      return '<button class="gift-btn" data-gift="' + g.key + '">'
        + '<span class="gift-emoji">' + g.emoji + '</span>'
        + '<span class="gift-label">' + t(g.labelKey) + '</span>'
        + '<span class="gift-count" id="gift-count-' + g.key + '">' + (gifts[g.key] || 0) + '</span>'
        + '</button>';
    }).join('')
    + '<a href="#/letters" class="gift-btn gift-btn-letter">'
    + '<span class="gift-emoji">\u2709\uFE0F</span>'
    + '<span class="gift-label">' + t('gift.letter') + '</span>'
    + '</a>';

    var dates = lang() === 'zh'
      ? (CONFIG.birthDateZh + ' &mdash; ' + CONFIG.passDateZh)
      : (CONFIG.birthDate + ' &mdash; ' + CONFIG.passDate);

    container.innerHTML = ''
      + '<div class="hero">'
      + '  <div class="countdown-bar reveal">'
      + '    <span class="countdown-pre" id="countdown-pre">' + getCountdownPreText() + '</span>'
      + '    <span class="countdown-timer" id="countdown-timer">' + getCountdownText() + '</span>'
      + '  </div>'
      + photoEl
      + '  <div class="hero-text-box">'
      + '    <h1>' + dogName() + '</h1>'
      + '    <p class="dates">' + dates + '</p>'
      + '    <p class="epitaph">' + t('hero.epitaph') + '</p>'
      + '  </div>'
      + '  <div class="scroll-hint"><span></span></div>'
      + '</div>'
      + '<div class="section">'
      + '  <div class="tribute-card reveal">'
      + '    <p class="tribute-text">' + t('tribute.text') + '</p>'
      + '    <p class="gift-total" id="gift-total">' + getGiftTotalText() + '</p>'
      + '    <div class="gift-bar">' + giftButtonsHtml + '</div>'
      + '  </div>'
      + '</div>';

    // Fetch latest counts from backend and update UI
    if (window.backend) {
      window.backend.fetchGifts().then(function (counts) {
        localStorage.setItem('memorial_gifts', JSON.stringify(counts));
        giftItems.forEach(function (g) {
          var el = document.getElementById('gift-count-' + g.key);
          if (el) el.textContent = counts[g.key] || 0;
        });
        var totalEl = document.getElementById('gift-total');
        if (totalEl) totalEl.textContent = getGiftTotalText();
      });
    }

    // Countdown timer
    var timerEl = document.getElementById('countdown-timer');
    if (timerEl) {
      setInterval(function () {
        timerEl.innerHTML = getCountdownText();
        var preEl = document.getElementById('countdown-pre');
        if (preEl) preEl.textContent = getCountdownPreText();
      }, 1000);
    }

    // Gift clicks — use backend with localStorage fallback
    container.querySelectorAll('.gift-btn[data-gift]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-gift');
        btn.classList.add('gift-bounce');
        setTimeout(function () { btn.classList.remove('gift-bounce'); }, 400);

        if (window.backend) {
          window.backend.incrementGift(key).then(function (newCount) {
            document.getElementById('gift-count-' + key).textContent = newCount;
            document.getElementById('gift-total').textContent = getGiftTotalText();
          });
        } else {
          var newCount = addGift(key);
          document.getElementById('gift-count-' + key).textContent = newCount;
          document.getElementById('gift-total').textContent = getGiftTotalText();
        }
      });
    });
  }

  // ===== Bio / Photo Album Page =====
  function renderBio(container) {
    var photosHtml = CONFIG.photos.length > 0
      ? '<div class="album-grid">' + CONFIG.photos.map(function (p, i) {
          return '<div class="album-item reveal"><img src="' + p + '" alt="Memory ' + (i + 1) + '" loading="lazy" /></div>';
        }).join('') + '</div>'
      : '<p class="album-empty">' + t('bio.addPhotos') + '</p>';

    container.innerHTML = ''
      + '<div class="page" style="padding-top: 5rem;">'
      + '  <div class="section">'
      + '    <h2 class="section-title reveal">' + t('bio.photos') + '</h2>'
      + photosHtml
      + '  </div>'
      + '</div>';

    container.querySelectorAll('.album-item img').forEach(function (img) {
      img.addEventListener('click', function () { openLightbox(img.src); });
    });
  }

  // ===== Letters Page =====
  function renderLetters(container) {
    var titleText = lang() === 'zh'
      ? (t('letters.title') + dogName() + t('letters.titleSuffix'))
      : (t('letters.title') + ' ' + dogName());

    // Render shell with loading state, then fill with data
    container.innerHTML = ''
      + '<div class="page" style="padding-top: 5rem;">'
      + '  <div class="section letters-container">'
      + '    <h2 class="section-title reveal">' + titleText + '</h2>'
      + '    <div id="letters-list"></div>'
      + '    <div class="letter-form reveal">'
      + '      <h3>' + t('letters.write') + '</h3>'
      + '      <form id="letter-form">'
      + '        <div class="form-group"><label for="author-input">' + t('letters.name') + '</label>'
      + '          <input type="text" id="author-input" placeholder="Anonymous" /></div>'
      + '        <div class="form-group"><label for="letter-input">' + t('letters.words') + '</label>'
      + '          <textarea id="letter-input" placeholder="' + t('letters.placeholder') + ' ' + dogName() + '..." required></textarea></div>'
      + '        <button type="submit" class="submit-btn">' + t('letters.submit') + '</button>'
      + '      </form>'
      + '    </div>'
      + '  </div>'
      + '</div>';

    // Load letters: preloaded + remote
    function renderLettersList(remoteLetters) {
      var allLetters = CONFIG.preloadedLetters.concat(remoteLetters);
      var isZh = lang() === 'zh';
      var html = allLetters.map(function (l) {
        var content = (isZh && l.contentZh) ? l.contentZh : l.content;
        var author = (isZh && l.authorZh) ? l.authorZh : l.author;
        return '<div class="letter reveal">'
          + '<div class="letter-content">' + escapeHtml(content) + '</div>'
          + '<div class="letter-author">&mdash; ' + escapeHtml(author) + '</div>'
          + '<div class="letter-date">' + l.date + '</div>'
          + '</div>';
      }).join('');
      var listEl = document.getElementById('letters-list');
      if (listEl) listEl.innerHTML = html;
      requestAnimationFrame(initReveal);
      setTimeout(initReveal, 100);
    }

    // Fetch from backend, fall back to local
    if (window.backend) {
      window.backend.fetchLetters().then(renderLettersList);
    } else {
      var stored = JSON.parse(localStorage.getItem('memorial_letters') || '[]');
      renderLettersList(stored);
    }

    // Submit handler
    document.getElementById('letter-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var author = document.getElementById('author-input').value.trim() || 'Anonymous';
      var content = document.getElementById('letter-input').value.trim();
      if (!content) return;

      var letter = { author: author, content: content, date: new Date().toISOString().split('T')[0] };

      if (window.backend) {
        window.backend.saveLetter(letter).then(function () {
          renderLetters(container);
        });
      } else {
        saveLetter(letter);
        renderLetters(container);
      }
    });
  }

  function saveLetter(letter) {
    var stored = JSON.parse(localStorage.getItem('memorial_letters') || '[]');
    stored.push(letter);
    localStorage.setItem('memorial_letters', JSON.stringify(stored));
  }

  // ===== About Page =====
  function renderAbout(container) {
    container.innerHTML = ''
      + '<div class="page" style="padding-top: 5rem;">'
      + '  <div class="section">'
      + '    <div class="about-card">'
      + '      <h2 class="about-title">' + t('about.title') + '</h2>'
      + '      <p class="about-desc">' + t('about.desc') + '</p>'
      + '      <div class="about-creators">'
      + '        <p class="about-by">' + t('about.by') + '</p>'
      + '      </div>'
      + '      <div class="about-links">'
      + '        <a href="https://x.com/SiyiGu1" target="_blank" rel="noopener" class="about-link">'
      + '          <span class="about-link-icon">𝕏</span><span>' + t('about.x') + '</span></a>'
      + '        <a href="https://xhslink.com/m/6S3UQvOlPuz" target="_blank" rel="noopener" class="about-link">'
      + '          <span class="about-link-icon">📕</span><span>' + t('about.xhs') + '</span></a>'
      + '        <a href="mailto:siyiguzhu@gmail.com" class="about-link">'
      + '          <span class="about-link-icon">✉</span><span>' + t('about.email') + '</span></a>'
      + '      </div>'
      + '      <p class="about-tech">' + t('about.tech') + '</p>'
      + '    </div>'
      + '  </div>'
      + '</div>';
  }

  // ===== Utilities =====
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function initReveal() {
    // Immediately reveal elements that are already in view (fixes race with scrollTo)
    document.querySelectorAll('.reveal').forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });

    // Observer for the rest (below the fold)
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) { observer.observe(el); });
  }

  // ===== Lightbox =====
  function openLightbox(src) {
    var lb = document.getElementById('lightbox');
    lb.querySelector('img').src = src;
    lb.classList.add('active');
  }

  document.addEventListener('click', function (e) {
    var lb = document.getElementById('lightbox');
    if (e.target.classList.contains('lightbox-close') || e.target === lb) {
      lb.classList.remove('active');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var lb = document.getElementById('lightbox');
      if (lb) lb.classList.remove('active');
      if (zenActive) toggleZen();
    }
  });

  // ===== Init =====
  window.addEventListener('hashchange', navigate);
  navigate();
})();

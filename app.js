/* Домилия — скрипт лендинга: калькулятор, заявки с защитой от ботов, цели Метрики, cookie, окно объекта. */
(function(){
  'use strict';
  var C = window.LPC || {}, Q = C.quiz || {}, A = C.antispam || {};
  var PHONE = C.phone || '', TEL = 'tel:+' + PHONE.replace(/\D/g, '');
  var T0 = Date.now(), HUMAN = false;
  function $(s, r){ return (r || document).querySelector(s); }
  function $$(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function money(n){ return (Math.round(n / 1000) * 1000).toLocaleString('ru-RU'); }
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }
  function ls(k, v){ try { if (v === undefined) return JSON.parse(localStorage.getItem(k) || 'null'); localStorage.setItem(k, JSON.stringify(v)); } catch(e){ return null; } }

  /* признаки живого человека: движение мыши, касание, клавиши, прокрутка */
  ['pointerdown', 'touchstart', 'keydown', 'mousemove', 'scroll'].forEach(function(ev){ addEventListener(ev, function(){ HUMAN = true; }, { passive:true, once:true }); });

  /* ---------- Яндекс Метрика и цели ---------- */
  if (C.ym){
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<e.scripts.length;j++){if(e.scripts[j].src===r)return;}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
    ym(C.ym, 'init', { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
  }
  var sent = {};
  function goal(n, once){ if (once && sent[n]) return; sent[n] = 1; try { if (C.ym && window.ym) ym(C.ym, 'reachGoal', n); } catch(e){} }
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('[data-goal]'); if (a) goal(a.dataset.goal);
  });

  /* заявка сразу в CRM Домилия Про (адрес задаётся в админке лендинга) */
  function toCRM(url, d){ if (!url) return Promise.resolve(false); var skip = { _subject:1, _template:1, _captcha:1, _honey:1, 'Имя':1, 'Телефон':1 }, com = [], b = { name:(d['Имя'] && d['Имя'] !== '—') ? d['Имя'] : '', phone:d['Телефон'] || '', page:location.href };
    Object.keys(d).forEach(function(k){ if (skip[k]) return; if (/^utm_|^yclid$/.test(k)) { b[k] = d[k]; return; } if (d[k] !== '' && d[k] != null) com.push(k + ': ' + d[k]); });
    try { var u = JSON.parse(sessionStorage.getItem('dm_utm') || '{}'); Object.keys(u).forEach(function(k){ if (!b[k]) b[k] = u[k]; }); } catch(e){}
    b.comment = com.join('\n'); var fd = new URLSearchParams(); Object.keys(b).forEach(function(k){ if (b[k] != null && b[k] !== '') fd.append(k, b[k]); });
    /* простая отправка формы: без лишних проверок браузера, не зависит от настроек CORS */
    var req = fetch(url, { method:'POST', mode:'no-cors', body:fd, keepalive:true }).then(function(){ return true; }).catch(function(){ return false; });
    return Promise.race([req, new Promise(function(res){ setTimeout(function(){ res(false); }, 5000); })]); }

  /* метки рекламы: запоминаем на время визита и отправляем с заявкой */
  var UTM = {};
  try {
    var q = new URLSearchParams(location.search);
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','yclid'].forEach(function(k){ if (q.get(k)) UTM[k] = q.get(k); });
    if (Object.keys(UTM).length) sessionStorage.setItem('dm_utm', JSON.stringify(UTM)); else UTM = JSON.parse(sessionStorage.getItem('dm_utm') || '{}');
    if (!sessionStorage.getItem('dm_ref')) sessionStorage.setItem('dm_ref', document.referrer || 'прямой заход');
  } catch(e){}

  /* ---------- плашка cookie ---------- */
  var ck = $('#ck');
  if (ck && !ls('dm_ck')){ ck.hidden = false; $('#ckOk').onclick = function(){ ls('dm_ck', 1); ck.hidden = true; }; }

  /* ---------- заявка: проверки и защита от ботов ---------- */
  function phoneOk(d){
    if (!/^7[3489]\d{9}$/.test(d)) return false;
    var rest = d.slice(1);
    if (/^(\d)\1+$/.test(rest)) return false;                 /* 9999999999 */
    if (/(\d)\1{6,}/.test(rest)) return false;                /* 7 одинаковых подряд */
    if ('0123456789'.indexOf(rest.slice(3)) > -1 || '9876543210'.indexOf(rest.slice(3)) > -1) return false;
    return true;
  }
  function botLike(f){
    if (f.querySelector('[name=company_site]').value) return 'honeypot';
    if (navigator.webdriver) return 'webdriver';
    if ((Date.now() - T0) / 1000 < (+A.minSeconds || 4)) return 'fast';
    if (!HUMAN) return 'nohuman';
    return '';
  }
  function limitHit(phone){
    var log = (ls('dm_leads') || []).filter(function(x){ return Date.now() - x.t < 864e5; });
    ls('dm_leads', log);
    if (log.some(function(x){ return x.p === phone; })) return 'dup';
    if (log.length >= (+A.maxPerDay || 3)) return 'max';
    return '';
  }
  function form(btnText, lead, title, extra){
    var f = document.createElement('form'); f.className = 'lf'; f.noValidate = true;
    if (!C.to && !C.crm){
      f.innerHTML = '<p class="lf-note">Позвоните — инженер ответит на вопросы и договорится о бесплатном замере.</p><a class="btn wide" href="' + TEL + '" data-goal="lp_call">Позвонить ' + esc(PHONE) + '</a><div class="lf-alt">' + esc(C.hours || '') + '</div>';
      return f;
    }
    f.innerHTML = (lead ? '<p class="lf-note">' + esc(lead) + '</p>' : '') +
      '<input type="tel" name="phone" inputmode="tel" autocomplete="tel" placeholder="+7 (___) ___-__-__" aria-label="Телефон" required>' +
      '<input type="text" name="name" autocomplete="given-name" placeholder="Имя (необязательно)" aria-label="Имя" maxlength="60">' +
      '<input type="text" name="company_site" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<label class="cons"><input type="checkbox" name="consent" checked><span>Согласен на <a href="' + esc(C.consent) + '" target="_blank" rel="noopener">обработку персональных данных</a> и принимаю <a href="' + esc(C.privacy) + '" target="_blank" rel="noopener">политику конфиденциальности</a></span></label>' +
      '<button class="btn wide" type="submit">' + esc(btnText) + '</button><div class="lf-msg" role="status"></div>' +
      '<div class="lf-alt">или позвоните: <a href="' + TEL + '" data-goal="lp_call">' + esc(PHONE) + '</a></div>';
    var ph = f.phone, msg = $('.lf-msg', f), btn = $('button[type=submit]', f);
    ph.addEventListener('focus', function(){ if (!ph.value) ph.value = '+7 '; goal('lp_form_focus', true); });
    ph.addEventListener('input', function(){
      var d = ph.value.replace(/\D/g, ''); if (d[0] === '8') d = '7' + d.slice(1); if (d && d[0] !== '7') d = '7' + d; d = d.slice(0, 11);
      var r = '+7'; if (d.length > 1) r += ' (' + d.slice(1, 4); if (d.length >= 4) r += ') ' + d.slice(4, 7); if (d.length >= 7) r += '-' + d.slice(7, 9); if (d.length >= 9) r += '-' + d.slice(9, 11);
      ph.value = r; msg.textContent = '';
    });
    f.consent.addEventListener('change', function(){ if (f.consent.checked) $('.cons', f).classList.remove('need'); });
    f.addEventListener('submit', function(e){
      e.preventDefault(); msg.className = 'lf-msg';
      var d = ph.value.replace(/\D/g, '');
      if (d.length < 11){ msg.textContent = 'Введите номер телефона полностью.'; ph.focus(); return; }
      if (!phoneOk(d)){ msg.textContent = 'Проверьте номер — похоже, в нём ошибка.'; ph.focus(); return; }
      if (!f.consent.checked){ $('.cons', f).classList.add('need'); msg.textContent = 'Отметьте согласие на обработку данных.'; return; }
      goal('lp_form_submit');
      var bot = botLike(f);
      if (bot) goal('lp_bot');   /* подозрение на бота не выбрасываем — отмечаем в заявке, менеджер решит сам */
      var lim = limitHit(d);
      if (lim === 'dup'){ msg.className = 'lf-msg ok'; msg.textContent = 'Мы уже получили вашу заявку — инженер скоро перезвонит.'; return; }
      if (lim === 'max'){ msg.innerHTML = 'Слишком много заявок с этого устройства. Позвоните нам: <a href="' + TEL + '">' + esc(PHONE) + '</a>'; return; }
      msg.className = 'lf-msg wait'; msg.textContent = 'Отправляем…'; btn.disabled = true;
      var ref = ''; try { ref = sessionStorage.getItem('dm_ref') || ''; } catch(e2){}
      var data = Object.assign({ _subject:'Заявка с remont.domilia.ru — ' + title, _template:'table', _captcha:'false', _honey:'',
        'Заявка':title, 'Телефон':ph.value, 'Имя':f.name.value.trim() || '—', 'Страница':location.href, 'Откуда пришёл':ref,
        'Время на сайте':Math.round((Date.now() - T0) / 1000) + ' сек' }, bot ? { 'Проверка':'возможно бот (' + ({ honeypot:'заполнено скрытое поле', webdriver:'автоматический браузер', fast:'слишком быстро', nohuman:'нет движений' })[bot] + ')' } : {}, extra ? extra() : {}, UTM);
      var crm = toCRM(C.crm, data);
      (C.to ? fetch('https://formsubmit.co/ajax/' + encodeURIComponent(C.to), { method:'POST', headers:{ 'Content-Type':'application/json', 'Accept':'application/json' }, body:JSON.stringify(data) }).then(function(r){ return r.json(); }).catch(function(){ return {}; }) : Promise.resolve({}))
        .then(function(j){ return crm.then(function(okC){ return { j:j, okC:okC }; }); })
        .then(function(x){ var j = x.j;
          if (String(j.success) !== 'true' && !x.okC){ try { console.warn('FormSubmit:', j.message); } catch(e4){} throw (j && j.message) || 'нет ответа'; }
          var log = ls('dm_leads') || []; log.push({ t:Date.now(), p:d }); ls('dm_leads', log);
          goal('lead');
          try { sessionStorage.setItem('dm_last', JSON.stringify({ title:title, extra:extra ? extra() : null })); } catch(e3){}
          done(f, false);
        })
        .catch(function(er){ btn.disabled = false; msg.className = 'lf-msg'; msg.innerHTML = 'Не получилось отправить. Позвоните нам: <a href="' + TEL + '">' + esc(PHONE) + '</a>' + (/debug/.test(location.search) ? '<br><small>Причина: ' + esc(er && er.message || er) + '</small>' : ''); });
    });
    return f;
  }
  function done(f, fake){
    if (fake){ f.innerHTML = '<div class="ok"><b>Спасибо!</b><p>Инженер перезвонит вам.</p></div>'; return; }
    location.href = '/spasibo/';
  }

  /* ---------- калькулятор ---------- */
  var body = $('#qzBody');
  if (body && Q.rates){
    var S = { flat:null, rooms:null, area:null, kind:null, bath:null, when:null }, started = false, step = 0;
    var KIND = {}; (Q.kinds || []).forEach(function(k){ KIND[k.v] = k.t; });
    var STEPS = [
      { k:'flat', q:'Какая у вас квартира?', cls:'c2', o:(Q.flat || []).map(function(x){ return { v:x.v, t:x.t, s:x.s, img:x.img }; }) },
      { k:'rooms', q:'Сколько комнат?', hint:'Площадь можно будет уточнить на замере', o:(Q.rooms || []).map(function(x, i){ return { v:String(i), t:x.t, s:x.s, a:x.a }; }) },
      { k:'kind', q:'Какой ремонт нужен?', o:(Q.kinds || []).map(function(x){ return { v:x.v, t:x.t, s:x.s }; }) },
      { k:'bath', q:'Санузел тоже ремонтируем?', o:[{ v:'yes', t:'Да, под ключ', s:'плитка, сантехника, гидроизоляция' }, { v:'no', t:'Нет, только комнаты' }] },
      { k:'when', q:'Когда хотите начать?', o:(Q.when || []).map(function(x){ return { v:x, t:x }; }) }
    ];
    var bar = $('#qzBar'), stepT = $('#qzStep');
    var price = function(){
      var r = Q.rates[S.kind] || 0, w = r * S.area * (S.flat === 'old' ? (+Q.oldFlat || 1) : 1) + (S.bath === 'yes' ? (+(Q.bath || {})[S.kind] || 0) : 0);
      var dd = (Q.days || {})[S.kind] || [38, .7], sp = Q.spread || [.9, 1.12];
      return { lo:w * sp[0], hi:w * sp[1], weeks:Math.max(3, Math.round((dd[0] + dd[1] * S.area) / 7)) };
    };
    var weeksText = function(w){ var m = w % 100, l = w % 10; if (m > 10 && m < 20) return w + ' недель'; if (l === 1) return w + ' неделя'; if (l > 1 && l < 5) return w + ' недели'; return w + ' недель'; };
    var render = function(){
      var st = STEPS[step];
      stepT.textContent = 'Вопрос ' + (step + 1) + ' из ' + STEPS.length;
      bar.style.width = (step / STEPS.length * 100) + '%';
      var h = '<div class="qz-q">' + esc(st.q) + '</div>' + (st.hint ? '<div class="qz-hint">' + esc(st.hint) + '</div>' : '') + '<div class="opts ' + (st.cls || '') + '">';
      st.o.forEach(function(o, i){
        var onC = S[st.k] === o.v ? ' on' : '';
        var extra = st.k === 'kind' && Q.rates[o.v] ? '<em>от ' + (+Q.rates[o.v]).toLocaleString('ru-RU') + ' ₽/м²</em>' : '';
        if (o.img) h += '<button type="button" class="opt ph' + onC + '" data-i="' + i + '"><img src="' + esc(o.img) + '" alt="" loading="lazy"><span>' + esc(o.t) + (o.s ? '<small>' + esc(o.s) + '</small>' : '') + '</span></button>';
        else h += '<button type="button" class="opt' + onC + '" data-i="' + i + '"><span>' + esc(o.t) + (o.s ? '<small>' + esc(o.s) + '</small>' : '') + '</span>' + extra + '</button>';
      });
      h += '</div><div class="qz-nav"><button type="button" class="qz-back"' + (step ? '' : ' hidden') + '>← Назад</button><small>' + esc(Q.note || '') + '</small></div>';
      body.innerHTML = h;
      $$('.opt', body).forEach(function(b){ b.onclick = function(){ pick(st, st.o[+b.dataset.i], b); }; });
      $('.qz-back', body).onclick = function(){ if (step){ step--; render(); } };
    };
    var pick = function(st, o, b){
      if (!started){ started = true; goal('lp_quiz_start'); }
      S[st.k] = o.v; if (st.k === 'rooms') S.area = o.a;
      $$('.opt', body).forEach(function(x){ x.classList.toggle('on', x === b); });
      setTimeout(function(){
        step++;
        if (step < STEPS.length) render(); else result();
        if (innerWidth < 980){ var r = $('#calc').getBoundingClientRect(); if (r.top < 0) $('#calc').scrollIntoView({ behavior:'smooth' }); }
      }, 200);
    };
    var result = function(){
      goal('lp_quiz_done');
      var p = price(), gift = S.kind !== 'cosm';
      stepT.textContent = 'Готово!'; bar.style.width = '100%';
      var flat = S.flat === 'old' ? 'вторичка' : 'новостройка', room = (Q.rooms[+S.rooms] || {}).t || '';
      body.innerHTML = '<div class="res-l">' + esc(Q.resultLabel || 'Примерная стоимость работ') + '</div>' +
        '<div class="res-p">' + money(p.lo) + ' – ' + money(p.hi) + ' ₽</div>' +
        '<div class="res-n">' + esc(KIND[S.kind] || '') + ' ремонт · ' + esc(room.toLowerCase()) + ' · ' + flat + (S.bath === 'yes' ? ' · с санузлом' : '') + '</div>' +
        '<div class="res-row"><span>Срок: около ' + weeksText(p.weeks) + '</span>' + (gift ? '<span class="g">+ дизайн-проект в подарок</span>' : '<span class="g">Замер и смета — бесплатно</span>') + '</div>';
      body.appendChild(form(Q.btn || 'Получить точную смету', Q.formLead, 'Расчёт стоимости', function(){
        return { 'Квартира':flat, 'Комнаты':room + ' (~' + S.area + ' м²)', 'Ремонт':KIND[S.kind], 'Санузел':S.bath === 'yes' ? 'да' : 'нет', 'Когда начать':S.when, 'Расчёт':money(p.lo) + ' – ' + money(p.hi) + ' ₽' };
      }));
      var back = document.createElement('button'); back.type = 'button'; back.className = 'qz-back'; back.style.marginTop = '10px'; back.textContent = '← Изменить ответы';
      back.onclick = function(){ step = STEPS.length - 1; render(); }; body.appendChild(back);
    };
    $$('[data-kind]').forEach(function(a){ a.addEventListener('click', function(){ S.kind = a.dataset.kind; goal('lp_price_click'); }); });
    render();
  }

  /* форма записи на замер внизу */
  var fin = $('#finForm');
  if (fin){ fin.innerHTML = ''; fin.appendChild(form(C.finalBtn || 'Жду звонка', '', 'Бесплатный замер')); }

  /* ---------- окно объекта ---------- */
  var OBJ = C.objects || [];
  $$('#objList .ob').forEach(function(b){ b.onclick = function(){ var p = OBJ[+b.dataset.o]; if (p) openObj(p); }; });
  function openObj(p){
    goal('lp_object');
    var k = 0, w = document.createElement('div'); w.className = 'om'; w.setAttribute('role', 'dialog'); w.setAttribute('aria-modal', 'true');
    w.innerHTML = '<div class="om-in"><button type="button" class="om-x" aria-label="Закрыть">×</button>' +
      '<div class="om-ph"><img alt=""><button type="button" class="om-a l" aria-label="Предыдущее фото">‹</button><button type="button" class="om-a r" aria-label="Следующее фото">›</button><span class="om-c"></span>' + (p.demo ? '<i class="ob-demo">пример</i>' : '') + '</div>' +
      '<div class="om-b"><small>' + esc(p.type) + (p.district ? ' · ' + esc(p.district) : '') + '</small><h3>' + esc(p.title) + '</h3>' +
      '<div class="chips">' + (p.area ? '<span>' + esc(p.area) + ' м²</span>' : '') + (p.days ? '<span>' + esc(p.days) + ' дней</span>' : '') + (p.year ? '<span>' + esc(p.year) + '</span>' : '') + '</div>' +
      (p.task ? '<p class="om-t"><b>Задача.</b> ' + esc(p.task) + '</p>' : '') +
      ((p.done || []).length ? '<ul class="om-d">' + p.done.map(function(d){ return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>' : '') +
      (p.price ? '<div class="om-p"><span>Стоимость работ</span><strong>' + esc(p.price) + '</strong></div>' : '') +
      '<a class="btn wide" href="#final" data-goal="lp_object_cta">' + esc(C.objBtn || 'Хочу такой же ремонт') + '</a></div></div>';
    document.body.appendChild(w); document.documentElement.style.overflow = 'hidden';
    var im = $('.om-ph img', w), cnt = $('.om-c', w), n = p.photos.length;
    function show(){ im.src = p.photos[k]; im.alt = p.title + ' — фото ' + (k + 1); cnt.textContent = (k + 1) + ' / ' + n; }
    function close(){ w.remove(); document.documentElement.style.overflow = ''; removeEventListener('keydown', key); }
    function key(e){ if (e.key === 'Escape') close(); if (e.key === 'ArrowRight'){ k = (k + 1) % n; show(); } if (e.key === 'ArrowLeft'){ k = (k - 1 + n) % n; show(); } }
    $('.om-x', w).onclick = close; w.onclick = function(e){ if (e.target === w) close(); };
    $('.om-a.l', w).onclick = function(){ k = (k - 1 + n) % n; show(); };
    $('.om-a.r', w).onclick = function(){ k = (k + 1) % n; show(); };
    var sx = 0; im.addEventListener('touchstart', function(e){ sx = e.touches[0].clientX; }, { passive:true });
    im.addEventListener('touchend', function(e){ var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40){ k = (k + (dx < 0 ? 1 : -1) + n) % n; show(); } }, { passive:true });
    if (n < 2){ $('.om-a.l', w).hidden = true; $('.om-a.r', w).hidden = true; }
    $('.btn', w).addEventListener('click', close);
    addEventListener('keydown', key); show();
  }

  /* ---------- ролик ---------- */
  var vid = $('#vid'), vp = $('#vidPlay');
  if (vid && vp) vp.onclick = function(){ vid.src = vid.dataset.src; vid.controls = true; vid.play(); vp.remove(); goal('lp_video'); };

  /* ---------- нижняя панель на телефоне ---------- */
  var mbar = $('#mbar'), calc = $('#calc'), finEl = $('#final');
  if (mbar){
    var onScroll = function(){
      var h = innerHeight, inCalc = false, inFin = false;
      if (calc){ var r = calc.getBoundingClientRect(); inCalc = r.top < h * .7 && r.bottom > h * .3; }
      if (finEl){ var f = finEl.getBoundingClientRect(); inFin = f.top < h * .8 && f.bottom > 0; }
      mbar.classList.toggle('on', scrollY > 500 && !inCalc && !inFin);
    };
    addEventListener('scroll', onScroll, { passive:true }); onScroll();
  }

  /* ---------- страница «Спасибо» ---------- */
  if (C.page === 'thanks'){
    goal('lp_thanks');
    try {
      var last = JSON.parse(sessionStorage.getItem('dm_last') || 'null'), sum = $('#sum');
      if (last && last.extra && sum){
        sum.innerHTML = '<b>Ваш расчёт</b>' + Object.keys(last.extra).map(function(k){ return '<span><i>' + esc(k) + '</i>' + esc(last.extra[k]) + '</span>'; }).join('');
        sum.hidden = false;
      }
    } catch(e){}
  }
  if (C.page === '404') goal('lp_404');

  /* ---------- плавное появление блоков ---------- */
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin:'0px 0px -8% 0px' });
    $$('.rv').forEach(function(e){ io.observe(e); });
  } else $$('.rv').forEach(function(e){ e.classList.add('in'); });
})();

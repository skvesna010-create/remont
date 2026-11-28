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
    if (!window.__ymHead) (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<e.scripts.length;j++){if(e.scripts[j].src===r)return;}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
    var LPV = { v:C.page === 's' ? 'S главная' : C.page === 'c' ? 'C новый' : C.page === 'b' ? 'B видео' : C.page === 'main' ? 'A' : C.page === 'bath' ? 'Ванная' : C.page };
    if (window.__ymHead) ym(C.ym, 'params', { lp_variant:LPV.v }); else ym(C.ym, 'init', { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, params:{ lp_variant:LPV.v } });
    try { ym(C.ym, 'getClientID', function(id){ YMID = id || ''; try { sessionStorage.setItem('dm_ymid', YMID); } catch(e){} }); } catch(e){}
  }
  var sent = {};
  function goal(n, once){ if (once && sent[n]) return; sent[n] = 1; try { if (C.ym && window.ym) ym(C.ym, 'reachGoal', n); } catch(e){} }
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('[data-goal]'); if (a) goal(a.dataset.goal);
  });

  /* заявка сразу в CRM Домилия Про (адрес задаётся в админке лендинга) */
  var YMID = ''; try { YMID = sessionStorage.getItem('dm_ymid') || ''; } catch(e){}
  function toCRM(url, d){ if (!url) return Promise.resolve(false); if (YMID) d = Object.assign({}, d, { ymid:YMID }); var skip = { _subject:1, _template:1, _captcha:1, _honey:1, 'Имя':1, 'Телефон':1 }, com = [], b = { name:(d['Имя'] && d['Имя'] !== '—') ? d['Имя'] : '', phone:d['Телефон'] || '', page:location.href };
    Object.keys(d).forEach(function(k){ if (skip[k]) return; if (/^utm_|^yclid$|^ymid$/.test(k)) { b[k] = d[k]; return; } if (d[k] !== '' && d[k] != null) com.push(k + ': ' + d[k]); });
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
    ph.addEventListener('focus', function(){ if (!ph.value) ph.value = '+7 '; goal('lp_form_focus', true); setTimeout(function(){ try { ph.scrollIntoView({ block:'center', behavior:'smooth' }); } catch(e){} }, 300); });
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
      var mail = C.to ? Promise.race([fetch('https://formsubmit.co/ajax/' + encodeURIComponent(C.to), { method:'POST', headers:{ 'Content-Type':'application/json', 'Accept':'application/json' }, body:JSON.stringify(data), keepalive:true }).then(function(r){ return r.json(); }).catch(function(){ return {}; }), new Promise(function(res){ setTimeout(function(){ res({}); }, 10000); })]) : Promise.resolve({});
      /* CRM приняла — сразу благодарим; почта (запасной канал) досылается в фоне */
      crm.then(function(okC){ return okC ? { j:{ success:'true' }, okC:true } : mail.then(function(j){ return { j:j, okC:false }; }); })
        .then(function(x){ var j = x.j;
          if (String(j.success) !== 'true' && !x.okC){ try { console.warn('FormSubmit:', j.message); } catch(e4){} throw (j && j.message) || 'нет ответа'; }
          var log = ls('dm_leads') || []; log.push({ t:Date.now(), p:d }); ls('dm_leads', log);
          try { sessionStorage.setItem('dm_last', JSON.stringify({ title:title, extra:extra ? extra() : null })); } catch(e3){}
          var gone = false, go = function(){ if (!gone){ gone = true; done(f, false); } };
          try { if (C.ym && window.ym) ym(C.ym, 'reachGoal', bot ? 'lp_bot_lead' : 'lead', {}, go); } catch(e5){}   /* заявку с признаками бота не засчитываем Директу как конверсию */
          setTimeout(go, 1200);   /* цель «Заявка» успевает уйти в Метрику до перехода на «Спасибо» */
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
    var S = { obj:null, flat:null, rooms:null, area:null, kind:null, bath:null, when:null, btype:null, barea:null, bwork:null, bshow:null, binst:null }, started = false, step = 0;
    var KIND = {}; (Q.kinds || []).forEach(function(k){ KIND[k.v] = k.t; });
    var WHEN = { k:'when', q:'Когда хотите начать?', o:(Q.when || []).map(function(x){ return { v:x, t:x }; }) };
    var QOBJ = { k:'obj', q:'Что будем ремонтировать?', cls:'c2', o:(Q.obj || [{ v:'flat', t:'Квартиру целиком' }, { v:'bath', t:'Только санузел' }]).map(function(x){ return { v:x.v, t:x.t, s:x.s, img:x.img }; }) };
    var FLAT = [
      { k:'flat', q:'Какая у вас квартира?', cls:'c2', o:(Q.flat || []).map(function(x){ return { v:x.v, t:x.t, s:x.s, img:x.img }; }) },
      { k:'rooms', q:'Сколько комнат?', hint:'площадь уточним на замере', cls:'c2', o:(Q.rooms || []).map(function(x, i){ return { v:String(i), t:x.t, s:x.s, a:x.a }; }) },
      { k:'kind', q:'Какой ремонт нужен?', o:(Q.kinds || []).map(function(x){ return { v:x.v, t:x.t, s:x.s }; }) },
      { k:'bath', q:'Санузел тоже ремонтируем?', cls:'c2', o:[{ v:'yes', t:'Да, под ключ' }, { v:'no', t:'Нет, только комнаты' }] },
      WHEN ];
    var BATH = [
      { k:'btype', q:'Какой у вас санузел?', cls:'c2', o:[{ v:'sov', t:'Совмещённый', s:'ванна и туалет вместе', a:4.5 }, { v:'vann', t:'Отдельная ванная', a:3.5 }, { v:'both', t:'Ванная + туалет', s:'оба помещения', a:5.5 }, { v:'wc', t:'Только туалет', a:1.5 }] },
      { k:'barea', q:'Примерная площадь?', hint:'точно измерим на замере', cls:'c2', o:[{ v:'s', t:'До 3 м²', a:2.5 }, { v:'m', t:'3–5 м²', a:4 }, { v:'l', t:'5–8 м²', a:6.5 }, { v:'xl', t:'Больше 8 м²', a:9 }] },
      { k:'bwork', q:'Что нужно сделать?', o:[{ v:'full', t:'Под ключ', s:'демонтаж, трубы, гидроизоляция, плитка, сантехника' }, { v:'tile', t:'Плитка', s:'демонтаж старой и укладка новой' }, { v:'plumb', t:'Сантехника и трубы', s:'замена труб, установка сантехники' }] },
      { k:'bshow', q:'Ванна или душ?', cls:'c2', o:[{ v:'ванна', t:'Ванна' }, { v:'душевая из плитки', t:'Душевая из плитки', s:'с трапом, без поддона' }, { v:'душевая кабина', t:'Душевая кабина' }, { v:'пока не решили', t:'Пока не решили' }] },
      { k:'binst', q:'Подвесной унитаз (инсталляция) нужен?', cls:'c2', o:[{ v:'да', t:'Да' }, { v:'нет', t:'Нет, обычный' }, { v:'подскажите', t:'Посоветуйте' }] },
      WHEN ];
    var steps = function(){ return [QOBJ].concat(S.obj === 'bath' ? BATH : S.obj === 'flat' ? FLAT : []); };
    var total = function(){ return S.obj === 'bath' ? BATH.length + 1 : S.obj === 'flat' ? FLAT.length + 1 : 6; };
    var bar = $('#qzBar'), stepT = $('#qzStep');
    var price = function(){
      var sp = Q.spread || [.9, 1.12];
      if (S.obj === 'bath'){
        if (S.bwork !== 'full') return null;
        var ar = S.barea ? S.barea : 4, w = (+Q.bathRate || 43000) * ar; if (ar >= 3) w = Math.max(w, +Q.bathMin || 0);
        return { lo:w * sp[0], hi:w * sp[1], weeks:ar > 6 ? 4 : 3 };
      }
      var r = Q.rates[S.kind] || 0, w2 = r * S.area * (S.flat === 'old' ? (+Q.oldFlat || 1) : 1) + (S.bath === 'yes' ? (+(Q.bath || {})[S.kind] || 0) : 0);
      var dd = (Q.days || {})[S.kind] || [38, .7];
      return { lo:w2 * sp[0], hi:w2 * sp[1], weeks:Math.max(3, Math.round((dd[0] + dd[1] * S.area) / 7)) };
    };
    var weeksText = function(w){ var m = w % 100, l = w % 10; if (m > 10 && m < 20) return w + ' недель'; if (l === 1) return w + ' неделя'; if (l > 1 && l < 5) return w + ' недели'; return w + ' недель'; };
    /* квиз-переписка с менеджером */
    var MGR = Q.manager || 'Станислав', box = body.closest('.qz'), qh = $('.qz-h', box);
    if (qh) qh.innerHTML = '<div class="mg"><i class="mg-a">' + (Q.managerPhoto ? '<img src="' + esc(Q.managerPhoto) + '" srcset="' + esc(Q.managerPhoto) + ' 1x, ' + esc(Q.managerPhoto2 || Q.managerPhoto) + ' 2x" alt="' + esc(MGR) + '" width="40" height="40">' : esc(MGR.charAt(0))) + '</i><div><b>' + esc(MGR) + '</b><small>менеджер Домилии · расчёт стоимости</small></div></div><span id="qzStep">Вопрос 1 из 6</span>';
    stepT = $('#qzStep');
    body.innerHTML = '<div class="ch" id="chLog"></div><div class="ch-o" id="chOpt"></div>';
    var chLog = $('#chLog'), opt = $('#chOpt'), busy = false;
    var POP = C.page === 's' || C.page === 'bath', MOB = function(){ return POP || innerWidth < 760; }, isApp = false;   /* на странице S квиз всегда открывается окном по кнопке */
    var cls = document.createElement('button'); cls.type = 'button'; cls.className = 'qz-x'; cls.setAttribute('aria-label', 'Свернуть'); cls.textContent = '✕'; if (qh) qh.appendChild(cls);
    var toEnd = function(){ chLog.scrollTop = chLog.scrollHeight; }, scroll = function(){ toEnd(); requestAnimationFrame(toEnd); setTimeout(toEnd, 80); setTimeout(toEnd, 350); };
    if (window.ResizeObserver) new ResizeObserver(toEnd).observe(chLog);
    var openApp = function(){ if (isApp) return; isApp = true; box.classList.add('app'); document.documentElement.classList.add('qz-lock'); try { history.pushState({ qz:1 }, ''); } catch(e){} scroll(); goal('lp_quiz_app', true); };
    var closeApp = function(fromHist){ if (!isApp) return; isApp = false; box.classList.remove('app'); document.documentElement.classList.remove('qz-lock'); if (!fromHist){ try { if (history.state && history.state.qz) history.back(); } catch(e){} } box.scrollIntoView({ block:'start' }); };
    cls.onclick = function(){ closeApp(); };
    addEventListener('popstate', function(){ closeApp(true); });
    addEventListener('resize', scroll);
    $$('a[href$="#calc"]').forEach(function(l){ l.addEventListener('click', function(e){ if (MOB()){ e.preventDefault(); openApp(); } }); });
    var say = function(html, c){ var d = document.createElement('div'); d.className = 'cm ' + (c || 'm'); d.innerHTML = html; chLog.appendChild(d); scroll(); return d; };
    var typing = function(ms, then){ var t = say('<span class="dots"><i></i><i></i><i></i></span>', 'm ty'); setTimeout(function(){ t.remove(); then(); }, ms); };
    var REACT = {
      obj:{ flat:'Отлично, посчитаем ремонт квартиры.', bath:'Санузлы — наша сильная сторона. Пара вопросов про него.' },
      flat:{ 'new':'Новостройка — отлично, сделаем всё с нуля.', 'old':'Понял, вторичка — уберём старое и сделаем как новое.' },
      kind:{ cap:'Под ключ — самый частый выбор: всё сделаем сами, от черновых работ до уборки.', design:'По дизайн-проекту — красиво получится. Дизайн-проект при таком ремонте в подарок' },
      bath:{ yes:'Хорошо, санузел тоже возьмём — с гидроизоляцией и гарантией.', no:'Понял, только комнаты.' },
      bwork:{ full:'Под ключ — правильно: гидроизоляция и трубы меняем сразу, чтобы потом не переделывать.', tile:'Понял, плитка.', plumb:'Понял, сантехника и трубы.' },
      bshow:{ 'душевая из плитки':'Душевая из плитки — красиво и удобно, делаем с правильным уклоном к трапу.' }
    };
    var opts = function(st){
      var h = '<div class="opts ' + (st.cls || '') + '">';
      st.o.forEach(function(o, i){
        if (o.img) h += '<button type="button" class="opt ph" data-i="' + i + '"><img src="' + esc(o.img) + '" alt=""><span>' + esc(o.t) + (o.s ? '<small>' + esc(o.s) + '</small>' : '') + '</span></button>';
        else h += '<button type="button" class="opt" data-i="' + i + '"><span>' + esc(o.t) + (o.s ? '<small>' + esc(o.s) + '</small>' : '') + '</span></button>';
      });
      return h + '</div>';
    };
    var ask = function(){
      var L = steps(), st = L[step]; stepT.textContent = 'Вопрос ' + (step + 1) + ' из ' + total(); bar.style.width = (step / total() * 100) + '%';
      opt.innerHTML = '';
      typing(step ? 550 : 450, function(){
        say(esc(st.q) + (st.hint ? '<small>' + esc(st.hint) + '</small>' : ''));
        opt.innerHTML = opts(st) + (step ? '<button type="button" class="qz-back">← Назад</button>' : '');
        $$('.opt', opt).forEach(function(b){ b.onclick = function(){ pick(st, st.o[+b.dataset.i]); }; });
        var bk = $('.qz-back', opt); if (bk) bk.onclick = back;
        scroll();
        if (!isApp && innerWidth < 980 && started){ var rr = opt.getBoundingClientRect(); if (rr.bottom > innerHeight) opt.scrollIntoView({ behavior:'smooth', block:'end' }); }
      });
    };
    var back = function(){ if (busy || !step) return; step--; var L = $$('.cm', chLog), k = L.length - 1; while (k >= 0 && !L[k].classList.contains('u')) k--; L.slice(Math.max(0, k)).forEach(function(x){ x.remove(); }); var L2 = $$('.cm.m', chLog); if (L2.length) L2[L2.length - 1].remove(); ask(); };
    var pick = function(st, o){
      if (busy) return; busy = true;
      if (!started){ started = true; goal('lp_quiz_start'); }
      if (MOB()) openApp();
      S[st.k] = o.v; if (st.k === 'rooms') S.area = o.a; if (st.k === 'btype' && o.v === 'wc') S.barea = 1.5; if (st.k === 'barea') S.barea = S.btype === 'wc' ? Math.min(o.a, 2.5) : o.a;
      opt.innerHTML = ''; say(esc(o.t), 'u');
      var r = (REACT[st.k] || {})[o.v] || (st.k === 'rooms' ? 'Понял, ' + o.t.toLowerCase() + '.' : st.k === 'when' ? 'Записал.' : '');
      step++;
      var next = function(){ busy = false; if (step < steps().length) ask(); else qzCalc(); };
      if (r) typing(550, function(){ say(esc(r)); next(); }); else next();
    };
    var qzCalc = function(){
      stepT.textContent = 'Считаем…'; bar.style.width = '88%';
      typing(400, function(){ say('Секунду, считаю стоимость…'); typing(1400, result); });
    };
    var result = function(){
      goal('lp_quiz_done');
      var p = price(), how = 'Звонок', bathOnly = S.obj === 'bath', gift = !bathOnly && (S.kind === 'design' || S.kind === 'cap');
      stepT.textContent = 'Последний шаг'; bar.style.width = '94%';
      var flat = S.flat === 'old' ? 'вторичка' : 'новостройка', room = (Q.rooms[+S.rooms] || {}).t || '', bt = (BATH[0].o.filter(function(x){ return x.v === S.btype; })[0] || {}).t || '', bw = (BATH[2].o.filter(function(x){ return x.v === S.bwork; })[0] || {}).t || '';
      var line = bathOnly ? 'Санузел: ' + bt.toLowerCase() + ' · ' + bw.toLowerCase() + ' · ' + S.bshow : 'Ремонт: ' + (KIND[S.kind] || '').toLowerCase() + ' · ' + room.toLowerCase() + ' · ' + flat + (S.bath === 'yes' ? ' · с санузлом' : '');
      say('<b>Расчёт готов ✓</b><small>' + esc(line) + '</small>');
      typing(650, function(){
        say(p ? 'Куда отправить стоимость и подробную смету? Оставьте номер — покажу цену сразу, а смету пришлю удобным способом.' : 'Такие работы считаю по фото и размерам — оставьте номер, пришлю стоимость в течение часа в рабочее время.');
        opt.innerHTML = '<div class="qz-how">' + ['Звонок', 'MAX', 'SMS', 'WhatsApp'].map(function(c, i){ return '<button type="button" class="' + (i ? '' : 'on') + '">' + c + '</button>'; }).join('') + '</div>' + (gift ? '<div class="qz-gift">' + esc(Q.giftText || '') + '</div>' : '');
        $$('.qz-how button', opt).forEach(function(b){ b.onclick = function(){ how = b.textContent; $$('.qz-how button', opt).forEach(function(x){ x.classList.toggle('on', x === b); }); }; });
        opt.appendChild(form(p ? (Q.btn || 'Узнать стоимость') : 'Получить расчёт', '', bathOnly ? 'Расчёт санузла (квиз)' : 'Расчёт стоимости (квиз)', function(){
          var d = bathOnly ? { 'Что ремонтируем':'только санузел', 'Санузел':bt, 'Площадь':S.barea + ' м² (примерно)', 'Работы':bw, 'Ванна или душ':S.bshow, 'Инсталляция':S.binst } : { 'Квартира':flat, 'Комнаты':room + ' (~' + S.area + ' м²)', 'Ремонт':KIND[S.kind], 'Санузел':S.bath === 'yes' ? 'да' : 'нет' };
          d['Когда начать'] = S.when; d['Как связаться'] = how; d['Расчёт'] = p ? money(p.lo) + ' – ' + money(p.hi) + ' ₽' : 'пришлём после фото и размеров'; if (p) d['Срок'] = 'около ' + weeksText(p.weeks); return d;
        }));
        scroll(); var ph = $('input[type=tel]', opt); if (ph && innerWidth > 980) ph.focus();
      });
    };
    $$('[data-kind]').forEach(function(a){ a.addEventListener('click', function(){ S.kind = a.dataset.kind; goal('lp_price_click'); }); });
    var BATHLP = /[?&]kv=bath\b/.test(location.search) || C.page === 'bath';   /* реклама «ремонт ванной» сразу ведёт в ветку санузла */
    if (BATHLP){ S.obj = 'bath'; step = 1; }
    say('Здравствуйте! Я ' + esc(MGR) + ', менеджер Домилии');
    setTimeout(function(){ typing(500, function(){ say(BATHLP ? 'Посчитаю стоимость ремонта ванной или санузла — несколько коротких вопросов, займёт минуту.' : 'Посчитаю стоимость ремонта — несколько коротких вопросов, займёт минуту.'); ask(); }); }, 250);
  }

  /* ---------- вариант C: формы по data-lf и открытый калькулятор ---------- */
  var ncCalc = null;
  var ncR = $('#ncR');
  if (ncR && Q.rates){
    var KN = { cosm:'Косметический', cap:'Под ключ', design:'Дизайнерский' }, INC = { cosm:'Шпаклёвка и покраска стен, обои, напольные покрытия, замена дверей и сантехприборов.', cap:'Демонтаж, электрика и сантехника, стяжка и выравнивание стен, плитка, чистовая отделка, двери, уборка.', design:'Всё, что входит в ремонт под ключ, плюс работа по дизайн-проекту и авторский надзор.' };
    var calcNow = function(){
      var area = +ncR.value, flat = ($('input[name=flat]:checked') || {}).value || 'new', kind = ($('input[name=kind]:checked') || {}).value || 'cap';
      var rate = Q.rates[kind] || Q.rates.cap, k = flat === 'old' ? (Q.oldFlat || 1) : 1, sp = Q.spread || [0.9, 1.12], base = rate * area * k;
      var dd = (Q.days || {})[kind] || [40, 0.7], days = dd[0] + dd[1] * area, w1 = Math.max(2, Math.round(days * 0.9 / 7)), w2 = Math.round(days * 1.15 / 7);
      $('#ncA').textContent = area; $('#ncSum').textContent = money(base * sp[0]) + '\u00a0– ' + money(base * sp[1]) + '\u00a0₽';
      $('#ncD').textContent = 'Срок: ' + w1 + '–' + w2 + ' недель'; $('#ncI').textContent = INC[kind] || '';
      ncCalc = { 'Квартира':flat === 'old' ? 'Вторичное жильё' : 'Новостройка', 'Ремонт':KN[kind], 'Площадь':area + ' м²', 'Расчёт на сайте':money(base * sp[0]) + ' – ' + money(base * sp[1]) + ' ₽' };
    };
    var touched = function(){ goal('lp_quiz_start', true); };
    ncR.addEventListener('input', function(){ calcNow(); touched(); });
    $$('.nc-calc input[type=radio]').forEach(function(x){ x.addEventListener('change', function(){ calcNow(); touched(); }); });
    calcNow();
  }
  $$('[data-lf]').forEach(function(el){ var isC = el.getAttribute('data-calc'); el.innerHTML = ''; el.appendChild(form(el.getAttribute('data-lf'), '', el.getAttribute('data-lt') || 'Бесплатный замер', isC ? function(){ return ncCalc || {}; } : null)); });

  /* форма записи на замер внизу */
  var fin = $('#finForm');
  if (fin){ fin.innerHTML = ''; fin.appendChild(form(C.finalBtn || 'Жду звонка', '', 'Бесплатный замер')); }

  /* ---------- видео-знакомство (вариант B): по нажатию, со звуком ---------- */
  var vidEl = $('#vbVid'), vidBtn = $('.vb2-play');
  if (vidEl && vidBtn){ vidBtn.onclick = function(){ vidBtn.hidden = true; vidEl.controls = true; vidEl.preload = 'auto'; try { var pr = vidEl.play(); if (pr && pr.catch) pr.catch(function(){}); } catch(e){} }; vidEl.addEventListener('play', function(){ vidBtn.hidden = true; goal('lp_video', true); }); }

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
    /* запись на замер: клиент сам выбирает день и время — уходит в его заявку в CRM */
    try {
      var lg = ls('dm_leads') || [], lastL = lg[lg.length - 1], box = $('#slot');
      if (box && C.crm && lastL && lastL.p && Date.now() - lastL.t < 864e5){
        var now = new Date(), ekbH = (now.getUTCHours() + 5) % 24, days = [], SL = ['10:00–12:00', '13:00–15:00', '16:00–18:00', '18:00–20:00'], pick = { d:null, s:null };
        for (var i = (ekbH < 14 ? 0 : 1); days.length < 3; i++){ var dd = new Date(Date.now() + 5 * 36e5 + i * 864e5); days.push({ iso:dd.toISOString().slice(0, 10), t:(i === 0 ? 'Сегодня' : i === 1 ? 'Завтра' : dd.toLocaleDateString('ru-RU', { weekday:'long', timeZone:'UTC' })), s:dd.toLocaleDateString('ru-RU', { day:'numeric', month:'long', timeZone:'UTC' }) }); }
        box.innerHTML = '<b class="t">Выберите удобное время замера</b><p>Инженер приедет бесплатно, всё измерит и ответит на вопросы. ' + esc(((C.quiz || {}).manager) || 'Менеджер') + ' позвонит подтвердить.</p>' +
          '<div class="sl-d">' + days.map(function(d, k){ return '<button type="button" data-d="' + d.iso + '"' + (k ? '' : ' class="on"') + '><b>' + esc(d.t) + '</b><small>' + esc(d.s) + '</small></button>'; }).join('') + '</div>' +
          '<div class="sl-s">' + SL.map(function(x){ return '<button type="button" data-s="' + x + '">' + x + '</button>'; }).join('') + '</div>' +
          '<button type="button" class="btn wide sl-go" disabled>Записаться на замер</button><small class="sl-n">Не подходит ни одно время? Просто дождитесь звонка — договоримся.</small>';
        pick.d = days[0].iso; box.hidden = false;
        var go = $('.sl-go', box);
        box.addEventListener('click', function(e){ var b = e.target.closest('button'); if (!b) return;
          if (b.dataset.d){ pick.d = b.dataset.d; $$('.sl-d button', box).forEach(function(x){ x.classList.toggle('on', x === b); }); }
          else if (b.dataset.s){ pick.s = b.dataset.s; $$('.sl-s button', box).forEach(function(x){ x.classList.toggle('on', x === b); }); }
          go.disabled = !(pick.d && pick.s);
          if (b === go && pick.d && pick.s){ go.disabled = true; go.textContent = 'Записываем…';
            var fd = new URLSearchParams({ phone:lastL.p, day:pick.d, slot:pick.s });
            fetch(C.crm + '/slot', { method:'POST', mode:'no-cors', body:fd, keepalive:true }).catch(function(){}).then(function(){
              goal('lp_slot'); var dt = days.filter(function(x){ return x.iso === pick.d; })[0];
              box.innerHTML = '<b class="t">Вы записаны на замер ✓</b><p><b>' + esc(dt.t + ', ' + dt.s + ', ' + pick.s) + '</b>. ' + esc(((C.quiz || {}).manager) || 'Менеджер') + ' позвонит, чтобы подтвердить адрес и время.</p>'; }); } });
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

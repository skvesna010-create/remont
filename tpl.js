/* Домилия — генератор страниц лендинга из content.json.
   Работает и в браузере (админка), и в Node (node build.js).
   LPT.page(C)      → index.html
   LPT.thanks(C)    → spasibo/index.html
   LPT.notFound(C)  → 404.html                                   */
(function(root){
  'use strict';
  var LOGO = '<svg class="lg mn-lg" viewBox="30 26 418 416" aria-hidden="true"> <defs>  <linearGradient id="gG_m1" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#1FE6AA"/><stop offset=".45" stop-color="#00B47E"/><stop offset="1" stop-color="#006C4C"/></linearGradient>  <linearGradient id="gBand_m1" x1="55" y1="432" x2="351" y2="300" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00B47E"/><stop offset=".55" stop-color="#14D69C"/><stop offset="1" stop-color="#2A4A42"/></linearGradient>  <linearGradient id="gRoof_m1" x1="290" y1="36" x2="400" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4A4F53"/><stop offset=".7" stop-color="#7C8488"/><stop offset="1" stop-color="#5C6367"/></linearGradient>  <linearGradient id="gSide_m1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5A6064"/><stop offset="1" stop-color="#2B2F32"/></linearGradient>  <linearGradient id="gLow_m1" x1="230" y1="300" x2="420" y2="430" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3A4044"/><stop offset="1" stop-color="#0E1011"/></linearGradient>  <linearGradient id="gLeg_m1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4C5357"/><stop offset="1" stop-color="#16191B"/></linearGradient> </defs> <g class="dm-mk"><path class="t" style="--i:7;--dx:10.0px;--dy:9.8px" fill="url(#gLow_m1)" d="M208,431 L351,328 L351,286 L438,252 L438,363 L351,431 Z"/><path class="t" style="--i:6;--dx:13.9px;--dy:-2.0px" fill="url(#gSide_m1)" d="M351,179 L438,129 L438,252 L351,286 Z"/><path class="t" style="--i:5;--dx:9.5px;--dy:-10.3px" fill="url(#gRoof_m1)" d="M290,36 L438,129 L351,179 L290,143 Z"/><path class="t" style="--i:4;--dx:2.3px;--dy:-13.8px" fill="url(#gG_m1)" d="M208,94 L290,36 L290,143 Z"/><path class="t" style="--i:3;--dx:0.2px;--dy:14.0px" fill="url(#gBand_m1)" d="M55,432 L351,286 L351,328 L208,431 Z"/><path class="t b" style="--i:1;--dx:-13.9px;--dy:-1.8px" fill="url(#gG_m1)" d="M202,94 L112,159 L112,390 L150,370 L150,182 L202,145 Z"/><path class="t b" style="--i:2;--dx:-13.1px;--dy:5.0px" fill="url(#gLeg_m1)" d="M202,145 L166,170 L166,363 L202,343 Z"/><path class="t b" style="--i:1;--dx:-11.7px;--dy:7.7px" fill="#0C3A2B" d="M150,214 L154,212 L154,368 L150,370 Z"/><path class="t b" style="--i:0;--dx:-12.3px;--dy:6.6px" fill="url(#gG_m1)" d="M95,221 L40,257 L40,427 L95,398 Z"/><path class="t b" style="--i:0;--dx:-12.3px;--dy:6.6px" fill="#0C3A2B" d="M95,221 L99,226 L99,396 L95,398 Z"/></g><defs><clipPath id="dmc_m1"><path d="M208,431 L351,328 L351,286 L438,252 L438,363 L351,431 Z"/><path d="M351,179 L438,129 L438,252 L351,286 Z"/><path d="M290,36 L438,129 L351,179 L290,143 Z"/><path d="M208,94 L290,36 L290,143 Z"/><path d="M55,432 L351,286 L351,328 L208,431 Z"/><path d="M202,94 L112,159 L112,390 L150,370 L150,182 L202,145 Z"/><path d="M202,145 L166,170 L166,363 L202,343 Z"/><path d="M150,214 L154,212 L154,368 L150,370 Z"/><path d="M95,221 L40,257 L40,427 L95,398 Z"/><path d="M95,221 L99,226 L99,396 L95,398 Z"/></clipPath><linearGradient id="dms_m1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><g clip-path="url(#dmc_m1)"><rect class="sh" x="-60" y="0" width="120" height="520" fill="url(#dms_m1)" transform="skewX(-20)"/></g></svg><span><svg class="dm-word" viewBox="480 176 984 132" aria-hidden="true"><defs><linearGradient id="gL_wl" x1="1144" y1="181" x2="1057" y2="303" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1FE6AA"/><stop offset="1" stop-color="#00915F"/></linearGradient></defs> <g id="word_wl" fill="currentColor" fill-rule="evenodd"><path d="M487,277 L499,277 L550,181 L575,181 L626,277 L637,277 L637,303 L487,303 Z M529,277 L562.5,215 L596,277 Z"/><path d="M763,241.5 A64.5,63.5 0 1 0 634,241.5 A64.5,63.5 0 1 0 763,241.5 Z M737,241.5 A38.5,38.5 0 1 1 660,241.5 A38.5,38.5 0 1 1 737,241.5 Z"/><path d="M773,181 L799,181 L844.5,233 L890,181 L916,181 L916,303 L889,303 L889,227 L844.5,278 L800,227 L800,303 L773,303 Z"/><path d="M931,181 L958,181 L958,255 L1025,181 L1049,181 L1049,303 L1022,303 L1022,226 L953,303 L931,303 Z"/><path d="M1148,192 L1201,303 L1171,303 L1133,226 Z"/><path d="M1210,181 L1236,181 L1236,256 L1305,181 L1329,181 L1329,303 L1302,303 L1302,227 L1232,303 L1210,303 Z"/><path d="M1457,181 H1380 A38,38 0 0 0 1372,256.2 L1340,303 H1372 L1400,261 H1429 V303 H1457 Z M1429,206 H1385 A15,15 0 0 0 1385,236 H1429 Z"/></g><path class="dm-l" fill="url(#gL_wl)" d="M1057,303 L1088,303 L1144,181 L1116,181 Z"/></svg><small>РЕМОНТ КВАРТИР</small></span>';

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }
  /* **жирный** → <b> */
  function md(s){ return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'); }
  function money(n){ return (Math.round(n / 1000) * 1000).toLocaleString('ru-RU').replace(/ /g, ' '); }
  function tel(p){ return 'tel:+' + String(p || '').replace(/\D/g, ''); }
  function on(x){ return x && x.show !== false; }
  function img(u){ return esc(u || ''); }

  var ICONS = {
    doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    card:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/>',
    shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    cart:'<path d="M3 7h18M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    tools:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
    home:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6"/>',
    check:'<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',
    ruble:'<path d="M8 21V4h6a4.5 4.5 0 0 1 0 9H6M6 17h8"/>'
  };
  function icon(n){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[n] || ICONS.check) + '</svg>'; }

  function v(C){ return C._v || 1; }
  function head(C, o){
    var S = C.seo || {};
    var title = o.title || S.title, desc = o.desc || S.description;
    var robots = o.noindex || !S.index ? '<meta name="robots" content="noindex, follow">' : '';
    return '<!DOCTYPE html>\n<html lang="ru">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
      '<script>document.documentElement.className+=" js"</script>\n' +
      '<title>' + esc(title) + '</title>\n<meta name="description" content="' + esc(desc) + '">\n' + robots + '\n' +
      (o.canonical ? '<link rel="canonical" href="' + esc(o.canonical) + '">\n' : '') +
      '<meta property="og:type" content="website"><meta property="og:locale" content="ru_RU"><meta property="og:site_name" content="Домилия">\n' +
      '<meta property="og:title" content="' + esc(title) + '"><meta property="og:description" content="' + esc(desc) + '">' + (S.ogImage ? '<meta property="og:image" content="' + esc(S.ogImage) + '">' : '') + '\n' +
      '<meta name="theme-color" content="#16191B">\n' +
      '<link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="icon" type="image/png" sizes="120x120" href="/favicon-120x120.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">\n' +
      '<link rel="preload" href="/fonts/montserrat-cyrillic-800-normal.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/fonts/montserrat-cyrillic-400-normal.woff2" as="font" type="font/woff2" crossorigin>\n' +
      '<style>' + [400, 500, 600, 700, 800].map(function(w){ return ['cyrillic', 'U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116', 'latin', 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'].reduce(function(a, x, i, L){ if (i % 2) return a; return a + '@font-face{font-family:Montserrat;font-style:normal;font-weight:' + w + ';font-display:swap;src:url(/fonts/montserrat-' + x + '-' + w + '-normal.woff2) format("woff2");unicode-range:' + L[i + 1] + '}'; }, ''); }).join('') + '</style>\n' +
      '<link rel="stylesheet" href="/style.css?v=' + v(C) + '"><link rel="preload" href="/app.js?v=' + v(C) + '" as="script">' + ((C.quiz || {}).obj || []).map(function(x){ return '<link rel="preload" href="' + esc(x.img) + '" as="image">'; }).join('') + '\n<meta name="yandex-verification" content="8f62ce537b893b64" /></head>\n';
  }

  function msgrs(C, cls){
    var s = C.settings || {}, h = '';
    if (s.whatsapp) h += '<a class="msg wa on" data-goal="lp_messenger" href="https://wa.me/' + esc(String(s.whatsapp).replace(/\D/g, '')) + '" target="_blank" rel="noopener" aria-label="Написать в WhatsApp">WA</a>';
    if (s.max) h += '<a class="msg mxg on" data-goal="lp_messenger" href="' + esc(s.max) + '" target="_blank" rel="noopener" aria-label="Написать в MAX">MAX</a>';
    if (s.telegram) h += '<a class="msg tg on" data-goal="lp_messenger" href="' + esc(/^https?:/.test(s.telegram) ? s.telegram : 'https://t.me/' + String(s.telegram).replace(/^@/, '')) + '" target="_blank" rel="noopener" aria-label="Написать в Telegram">TG</a>';
    return h;
  }
  function header(C, cta){
    var s = C.settings || {};
    return '<header class="top">\n  <div class="w">\n    <a class="mn-logo" href="/" aria-label="Домилия — ремонт квартир">' + LOGO + '</a>\n    <div class="top-r">' + msgrs(C) +
      '<a class="top-ph" data-tel data-goal="lp_call" href="' + tel(s.phone) + '"><span class="num">' + esc(s.phone) + '</span><small>' + esc(s.hours || '') + '</small></a>' +
      (cta === false ? '' : '<a class="btn" href="/#calc" data-goal="lp_cta_top">' + esc(s.headerBtn || 'Рассчитать стоимость') + '</a>') +
      '</div>\n  </div>\n</header>\n';
  }
  function footer(C){
    var s = C.settings || {}, co = s.company || {};
    var req = [co.name, co.inn ? 'ИНН ' + co.inn : '', co.ogrn ? 'ОГРН ' + co.ogrn : '', co.address].filter(Boolean).join(' · ');
    return '<footer class="foot">\n  <div class="w">\n    <div>© ' + new Date().getFullYear() + ' Домилия · ремонт квартир в Екатеринбурге' + (req ? '<br><small>' + esc(req) + '</small>' : '') + '</div>\n' +
      '    <div class="foot-l"><a href="' + esc(s.mainSite || 'https://domilia.ru/') + '" target="_blank" rel="noopener">Основной сайт domilia.ru</a><a href="' + esc(s.privacyUrl) + '" target="_blank" rel="noopener">Политика конфиденциальности</a><a href="' + esc(s.consentUrl) + '" target="_blank" rel="noopener">Согласие на обработку данных</a></div>\n  </div>\n</footer>\n';
  }
  function cookie(C){
    var k = C.cookie || {};
    return '<div class="ck" id="ck" hidden><p>' + md(k.text) + ' <a href="' + esc((C.settings || {}).privacyUrl) + '" target="_blank" rel="noopener">Подробнее</a></p><button type="button" id="ckOk">' + esc(k.btn || 'Понятно') + '</button></div>\n';
  }
  /* настройки для скрипта страницы — без лишнего */
  function config(C, page){
    var s = C.settings || {};
    var cfg = { page:page, phone:s.phone, hours:s.hours, to:s.crm ? '' : (s.formKey || s.email || ''), crm:s.crm || '', ym:+s.ym || 0, privacy:s.privacyUrl, consent:s.consentUrl,
      quiz:C.quiz, antispam:C.antispam || {}, objects:on(C.objects) ? (C.objects.items || []).filter(function(o){ return o.photos && o.photos.length; }).slice(0, 9) : [], objBtn:(C.objects || {}).btn, finalBtn:(C.final || {}).btn };
    return '<script>window.LPC=' + JSON.stringify(cfg).replace(/</g, '\\u003c') + '</script>\n<script src="/app.js?v=' + v(C) + '" defer></script>\n';
  }
  function tag(t, style){ return t ? '<div class="tag"' + (style ? ' style="' + style + '"' : '') + '>' + esc(t) + '</div>' : ''; }
  function secH(x){ return '<div class="sec-h rv">' + tag(x.tag) + '<h2>' + esc(x.title) + '</h2>' + (x.sub ? '<p>' + md(x.sub) + '</p>' : '') + '</div>'; }

  function qz1(C){ var Q = C.quiz || {}; return '<div class="qz-q">Что будем ремонтировать?</div><div class="opts c2">' + (Q.obj || Q.flat || []).map(function(x){ return '<button type="button" class="opt ph"><img src="' + esc(x.img) + '" alt="" width="320" height="240"><span>' + esc(x.t) + (x.s ? '<small>' + esc(x.s) + '</small>' : '') + '</span></button>'; }).join('') + '</div><div class="qz-nav"><small>' + esc(Q.note || '') + '</small></div>'; }
  /* ---------- главная ---------- */
  function hero(C){
    var H = C.hero || {}, Q = C.quiz || {};
    return '<section class="hero">\n  <div class="hero-bg" aria-hidden="true" style="background-image:url(' + img(H.bg) + ')"></div>\n  <div class="w">\n    <div>\n' +
      (H.pre ? '      <div class="hero-pre"><i></i>' + esc(H.pre) + '</div>\n' : '') +
      '      <h1>' + esc(H.title) + (H.accent ? ' <em>' + esc(H.accent) + '</em>' : '') + (H.titleEnd ? ' ' + esc(H.titleEnd) : '') + '</h1>\n' +
      '      <p class="hero-sub">' + md(H.sub) + (H.subMore ? ' <span class="more">' + md(H.subMore) + '</span>' : '') + (H.subEnd ? ' ' + md(H.subEnd) : '') + '</p>\n' +
      ((H.facts || []).length ? '      <div class="facts">' + H.facts.map(function(f){ return '<div><b>' + esc(f.b) + '</b><span>' + esc(f.t) + '</span></div>'; }).join('') + '</div>\n' : '') +
      (H.gift ? '      <div class="gift-strip"><svg viewBox="0 0 32 32" fill="none" stroke="#1FE6AA" stroke-width="2" stroke-linejoin="round"><rect x="5" y="12" width="22" height="15" rx="2"/><path d="M3 8h26v4H3zM16 8v19M16 8c-2-5-8-5-7-1s7 1 7 1zm0 0c2-5 8-5 7-1s-7 1-7 1z"/></svg><p>' + md(H.gift) + '</p></div>\n' : '') +
      '    </div>\n    <div class="qz" id="calc" aria-live="polite">\n      <div class="qz-h"><b>' + esc(Q.title || 'Расчёт стоимости ремонта') + '</b><span id="qzStep">Вопрос 1 из 6</span></div>\n      <div class="qz-bar"><i id="qzBar"></i></div>\n' +
      '      <div class="qz-b" id="qzBody">' + qz1(C) + '<noscript><p>Чтобы рассчитать стоимость, позвоните: <a href="' + tel((C.settings || {}).phone) + '">' + esc((C.settings || {}).phone) + '</a></p></noscript></div>\n' + qzCt(C) + '    </div>\n  </div>\n</section>\n';
  }
  function prices(C){
    var P = C.prices; if (!on(P)) return '';
    var h = '<section class="sec" id="prices">\n  <div class="w">\n    ' + secH(P) + '\n';
    if ((P.rows || []).length){
      h += '    <div class="pl rv">\n      <div class="pl-r pl-hd"><span>Вид ремонта</span><span>Что входит</span><span>Работы за м²</span><span>Мин. заказ</span><span>Срок</span></div>\n' +
        P.rows.map(function(r){ return '      <a class="pl-r' + (r.hit ? ' hit' : '') + '" href="#calc" data-kind="' + esc(r.kind || 'cap') + '"><b>' + esc(r.name) + (r.note ? '<small>' + esc(r.note) + '</small>' : '') + '</b><span>' + esc(r.inc) + '</span><strong>' + esc(r.price) + '</strong><span data-l="Мин. заказ">' + esc(r.min) + '</span><span data-l="Срок">' + esc(r.term) + '</span></a>\n'; }).join('') +
        '    </div>\n';
    }
    var M = P.matrix;
    if (M && M.show !== false && (M.cols || []).length && (M.rows || []).length){
      h += '    <h3 class="mx-t rv">' + esc(M.title) + '</h3>\n    <div class="mx-w rv"><table class="mx"><thead><tr><th>Квартира</th>' +
        M.cols.map(function(c){ return '<th' + (c.hl ? ' class="hl"' : '') + '>' + esc(c.name) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        M.rows.map(function(r){ return '<tr><td>' + esc(r.name) + ', ' + esc(r.area) + ' м²</td>' + M.cols.map(function(c){ return '<td' + (c.hl ? ' class="hl"' : '') + '>' + money(c.rate * r.area) + ' ₽</td>'; }).join('') + '</tr>'; }).join('') +
        '</tbody></table></div>\n    <div class="mx-n rv"><span>' + esc(M.note) + '</span>' + (M.btn ? '<a class="btn" href="#calc" data-goal="lp_cta_matrix">' + esc(M.btn) + '</a>' : '') + '</div>\n';
    }
    if ((P.adds || []).length) h += '    <div class="adds rv">' + P.adds.map(function(a){ return '<div><b>' + esc(a.name) + '</b><span>' + md(a.text).replace(/<b>/g, '<em>').replace(/<\/b>/g, '</em>') + '</span></div>'; }).join('') + '</div>\n';
    return h + '  </div>\n</section>\n';
  }
  function objects(C, cfgObjs){
    var O = C.objects; if (!on(O)) return '';
    var L = (cfgObjs || O.items || []).filter(function(o){ return o.photos && o.photos.length; }).slice(0, 9);
    if (!L.length) return '';
    return '<section class="sec" style="padding-top:0" id="objs">\n  <div class="w">\n    ' + secH(O) + '\n    <div class="objs" id="objList">' +
      L.map(function(p, i){
        return '<button type="button" class="ob rv" data-o="' + i + '"><span class="ob-i"><img src="' + img(p.photos[0]) + '" alt="' + esc(p.title) + '" loading="lazy">' + (p.demo ? '<i class="ob-demo">пример</i>' : '') + '<i class="ob-n">' + p.photos.length + ' фото</i></span>' +
          '<span class="ob-b"><small>' + esc(p.type) + '</small><h3>' + esc(p.title) + '</h3><span class="chips">' + (p.area ? '<span>' + esc(p.area) + ' м²</span>' : '') + (p.days ? '<span>' + esc(p.days) + ' дней</span>' : '') + (p.district ? '<span>' + esc(p.district) + '</span>' : '') + '</span>' +
          '<span class="ob-p">' + (p.price ? '<strong>' + esc(p.price) + '</strong>' : '<strong></strong>') + '<em>Смотреть →</em></span></span></button>';
      }).join('') + '</div>\n  </div>\n</section>\n';
  }
  function gift(C){
    var G = C.gift; if (!on(G)) return '';
    return '<section class="sec" style="padding-top:0">\n  <div class="w">\n    <div class="gift rv">\n      <div class="gift-t">' + tag(G.tag) + '<h2>' + esc(G.title) + '</h2><p>' + md(G.text) + '</p>' +
      '<ul class="gift-l">' + (G.items || []).map(function(x, i){ return '<li><b>' + (i + 1) + '</b><span>' + esc(x.t) + (x.s ? '<small>' + esc(x.s) + '</small>' : '') + '</span></li>'; }).join('') + '</ul>' +
      (G.btn ? '<a class="btn glow" href="#calc" data-goal="lp_cta_gift">' + esc(G.btn) + '</a>' : '') + (G.note ? '<p class="fine">' + esc(G.note) + '</p>' : '') + '</div>\n' +
      '      <div class="gift-i" role="img" aria-label="' + esc(G.title) + '" style="background-image:url(' + img(G.img) + ')">' + (G.badge ? '<span class="gift-badge">' + esc(G.badge) + '</span>' : '') + '</div>\n    </div>\n  </div>\n</section>\n';
  }
  function film(C){
    var F = C.film; if (!on(F) || !F.video) return '';
    return '<section class="sec" style="padding-top:0" id="film">\n  <div class="w film">\n    <div class="film-v rv"><video id="vid" preload="none" playsinline data-src="' + esc(F.video) + '" poster="' + img(F.poster) + '"></video>' +
      '<button type="button" id="vidPlay" aria-label="Смотреть ролик о компании"><svg viewBox="0 0 24 24" fill="#06261B"><path d="M7 4.5v15l13-7.5z"/></svg></button></div>\n' +
      '    <div class="rv">' + tag(F.tag) + '<h2>' + esc(F.title) + '</h2><ul>' + (F.items || []).map(function(x, i){ return '<li><b>' + (i < 9 ? '0' : '') + (i + 1) + '</b>' + esc(x) + '</li>'; }).join('') + '</ul></div>\n  </div>\n</section>\n';
  }
  function steps(C){
    var S = C.steps; if (!on(S)) return '';
    return '<section class="sec" style="padding-top:0" id="how">\n  <div class="w">\n    ' + secH(S) + '\n    <div class="steps">' +
      (S.items || []).map(function(x){ return '<div class="st rv"><h3>' + esc(x.t) + '</h3><p>' + md(x.s) + '</p>' + (x.badge ? '<span class="free">' + esc(x.badge) + '</span>' : '') + '</div>'; }).join('') + '</div>\n  </div>\n</section>\n';
  }
  function why(C){
    var W = C.why; if (!on(W)) return '';
    return '<section class="sec" style="padding-top:0">\n  <div class="w">\n    ' + secH(W) + '\n    <div class="why">' +
      (W.items || []).map(function(x){ return '<div class="wy rv">' + icon(x.icon) + '<div><h3>' + esc(x.t) + '</h3><p>' + md(x.s) + '</p></div></div>'; }).join('') + '</div>\n  </div>\n</section>\n';
  }
  function faq(C){
    var F = C.faq; if (!on(F) || !(F.items || []).length) return '';
    var ld = { '@context':'https://schema.org', '@type':'FAQPage', mainEntity:F.items.map(function(x){ return { '@type':'Question', name:x.q, acceptedAnswer:{ '@type':'Answer', text:x.a } }; }) };
    return '<section class="sec" style="padding-top:0" id="faq">\n  <div class="w">\n    ' + secH(F) + '\n    <div class="faq rv">' +
      F.items.map(function(x, i){ return '<details' + (i ? '' : ' open') + '><summary>' + esc(x.q) + '</summary><p>' + md(x.a) + '</p></details>'; }).join('') + '</div>\n  </div>\n</section>\n' +
      '<script type="application/ld+json">' + JSON.stringify(ld).replace(/</g, '\\u003c') + '</script>\n';
  }
  function finalB(C){
    var F = C.final || {}, s = C.settings || {};
    return '<section class="sec" style="padding-top:0" id="final">\n  <div class="w">\n    <div class="fin rv">\n      <div>' + tag(F.tag, 'color:var(--g3)') + '<h2>' + esc(F.title) + '</h2><p>' + md(F.text) + '</p>' +
      ((F.items || []).length ? '<ul class="fin-list">' + F.items.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '') + '</div>\n' +
      '      <div class="lf fin-f"><b class="t">' + esc(F.formTitle) + '</b><div id="finForm"><a class="btn wide" data-tel data-goal="lp_call" href="' + tel(s.phone) + '">Позвонить ' + esc(s.phone) + '</a></div></div>\n    </div>\n  </div>\n</section>\n';
  }

  function stars(n){ n = Math.max(0, Math.min(5, Math.round(+n || 5))); return '<span class="stars" aria-label="Оценка ' + n + ' из 5">' + '★★★★★'.slice(0, n) + '<i>' + '★★★★★'.slice(n) + '</i></span>'; }
  var SRC = { yandex:'Яндекс Карты', '2gis':'2ГИС', avito:'Авито', vk:'ВКонтакте', site:'Отзыв клиента', phone:'Со слов клиента по телефону' };
  function reviews(C){
    var R = C.reviews; if (!on(R)) return '';
    var L = (R.items || []).filter(function(r){ return r && r.text && r.name; });
    if (!L.length) return '';
    var links = (R.yandex ? '<a href="' + esc(R.yandex) + '" target="_blank" rel="noopener">Все отзывы на Яндекс Картах</a>' : '') + (R.gis ? '<a href="' + esc(R.gis) + '" target="_blank" rel="noopener">Отзывы в 2ГИС</a>' : '');
    return '<section class="sec" style="padding-top:0" id="reviews">\n  <div class="w">\n    <div class="sec-h rv">' + tag(R.tag) + '<h2>' + esc(R.title) + '</h2>' + (R.sub ? '<p>' + md(R.sub) + '</p>' : '') +
      (R.rating ? '<div class="rt"><b>' + esc(R.rating) + '</b>' + stars(Math.round(parseFloat(String(R.rating).replace(',', '.')))) + (R.count ? '<span>' + esc(R.count) + '</span>' : '') + '</div>' : '') + '</div>\n' +
      '    <div class="rvs" id="rvList">' + L.map(function(r){
        var src = SRC[r.source] || r.source || '';
        return '<article class="rw rv"><div class="rw-h">' + (r.photo ? '<img src="' + img(r.photo) + '" alt="" loading="lazy">' : '<i class="av">' + esc(String(r.name).trim().charAt(0).toUpperCase()) + '</i>') +
          '<div><b>' + esc(r.name) + '</b>' + (r.place ? '<small>' + esc(r.place) + '</small>' : '') + '</div>' + (r.stars ? stars(r.stars) : '') + '</div>' +
          (r.work ? '<div class="rw-w">' + esc(r.work) + '</div>' : '') + '<p>' + md(r.text) + '</p>' +
          '<div class="rw-f">' + (r.date ? '<span>' + esc(r.date) + '</span>' : '<span></span>') + (src ? (r.link ? '<a href="' + esc(r.link) + '" target="_blank" rel="noopener">' + esc(src) + ' ↗</a>' : '<span>' + esc(src) + '</span>') : '') + '</div></article>';
      }).join('') + '</div>\n' + (links ? '    <div class="rw-l rv">' + links + '</div>\n' : '') + '  </div>\n</section>\n';
  }
  function team(C){
    var T = C.team; if (!on(T)) return '';
    var L = (T.items || []).filter(function(m){ return m && (m.role || m.name); });
    if (!L.length) return '';
    var user = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8.5" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';
    return '<section class="sec" style="padding-top:0" id="team">\n  <div class="w">\n    ' + secH(T) + '\n    <div class="tm">' + L.map(function(m){
      return '<div class="tm-c rv"><div class="tm-p">' + (m.photo ? '<img src="' + img(m.photo) + '" alt="' + esc(m.name || m.role) + '" loading="lazy">' : user) + '</div>' +
        '<div class="tm-t">' + (m.name ? '<b>' + esc(m.name) + '</b><span class="tm-r">' + esc(m.role) + '</span>' : '<b>' + esc(m.role) + '</b>') + (m.exp ? '<span class="tm-e">' + esc(m.exp) + '</span>' : '') + (m.text ? '<p>' + md(m.text) + '</p>' : '') + '</div></div>';
    }).join('') + '</div>\n  </div>\n</section>\n';
  }
  function mbar(C){
    return '<div class="mbar" id="mbar"><a class="btn lt" data-tel data-goal="lp_call" href="' + tel((C.settings || {}).phone) + '">Позвонить</a><a class="btn" href="#calc" data-goal="lp_cta_bar">Рассчитать</a></div>\n';
  }

  function page(C){
    var host = 'https://remont.domilia.ru/';
    return head(C, { canonical:host }).replace('</head>', '<script>(function(){try{if(/[?&]ab=a/.test(location.search))return;var k="dm_ab",v=localStorage.getItem(k);if(/[?&]ab=b/.test(location.search))v="b";if(!v){v=Math.random()<.5?"a":"b";localStorage.setItem(k,v);}if(v==="b")location.replace("/v2/"+location.search+location.hash);}catch(e){}})()</script></head>') + '<body>\n' + header(C) + '<main>\n' + hero(C) + prices(C) + objects(C) + reviews(C) + gift(C) + film(C) + steps(C) + team(C) + why(C) + faq(C) + finalB(C) + '</main>\n' +
      footer(C) + mbar(C) + cookie(C) + config(C, 'main') + '</body>\n</html>\n';
  }

  /* ---------- вариант C (главная): цена сразу, открытый калькулятор, короткая форма ---------- */
  function pageC(C){
    var s = C.settings || {}, P = C.prices || {}, rows = P.rows || [], hit = rows.filter(function(x){ return x.hit; })[0] || rows[0] || {}, Q = C.quiz || {}, W = C.why || {}, G = C.gift || {};
    var chk = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var mx = s.max ? '<a class="btn lt" href="' + esc(s.max) + '" target="_blank" rel="noopener" data-goal="lp_messenger">Написать в MAX</a>' : '';
    var hero = '<section class="nc-hero">\n  <div class="w nc-h">\n    <div class="nc-hl">\n      <div class="nc-pre">Екатеринбург · ремонт квартир под ключ</div>\n' +
      '      <h1>Ремонт квартиры под ключ' + (hit.price ? ' <span class="nc-pr">' + esc(hit.price) + '/м²</span>' : '') + '</h1>\n' +
      '      <p class="nc-sub">Цена фиксируется в договоре и не растёт. Платите по этапам — только после приёмки.</p>\n' +
      '      <ul class="nc-ul">' + ['Бесплатный замер в удобное время', 'Смета с ценой каждой работы — за 24 часа', 'Гарантия 3 года, прописана в договоре', (G.title ? 'Дизайн-проект в подарок при капитальном ремонте' : '')].filter(Boolean).map(function(x){ return '<li>' + chk + '<span>' + esc(x) + '</span></li>'; }).join('') + '</ul>\n' +
      '      <div class="nc-cta"><a class="btn" href="#calc" data-goal="lp_cta_top">Рассчитать стоимость</a>' + mx + '</div>\n    </div>\n' +
      '    <div class="nc-hr"><div class="nc-card"><b class="nc-ct">Запишитесь на бесплатный замер</b><p class="nc-cs">Инженер перезвонит, ответит на вопросы и договорится о дне и часе замера.</p><div data-lf="Записаться на замер" data-lt="Бесплатный замер (первый экран)"><a class="btn wide" data-tel data-goal="lp_call" href="' + tel(s.phone) + '">Позвонить ' + esc(s.phone) + '</a></div></div></div>\n  </div>\n</section>\n';
    var opt = function(name, v, t, sub, ck){ return '<label class="nc-o"><input type="radio" name="' + name + '" value="' + v + '"' + (ck ? ' checked' : '') + '><span><b>' + esc(t) + '</b>' + (sub ? '<small>' + esc(sub) + '</small>' : '') + '</span></label>'; };
    var calc = '<section class="sec nc-calc" id="calc">\n  <div class="w">\n    <div class="sec-h"><div class="tag">Калькулятор</div><h2>Сколько стоит ремонт вашей квартиры</h2><p>Цена считается сразу, без телефона. Точную сумму инженер закрепит в договоре после замера.</p></div>\n' +
      '    <div class="nc-cg">\n      <div class="nc-ci">\n' +
      '        <div class="nc-f"><span class="nc-l">Квартира</span><div class="nc-os">' + opt('flat', 'new', 'Новостройка', 'без отделки или white box', true) + opt('flat', 'old', 'Вторичное жильё', 'есть старая отделка') + '</div></div>\n' +
      '        <div class="nc-f"><span class="nc-l">Ремонт</span><div class="nc-os c3">' + opt('kind', 'cosm', 'Косметический', 'обновить отделку') + opt('kind', 'cap', 'Под ключ', 'всё, с электрикой и сантехникой', true) + opt('kind', 'design', 'Дизайнерский', 'по проекту') + '</div></div>\n' +
      '        <div class="nc-f"><span class="nc-l">Площадь: <b id="ncA">56</b> м²</span><input type="range" id="ncR" min="20" max="160" step="1" value="56" aria-label="Площадь квартиры, м²"><div class="nc-rl"><span>20 м²</span><span>160 м²</span></div></div>\n' +
      '        <p class="nc-bath">Нужен только санузел? <a href="/vannaya/">Расчёт ванной под ключ</a></p>\n      </div>\n' +
      '      <div class="nc-co"><span class="nc-l">Ориентировочно</span><div class="nc-sum" id="ncSum">—</div><div class="nc-days" id="ncD"></div><p class="nc-inc" id="ncI"></p>' +
      '<div class="nc-of"><b>Получите точную смету</b><span>Перезвоним, приедем на бесплатный замер и пришлём смету с ценой каждой работы.</span></div><div data-lf="Получить точную смету" data-lt="Калькулятор" data-calc="1"></div></div>\n    </div>\n  </div>\n</section>\n';
    var tbl = rows.length ? '<section class="sec nc-pt" id="prices">\n  <div class="w">\n    <div class="sec-h"><div class="tag">Цены</div><h2>' + esc(P.title || 'Цены на ремонт квартир') + '</h2><p>' + md(P.sub || '') + '</p></div>\n    <div class="nc-tw"><table class="nc-t"><thead><tr><th>Вид ремонта</th><th>Что входит</th><th>За 1 м²</th><th>Срок</th></tr></thead><tbody>' +
      rows.map(function(r){ return '<tr' + (r.hit ? ' class="hit"' : '') + '><td><b>' + esc(r.name) + '</b><small>' + esc(r.note || '') + '</small></td><td>' + esc(r.inc || '') + '</td><td class="n">' + esc(r.price || '') + '</td><td>' + esc(r.term || '') + '</td></tr>'; }).join('') + '</tbody></table></div>\n  </div>\n</section>\n' : '';
    var giftS = on(G) ? '<section class="sec nc-gift">\n  <div class="w"><div class="nc-gb"><div><div class="tag">' + esc(G.tag || 'Подарок') + '</div><h2>' + esc(G.title) + '</h2><p>' + md(G.text) + '</p></div><ul>' + (G.items || []).map(function(x){ return '<li><b>' + esc(x.t) + '</b><span>' + esc(x.s) + '</span></li>'; }).join('') + '</ul></div></div>\n</section>\n' : '';
    return head(C, { canonical:'https://remont.domilia.ru/' }) + '<body class="nc">\n' + header(C) + '<main>\n' + hero + calc + why(C) + tbl + steps(C) + giftS + reviews(C) + faq(C) + finalB(C) + '</main>\n' + footer(C) +
      '<div class="mbar nc-mb" id="mbar"><a class="btn lt" data-tel data-goal="lp_call" href="' + tel(s.phone) + '">Позвонить</a>' + (s.max ? '<a class="btn lt" href="' + esc(s.max) + '" target="_blank" rel="noopener" data-goal="lp_messenger">MAX</a>' : '') + '<a class="btn" href="#calc" data-goal="lp_cta_bar">Рассчитать</a></div>\n' + cookie(C) + config(C, 'c') + '</body>\n</html>\n';
  }

  /* ---------- вариант M: мобильная страница-«лента» — выгоды, подарки, фото, отзывы, кнопка всегда внизу ---------- */
  function pageM(C){
    var s = C.settings || {}, Q = C.quiz || {}, R = C.reviews || {}, rows = (C.prices || {}).rows || [], hit = rows.filter(function(x){ return x.hit; })[0] || {};
    var ck = function(t){ return '<li><i aria-hidden="true"></i><span>' + t + '</span></li>'; };
    var car = function(list, label){ return '<div class="mm-car">' + list.map(function(u){ return '<figure><img src="' + esc(u) + '" alt="" loading="lazy" width="640" height="480">' + (label ? '<figcaption>' + esc(label) + '</figcaption>' : '') + '</figure>'; }).join('') + '</div><div class="mm-hint">листайте →</div>'; };
    var ph = function(n, t){ var o = ''; for (var i = 0; i < n; i++) o += '<div class="mm-ph"><span>' + esc(t) + '</span></div>'; return '<div class="mm-car">' + o + '</div>'; };
    var vis = ['/img/dvuhkomnatnaya-kvartira-v-akademicheskom-nku7td.webp', '/img/odnokomnatnaya-kvartira-v-novostroyke-na-9dkvqs.webp', '/img/vannaya-pod-klyuch-na-uralmashe-srcgmv.webp', '/img/studiya-s-white-box-na-vize-xspou0.webp', '/img/dvuhkomnatnaya-kvartira-na-elmashe-ulo8pb.webp'];
    var des = ['/img/dvuhkomnatnaya-kvartira-v-akademicheskom-n2sz6x.webp', '/img/odnokomnatnaya-kvartira-v-novostroyke-na-a0gsbq.webp', '/img/dvuhkomnatnaya-kvartira-na-elmashe-z0g3ee.webp', '/img/studiya-s-white-box-na-vize-by9e9c.webp'];
    var rv = (R.items || []).slice(0, 6).map(function(r){ return '<div class="mm-rv"><b>' + esc(r.name) + '</b><small>' + esc(r.work) + (r.date ? ' · ' + esc(r.date) : '') + '</small><p>' + esc(r.text) + '</p></div>'; }).join('');
    return head(C, { title:'Ремонт квартиры в Екатеринбурге под ключ — Домилия', desc:(C.seo || {}).description, noindex:true, canonical:'https://remont.domilia.ru/' }) + '<body class="mm">\n<main class="mm-w">\n' +
      '<div class="mm-top"><a class="mn-logo" href="/" aria-label="Домилия">' + LOGO + '</a><span>Екатеринбург</span></div>\n' +
      '<div class="mm-demo">Пример страницы. Пунктиром отмечены места для ваших фото, подарков и отзывов.</div>\n' +
      '<h1>Ремонт квартиры в Екатеринбурге под ключ — цена в договоре, гарантия 3 года и оплата по этапам</h1>\n' +
      '<ul class="mm-ck">' + ck('<b>Фиксированная цена</b> — прописана в договоре и не растёт') + ck('<b>Гарантия 3 года</b> на все работы') + ck('<b>Оплата поэтапно</b> — по факту выполненных и принятых работ') + ck('<b>Смета за 24 часа</b> с ценой каждой работы') + ck('<b>Бесплатный замер</b> в удобное время') +
      (hit.price ? ck('Под ключ — <b>' + esc(hit.price) + '/м²</b>') : '') + '</ul>\n' +
      '<div class="mm-bonus"><b>Бонус:</b> дизайн-проект в подарок при капитальном ремонте<span class="mm-ask">+ ещё подарок на выбор: [кондиционер / инсталляция / клининг — уточнить]</span></div>\n' +
      car(vis, 'визуализация') + '\n' +
      '<section><h2>Примеры готовых ремонтов</h2><p>Наши объекты в Екатеринбурге: площадь, срок и что сделали.</p>' + ph(3, 'Фото вашего объекта') + '</section>\n' +
      '<section><h2>Бесплатный дизайн-проект</h2><p>Дизайнер сделает технический проект под ваши пожелания.</p><ul class="mm-ck">' + ck('<b>Услуга бесплатна</b> при капитальном ремонте') + ck('Планировка, чертежи электрики и сантехники, смета') + ck('<b>Визуализация</b> — видите результат до начала работ') + '</ul><p class="mm-cap">Примеры проектов нашего дизайнера</p>' + car(des, 'визуализация') + '</section>\n' +
      '<section><h2>Контроль ремонта на всех этапах</h2><p>Фото и видео с объекта, этапы, документы и оплаты — в личном кабинете в телефоне. Отчёт по каждому этапу перед оплатой.</p>' + ph(1, 'Фото бригады на объекте') + '</section>\n' +
      '<section><h2>Подарок при заказе ремонта</h2>' + ph(1, 'Подарок на выбор — уточнить') + '</section>\n' +
      (rv ? '<section><h2>Отзывы клиентов</h2><p class="mm-ask">Лучше — скриншоты с 2ГИС или Яндекс Карт</p><div class="mm-car mm-rvs">' + rv + '</div></section>\n' : '') +
      '<section class="mm-fin"><h2>Получите расчёт стоимости ремонта под ключ с гарантией 3 года</h2>' +
      '<div class="qz" id="calc" aria-live="polite"><div class="qz-h"><b>' + esc(Q.title || 'Расчёт стоимости ремонта') + '</b><span id="qzStep">Вопрос 1 из 6</span></div><div class="qz-bar"><i id="qzBar"></i></div><div class="qz-b" id="qzBody">' + qz1(C) + '</div>' + qzCt(C) + '</div></section>\n' +
      '<p class="mm-foot">' + esc(s.phone) + ' · ' + esc(s.hours || '') + '<br><a href="' + esc(s.privacyUrl) + '">Политика конфиденциальности</a></p>\n' +
      '</main>\n<a class="mm-cta" href="#calc" data-goal="lp_cta_bar">Рассчитать стоимость</a>\n' + cookie(C) + config(C, 'm') + '</body>\n</html>\n';
  }

  /* ---------- квиз на весь экран: без чтения, сразу вопросы ---------- */
  function quizPage(C){
    var H = C.hero || {}, Q = C.quiz || {}, s = C.settings || {};
    return head(C, { title:'Расчёт стоимости ремонта квартиры за 1 минуту — Домилия, Екатеринбург', desc:'Ответьте на 5 вопросов и узнайте стоимость ремонта своей квартиры. Цена в договоре, оплата по этапам.', noindex:true, canonical:'https://remont.domilia.ru/' }) + '<body class="kv">\n' + header(C, false) +
      '<main class="kv-m">\n  <div class="kv-bg" aria-hidden="true" style="background-image:url(' + img(H.bg) + ')"></div>\n  <div class="w kv-w">\n' +
      '    <h1>Сколько стоит ремонт <em>вашей</em> квартиры?</h1>\n    <p class="kv-sub">5 вопросов — меньше минуты. Цену закрепим в договоре.</p>\n' +
      '    <div class="qz kv-qz" id="calc" aria-live="polite">\n      <div class="qz-h"><b>' + esc(Q.title || 'Расчёт стоимости ремонта') + '</b><span id="qzStep">Вопрос 1 из 6</span></div>\n      <div class="qz-bar"><i id="qzBar"></i></div>\n' +
      '      <div class="qz-b" id="qzBody">' + qz1(C) + '<noscript><p>Чтобы рассчитать стоимость, позвоните: <a href="' + tel(s.phone) + '">' + esc(s.phone) + '</a></p></noscript></div>\n' + qzCt(C) + '    </div>\n' +
      ((H.facts || []).length ? '    <div class="kv-f">' + H.facts.map(function(f){ return '<span><b>' + esc(f.b) + '</b> ' + esc(f.t) + '</span>'; }).join('') + '</div>\n' : '') +
      '  </div>\n</main>\n' + cookie(C) + config(C, 'kviz') + '</body>\n</html>\n';
  }

  /* ---------- вариант B: видео → квиз → объекты → видео целиком → шаги → заявка ---------- */
  function pageB(C){
    var H = C.hero || {}, Q = C.quiz || {}, s = C.settings || {};
    return head(C, { title:(C.seo || {}).title, desc:(C.seo || {}).description, noindex:true, canonical:'https://remont.domilia.ru/' }) + '<body class="vb">\n' + header(C) + '<main>\n' +
      '<section class="vb-hero2">\n  <div class="w vb2">\n    <div class="vb2-l">\n      <div class="hero-pre"><i></i>' + esc(H.pre || 'Екатеринбург · ремонт квартир под ключ') + '</div>\n      <h1>Ремонт квартиры <em>с ценой в договоре</em></h1>\n      <p class="vb-sub">' + (function(){ var r = ((C.prices || {}).rows || []).filter(function(x){ return x.hit; })[0]; return r ? 'Под ключ — <b>' + esc(r.price) + '/м²</b>. ' : ''; })() + 'Точная стоимость вашей квартиры за минуту: 5 вопросов, без регистрации.</p>\n' +
      '      <div class="vb2-vid"><video id="vbVid" preload="none" playsinline poster="/media/video-poster.jpg"><source src="' + esc((C.film || {}).video || '') + '" type="video/mp4"></video><button type="button" class="vb2-play" data-goal="lp_video"><i>▶</i><span>Знакомство с Домилией<small>50 секунд, со звуком</small></span></button></div>\n' +
      ((H.facts || []).length ? '      <div class="vb-f">' + H.facts.map(function(f){ return '<span><b>' + esc(f.b) + '</b> ' + esc(f.t) + '</span>'; }).join('') + '</div>\n' : '') + '    </div>\n' +
      '    <div class="vb2-r">\n      <div class="qz" id="calc" aria-live="polite">\n        <div class="qz-h"><b>' + esc(Q.title || 'Расчёт стоимости ремонта') + '</b><span id="qzStep">Вопрос 1 из 6</span></div>\n        <div class="qz-bar"><i id="qzBar"></i></div>\n' +
      '        <div class="qz-b" id="qzBody">' + qz1(C) + '</div>\n' + qzCt(C) + '      </div>\n' + (H.gift ? '      <div class="vb-gift">' + md(H.gift) + '</div>\n' : '') + '    </div>\n  </div>\n</section>\n' +
      objects(C) + reviews(C) + steps(C) + finalB(C) + '</main>\n' + footer(C) + mbar(C) + cookie(C) + config(C, 'b') + '</body>\n</html>\n';
  }

  function qzCt(C){ var s = C.settings || {}; return '      <div class="qz-ct">' + ((C.quiz || {}).managerPhoto ? '<img class="qz-ct-a" src="' + esc(C.quiz.managerPhoto) + '" alt="" width="24" height="24" loading="lazy">' : '') + 'Удобнее голосом? <a data-tel data-goal="lp_call" href="' + tel(s.phone) + '">Позвонить ' + esc(s.phone) + '</a>' + (s.max ? ' · <a data-goal="lp_messenger" href="' + esc(s.max) + '" target="_blank" rel="noopener">Написать в MAX</a>' : '') + '</div>\n'; }

  /* ---------- ремонт ванной: отдельная страница под рекламу «ремонт ванной / санузла» ---------- */
  function pageBath(C){
    var H = C.hero || {}, Q = C.quiz || {}, s = C.settings || {}, B = C.bath || {};
    var bathObjs = ((C.objects || {}).items || []).filter(function(o){ return /ванн|санузл|туалет/i.test((o.title || '') + ' ' + (o.text || '') + ' ' + (o.kind || '')); });
    var incl = B.incl || [];
    return head(C, { title:B.seoTitle || 'Ремонт ванной под ключ в Екатеринбурге — цена в договоре | Домилия', desc:B.seoDesc || 'Ремонт ванной и санузла под ключ: цена в договоре, оплата по этапам, гарантия 3 года. Рассчитайте стоимость за минуту.', canonical:'https://remont.domilia.ru/vannaya/' }) + '<body class="vb bath">\n' + header(C) + '<main>\n' +
      '<section class="vb-hero2">\n  <div class="w vb2">\n    <div class="vb2-l">\n      <div class="hero-pre"><i></i>' + esc(B.pre || 'Екатеринбург · ремонт ванной и санузла') + '</div>\n      <h1>' + esc(B.title || 'Ремонт ванной под ключ') + ' <em>' + esc(B.accent || 'с ценой в договоре') + '</em></h1>\n      <p class="vb-sub">' + md(B.sub || 'Ответьте на несколько вопросов — посчитаем стоимость ремонта вашей ванной или санузла за минуту.') + '</p>\n' +
      ((B.promise || []).length ? '      <ul class="bth-pr">' + B.promise.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>\n' : '') +
      ((H.facts || []).length ? '      <div class="vb-f">' + H.facts.map(function(f){ return '<span><b>' + esc(f.b) + '</b> ' + esc(f.t) + '</span>'; }).join('') + '</div>\n' : '') + '    </div>\n' +
      '    <div class="vb2-r">\n      <div class="qz" id="calc" aria-live="polite">\n        <div class="qz-h"><b>' + esc(B.quizTitle || 'Расчёт ремонта ванной') + '</b><span id="qzStep">Вопрос 1</span></div>\n        <div class="qz-bar"><i id="qzBar"></i></div>\n' +
      '        <div class="qz-b" id="qzBody"><div class="qz-q">Посчитаем стоимость ремонта ванной или санузла</div><noscript><p>Позвоните: <a href="' + tel(s.phone) + '">' + esc(s.phone) + '</a></p></noscript></div>\n' + qzCt(C) + '      </div>\n    </div>\n  </div>\n</section>\n' +
      (incl.length ? '<section class="sec" style="padding-top:0">\n  <div class="w">\n    ' + secH({ tag:'Что входит', title:B.inclTitle || 'Ремонт ванной от демонтажа до сантехники', sub:B.inclSub || 'Одна бригада, один договор и одна смета на всё.' }) + '\n    <ol class="bth-in rv">' + incl.map(function(x){ return '<li><b>' + esc(x.t) + '</b>' + (x.s ? '<span>' + md(x.s) + '</span>' : '') + '</li>'; }).join('') + '</ol>\n  </div>\n</section>\n' : '') +
      why(C) + (bathObjs.length ? objects(C, bathObjs) : '') + reviews(C) + steps(Object.assign({}, C, { steps:Object.assign({}, C.steps, { title:B.stepsTitle || 'Четыре шага до готовой ванной' }) })) + finalB(Object.assign({}, C, { final:Object.assign({}, C.final, { items:((C.final || {}).items || []).filter(function(x){ return !/дизайн-проект/i.test(x); }) }) })) + '</main>\n' + footer(C) + mbar(C) + cookie(C) + config(C, 'bath') + '</body>\n</html>\n';
  }

  /* ---------- спасибо ---------- */
  function thanks(C){
    var T = C.thanks || {}, s = C.settings || {};
    return head(C, { title:'Спасибо за заявку — Домилия', desc:T.text, noindex:true }) + '<body class="pg">\n' + header(C, false) +
      '<main class="pg-m">\n  <div class="w">\n    <div class="pg-card">\n      <div class="pg-ok"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#E6F6F0"/><path d="M20 33l8 8 16-18" fill="none" stroke="#007A55" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>\n' +
      '      <h1>' + esc(T.title) + '</h1>\n      <p class="pg-lead">' + md(T.text) + '</p>\n' +
      '      <div class="pg-sum" id="sum" hidden></div>\n' +
      '      <div class="pg-slot" id="slot" hidden></div>\n' +
      ((T.steps || []).length ? '      <ol class="pg-steps">' + T.steps.map(function(x){ return '<li><b>' + esc(x.t) + '</b><span>' + esc(x.s) + '</span></li>'; }).join('') + '</ol>\n' : '') +
      '      <div class="pg-act"><a class="btn" data-tel data-goal="lp_call" href="' + tel(s.phone) + '">Позвонить ' + esc(s.phone) + '</a>' + msgrs(C) + '</div>\n' +
      '      <p class="pg-back"><a href="/">' + esc(T.btn || 'Вернуться на главную') + '</a></p>\n    </div>\n  </div>\n</main>\n' + footer(C) + cookie(C) + config(C, 'thanks') + '</body>\n</html>\n';
  }

  /* ---------- 404 ---------- */
  function notFound(C){
    var N = C.notFound || {}, P = C.prices || {}, s = C.settings || {};
    var rows = on(P) ? (P.rows || []).slice(0, 6) : [];
    return head(C, { title:'Страница не найдена — ремонт квартир в Екатеринбурге | Домилия', desc:N.text, noindex:true }) + '<body class="pg">\n' + header(C) +
      '<main class="pg-m">\n  <div class="w">\n    <div class="pg-card nf">\n      <div class="nf-code">404</div>\n      <h1>' + esc(N.title) + '</h1>\n      <p class="pg-lead">' + md(N.text) + '</p>\n' +
      '      <div class="pg-act"><a class="btn" href="/#calc">Рассчитать стоимость</a><a class="btn lt" data-tel data-goal="lp_call" href="' + tel(s.phone) + '">' + esc(s.phone) + '</a></div>\n' +
      (rows.length ? '      <div class="nf-pr">' + rows.map(function(r){ return '<a href="/#prices"><b>' + esc(r.name) + '</b><span>' + esc(r.price) + '/м²</span></a>'; }).join('') + '</div>\n' : '') +
      '      <p class="pg-back"><a href="/">Главная страница</a> · <a href="/#faq">Вопросы</a> · <a href="' + esc(s.mainSite) + '">domilia.ru</a></p>\n    </div>\n  </div>\n</main>\n' +
      footer(C) + cookie(C) + config(C, '404') + '</body>\n</html>\n';
  }

  var LPT = { page:page, pageB:pageB, pageC:pageC, pageM:pageM, pageBath:pageBath, quizPage:quizPage, thanks:thanks, notFound:notFound, esc:esc, money:money, ICONS:Object.keys(ICONS) };
  root.LPT = LPT;
  if (typeof module !== 'undefined' && module.exports) module.exports = LPT;
})(typeof window !== 'undefined' ? window : this);

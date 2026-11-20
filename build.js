/* Сборка страниц из content.json: node build.js */
const fs = require('fs'), T = require('./tpl.js');
const C = JSON.parse(fs.readFileSync(__dirname + '/content.json', 'utf8'));
fs.writeFileSync(__dirname + '/index.html', T.page(C));
fs.mkdirSync(__dirname + '/kviz', { recursive:true });
fs.writeFileSync(__dirname + '/kviz/index.html', T.quizPage(C));
fs.mkdirSync(__dirname + '/spasibo', { recursive:true });
fs.writeFileSync(__dirname + '/spasibo/index.html', T.thanks(C));
fs.writeFileSync(__dirname + '/404.html', T.notFound(C));
console.log('готово: index.html, spasibo/index.html, 404.html');

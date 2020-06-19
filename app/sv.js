var express = require('express');
var path = require('path');
var fs = require('fs');
var session = require('express-session');

//App init

var app = express();

//head variable

var compHead;

//comp variable

var compIndex;
var compApp;

//platforms variable

var compMh;
var compMv;
var compPc;

//seo variable

var seoIndex;
var seoApp;

//load comp

fs.readFile((__dirname + '/comp/head.html'), 'utf8', function(err, contents) {
  compHead = contents;
});

fs.readFile((__dirname + '/comp/index.html'), 'utf8', function(err, contents) {
  compIndex = contents;
});

fs.readFile((__dirname + '/comp/app.html'), 'utf8', function(err, contents) {
  compApp = contents;
});

fs.readFile((__dirname + '/comp/platforms/mh.html'), 'utf8', function(err, contents) {
  compMh = contents;
});

fs.readFile((__dirname + '/comp/platforms/mv.html'), 'utf8', function(err, contents) {
  compMv = contents;
});

fs.readFile((__dirname + '/comp/platforms/pc.html'), 'utf8', function(err, contents) {
  compPc = contents;
});

//load SEO

fs.readFile((__dirname + '/comp/seo/index.html'), 'utf8', function(err, contents) {
  seoIndex = contents;
});

fs.readFile((__dirname + '/comp/seo/app.html'), 'utf8', function(err, contents) {
  seoApp = contents;
});

//main path

app.get('/', function(req, res) {

  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Req "/" -> New Connection -> IP:'+ip);

  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<!DOCTYPE html><html dir="ltr" lang="en"><head>');
  res.write(seoIndex);
  res.write(compHead);
  res.write('</head><body>');
  res.write(compIndex);
  res.write('</body></html>');
  res.end();

});

app.get('/app', function(req, res) {

  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Req "/app" -> New Connection -> IP:'+ip);

  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<!DOCTYPE html><html dir="ltr" lang="en"><head>');
  res.write(seoApp);
  res.write(compHead);
  res.write('</head><body>');
  res.write(compMh);
  res.write(compMv);
  res.write(compPc);
  res.write(compApp);
  res.write('</body></html>');
  res.end();

});

//file path

app.get('/jquery', function(req, res) {

  res.sendFile(path.join(__dirname + '/lib/jquery.min.js'));

});

app.get('/global', function(req, res) {

  res.sendFile(path.join(__dirname + '/lib/global.js'));

});

app.get('/konva', function(req, res) {

  res.sendFile(path.join(__dirname + '/lib/konva.min.js'));

});

//SEO

app.get('/robots.txt', function(req, res) {

  res.sendFile(path.join(__dirname + '/robots.txt'));

});

app.get('/sitemap.xml', function(req, res) {

  res.sendFile(path.join(__dirname + '/sitemap.xml'));

});

app.get('/favicon', function(req, res) {

  res.sendFile(path.join(__dirname + '/assets/favicon.png'));

});

//index comp assets

app.get('/assets/fondos/46.gif', function(req, res) {

  res.sendFile(path.join(__dirname + '/assets/fondos/46.gif'));

});

app.get('/assets/cyberia-white.png', function(req, res) {

  res.sendFile(path.join(__dirname + '/assets/cyberia-white.png'));

});

app.get('/assets/coming.png', function(req, res) {

  res.sendFile(path.join(__dirname + '/assets/coming.png'));

});

app.get('/assets/cyberia-social-color.jpg', function(req, res) {

  res.sendFile(path.join(__dirname + '/assets/cyberia-social-color.jpg'));

});

//load clases

app.get('/assets/clases/android/08.gif', function(req, res) {

  res.sendFile(path.join(__dirname + '/assets/clases/android/08.gif'));

});

app.get('/assets/clases/android/06.gif', function(req, res) {

  res.sendFile(path.join(__dirname + '/assets/clases/android/06.gif'));

});

app.get('/assets/clases/android/04.gif', function(req, res) {

  res.sendFile(path.join(__dirname + '/assets/clases/android/04.gif'));

});

app.get('/assets/clases/android/02.gif', function(req, res) {

  res.sendFile(path.join(__dirname + '/assets/clases/android/02.gif'));

});

app.get('/assets/clases/android/18.gif', function(req, res) {

  res.sendFile(path.join(__dirname + '/assets/clases/android/18.gif'));

});

app.get('/assets/clases/android/16.gif', function(req, res) {

  res.sendFile(path.join(__dirname + '/assets/clases/android/16.gif'));

});

app.get('/assets/clases/android/14.gif', function(req, res) {

  res.sendFile(path.join(__dirname + '/assets/clases/android/14.gif'));

});

app.get('/assets/clases/android/12.gif', function(req, res) {

  res.sendFile(path.join(__dirname + '/assets/clases/android/12.gif'));

});

//server

app.listen(3001, function () {
  console.log('App listening on port 3001!');
});

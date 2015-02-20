module.exports = function(app) {

  app.set("view options", {
    layout: "layouts/myLayout"
  });

  app.get('/controls', function(req, res) {
    res.render('controls/index', {});
  });
  app.get('/controls/init', function(req, res) {
    res.render('controls/init', {});
  });
  app.get('/controls/bold', function(req, res) {
    res.render('controls/bold', {});
  });
  app.get('/controls/callout', function(req, res) {
    res.render('controls/callout', {});
  });
  app.get('/controls/expander', function(req, res) {
    res.render('controls/expander', {});
  });
  app.get('/controls/grid', function(req, res) {
    res.render('controls/grid', {});
  });
  app.get('/controls/multipleColumns', function(req, res) {
    res.render('controls/multipleColumns', {});
  });
  app.get('/controls/sticky', function(req, res) {
    res.render('controls/sticky', {});
  });
  app.get('/controls/summaryBefore', function(req, res) {
    res.render('controls/summary', {"controls": false});
  });
  app.get('/controls/summaryAfter', function(req, res) {
    res.render('controls/summary', {"controls": true});
  });
  app.get('/controls/depend', function(req, res) {
    res.render('controls/depend', {});
  });
  app.get('/angular', function(req, res) {
    res.render('angular/index', {});
  });
  app.get('/gemstore', function(req, res) {
    res.render('angular/gemstore/gemstore', {});
  });
  app.get('/responsive', function(req, res) {
    res.render('responsive/index', {});
  });
  app.get('/sample', function(req, res) {
    res.render('sample', {serverDate: new Date()});
  });
  app.get('/bootstrap', function(req, res) {
    res.render('bootstrap/index', {});
  });
  app.get('/bootstrap/withBootstrap', function(req, res) {
    res.render('bootstrap/withBootstrap', {layout: "layouts/noLayout"});
  });
  app.get('/bootstrap/withoutBootstrap', function(req, res) {
    res.render('bootstrap/withoutBootstrap', {layout: "layouts/noLayout"});
  });
  app.get('/clientejs/clientEjs', function(req, res) {
    res.render('clientejs/clientEjs', {});
  });
  app.get('/webworker', function(req, res) {
    res.render('webworker/index', {});
  });
  app.get('/', function(req, res){
    res.render("index", {});
  });
}
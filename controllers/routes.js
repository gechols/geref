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
  app.get('/multipleColumns', function(req, res) {
    res.render('multipleColumns', {});
  });
  app.get('/clientejs/clientEjs', function(req, res) {
    res.render('clientejs/clientEjs', {});
  });
  app.get('/:page', function(req, res){
    res.render(req.params.page, {});
  });
  app.get('/', function(req, res){
    res.render("index", {});
  });
}
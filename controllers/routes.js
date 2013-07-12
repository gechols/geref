module.exports = function(app) {

  app.set("view options", {
    layout: "layouts/myLayout"
  });

  app.get('/angular', function(req, res) {
    res.render('angular/index', {});
  });
  app.get('/responsive', function(req, res) {
    res.render('responsive/index', {});
  });
  app.get('/sample', function(req, res) {
    res.render('sample', {serverDate: new Date()});
  });
  app.get('/:page', function(req, res){
    res.render(req.params.page, {});
  });
  app.get('/', function(req, res){
    res.render("index", {});
  });
}
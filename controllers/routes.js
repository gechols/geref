module.exports = function(app) {
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
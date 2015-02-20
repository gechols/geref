var expect = chai.expect;

describe('Directive: productTitle', function () {
  var element, scope, compile, defaultData,
    validTemplate = '<product-title></product-title>';

  beforeEach(function () {
    // Load the directive's module
    angular.mock.module('store');

    // Reset data each time
    defaultData = {};

    // Provide any mocks needed
    angular.mock.module(function ($provide) {
      //$provide.value('Name', new MockName());
    });

    // Inject in angular constructs otherwise, you would need to inject these into each test
    angular.mock.inject(function ($rootScope, $compile) {
      scope = $rootScope.$new();
      compile = $compile;
    });
  });


  function createDirective(data, template) {
    var elm;

    // Setup scope state
    scope.data = data || defaultData;

    // Create directive
    elm = compile(template || validTemplate)(scope);

    // Trigger watchers
    scope.$apply();

    // Return
    return elm;
  }

  it("should exist and match the input provided", function () {
    scope.product = {
      name: 'Dodecahedron',
      price: 2,
      description: 'This gem is really a 12 sided chunk of rock',
      canPurchase: true
    }
    element = createDirective();
    expect(element).to.exist;
    expect(element.hasClass("ng-scope")).to.equal(true);
    expect(element.contents()).to.have.length(2);
    expect(element.contents().html()).to.contain("Dodecahedron");
  });

});

describe('Controller: ReviewController', function () {
  var controller, scope;

  // Initialize the controller and scope
  beforeEach(function () {
    // Load the directive's module
    angular.mock.module('store');

    // Inject in angular constructs otherwise, you would need to inject these into each test
    angular.mock.inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller("ReviewController");
    });


  });

  it('should exist', function () {
    expect(controller).to.be.ok;
    expect(controller.addReview).to.be.a('function');
    expect(controller.getReviews).to.be.a('function');
  });

  it('should start with 0 reviews', function () {
    expect(controller.getReviews.length).to.equal(0);
  });

  it('should accept a new review', function () {
    expect(controller.addReview({text: "Here's a new review"}).length).to.equal(1);
  });

});

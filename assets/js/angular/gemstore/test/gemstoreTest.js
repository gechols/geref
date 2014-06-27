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

  it("should exist", function () {
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
    expect(element.contents().html()).to.have.string("Dodecahedron");
  });

});

//describe('Controller: PersonCardController', function () {
//  var personCardController, scope, personCardService;
//
//  // Initialize the controller and scope
//  beforeEach(function () {
//    // Load the controller's module
//    angular.mock.module('PersonCard');
//
//    // Provide any mocks needed
//    angular.mock.module(function ($provide) {
////      $provide.value('personCardService', new MockPersonCardService());
//    });
//
//    // Inject in angular constructs otherwise,
//    //  you would need to inject these into each test
//    angular.mock.inject(function ($rootScope, $controller, _personCardService_) {
//      scope = $rootScope.$new();
//      personCardService = _personCardService_;
//      personCardController = $controller('PersonCardController', {
//        $scope: scope
//      });
//    });
//
//  });
//
//  it('should exist', function () {
//    expect(personCardController).to.be.ok;
//    expect(scope.pedigreeClick).to.be.a('function');
//    expect(scope.personClick).to.be.a('function');
//  });

//});

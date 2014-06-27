(function(){
  var app = angular.module('store', []);
  console.log("LOOK: gemstore Angular module loaded");

  app.controller('StoreController', function(){
    console.log("LOOK: StoreController invoked");
    this.products = gems;
  });

  var gems = [
    {
      name: 'Dodecahedron',
      price: 2,
      description: 'This gem is really a 12 sided chunk of rock',
      canPurchase: true,
      reviews: [
        {
          stars: 5,
          body: "I love this product!",
          author: "joe@joesbarandgrill.com"
        },
        {
          stars: 3,
          body: "Pretty nice stuff",
          author: "myemail@hotmail.com"
        }

      ]
    },
    {
      name: "Pentagonal Gem",
      price: 5.95,
      description: "A gem worthy of witchcraft and required in summonings",
      canPurchase: false,

    }
  ];

  app.controller("ReviewController", function() {
    this.review = {};
    this.addReview = function(product) {
      product.reviews.push(this.review);
      this.review = {};
    }
  });

  app.directive('productTitle', function(){
    return {
      restrict: 'E',
      template: "<em>{{product.name}}</em><strong>{{product.price | currency}}</strong>"

    }
  });

})();

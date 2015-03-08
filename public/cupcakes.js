$(document).on("ready", function(){

	shop = new Shop;
	shop.fetch({
		success: function(){
			updateUI();
		}
	});

	template();
	$(".update").on("click", function(){
		updateUI();
	})

})

var Cupcake = Backbone.Model.extend({


	defaults: {
		icing: "vanilla",
		cake: "vanilla",
		sprinkles: false
	},

	validate: function(attributes) {
	    if (attributes.hasOwnProperty("icing") && attributes.hasOwnProperty("cake") && attributes.hasOwnProperty("sprinkles")) {
	      return "Indeed a cupcake";
	    }
	    else{
	      return "Does not have required attributes";
	    }
	}


})

var Shop = Backbone.Collection.extend({

	url: "/cupcakes",

	Model: Cupcake



})
   


var shop;
var cupcakeTemplateFunction

var addFlavor = function(){
	$(".add-button").on("click", function(){
		if($(".icing-entry").val()==="" || $(".cake-entry").val()===""){
   			return
   		}
   		var sprinkles
  		var sprinkles = $('input:radio[name=sprinkles]:checked').val();

   		var sprinklesBool;
		if (sprinkles === "yes"){
			sprinklesBool = true;
		}
		else if (sprinkles === "no"){
			sprinklesBool = false
		}
		else{
			return
		}

		var icing = $(".icing-entry").val();
		var cake = $(".cake-entry").val();

		shop.create({icing: icing, cake: cake, sprinkles: sprinklesBool},{
			success: function(){
				updateUI();
			}})
		$(".icing-entry").val("");
		$(".cake-entry").val("");
		console.log(this);
	})
}


var template = function(){

	var cupcakeListTemplate = $("#cupcake-template").html();
	cupcakeTemplateFunction = Handlebars.compile(cupcakeListTemplate);

}

var updateFlavor

var updateUI = function() {
	$(".cupcakes").html("")

	shop.each(function(cupcake){
    	var htmlString = cupcakeTemplateFunction(cupcake.toJSON())
    	var $itemHtml = $(htmlString)

    	$(".cupcakes").append($itemHtml)
		
	})

	updateItems();
	deleteItem();
	addFlavor();

}

var deleteItem = function(){

    $(".delete-button").on("click", function(){

      var id = $(this).attr("id")
      console.log($(this))
      console.log(id);
      shop.get(id).destroy({
        success: function(){updateUI()}
      })

    })

}

var updateItems = function() {

    $(".cancel-update").on("click", function(){
    	$(this).parent().addClass("hidden")
		$(this).removeClass("hidden")
		//console.log($(this))
		$(this).parent().parent().find(".update-button").removeClass("hidden")
    })

    $(".update-button").on("click", function(){

    	var id = $(this).attr("id")
    	$(this).addClass("hidden")
    	$(this).next("div").removeClass("hidden")

   	})

   	$(".commit-update").on("click", function(){
   		var icing = $(this).parent().find(".icing-update").val();
		var cake = $(this).parent().find(".cake-update").val();
		var sprinkles = $(this).parent().find(".sprinkles-update:checked").val();
		var sprinklesBool;

		if(sprinkles === "yes"){
			sprinklesBool = true;
		}
		else if (sprinkles === "no"){
			sprinklesBool = false;
		}
		else{
			//return
		}

		console.log(sprinkles)

   		if(icing === "" || cake ===""){
   			//return
   		}

   		var id = $(this).attr("id")

		console.log(sprinkles)
		console.log(id)
		// shop.get(id).set({icing: icing, cake: cake},{success: function(){
		// 	shop.sync("update",shop.get(id))}
		// })

   		shop.sync("update",shop.get(id).set({icing: icing, cake: cake, sprinkles: sprinklesBool}),
   			{success: updateUI()});

		$(".icing-update").val("");
		$(".cake-update").val("");
		console.log(this);

		$(this).parent().addClass("hidden")
		$(this).removeClass("hidden")
		//console.log($(this))
		$(".update-button").removeClass("hidden")


   	})
}



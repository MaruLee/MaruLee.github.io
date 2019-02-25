var topics = ["pikachu", "squirtle", "charmander", "bulbasaur", "eevee", "mew", "mewtwo"];

function createButtons() {
    $("#button-container").empty();
    for (i = 0; i < topics.length; i++) {
        var topicButton = $("<button>");
        topicButton.attr("data-name", topics[i]);
        topicButton.attr("class", "topic-button")
        topicButton.text(topics[i]);
        $("#button-container").append(topicButton);
    }
}
createButtons();

$(document).on('click', '.topic-button', function () {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            $("#image-container").empty();
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var image = $("<img>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                gifDiv.addClass("gif-div");
                image.addClass("gif-image");
                image.attr("src", results[i].images.fixed_height_still.url);
                image.attr("data-animated", results[i].images.fixed_height.url);
                image.attr("data-still", results[i].images.fixed_height_still.url);
                image.attr("data-state", false);
                gifDiv.append(p);
                gifDiv.append(image);
                $("#image-container").prepend(gifDiv);
            }
            
        });
});

$(document).bind('keypress', function(event) {
    if(event.keyCode==13){
         $('#add-topic-button').trigger('click');
     }
});

$("#add-topic-button").on('click', function (event) {
    event.preventDefault();
    var newtopic = $("#search-bar").val();
    topics.push(newtopic);
    createButtons();
    $('#search-bar').val('');
    
});

$(document).on('click', '.gif-image', function () {
    var newSource;
    var currentState = $(this).data("state");
    if (currentState == false)
    {
        newSource = $(this).data("animated");
        $(this).data("state", true);
    }
    if (currentState == true)
    {
        newSource = $(this).data("still");
        $(this).data("state", false);
    }
    $(this).attr("src", newSource);
});
var topics = ["Scott Aukerman", "Reggie Watts", "D'arci Carden", "Nick Kroll", "Jason Mantzoukas", "John Mulaney", "Marie Holland"]

//create buttons
createButtons();

function createButtons() {
    for (var i = 0; i < topics.length; i++) {
        var nButton = $("<button>")
        nButton.addClass("btn btn-success")
        nButton.addClass("comedian");
        nButton.attr("data-name", topics[i]);
        nButton.text(topics[i]);
        $("#button").append(nButton);

        $("#gif-input").val("");
    }
}

function displayGIF() {
    var apiKey = "cn1wPS5MTkph0yNeKJQgTZKl5wJDta5k";
    var q = $(this).attr("data-name");
    var num = 10 //default limit on results returned
    //limited url to pg-13 for class    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + q + "&api_key=" + apiKey + "&limit=" + num + "&rating=pg13";

    //clears display to show only current button GIFs
    // $("#display").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        for (var i = 0; i < num; i++) {
            // $("#display").append("<img src=" + response.data[i].images.fixed_height.url + ">");
            var emptyDiv = $("<div>");
            var gifDisplay = $("<img>");

            gifDisplay.attr("src", response.data[i].images.fixed_height_still.url);
            gifDisplay.attr("data-still", response.data[i].images.fixed_height_still.url);
            gifDisplay.attr("data-animate", response.data[i].images.fixed_height.url);
            gifDisplay.attr("data-state", "still");
            gifDisplay.addClass("animate");

            // emptyDiv.addClass("col-md-4");
            emptyDiv.append(gifDisplay);
            emptyDiv.append("<p>Rating: " + response.data[i].rating);
            emptyDiv.addClass("holder")

            $("#display").append(emptyDiv);
            
            
        }
        $("img").on("click", changeState);
    })
    $("img").on("click", changeState);
}

function changeState() {
    state = $(this).attr("data-state");

    if (state === "still") {
        var animatedURL = $(this).data("animate");
        $(this).attr("src", animatedURL);
        $(this).attr("data-state", "animate");
    }
    else if (state === "animate") {
        var stillURL = $(this).data("still")
        $(this).attr("src", stillURL);
        $(this).attr("data-state", "still");
    }
    else {
        alert("you broke it")
    }
}


//onClick event to add button

$("#add-gif").on("click", function (event) {

    event.preventDefault();

    $("#button").empty();
    var gif = $("#gif-input").val().trim();
    topics.push(gif);

    createButtons();
})

//onClick event to display GIFs

$("#button").on("click", ".comedian", displayGIF);





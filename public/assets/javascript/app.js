// scrape the article
$(document).on("click","#scrape",function() {
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).then(function(data) {
        console.log(data);
        window.location.reload();
    });
});

// get the article
$.ajax({
    method:"GET",
    url:"/articles",
}).then(function(data) {
    const length = data.length
    $("#articles").empty();
    $("#saved-articles").empty();
    for(let i = 0; i < length; i++) {
        console.log(data[i])
        let name = data[i].title;
        let id = data[i]._id;
        let link = data[i].link
        let article = $("<div>") 
            .addClass("article")
            .addClass("my-5"); 
        let title = $("<p>")
            .text(name);
        let linkText = $("<a>")
            .attr("href", link)
            .text(link); 
        let save = $("<button>")
            .attr("data-id", id)
            .addClass("save-article")
            .addClass("btn btn-primary text-white float-right")
            .text("Save Article");
        title.append(save)
        article.append(title, linkText);
        $("#articles").append(article);
    }; 
});

// save article
$(document).on("click", ".save-article", function(){
    const thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/saved/" + thisId,
    }).then(function(data) {
        console.log(data);
        window.location.reload();
    });
});































//$.getJSON("/articles", function(data) {
//     for (var i = 0; i < data.length; i++) {
//       $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].summary + "</p>");
//     }
//   });
  
  
//   $(document).on("click", "p", function() {
//     $("#notes").empty();
//     var thisId = $(this).attr("data-id");
  
//     $.ajax({
//       method: "GET",
//       url: "/articles/" + thisId
//     })
//       .then(function(data) {
//         console.log(data);
//         $("#notes").append("<h2>" + data.title + "</h2>");
//         $("#notes").append("<input id='titleinput' name='title' >");
//         $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//         $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
//         if (data.note) {
//           $("#titleinput").val(data.note.title);
//           $("#bodyinput").val(data.note.body);
//         }
//       });
//   });
  
//   $(document).on("click", "#savenote", function() {
//     var thisId = $(this).attr("data-id");
  
//     $.ajax({
//       method: "POST",
//       url: "/articles/" + thisId,
//       data: {
//         title: $("#titleinput").val(),
//         body: $("#bodyinput").val()
//       }
//     })
//       .then(function(data) {
//         console.log(data);
//         $("#notes").empty();
//       });
  
//     $("#titleinput").val("");
//     $("#bodyinput").val("");
//   });
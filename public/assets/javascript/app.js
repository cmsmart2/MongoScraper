$("#scrape").on("click", function() {
  $.ajax({
      method: "GET",
      url: "/scrape",
  }).done(function(data) {
      console.log(data)
      window.location = "/"
  })
});

$(".save").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/save/" + thisId
  }).done(function(data) {
      window.location = "/"
  })
});

$(".delete").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/delete/" + thisId
  }).done(function(data) {
      window.location = "/saved"
  })
});

$(".addNote").on("click", function() {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function(data) {
      console.log(data);
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});


$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
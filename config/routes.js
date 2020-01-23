const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");


module.exports = function(router) {
  //route for home
  router.get("/", function(_req, res) {
    db.Article.find({ saved: false}).lean()
    .then(function(article){
      var hbsObject ={
        article
      };
      console.log(hbsObject)
      res.render("index", hbsObject);
    })
  });
  //route for saved
  router.get("/saved", function(_req, res) {
    db.Article.find({ saved: true}).lean()
      .populate("notes")
      .exec(function(error, articles){
        var hbsObject = {
          article: articles
        };
        console.log(hbsObject)
        res.render("saved", hbsObject);
      })
  });

  // route to scrape articles
  router.get("/scrape", function(req, res) {
    axios.get("https://developer.mozilla.org/en-US/").then(function(response) {
      const $ = cheerio.load(response.data);
      $("li h2").each(function(i, element) {
        let result = {};
        result.title = $(this)
          .children()
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");

        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
            res.redirect("/")
          })
          .catch(function(err) {
            console.log(err);
          });
      });
      res.send("Scrape Complete");
    });
  });

  // route for getting all articles
  router.get("/articles", function(req, res) {
    db.Article.find({ saved: false }).lean()
      .then(function(dbArticle) {
        console.log("articles found")
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // route to save an article
  router.post("/articles/save/:id", function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // route for removing article
  router.post("/articles/delete/:id", function(req, res) {
    db.Article.findOneAndRemove({ _id: req.params.id }, { saved: false })
      .then(function(dbArticle) {
        res.send("Article Deleted");
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // route for note
  router.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate("notes")
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // route for creating note
  router.post("/notes/save/:id", function(req, res) {
    var newNote = new db.Note({
      body: req.body.text,
      article: req.params.id
    });
    newNote.save(function (err, note) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: note } })
        .exec(function (err) {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            res.send(note);
          }
        });
    });
  });

  // route for deleting note
  router.delete("/articles/:id", function(req, res) {
    db.Note.findOneAndRemove({ _id: req.params.id })
      .then(function(dbNote) {
        return db.Article.findOneAndUpdate(
          { _id: req.params.article_id },
          { $pull: { notes: dbNote } }
        );
      })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};

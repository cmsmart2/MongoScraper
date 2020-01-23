const db = require("../models/index");
const axios = require("axios");
const cheerio = require("cheerio");


module.exports = function(router) {
  //route for home
  router.get("/", function(_req, res) {
    res.render("index");
  });
  //route for saved
  router.get("/saved", function(_req, res) {
    res.render("saved");
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
          })
          .catch(function(err) {
            console.log(err);
          });
      });
      res.send("completed");
    });
  });

  // route for getting all articles
  router.get("/articles", function(req, res) {
    db.Article.find({ isSaved: false })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // route to save an article
  router.post("/saved/:id", function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { isSaved: true })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // route for saved articles
  router.get("/saved", function(req, res) {
    db.Article.find({ isSaved: true })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // route for removing article
  router.post("/remove/:id", function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { isSaved: false })
      .then(function(dbArticle) {
        res.json(dbArticle);
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
  router.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Article.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { notes: dbNote._id } }
        );
      })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
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

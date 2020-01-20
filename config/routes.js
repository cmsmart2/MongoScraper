const scrape = require("../scripts/scrape");
const articlesController = require("../controllers/articles");
const notesController = require("../controllers/notes");

module.exports = function(router){
    router.get("/", function(_req, res){
        res.render("index")
    });

    router.get("/saved", function(_req, res){
        res.render("saved")
    });

    // router.get("/api/fetch", function(req, res){
    //     articlesController.fetch(function(err, docs){
    //         if(!docs || docs.insertedCount === 0){
    //             res.json({
    //                 message: "No Articles Found"
    //             });
    //         }else {
    //             res.json({
    //                 message: "Added " + docs.insertedCount + "new articles"
    //             })
    //         }
    //     })
    // });
    
    // router.get("/api/articles", function(req, res){
    //     const query = {};
    //     if(req.query.saved){
    //         query = req.query
    //     }
    //     articlesController.get(query, function(data){
    //         res.json(data)
    //     })
    // });

    // router.delete("/api/articles/:id", function(req, res){
    //     const query = {};
    //     query._id = req.params.id;
    //     articlesController.delete(query, function(err, data){
    //         res.json(data);
    //     })
    // });

    // router.put("/api/articles", function(req, res){
    //     articlesController.update(req.body, function(err, data){
    //         res.json(data);
    //     })
    // });

    // router.get("/api/notes/:article_id?", function(req, res){
    //     const query = {};
    //     if(req.params.article_id){
    //         query._id = req.params.headline_id;
    //     }
    //     notesController.get(query, function(err, data){
    //         res.json(data)
    //     })
    // });

    // router.delete("/api/notes/:id", function(req, res){
    //     const query ={};
    //     query._id = req.params.id;
    //     notesController.delete(query, function(err, data){
    //         res.json(data)
    //     })
    // });

    // router.post("/api/notes", function(req, res){
    //     notesController.save(req.body, function(data){
    //         res.json(data);
    //     })
    // })
}
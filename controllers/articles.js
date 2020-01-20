// const scrape = require("../scripts/scrape");
// const db = require("../models/article");

// module.exports = {
//     fetch: function(cb) {
//         scrape(function(data){
//             const articles = data;
//             for(var i=0; i < articles.length; i++){
//                 articles[i].saved = false;
//             }
//             db.collection.insertMany(articles, {ordered: false}, function(err, docs){
//                 cb(err, docs);
//             })
//         })
//     },
//     delete: function(query, cb){
//         db.remove(query, cb)
//     },
//     get: function(query, cb){
//         db.find(query)
//         .sort({
//             _id: -1
//         })
//         .exec(function(err, doc){
//             cb(doc);
//         });
//     },
//     update: function(query, cb){
//         db.update({_id: query._id},{
//             $set: query
//         }, {}, cb);
        
//     }

// };
// const db = require("../models/note");

// module.exports = {
//     get: function(data, cb) {
//         db.find({
//             _articleId: data._id
//         }, cb);
//     },
//     save: function(data, cb){
//         var newNote = {
//             _articleId: data._id,
//             noteText: data.noteText
//         };
        
//         db.create(newNote, function(err, doc){
//             if(err){
//                 console.log(err)
//             }else {
//                 console.log(doc);
//                 cb(doc);
//             }
//         })
//     },
//     delete: function(data, cb){
//         Note.remove({
//             _id: data._id
//         }, cb);
//     }

// };
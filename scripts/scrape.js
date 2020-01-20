// const axios = require("axios");
// const cheerio = require("cheerio");

// const scrape = function(cb){

//     axios.get("http://www.nytimes.com").then(function(response) {
        
//         const $ = cheerio.load(response.data);
//         let articles = [];

//         $(".theme-summary").each(function(i, element){
//             const head = $(this).children(".story-heading").text().trim();
//             const sum = $(this).children(".summary").text().trim();
//             if(head && sum){
//                 const headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, "").trim();
//                 const sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, "").trim();

//                 const dataToAdd = {
//                     headline: headNeat,
//                     summary: sumNeat
//                 };

//                 articles.push(dataToAdd);
//             }
//         });
//         cb(articles);
//     });

// };

// module.exports = scrape
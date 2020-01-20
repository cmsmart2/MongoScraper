// $(document).ready(function(){
//     const articleContainer = $(".article-container");
//     $(document).on("click", ".btn.save", handleArticleSave);
//     $(document).on("click", ".scrape-new", handleArticleScrape);

//     loadPage();

//     function loadPage(){
//         articleContainer.empty();
//         $.get("/api/headlines?saved=false")
//             .then(function(data){
//                 if(data && data.length){
//                     renderArticles(data);
//                 }else{
//                     console.log("no articles")
//                 }
//             });
//         };

//     function renderArticles(articles){
//         const articlePanels = [];

//         for(var i=0; i <articles.length; i++){
//             articlePanels.push(createPanel(articles[i]))
//         }
//     }

//     function createPanel(article){
//         const panel =
//         $([`<div class='panel panel-deafult'>
//             <div class='panel-heading'>
//             <h3> ${article.headline} <h3>
//             <a class='btn btn-success save'>
//             Save Article </a> </h3>
//             </div> 
//             <div class='panel-body'>
//             ${article.summary}
//             </div>
//             </div>
//         `].join(""));
//         panel.data("_id", article._id)
//         return panel;
//     }

//     function handleArticleSave(){
//         const articleToSave = $(this).parents(".panel").data();
//         articleToSave.saved = true;

//         $.ajax({
//             method: "PATCH",
//             url: "/api/headlines",
//             data: articleToSave
//         })
//         .then(function(data){
//             if(data.ok){
//                 loadPage()
//             }
//         })
//     }
    
//     function handleArticleScrape(){
//         $.get("/api/fetch")
//             .then(function(data){
//                 loadPage();
//                 bootbox.alert("<h3 class='text-center'>" +data.message + "</h3>")
//             })
//     }

// })
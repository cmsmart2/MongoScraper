// $(document).ready(function(){
//     var articleContainer = $(".article-container");
//     $(document).on("click", ".btn.delete", handleArticleDelete);
//     $(document).on("click", ".btn.notes", handleArticleNotes);
//     $(document).on("click", ".btn.save", handleNoteSave);
//     $(document).on("click", ".btn.note-delete", handleNoteDelete);

//     loadPage()

//     function loadPage(){
//         articleContainer.empty();
//         $.get("/api/articles?saved=true").then(function(data){
//             if(data && data.length){
//                 renderArticles(data)
//             }else{
//                 console.log("none saved")
//             }
//         })
//     }

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
//             Save Article </a> <h3>
//             </div> 
//             <div class='panel-body'>
//             ${article.summary}
//             </div>
//             </div>
//         `].join(""));
//         panel.data("_id", article._id)
//         return panel;
//     }

//     function handleArticleDelete(){
//         var articleToDelete = $(this).parents(".panel").data();

//         $.ajax({
//             method: "DELETE",
//             url: "/api/articles/" + articleToDelete._id
//         }).then(function(data){
//             if(data.ok){
//                 loadPage();
//             }
//         })
//     }

//     function handleArticleNotes(){
//         const currentArticle = $(this).parents(".panel").data();

//         $.get("/api/notes/" + currentArticle._id).then(function(data){
//             const modalText = [`
//                 <div class='container-fluid text-center'>
//                 <h3> Notes for Article: ${currentArticle._id}
//                 </h3>
//                 <ul class = 'list-group note-container'>
//                 </ul>
//                 <textarea placeholder='New Note' rows='4' cols='60'></textarea>
//                 <button class= 'btn btn-success save'> Save Note </button>
//                 </div>
//             `].join("");
//             bootbox.dialog({
//                 message: modalText,
//                 closeButton: true
//             })
//             const noteData = {
//                 _id: currentArticle._id,
//                 notes: data || []
//             }
//             $(".btn.save").data("article", noteData);
//             renderNotesList(noteData)
//         })
//     }

//     function handleNoteSave(){
//         const noteData;
//         const newNote = $(".bootbox-body textarea").val().trim()

//         if(newNote){
//             noteData = {
//                 _id: $(this).data("article")._id,
//                 noteText: newNote
//             };
//             $.post("/api/notes", noteData).then(function(){
//                 bootbox.hideAll()
//             })
//         }

//     }
//     function renderNotesList(data){
//         const notesToRender = [];
//         const currentNote;

//         if(!data.notes.length){
//             currentNote =[
//                 `<li>No notes for this article</li>`
//             ].join("");
//             notesToRender.push(currentNote)
//         }else{
//             for (let i=0; i<data.notes.length; i++){
//                 currentNote = $([`
//                     <li class='list-group-item note'>
//                     ${data.notes[i].noteText},
//                     <button class='btn btn-danager note-delete'>x</button>
//                     </li>
//                 `].join(""))
//                 currentNote.children("button").data("_id", data.notes[i]._id)
//                 notesToRender.push(currentNote)
//             }
//         }
//         $(".note-container").append(notesToRender)
//     }

//     function handleNoteDelete(){
//         const noteToDelete = $(this).data("_id")

//         $.ajax({
//             url: "/api/notes" + noteToDelete,
//             method: "DELETE"
//         }).then(function(){
//             bootbox.hideAll();
//         })
//     }

// })
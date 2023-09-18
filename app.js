var database = firebase.database();


function searchAuthorByName() {
    
    var authorName = document.getElementById("authorSearch").value;
    var authorsRef = database.ref("authors");
    var resultsDiv = document.getElementById("searchResults");
  
    authorsRef.orderByChild("name").equalTo(authorName).once("value")
        .then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach(function (childSnapshot) {
                    var authorData = childSnapshot.val();
                    var authorBooks = authorData.books;

                    resultsDiv.innerHTML = ""; // Clear previous results
                    resultsDiv.innerHTML = `Books by ${authorName}:`;
                    console.log(`Books by ${authorName}:`);
                    for (var bookId in authorBooks) {
                        var book = authorBooks[bookId];
                        resultsDiv.innerHTML += "<p><strong>" + book.title + ":</strong> " + book.publishedYear + "</p>";
                        console.log(`- ${book.title} (${book.publishedYear})`);
                    }
                    document.getElementById("authorSearch").value = "";
                });
            } else {
                resultsDiv.innerHTML = "No results found for " + authorName;
                console.log(`Author ${authorName} not found.`);
            }
        })
        .catch(function(error) {
            console.error("Error searching for author:", error);
        });
}
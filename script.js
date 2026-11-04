 
        // Initialize library array with default books
        let library = [
            "Lord of the Rings",
            "Catcher in the Rye",
            "Wuthering Heights",
            "The Divine Comedy",
            "To Kill a Mocking Bird"
        ];

        // Display all books from the library array
        function displayBooks() {
            let bookList = document.getElementById("bookList");
            bookList.innerHTML = "";
            
            if (library.length === 0) {
                bookList.innerHTML = '<div class="empty-message">No books in library yet. Add one!</div>';
                return;
            }
            
            library.forEach(function(title, index) {
                let bookItem = document.createElement("div");
                bookItem.className = "book-item";
                
                let bookContent = document.createElement("span");
                bookContent.innerHTML = '<span class="book-number">' + (index + 1) + '.</span><span class="book-title">' + title + '</span>';
                
                let deleteBtn = document.createElement("button");
                deleteBtn.className = "delete-btn";
                deleteBtn.textContent = "Delete";
                deleteBtn.onclick = function() {
                    deleteBook(index);
                };
                
                bookItem.appendChild(bookContent);
                bookItem.appendChild(deleteBtn);
                bookList.appendChild(bookItem);
            });
        }

        // Add new book from form input
        function addBook(event) {
            event.preventDefault();
            
            let titleInput = document.getElementById("bookTitle");
            let title = titleInput.value.trim();
            
            if (title !== "") {
                library.push(title);
                titleInput.value = "";
                displayBooks();
                clearSearchResult();
            }
        }

        // Delete book from library
        function deleteBook(index) {
            library.splice(index, 1);
            displayBooks();
            clearSearchResult();
        }

        // Search for books by title
        function searchBook() {
            let searchInput = document.getElementById("searchInput");
            let searchTerm = searchInput.value.toLowerCase().trim();
            let searchResult = document.getElementById("searchResult");
            
            if (searchTerm === "") {
                clearSearchResult();
                return;
            }
            
            let found = library.filter(function(title) {
                return title.toLowerCase().includes(searchTerm);
            });
            
            if (found.length > 0) {
                searchResult.style.display = "block";
                searchResult.textContent = "Found " + found.length + " book(s): " + found.join(", ");
            } else {
                searchResult.style.display = "block";
                searchResult.textContent = "No books found matching '" + searchTerm + "'";
                searchResult.style.backgroundColor = "#ffebee";
                searchResult.style.color = "#c62828";
                searchResult.style.borderLeft = "4px solid #f44336";
            }
        }

        // Clear search result message
        function clearSearchResult() {
            let searchResult = document.getElementById("searchResult");
            searchResult.style.display = "none";
            searchResult.style.backgroundColor = "#e8f5e9";
            searchResult.style.color = "#2e7d32";
            searchResult.style.borderLeft = "4px solid #4caf50";
        }

        // Event listeners
        document.getElementById("addBookForm").addEventListener("submit", addBook);

        // Initial display on page load
        window.addEventListener("load", function() {
            displayBooks();
        });
    
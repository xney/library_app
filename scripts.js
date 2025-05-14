const myLibrary = [];

function Book(title, author, numPages, haveRead, ID) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title; 
    this.author = author; 
    this.numPages = numPages; 
    this.haveRead = haveRead;
    this.ID = ID; //generated using crypto.randomUUID()

    this.info = function() {
        if (haveRead.toLowerCase() == 'read') {
            return title + " by " + author + " is " + numPages + " long and has been read"
        } else {
            return title + " by " + author + " is " + numPages + " long and has not been read"
        }
    }
}

Book.prototype.changeHaveRead = function() {
    if (this.haveRead.toLowerCase() == 'unread') {
        this.haveRead = 'Read';
    } else {
        this.haveRead = 'Unread';
        
    }
    console.log(this.haveRead)
    console.log(myLibrary)
}

function addBookToLibrary(title, author, numPages, haveRead, library) { 
    const newBookID = self.crypto.randomUUID();
    const newBook = new Book(title, author, numPages, haveRead, newBookID);
    console.log(newBook.haveRead)
    library.push(newBook);
    displayBooks();
    console.log(library)
}

function displayAddBookForm() { 
    const bookAddContainer = document.querySelector('#book_add_container')

    const bookForm = document.createElement('form')
    bookForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addBookToLibrary(
            document.querySelector('#title').value,
            document.querySelector('#author').value,
            document.querySelector('#num_pages').value,
            document.querySelector('#have_read').value,
            myLibrary
        )
        document.querySelector("#book_add_container").replaceChildren();
    });

    bookAddContainer.appendChild(bookForm)

    const titleLabel = document.createElement('label')
    titleLabel.textContent = "Title"
    titleLabel.setAttribute('for', 'title')
    bookForm.appendChild(titleLabel)

    const titleInput = document.createElement('input')
    titleInput.setAttribute('type', 'text')
    titleInput.setAttribute('id', 'title')
    titleInput.setAttribute('name', 'title')
    bookForm.appendChild(titleInput)

    const br1 = document.createElement('br')
    bookForm.appendChild(br1)

    const authorLabel = document.createElement('label')
    authorLabel.textContent = "Author"
    authorLabel.setAttribute('for', 'author')
    bookForm.appendChild(authorLabel)

    const authorInput = document.createElement('input')
    authorInput.setAttribute('type', 'text')
    authorInput.setAttribute('id', 'author')
    authorInput.setAttribute('name', 'author')
    bookForm.appendChild(authorInput)

    const br2 = document.createElement('br')
    bookForm.appendChild(br2)

    const numPagesLabel = document.createElement('label')
    numPagesLabel.textContent = "Number of Pages"
    numPagesLabel.setAttribute('for', 'num_pages')
    bookForm.appendChild(numPagesLabel)

    const numPagesInput = document.createElement('input')
    numPagesInput.setAttribute('type', 'text')
    numPagesInput.setAttribute('id', 'num_pages')
    numPagesInput.setAttribute('name', 'num_pages')
    bookForm.appendChild(numPagesInput)

    const br3 = document.createElement('br')
    bookForm.appendChild(br3)

    const haveReadLabel = document.createElement('label')
    haveReadLabel.textContent = "Have Read"
    haveReadLabel.setAttribute('for', 'have_read')
    bookForm.appendChild(haveReadLabel)

    const haveReadInput = document.createElement('input')
    haveReadInput.setAttribute('type', 'text')
    haveReadInput.setAttribute('id', 'have_read')
    numPagesInput.setAttribute('name', 'have_read')
    bookForm.appendChild(haveReadInput)

    const br4 = document.createElement('br')
    bookForm.appendChild(br4)

    const inputButton = document.createElement('input')
    inputButton.setAttribute('type', 'submit')
    bookForm.appendChild(inputButton)

}

function displayBook(Book) { 
    const bookContainer = document.querySelector('#book_container');

    // add book content to "card"
    const book = document.createElement('div')
    book.classList.add("book")
    book.setAttribute('data-id', Book.ID)

    const title = document.createElement('h3')
    title.textContent = Book.title
    book.appendChild(title)

    const author = document.createElement('p')
    author.textContent = Book.author
    book.appendChild(author)

    const numPages = document.createElement('p')
    numPages.textContent = Book.numPages + " pages"
    book.appendChild(numPages)

    const haveRead = document.createElement('p')
    if (Book.haveRead.toLowerCase() == 'read') {
        haveRead.textContent = "You have read this"
    } else {
        haveRead.textContent = "You have not read this"
    }
    book.appendChild(haveRead)

    // add a button that can change the value of haveRead
    const changeHaveRead = document.createElement('button');
    changeHaveRead.textContent = "Change Read Status";
    changeHaveRead.addEventListener('click', () => {
        Book.changeHaveRead();
        displayBooks();
    })
    book.appendChild(changeHaveRead);

    // add a button that can delete the book
    const deleteBook = document.createElement('button');
    deleteBook.textContent = "Delete Book";
    deleteBook.addEventListener('click', () => {
        myLibrary.splice(myLibrary.findIndex(Book => Book.ID === book.dataset.id), 1)
        displayBooks();
    })
    book.appendChild(deleteBook);

    bookContainer.appendChild(book)
}

function displayBooks() {
    document.querySelector("#book_container").replaceChildren()
    myLibrary.map(displayBook);
}

const addBook = document.querySelector('#add_book')
addBook.addEventListener('click', () => {
    if (document.querySelector("#book_add_container").firstChild) {
        document.querySelector("#book_add_container").replaceChildren()
    }
    displayAddBookForm();
    

})

const displayLibraryBooks = document.querySelector("#display_library_books")
displayLibraryBooks.addEventListener('click', displayBooks)
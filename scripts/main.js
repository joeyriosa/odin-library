const myLibrary = [];

class Book {
    constructor(title, author, pages, isRead)
    {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead || false;
    }

    setReadStatus(isReadValue) {
        this.isRead = isReadValue;
    }
}

// Book.prototype.setReadStatus = function(isReadValue) {
//     this.isRead = isReadValue;
// }

function addBookToLibrary() {
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;

    const newBook = new Book(author, title, pages, isRead);
    myLibrary.push(newBook);
    displayBooks();
}

function deleteBook(index) {
    if (!isNaN(index)) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

function displayBooks() {
    const tableBody = document.getElementById('arrayTableBody');
    tableBody.innerHTML = '';

    myLibrary.forEach(function(book, index) {
        const row = tableBody.insertRow();
        const titleCell = row.insertCell(0);
        const authorCell = row.insertCell(1);
        const pagesCell = row.insertCell(2);
        const isReadCell = row.insertCell(3);
        const deleteCell = row.insertCell(4);
        titleCell.textContent = book.title;
        authorCell.textContent = book.author;
        pagesCell.textContent = book.pages.toLocaleString();

        //isReadCell.textContent = book.isRead;
        // Create check box for isRead column.
        const isReadCheckbox = document.createElement('input');
        isReadCheckbox.type = 'checkbox';
        isReadCheckbox.checked = book.isRead;
        isReadCheckbox.addEventListener('change', function() {
            book.setReadStatus(isReadCheckbox.checked);
        });
        isReadCell.appendChild(isReadCheckbox);
        
        // Create Delete button
        var deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute('data-index', index); // Set an attribute to save the index to be used in delete.
        deleteButton.className = "delete-button";

        deleteButton.addEventListener('click', function() {
            let indexToDelete = parseInt(deleteButton.getAttribute('data-index'));
            deleteBook(indexToDelete);
        });

        deleteCell.appendChild(deleteButton);
    });
}

displayBooks();

document.addEventListener('DOMContentLoaded', function() {
    const btnAddBook = document.getElementById('btnAddBook');
    const btnSave = document.getElementById('btnSave');
    const btnClose = document.getElementById('btnClose');
    const dialog = document.getElementById('dialog');
    const bookForm = document.getElementById('book-form');
    const titleInput = document.getElementById('title');

    btnAddBook.addEventListener('click', () => {
        bookForm.reset();
        dialog.showModal();
        // Just running focus didn't work. Autofocus attribute also did not work as expected.
        // Set a timeout to ensure that the elements are loaded before setting focus.
        setTimeout(function() {
            titleInput.focus();
          }, 100);
        
    });

    btnClose.addEventListener('click', (e) => {
        e.preventDefault();
        dialog.close();
    })

    btnSave.addEventListener('click', (e) => {
        if (bookForm.checkValidity()) {
            addBookToLibrary();
            e.preventDefault();
            dialog.close();
        }
    });
});

const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary() {
    // do stuff here.
}

const book1 = new Book('To Kill a Mocking Bird', 'Harper Lee', 1000, true);
const book2 = new Book('1984', 'George Orwell', 800, false);
myLibrary.push(book1);
myLibrary.push(book2);

console.log(myLibrary);

function displayBooks() {
    const tableBody = document.getElementById('arrayTableBody');
    tableBody.innerHTML = '';

    myLibrary.forEach(function(book) {
        const row = tableBody.insertRow();
        const titleCell = row.insertCell(0);
        const authorCell = row.insertCell(1);
        const pagesCell = row.insertCell(2);
        const isReadCell = row.insertCell(3);
        titleCell.textContent = book.title;
        authorCell.textContent = book.author;
        pagesCell.textContent = book.pages;
        isReadCell.textContent = book.isRead;
    })
}

displayBooks();
const theLibraryTable = document.querySelector("#library-items");
const dataEntry = document.querySelector('#library-input');
const bookTitle = document.querySelector('[name=title]');
const bookAuthor = document.querySelector('[name=author]');
const bookPages = document.querySelector('[name=pages]');
const bookRead = document.querySelector('[name=read]');

const errorTitle = document.querySelector("#title + span.error");
const errorAuthor = document.querySelector("#author + span.error");
const errorPages = document.querySelector("#pages + span.error");

let library = [];

function deleteItem(i) {
    let elementDelete = document.getElementById(`${i}`);
    elementDelete.remove();
    library.splice(i, 1);
    populateTable(library, theLibraryTable);
}

function changeTick(i) {
    library[i].changeReadStatus();
    populateTable(library, theLibraryTable);
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    changeReadStatus() {
        this.read = this.read !== true;
    }
}


function addNewBook() {
    const htmlRegex = /(<([^>]+)>)/ig;
    const linkRegex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)/g
    if (bookTitle.value.match(htmlRegex) ||
        bookAuthor.value.match(htmlRegex) ||
        bookPages.value.match(htmlRegex) ||
        bookTitle.value.match(linkRegex) ||
        bookAuthor.value.match(linkRegex) ||
        bookPages.value.match(linkRegex)) {
        alert("Don't even try!");
    } else {
        const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);
        library.push(newBook);
        populateTable(library, theLibraryTable);
        bookTitle.value = "";
        bookAuthor.value = "";
        bookPages.value = "";
        bookRead.checked = false;
    }

}

function populateTable(library = [], theLibraryTable) {
    let str = `<tr id="header">
            <th class="header-item" id="id-header">#</th>
            <th class="header-item left" id="title-header">Title</th>
            <th class="header-item left" id="author-header">Author</th>
            <th class="header-item" id="pages-header">Pages</th>
            <th class="header-item" id="read-status-header">Read?</th>
            <th class="header-item" id="remove-header">Remove</th>
        </tr>`
    for (let i = 0; i < library.length; i++) {
        if (library[i].read === true) {
            str += `
            <tr id=${i}>
            <td class="table-item">${i + 1}</td>
            <td class="table-item left">${library[i].title}</td>
            <td class="table-item left">${library[i].author}</td>
            <td class="table-item">${library[i].pages}</td>
            <td class="table-item"><input onclick="changeTick(${i})" type="checkbox" checked></td>
            <td class="table-item"><button onclick="deleteItem(${i})"><img class="delete" src="resources/trash-can-outline.svg" alt="delete-icon"></button></td>
            </tr>
        `;
        } else {
            str += `
            <tr id=${i}>
            <td class="table-item">${i + 1}</td>
            <td class="table-item left">${library[i].title}</td>
            <td class="table-item left">${library[i].author}</td>
            <td class="table-item">${library[i].pages}</td>
            <td class="table-item"><input onclick="changeTick(${i})" type="checkbox"></td>
            <td class="table-item"><button onclick="deleteItem(${i})"><img class="delete" src="resources/trash-can-outline.svg" alt="delete-icon"></button></td>
            </tr>
        `;
        }
    }
    theLibraryTable.innerHTML = str;
}


bookTitle.addEventListener("input", () => {
    if (bookTitle.validity.valid) {
        errorTitle.textContent = "";
        errorTitle.className = "error";
    } else {
        titleError();
    }
});

bookAuthor.addEventListener("input", () => {
    if (bookAuthor.validity.valid) {
        errorAuthor.textContent = "";
        errorAuthor.className = "error";
    } else {
        authorError();
    }
});

bookPages.addEventListener("input", () => {
    if (bookPages.validity.valid) {
        errorPages.textContent = "";
        errorPages.className = "error";
    } else {
        pagesError();
    }
});

dataEntry.addEventListener("submit", (event) => {
    if (!bookTitle.validity.valid) {
        titleError();
        event.preventDefault();
    } else if (!bookAuthor.validity.valid) {
        authorError();
        event.preventDefault();
    } else if (!bookPages.validity.valid) {
        pagesError();
        event.preventDefault();
    } else {
        event.preventDefault();
        addNewBook();
    }
});

function titleError() {
    if (bookTitle.validity.valueMissing) {
        errorTitle.textContent = "You need to populate this field.";
    }
    errorTitle.className = "error active";
}

function authorError() {
    if (bookAuthor.validity.valueMissing) {
        errorAuthor.textContent = "You need to populate this field.";
    }
    errorAuthor.className = "error active";
}

function pagesError() {
    if (bookPages.validity.valueMissing) {
        errorPages.textContent = "You need to populate this field.";
    }
    errorPages.className = "error active";
}


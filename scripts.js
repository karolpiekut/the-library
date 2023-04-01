const theLibraryTable = document.querySelector("#library-items");
const dataEntry = document.querySelector('#library-input');
const deleteButton = document.querySelector('.delete-button');


let library = [
];


function deleteItem() {
    console.log("delete");
}
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}
function addNewBook(event) {
    event.preventDefault();
    const bookTitle = (this.querySelector('[name=title]')).value;
    const bookAuthor =  (this.querySelector('[name=author]')).value;
    const bookPages = (this.querySelector('[name=pages]')).value;
    const htmlRegex = /(<([^>]+)>)/ig;
    const linkRegex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)/g
    if (bookTitle === '' || bookAuthor === '' || bookPages === '') {
        alert("Please populate all input fields.");
    } else if (bookTitle.match(htmlRegex) ||
        bookAuthor.match(htmlRegex) ||
        bookPages.match(htmlRegex) ||
        bookTitle.match(linkRegex) ||
        bookAuthor.match(linkRegex) ||
        bookPages.match(linkRegex)) {
        alert("Please review your input.");
        this.reset();
    } else {
        const newBook = new Book(bookTitle, bookAuthor, bookPages);
        library.push(newBook);
        populateTable(library, theLibraryTable);
        this.reset();
    }
    console.table(library);
}

function populateTable(library = [], theLibraryTable) {
    let str = `<tr id="header">
            <th class="header-item" id="id-header">ID</th>
            <th class="header-item left" id="title-header">Title</th>
            <th class="header-item left" id="author-header">Author</th>
            <th class="header-item" id="pages-header">Pages</th>
            <th class="header-item" id="read-status-header">Status</th>
            <th class="header-item" id="remove-header">Remove</th>
        </tr>`
    for (let i = 0; i < library.length; i++) {
        str +=`
            <tr>
            <td class="table-item">1</td>
            <td class="table-item left">${library[i].title}</td>
            <td class="table-item left">${library[i].author}</td>
            <td class="table-item">${library[i].pages}</td>
            <td class="table-item">Read</td>
            <td class="table-item"><button onclick="deleteItem()"><img class="delete" src="./trash-can-outline.svg" alt="delete-icon"></button></td>
            </tr>
        `;
    }
    theLibraryTable.innerHTML = str;
}



dataEntry.addEventListener('submit', addNewBook);

//turn read status into a button that will change the color of the td cell depending on whether it has been read or not
//figure out delete function how to get IDs correctly populated
//figure our how to get th ID with increments


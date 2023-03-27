const theLibraryTable = document.querySelector("#library-items");
const dataEntry = document.querySelector('#library-input');

let library = [
];
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

    if (bookTitle === '' || bookAuthor === '' || bookPages === '') {
        alert("Please populate all input fields.")
    } else {
        const newBook = new Book(bookTitle, bookAuthor, bookPages);
        library.push(newBook);
        populateTable(library, theLibraryTable);
        this.reset();
    }
    console.table(library);
}

function populateTable(library = [], theLibraryTable) {
    theLibraryTable.innerHTML += library.map((book, i) => {
        return `
            <tr>
            <td class="table-item">1</td>
            <td class="table-item left">${library[i].title}</td>
            <td class="table-item left">${library[i].author}</td>
            <td class="table-item">${library[i].pages}</td>
            <td class="table-item">Read</td>
            <td class="table-item"><img class="delete" src="./trash-can-outline.svg" alt="delete-icon"></td>
            </tr>
        `;
    }).join('');

}
/*
    for (let i = 0; i < library.length; i++) {
        theLibraryTable.innerHTML = `
            <td class="table-item">1</td>
            <td class="table-item left">${library[i].title}</td>
            <td class="table-item left">${library[i].author}</td>
            <td class="table-item">${library[i].pages}</td>
            <td class="table-item">Read</td>
            <td class="table-item"><img class="delete" src="./trash-can-outline.svg" alt="delete-icon"></td>
        `;
    }/*
}
*/

dataEntry.addEventListener('submit', addNewBook);




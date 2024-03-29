
    const theLibraryTable = document.querySelector("#library-items");
    const dataEntry = document.querySelector('#library-input');

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

    function addNewBook(event) {
        event.preventDefault();
        const bookTitle = (this.querySelector('[name=title]')).value;
        const bookAuthor = (this.querySelector('[name=author]')).value;
        const bookPages = (this.querySelector('[name=pages]')).value;
        const bookRead = (this.querySelector('[name=read]')).checked;
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
            const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
            library.push(newBook);
            populateTable(library, theLibraryTable);
            this.reset();
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



    dataEntry.addEventListener('submit', addNewBook);

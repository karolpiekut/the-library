let library = [
];

/*
1. get objects to show as html table items
2. get event listeners sorted
3. get form so create object items
4. object functions
 */

function Book(id, title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}



const theLibraryTable = document.querySelector("#library-items");
const dataEntry = document.querySelector('#data-entry');

function createTableRow() {
    const newNode = document.createElement("tr");
    const newTDid = newNode.appendChild(document.createElement("td"));
    const newTDTitle = newNode.appendChild(document.createElement("td"));
    const newTDAuthor = newNode.appendChild(document.createElement("td"));
    const newTDPages = newNode.appendChild(document.createElement("td"));
    const newTDStatus = newNode.appendChild(document.createElement("td"));
    const newTDRemove = newNode.appendChild(document.createElement("td"));
    let objectID = document.createTextNode(library[0].id);
    let objectTitle = document.createTextNode(library[0].title);
    let objectAuthor = document.createTextNode(library[0].author);
    let objectPages = document.createTextNode(library[0].pages);
    let objectStatus = document.createTextNode(library[0].readStatus);


    newTDid.appendChild(objectID);
    newTDTitle.appendChild(objectTitle);
    newTDAuthor.appendChild(objectAuthor);
    newTDPages.appendChild(objectPages);
    newTDStatus.appendChild(objectStatus);
    theLibraryTable.appendChild(newNode);
}

function addNewBook(e) {
    e.preventDefault()
    const newBook = new Book(
        this.querySelector('[name=title]').value,
        this.querySelector('[name=author]').value,
        this.querySelector('[name=pages]').value,
        this.querySelector('[name=read-status]').value
        )
    library.push(newBook);
    //this.reset();
    console.table(library);
}

/*
function populateTable() {

}
*/


dataEntry.addEventListener('submit', addNewBook);

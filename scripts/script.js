let myLibrary = []

// Book object and helper method
function Book(title, author, read) {
  this.title = title
  this.author = author
  this.read = read
}

function saveLibrary() {
  if (local) {
    toSave = []
    myLibrary.forEach((book, i) => {
      toSave[i] = [book.title, book.author, book.read]
    })
    console.log(toSave)
    localStorage.setItem('myLibrary', JSON.stringify(toSave))
  }
}


function addBookToLibrary(book) {
  myLibrary.push(book)
  saveLibrary();
}

// displaying the library
const books = document.getElementById('books')

function changeStatus(e) {
  i = parseInt(e.target.classList[0].substring(4))
  myLibrary[i].read = !myLibrary[i].read
  saveLibrary();
  displayLibrary()
}

function removeBook(e) {
  myLibrary.splice(parseInt(e.target.classList[0].substring(4)), 1)
  saveLibrary();
  displayLibrary()
}

function displayLibrary(){
  while(books.firstChild) {
    books.removeChild(books.lastChild)
  }

  myLibrary.forEach((book, i) => {
    let row = books.insertRow()

    let title = row.insertCell()
    title.appendChild(document.createTextNode(book.title))

    let author = row.insertCell()
    author.appendChild(document.createTextNode(book.author))

    let read = row.insertCell()
    let a = document.createElement('a')
    a.textContent = book.read? 'read' : 'not read'
    a.classList.add(`book${i}`, book.read? 'read' : 'not-read')
    a.addEventListener('click', changeStatus)
    read.appendChild(a)

    let remove = row.insertCell()
    btn = document.createElement('button')
    btn.classList.add(`book${i}`, 'remove')
    btn.textContent = 'Remove'
    btn.addEventListener('click', removeBook)
    remove.appendChild(btn)
  })
}

// show, hide and submit the form
const form = document.getElementById('form')
function showForm() {
  form.classList.remove('none')
}

const closeButton = document.getElementById('close')
function closeForm(e) {
  e.preventDefault()
  form.classList.add('none')
}
closeButton.addEventListener('click', closeForm)

const form1 = document.getElementById('form1')
function newBook(e) {
  e.preventDefault()

  addBookToLibrary(new Book(form1.elements[0].value, form1.elements[1].value, form1.elements[2].checked))
  displayLibrary()
  form1.reset()
  form.classList.add('none')
}
form1.addEventListener('submit', newBook)

// localStorage set up
function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

local = storageAvailable('localStorage');

// initialize
function initialize() {
  if (local && localStorage.getItem('myLibrary')) {
    saved = JSON.parse(localStorage.getItem('myLibrary'))
    saved.forEach( book => {
      myLibrary.push(new Book(book[0], book[1], book[2]))
    })
  }
  displayLibrary()
}

initialize()

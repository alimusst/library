const storageKey = 'STORAGE_KEY';
let myLibrary = [];

document.addEventListener('DOMContentLoaded', () => {
  addBookToLibrary();
});

class Book {
  constructor(title, author, years, pages, read, id) {
    this.title = title;
    this.author = author;
    this.years = years;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }
}

function addBookToLibrary() {
  const bookForm = document.querySelector('form');
  const newBookButton = document.querySelector('.new-book-button');
  newBookButton.addEventListener('click', () => {
    bookForm.classList.toggle('form-display');
  });

  if (localStorage.getItem(storageKey) === null) {
    myLibrary = [];
  } else {
    myLibrary = JSON.parse(localStorage.getItem(storageKey));
  }

  const submitButton = document.querySelector('.submit-form');
  submitButton.addEventListener('click', () => {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let years = document.getElementById('years').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;
    const id = Number(new Date());

    const book = new Book(title, author, years, pages, read, id);
    myLibrary.push(book);

    bookForm.classList.remove('form-display');
    makeBookElements(book);
    localStorage.setItem(storageKey, JSON.stringify(myLibrary));

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('years').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
  });

  const cancelButton = document.querySelector('.cancel-form');
  cancelButton.addEventListener('click', () => {
    bookForm.removeAttribute('class');
  });

  displayTheBook();
}

function makeBookElements(book) {
  const container = document.getElementById('container');
  const card = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const years = document.createElement('p');
  const pages = document.createElement('p');
  const remove = document.createElement('button');
  const read = document.createElement('button');

  card.classList.add('card');
  card['bookId'] = book.id;
  const bookIndex = myLibrary.indexOf(book);
  card.setAttribute('data-index-number', `${bookIndex}`);
  remove.classList.add('remove-button');
  read.classList.add('read-button');

  title.textContent = `Judul Buku ${book.title}`;
  author.textContent = `Penulis Buku ${book.author}`;
  years.textContent = `Tahun Diterbitkan ${book.years}`;
  pages.textContent = `Jumlah Halaman ${book.pages}`;

  if (book.read) {
    card.style.border = '1px solid green';
    read.textContent = 'Belum selesai';
  } else {
    card.style.border = '1px solid red';
    read.textContent = 'Sudah selesai';
  }

  remove.textContent = 'Hapus';

  card.append(title, author, years, pages, remove, read);
  container.appendChild(card);
  removeTheBook(card);
  changeReadStatus(card);
}

function removeTheBook(book) {
  const removeButtton = book.querySelector('.remove-button');
  removeButtton.addEventListener('click', () => {
    const [tests] = myLibrary.filter((test) => book['bookId'] === test.id);
    const bookIndex = myLibrary.indexOf(tests);
    myLibrary.splice(bookIndex, 1);
    book.remove();
    localStorage.setItem(storageKey, JSON.stringify(myLibrary));
  });
}

function changeReadStatus(book) {
  const readButton = book.querySelector('.read-button');
  readButton.addEventListener('click', (e) => {
    const [tests] = myLibrary.filter((test) => book['bookId'] === test.id);
    const readStatus = tests.read;
    const bookIndex = myLibrary.indexOf(tests);
    if (readStatus) {
      book.style.border = '1px solid red';
      e.target.textContent = 'Sudah selesai';
      myLibrary[bookIndex].read = false;
    } else {
      book.style.border = '1px solid green';
      e.target.textContent = 'Belum selesai';
      myLibrary[bookIndex].read = true;
    }
    localStorage.setItem(storageKey, JSON.stringify(myLibrary));
  });
}

function displayTheBook() {
  for (let i = 0; i < myLibrary.length; i++) {
    makeBookElements(myLibrary[i]);
  }
}

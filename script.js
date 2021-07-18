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
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const years = document.getElementById('years').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    const id = Number(new Date());

    const book = new Book(title, author, years, pages, read, id);
    myLibrary.push(book);

    bookForm.classList.remove('form-display');
    kerangkaElemenBuku(book);
    localStorage.setItem(storageKey, JSON.stringify(myLibrary));
  });

  const cancelButton = document.querySelector('.cancel-form');
  cancelButton.addEventListener('click', () => {
    bookForm.removeAttribute('class');
  });

  displayTheBook();
}

function kerangkaElemenBuku(buku) {
  const container = document.getElementById('container');
  const card = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const year = document.createElement('p');
  const pages = document.createElement('p');
  const remove = document.createElement('button');
  const read = document.createElement('button');

  card.classList.add('card');
  card['bookId'] = buku.id;
  const bookIndex = myLibrary.indexOf(buku);
  card.setAttribute('data-index-number', `${bookIndex}`);
  remove.classList.add('remove-button');
  read.classList.add('read-button');

  title.textContent = `Judul Buku ${buku.title}`;
  author.textContent = `Penulis Buku ${buku.author}`;
  year.textContent = `Tahun Diterbitkan ${buku.year}`;
  pages.textContent = `Jumlah Halaman ${buku.pages}`;

  if (buku.read) {
    card.style.border = '1px solid green';
    read.textContent = 'Belum selesai';
  } else {
    card.style.border = '1px solid red';
    read.textContent = 'Sudah selesai';
  }

  remove.textContent = 'Hapus';

  card.append(title, author, year, pages, remove, read);
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
    kerangkaElemenBuku(myLibrary[i]);
  }
}

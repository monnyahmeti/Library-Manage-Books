let library = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  library.push(newBook);
  displayLibrary();
}

function displayLibrary() {
  const container = document.querySelector('#container');
  container.textContent = '';

  library.forEach((book, index) => {
    const bookPanel = document.createElement('div');
    bookPanel.classList.add('book');
    bookPanel.dataset.index = index;
    container.appendChild(bookPanel);

    const titleText = document.createElement('h3');
    titleText.textContent = book.title;
    bookPanel.appendChild(titleText);

    const authorText = document.createElement('p');
    authorText.textContent = "by " + book.author;
    bookPanel.appendChild(authorText);

    const pagesText = document.createElement('p');
    pagesText.textContent = book.pages + " pages";
    bookPanel.appendChild(pagesText);

    const readToggle = document.createElement('button');
    readToggle.textContent = book.read ? "Read" : "Unread";
    readToggle.classList.add(book.read ? "read" : "unread");
    readToggle.addEventListener('click', handleReadButton);
    bookPanel.appendChild(readToggle);

    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.addEventListener('click', handleRemove);
    bookPanel.appendChild(removeButton);
  })
}

function createBookForm() {
  const formDiv = document.querySelector("#form-container");
  
  const formTag = document.createElement('form');
  formTag.id = "form";
  formTag.name = "form";
  formDiv.appendChild(formTag);

  function appendInput(type, id, labelText) {
    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = labelText;
    formTag.appendChild(label);
  
    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.name = id;
    if (type !== "checkbox") {
      input.required = true;
    };
    formTag.appendChild(input);

    const br = document.createElement('br');
    formTag.appendChild(br);
  }

  appendInput("text", "new-book-title", "Title:", "Holy Bible");
  appendInput("text", "new-book-author", "Author:", "God");
  appendInput("number", "new-book-pages", "# of pages:", "9999");
  appendInput("checkbox", "new-book-read", "I've read this book");

  const submit = document.createElement('button');
  submit.id = 'submit';
  submit.textContent = 'Submit';
  submit.addEventListener('click', handleFormSubmit);
  formTag.appendChild(submit);

  const newBookButton = document.querySelector("#new-book");
  newBookButton.removeEventListener('click', createBookForm);
  newBookButton.textContent = "Close Menu";
  newBookButton.id = "close-menu";

  const closeMenuButton = document.querySelector('#close-menu');
  closeMenuButton.addEventListener('click', closeMenu);
}

function closeMenu() {
  const formDiv = document.querySelector("#form-container");
  formDiv.textContent = '';

  const closeMenuButton = document.querySelector('#close-menu');
  closeMenuButton.removeEventListener('click', closeMenu);
  closeMenuButton.textContent = "New Book";
  closeMenuButton.id = "new-book";

  const newBookButton = document.querySelector("#new-book");
  newBookButton.addEventListener('click', createBookForm);
}

function handleFormSubmit(event) {
  const form = document.getElementById('form');
  event.preventDefault();
  
  if (!form.checkValidity()) {
    if (!document.querySelector('#msg')) {
      const msg = document.createElement('p')
      msg.textContent = 'Please fill out all fields';
      msg.id = 'msg';
      form.appendChild(msg);
    }
  } else {
    let formData = new FormData(form).entries();
    let title, author, pages, read;

    for (let entry of formData) {
      switch (entry[0]) {
        case "new-book-title":
          title = entry[1];
          break;
        case "new-book-author":
          author = entry[1];
          break;
        case "new-book-pages":
          pages = entry[1];
          break;
        case "new-book-read":
          read = true;
      }
    }

    if (read !== true) read === false;

    addBookToLibrary(title, author, pages, read);

    function clearInput(id) {
      const input = document.getElementById(id);
      input.value = '';
    }

    clearInput("new-book-title");
    clearInput("new-book-author");
    clearInput("new-book-pages");

    if (document.querySelector('#msg')) {
      document.getElementById('msg').remove();
    }
  }
}

function handleReadButton(event) {
  const button = event.target;
  const libraryIndex = button.parentElement.dataset.index;

  if (button.classList[0] === "read") {
    button.classList.remove("read")
    button.classList.add("unread")
    button.textContent = "Unread"
    library[libraryIndex].read = false;
  } else {
    button.classList.remove("unread")
    button.classList.add("read")
    button.textContent = "Read"
    library[libraryIndex].read = true;
  }
}

function handleRemove(event) {
  const button = event.target;
  const libraryIndex = button.parentElement.dataset.index;

  library.splice(libraryIndex, 1);

  displayLibrary();
}

function onload() {
  const newBookButton = document.querySelector('#new-book');
  newBookButton.addEventListener('click', createBookForm);

  displayLibrary();
}

document.addEventListener("DOMContentLoaded", onload);
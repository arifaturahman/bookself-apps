const UNREAD_LIST_BOOK = "incompleteBookshelfList";
const READ_LIST_BOOK = "completeBookshelfList";
const BOOK_ID = "bookId";

function getClick() {
  const checkedBox = document.getElementById("inputBookIsComplete");
  const buttonText = document.getElementById("bookSubmit");
  const text = buttonText.childNodes[1];

  if (checkedBox.checked == true) {
    text.innerText = "Selesai dibaca";
  } else {
    text.innerText = "Belum selesai dibaca";
  }
}

function addBook() {
  const unreadBooklist = document.getElementById(UNREAD_LIST_BOOK);
  const readBooklist = document.getElementById(READ_LIST_BOOK);

  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const isComplete = document.getElementById("inputBookIsComplete").checked;

  const listBook = makeList(title, author, year, isComplete);
  const bookList = composeBookList(title, author, year, isComplete);

  listBook[BOOK_ID] = bookList.id;
  bookIdentity.push(bookList);
  updateStorage();

  if (isComplete == true) {
    readBooklist.append(listBook);
  } else if (isComplete == false) {
    unreadBooklist.append(listBook);
  }
}

function makeList(bookTitle, bookAuthor, bookYear, isComplete) {
  const title = document.createElement("h3");
  title.innerText = bookTitle;

  const author = document.createElement("p");
  author.innerText = bookAuthor;

  const year = document.createElement("p");
  year.innerText = bookYear;

  const buttonComplete = document.createElement("button");
  buttonComplete.classList.add("green");
  if (isComplete == false) {
    buttonComplete.innerText = "Selesai dibaca";
    buttonComplete.addEventListener("click", function (event) {
      addListComplete(event.target.parentElement.parentElement);
    });
  } else if (isComplete == true) {
    buttonComplete.innerText = "Belum selesai dibaca";
    buttonComplete.addEventListener("click", function (event) {
      undoReadbook(event.target.parentElement.parentElement);
    });
  }

  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("red");
  buttonDelete.innerText = "Hapus buku";
  buttonDelete.addEventListener("click", function (event) {
    removeBook(event.target.parentElement.parentElement);
  });

  const container = document.createElement("div");
  container.classList.add("action");
  container.append(buttonComplete, buttonDelete);

  const card = document.createElement("article");
  card.classList.add("book_item");
  card.append(title, author, year, container);

  return card;
}

function addListComplete(book) {
  const listReadbookComplete = document.getElementById(READ_LIST_BOOK);
  const bookTitle = book.querySelector(".book_item > h3").innerText;
  const bookAuthor = book.querySelector(".book_item > p").innerText;
  const year = book.getElementsByTagName("p");
  const bookYear = year[1].innerText;

  const newList = makeList(bookTitle, bookAuthor, bookYear, true);

  const bookElement = findBook(book[BOOK_ID]);
  bookElement.isComplete = true;
  newList[BOOK_ID] = bookElement.id;

  listReadbookComplete.append(newList);
  book.remove();

  updateStorage();
}

function removeBook(book) {
  const bookPosition = bookIndex(book[BOOK_ID]);
  bookIdentity.splice(bookPosition, 1);

  book.remove();
  updateStorage();
}

function undoReadbook(book) {
  const unlistReadbookComplete = document.getElementById(UNREAD_LIST_BOOK);
  const bookTitle = book.querySelector(".book_item > h3").innerText;
  const bookAuthor = book.querySelector(".book_item > p").innerText;
  const year = book.getElementsByTagName("p");
  const bookYear = year[1].innerText;

  const newList = makeList(bookTitle, bookAuthor, bookYear, false);

  const bookElement = findBook(book[BOOK_ID]);
  bookElement.isComplete = false;
  newList[BOOK_ID] = bookElement.id;

  unlistReadbookComplete.append(newList);
  book.remove();

  updateStorage();
}

function searchBook(list) {
  const unreadBooklist = document.getElementById(UNREAD_LIST_BOOK);
  const readBooklist = document.getElementById(READ_LIST_BOOK);

  const title = list.target.value.toLowerCase();
  const buttonSubmit = document.getElementById("searchSubmit");
  const listBook = document.getElementById("book_shelf");

  buttonSubmit.addEventListener("click", function () {
    listBook.forEach((element) => {
      const book = element.textContent.toLowerCase();

      if (book.indexOf(title) != -1) {
        element.setAttribute("style", "display: block;");
      } else {
        element.setAttribute("style", "display: none !important");
      }
    });
  });
}

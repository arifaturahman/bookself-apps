const storageKey = "STORAGE_KEY";

let bookIdentity = [];

function checkStorage() {
  return typeof Storage !== "undefined";
}

function saveBook() {
  const book = JSON.stringify(bookIdentity);
  localStorage.setItem(storageKey, book);
  document.dispatchEvent(new Event("datasaved"));
}

function loadStorage() {
  const data = localStorage.getItem(storageKey);

  let dataList = JSON.parse(data);

  if (dataList !== null) {
    bookIdentity = dataList;
  }
  document.dispatchEvent(new Event("dataloaded"));
}

function updateStorage() {
  if (checkStorage()) {
    saveBook();
  }
}

function composeBookList(title, author, year, isComplete) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
  };
}

function findBook(bookId) {
  for (book of bookIdentity) {
    if (book.id === bookId) {
      return book;
    }
  }
  return null;
}

function bookIndex(bookId) {
  let index = 0;
  for (book of bookIdentity) {
    if (book.id === bookId) {
      return index;
    }
    index++;
  }
  return -1;
}

function dataFromStorage() {
  const unreadBook = document.getElementById(UNREAD_LIST_BOOK);
  const readBook = document.getElementById(READ_LIST_BOOK);

  for (book of bookIdentity) {
    const newList = makeList(book.title, book.author, book.year, book.isComplete);
    newList[BOOK_ID] = book.id;

    if (book.isComplete) {
      readBook.append(newList);
    } else {
      unreadBook.append(newList);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const submit = document.getElementById("inputBook");

  submit.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  if (checkStorage()) {
    loadStorage();
  }
});

document.addEventListener("datasaved", () => {
  console.log("Data berhasil disimpan");
});

document.addEventListener("dataloaded", () => {
  dataFromStorage();
});

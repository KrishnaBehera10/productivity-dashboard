function main() {
  const elem = document.querySelectorAll(".elem");
  const fullElement = document.querySelectorAll(".full-element");
  const closeBtn = document.querySelectorAll(".back");

  elem.forEach((element) => {
    element.addEventListener("click", function () {
      fullElement[element.id].style.display = "block";
    });
  });

  closeBtn.forEach((data, index) => {
    data.addEventListener("click", function () {
      fullElement[index].style.display = "none";
    });
  });
}
main();

function Todolist() {
  const index = document.querySelectorAll("input");
  const form = document.querySelector("form");
  const showError = document.querySelectorAll("error-show");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const error = {};

    const task = index[0].value.trim();
    const details = index[1].value.trim();

    if (!task) {
      showError.style.display = "block";
    }
  });
}
Todolist();

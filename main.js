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
  const input = document.querySelectorAll(".input");
  const form = document.querySelector("form");
  const showError = document.querySelectorAll(".error-show");
  const allTask = document.querySelector(".alltask");
  let arr = JSON.parse(localStorage.getItem("todo")) || [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    showError.forEach((el) => {
      el.style.display = "none";
      el.textContent = "";
    });

    const task = input[0].value.trim();
    const details = input[1].value.trim();
    const check = input[2].checked;

    let istrue = false;

    if (!task) {
      showError[0].style.display = "block";
      showError[0].textContent = "kindly enter task";
      istrue = true;
    }
    if (!details) {
      showError[1].style.display = "block";
      showError[1].textContent = "kindly enter details";
      istrue = true;
    }

    if (istrue) return;

    arr.push({ id: crypto.randomUUID(), task, details, check });
    update(arr);
    showTodo(arr);
    form.reset();
  });

  function showTodo(arr) {
    allTask.innerHTML = "";
    const fragement = document.createDocumentFragment();

    arr.forEach((data, index) => {
      const card_container = document.createElement("div");
      card_container.classList.add("card-container");

      const card = document.createElement("div");
      card.classList.add("card");

      const h1 = document.createElement("h1");
      h1.textContent = data.task;
      const p = document.createElement("p");
      p.textContent = data.details;

      if (data.check) {
        const span = document.createElement("span");
        span.classList.add("istrue");
        span.textContent = `${data.check && "imp"}`;

        h1.appendChild(span);
      }

      const button = document.createElement("button");
      button.classList.add("mark");
      button.textContent = "mark";

      button.addEventListener("click", () => {
        arr.splice(index, 1);
        update(arr);
        showTodo(arr);
      });

      card_container.appendChild(h1);
      card_container.appendChild(p);

      card.append(card_container);
      card.append(button);
      fragement.append(card);
    });

    allTask.append(fragement);

    update(arr);
  }

  function update(arr) {
    localStorage.setItem("todo", JSON.stringify(arr));
  }

  showTodo(arr);
}
Todolist();

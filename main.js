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

function dailyplanner() {
  let hours = Array.from({ length: 18 }, (_, i) => {
    return `${6 + i}:00 - ${7 + i}:00`;
  });

  const dayplandata = JSON.parse(localStorage.getItem("dayplan")) || {};
  const dailyPlanner = document.querySelector(".daily-planner");

  let daily = "";

  hours.forEach((data, index) => {
    let value = dayplandata[index] || "";
    daily += `<div class="daily-planner-time">
            <p>${data}</p>
            <input id=${index} type="text" placeholder="..." value=${value}>
          </div>
`;
  });

  dailyPlanner.innerHTML = daily;
  const input = document.querySelectorAll(".daily-planner input");

  input.forEach((data) => {
    data.addEventListener("input", (e) => {
      dayplandata[data.id] = data.value;
      localStorage.setItem("dayplan", JSON.stringify(dayplandata));
    });
  });
}

dailyplanner();

function randomQuote() {
  async function fetchQuote() {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();

    const wrapper = document.querySelector(".motivation-wrapper");

    const h1 = document.createElement("h1");
    h1.textContent = data.quote;
    const p = document.createElement("p");
    p.textContent = data.author;

    const fragement = document.createElement("div");
    fragement.classList.add("motivation-2");

    fragement.append(h1);
    fragement.append(p);

    wrapper.append(fragement);
  }

  fetchQuote();
}

randomQuote();

function pomodoro() {
  let totalSeconds = 25 * 60;
  let timer = null;
  let running = false;

  const time = document.querySelector(".time");

  function updateTime() {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    time.textContent = `${minutes}:${seconds}`;
  }

  function startTimer() {
    if (running) return;
    running = true;
    document.querySelector(".work").textContent = "work session";
    document.querySelector(".work").style.backgroundColor = `var(--blue-color)`;
    timer = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTime();
      } else {
        clearInterval(timer);
        running = false;
        totalSeconds = 25 * 60;
        document.querySelector(".work").textContent = "break";
        document.querySelector(
          ".work"
        ).style.backgroundColor = `var(--green-color)`;
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timer);
    running = false;
  }

  function resetTimer() {
    clearInterval(timer);
    running = false;
    totalSeconds = 25 * 60;
    document.querySelector(".work").textContent = "work session";
    document.querySelector(".work").style.backgroundColor = `var(--blue-color)`;
    updateTime();
  }

  document.querySelector(".start-timer").addEventListener("click", startTimer);
  document.querySelector(".pause-timer").addEventListener("click", pauseTimer);
  document.querySelector(".reset-timer").addEventListener("click", resetTimer);

  updateTime();
}

pomodoro();

async function weatherAPI() {
  const key = "3791825581974257a5e62039250111";
  let city = "bhubaneswar";

  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
  );
  const data = await response.json();

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date();
  const Day = date.getDay();
  const Time = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  console.log(formatted);

  const header = document.querySelector("header");

  const oldWeather = header.querySelector(".weather-info");
  if (oldWeather) oldWeather.remove();

  const weather_info = document.createElement("div");
  weather_info.classList.add("weather-info");

  // location and day
  const locationandday = document.createElement("div");
  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");
  const span = document.createElement("span");

  const h = document.createElement("h1");

  h.textContent = formatted;

  h1.textContent = data.location.name + ", ";
  span.textContent = data.location.country;
  h1.append(span);

  const hour12 = Time % 12 || 12;
  const ampm = Time >= 12 ? "PM" : "AM";
  h2.textContent = `${weekday[Day]} ${hour12}:${minutes} ${ampm}`;

  locationandday.append(h, h1, h2);
  weather_info.append(locationandday);

  // temperature and icon
  const showtemp = document.createElement("div");
  const img = document.createElement("img");
  img.src = data.current.condition.icon;

  const h2temp = document.createElement("h2");
  h2temp.textContent = `${data.current.temp_c} °C`;

  const h2region = document.createElement("h2");
  h2region.textContent = data.location.region;

  showtemp.append(img, h2temp, h2region);
  weather_info.append(showtemp);

  header.append(weather_info);
}

setInterval(weatherAPI, 60000);
weatherAPI();

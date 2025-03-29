function loadLessons() {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
}

function displayLessons(lessons) {
  const lessonContainer = document.getElementById("lesson-container");

  for (let i of lessons) {
    const lessonDiv = document.createElement("div");

    lessonDiv.innerHTML = `
        <button id="btn-${i.level_no}" onclick="loadWords(${i.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i>
            Lesson -${i.level_no}
        </button>`;

    lessonContainer.appendChild(lessonDiv);
  }
}

let activeCheck = "";

function loadWords(id) {
  showLoader()
  url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const active = document.getElementById(`btn-${id}`);
      if (activeCheck !== "") {
        activeCheck.classList.add("btn-outline");
      }
      active.classList.remove("btn-outline");
      activeCheck = active;
      displayWords(data.data);
    });
}

function displayWords(words) {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
        <div class="grid place-items-center col-span-3 py-16 gap-5">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="bangla text-lg font-normal text-center opacity-80">
                এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <p class="bangla text-4xl font-medium text-center">
                নেক্সট Lesson এ যান
            </p>
          </div>

          </div>
        `;
    hideLoader()
    return;
  }
  for (let i of words) {
    const wordDiv = document.createElement("div");
    let meaning = i.meaning
    if (i.meaning===null){
      meaning = "অর্থ নেই";
    }
    wordDiv.innerHTML = `
          <div class="card bg-base-100 h-[420px] shadow-md p-14">
            <p class="text-center text-[32px] font-bold mb-6">${i.word}</p>
            <p class="text-center text-xl font-medium mb-6">Meaning /Pronounciation</p>
            <p class="text-center bangla text-[32px] font-semibold opacity-80">"${meaning} / ${i.pronunciation}"</p>
            <div class="h-full flex items-end">
                <div class="flex justify-between bottom-14 w-full">
                    <div id="word-${i.id}" onclick="loadDetails(${i.id})" class="bg-zinc-100 size-14 rounded-xl flex justify-center items-center">
                        <i class="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <div onclick="loadWordSpeak(${i.id})" class="bg-zinc-100 size-14 rounded-xl flex justify-center items-center">
                        <i class="fa-solid fa-volume-high"></i>
                    </div>
                </div>
            </div>
        </div>
        
        `;

    wordContainer.appendChild(wordDiv);
    hideLoader()
  }
}

function loadDetails(id) {
  console.log(id)
  url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data));
}

function displayDetails(data) {
  const popupContainer = document.getElementById("popup-container");
  synonyms = data.synonyms;
  console.log(synonyms);
  const details = document.createElement("div");
  let meaning = data.meaning
    if (data.meaning===null){
      meaning = "অর্থ পাওয়া যায়নি";
    }
  details.innerHTML = `
        <div
          class="fixed inset-0 bg-black/20 flex justify-center items-center"
        >
          <div class="card bg-base-100 shadow-xl p-12 w-[735px]">
            <p class="text-4xl font-semibold mb-8">${
              data.word
            } (<span><i class="fa-solid fa-microphone"></i></span>:${
    data.pronunciation
  })</p>
            <p class="text-xl font-semibold mb-[10px]">
              Meaning
            </p>
            <p class="bangla text-2xl font-medium opacity-80 mb-8">${
              meaning
            }</p>

            <p class="text-2xl font-semibold mb-2">
                Example
            </p>
            <p class="text-2xl font-normal opacity-80 mb-8">
                ${data.sentence}
            </p>

            <p class="bangla text-2xl font-semibold opacity-80 mb-4">
                সমার্থক শব্দ গুলো
            </p>
            <div class="flex gap-3">
                ${synonyms
                  .map(
                    (syn) =>
                      `<div class="bg-zinc-100 p-3 rounded-md">${syn}</div>`
                  )
                  .join("")}
            </div>
            
            <button onclick="closepop()" class="btn btn-primary rounded-lg w-[269px] mt-12">Complete Learning</button>
          </div>
        </div>
    `;
  popupContainer.appendChild(details);
}

function closepop() {
  const popup = document.getElementById("popup-container");
  popup.innerHTML = "";
}

function btnLogin() {
  const name = document.getElementById("name");
  const password = document.getElementById("password");
  const hero = document.getElementById("hero")
  const navbar = document.getElementById("navbar")
  const learnSection = document.getElementById("learn-section")
  const faqSection = document.getElementById("faq-section")
  if (name.value === "" || password.value === "") {
    alert("Please fill in all fields");
  }
  if (password.value != "123456") {
    alert("Incorrect Password")
  }
  if (password.value == "123456" && name.value != "") {
    console.log(77)
    hero.classList.add("hidden")
    navbar.classList.remove("hidden")
    learnSection.classList.remove("hidden")
    faqSection.classList.remove("hidden")
    success()
  }
}

function success(){
  console.log("success")
  Swal.fire({
    title: "অভিনন্দন",
    text: "চলুন আজকে নতুন কিছু শেখা যাক",
    icon: "success"
  });
}


function loadWordSpeak(id){
    console.log(id)
    url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
      .then(res => res.json())
      .then(data => pronounceWord(data.data.word));
}

function pronounceWord(word) {
    console.log(word)
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN';
    window.speechSynthesis.speak(utterance);
  }

function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("word-container").classList.add("hidden");
}

function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("word-container").classList.remove("hidden");
}

loadLessons();

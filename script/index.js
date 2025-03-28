function loadLessons() {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayLessons(data.data))
}

function displayLessons(lessons) {
    const lessonContainer = document.getElementById('lesson-container');

    for (let i of lessons) {
        const lessonDiv = document.createElement('div');

        lessonDiv.innerHTML = `
        <button id="btn-${i.level_no}" onclick="loadWords(${i.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i>
            Lesson -${i.level_no}
        </button>`;

        lessonContainer.appendChild(lessonDiv);
    }
}

function loadWords(id) {
    url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayWords(data.data))
}

function displayWords(words) {
    const wordContainer = document.getElementById('word-container');
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
        return;
    }
    for (let i of words) {
        const wordDiv = document.createElement('div');
        wordDiv.innerHTML = `
          <div class="card bg-base-100 h-[420px] shadow-sm p-14">
            <p class="text-center text-[32px] font-bold mb-6">${i.word}</p>
            <p class="text-center text-xl font-medium mb-6">Meaning /Pronounciation</p>
            <p class="text-center bangla text-[32px] font-semibold opacity-80">"${i.meaning} / ${i.pronunciation}"</p>
            <div class="h-full flex items-end">
                <div class="flex justify-between bottom-14 w-full">
                    <div id="word-${i.id}" onclick="loadDetails(${i.id})" class="bg-zinc-100 size-14 rounded-xl flex justify-center items-center">
                        <i class="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <div class="bg-zinc-100 size-14 rounded-xl flex justify-center items-center">
                        <i class="fa-solid fa-volume-high"></i>
                    </div>
                </div>
            </div>
        </div>


        
        `;

        wordContainer.appendChild(wordDiv);
    }
}

function loadDetails(id) {
    url = `https://openapi.programming-hero.com/api/word/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}

function displayDetails(data) {
    const popupContainer = document.getElementById('popup-container');
    // popupContainer.innerHTML = "";
    synonyms = data.synonyms;
    console.log(synonyms);
    const details = document.createElement('div');
    details.innerHTML = `
        <div
          class="fixed inset-0 bg-black/20 flex justify-center items-center"
        >
          <div class="card bg-base-100 shadow-sm p-12 w-[735px]">
            <p class="text-4xl font-semibold mb-8">${data.word} (<span><i class="fa-solid fa-microphone"></i></span>:${data.pronunciation})</p>
            <p class="text-xl font-semibold mb-[10px]">
              Meaning
            </p>
            <p class="bangla text-2xl font-medium opacity-80 mb-8">${data.meaning}</p>

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
                ${synonyms.map(syn => `<div class="bg-zinc-100 p-3 rounded-md">${syn}</div>`).join("")}
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



loadLessons()
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
        <button class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i>
            Lesson -${i.level_no}
        </button>`;

        lessonContainer.appendChild(lessonDiv);
    }
}


loadLessons()
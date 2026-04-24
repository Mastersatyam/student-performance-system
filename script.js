let studentsData = [];

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    studentsData = data;
    displayStudents(data);
  });

function calculateScore(s) {
  let avg = (s.academics.math + s.academics.science + s.academics.english) / 3;
  let sports = s.sports.length * 5;
  let activity = s.activities.length * 5;

  return Math.round(avg * 0.6 + sports * 0.2 + activity * 0.2);
}

function displayStudents(data) {
  let output = "";

  data.forEach(s => {
    let score = calculateScore(s);

    output += `
      <div class="card">
        <h3>${s.name}</h3>
        <p><b>School:</b> ${s.school}</p>
        <p><b>State:</b> ${s.state}</p>

        <div class="section">
          <b>📚 Academics:</b>
          <p>Math: ${s.academics.math}, Science: ${s.academics.science}, English: ${s.academics.english}</p>
        </div>

        <div class="section">
          <b>⚽ Sports:</b>
          <p>${s.sports.join(", ")}</p>
        </div>

        <div class="section">
          <b>🎭 Activities:</b>
          <p>${s.activities.join(", ")}</p>
        </div>

        <p class="score">⭐ Score: ${score}</p>
      </div>
    `;
  });

  document.getElementById("students").innerHTML = output;
}

document.getElementById("search").addEventListener("input", () => {
  let value = document.getElementById("search").value.toLowerCase();

  let filtered = studentsData.filter(s =>
    s.name.toLowerCase().includes(value) ||
    s.school.toLowerCase().includes(value)
  );

  displayStudents(filtered);
});

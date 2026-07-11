const statGrid = document.getElementById("statGrid");
const recentGrid = document.getElementById("recentGrid");

fetch("/api/students")
  .then(res => res.json())
  .then(students => {

    // 📊 Stats
    statGrid.innerHTML = `
      <div class="card">
        <h3>Total Students</h3>
        <p>${students.length}</p>
      </div>
    `;

    // 🆕 Recent students (last 4)
    const recent = students.slice(-4).reverse();

    recentGrid.innerHTML = recent.map(s => `
      <div class="card">
        <h4>${s.name}</h4>
        <p>Roll: ${s.roll}</p>
        <p>${s.course}</p>
      </div>
    `).join("");

  });
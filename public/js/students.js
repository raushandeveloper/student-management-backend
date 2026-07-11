const grid = document.getElementById("studentGrid");
const searchInput = document.getElementById("searchInput");

let allStudents = [];

// ✅ LOAD STUDENTS
async function loadStudents() {
  try {
    const res = await fetch("/api/students");
    const data = await res.json();

    allStudents = data;
    render(data);

  } catch (err) {
    console.error("Error loading students:", err);
    grid.innerHTML = "<p>❌ Failed to load students</p>";
  }
}

loadStudents();


// ✅ RENDER FUNCTION (UPDATED)
function render(students) {
  if (students.length === 0) {
    grid.innerHTML = "<p style='text-align:center;'>No students found 😕</p>";
    return;
  }

  grid.innerHTML = students.map(s => `
    <div class="student-card">
      <h3>${s.name}</h3>
      <p><strong>Roll:</strong> ${s.roll}</p>
      <p><strong>Course:</strong> ${s.course}</p>

      <div class="card-actions">
        <button onclick="editStudent('${s._id}')" class="btn btn-ghost">Edit</button>
        <button onclick="deleteStudent('${s._id}')" class="btn btn-danger">Delete</button>
      </div>
    </div>
  `).join("");
}


// ✅ DELETE FUNCTION
async function deleteStudent(id) {
  if (!confirm("Delete this student?")) return;

  try {
    await fetch(`/api/students/${id}`, {
      method: "DELETE"
    });

    alert("Deleted!");
    loadStudents(); // 🔄 refresh list

  } catch (err) {
    console.error(err);
    alert("❌ Delete failed");
  }
}


// ✅ EDIT FUNCTION
function editStudent(id) {
  window.location.href = `add-student.html?id=${id}`;
}


// ✅ SEARCH
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allStudents.filter(s =>
    s.name.toLowerCase().includes(value) ||
    s.roll.toLowerCase().includes(value) ||
    s.course.toLowerCase().includes(value)
  );

  render(filtered);
});
const form = document.getElementById("studentForm");
const statusBox = document.getElementById("formStatus");

// ✅ get ID from URL
const params = new URLSearchParams(window.location.search);
const studentId = params.get("id");


// ✅ LOAD DATA (EDIT MODE)
if (studentId) {
  document.getElementById("formTitle").innerText = "Edit Student";

  fetch(`/api/students/${studentId}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("fullName").value = data.name;
      document.getElementById("rollNo").value = data.roll;
      document.getElementById("email").value = data.email;
      document.getElementById("phone").value = data.phone;
      document.getElementById("age").value = data.age;
      document.getElementById("course").value = data.course;
    })
    .catch(err => console.error(err));
}


// ✅ SUBMIT FORM (POST + PUT FIX)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const student = {
    name: document.getElementById("fullName").value,
    roll: document.getElementById("rollNo").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    age: document.getElementById("age").value,
    course: document.getElementById("course").value
  };

  console.log("Sending:", student);

  // ✅ validation
  if (!student.name || !student.roll || !student.course) {
    statusBox.innerText = "Please fill required fields!";
    statusBox.style.color = "red";
    return;
  }

  try {
    // 🔥 IMPORTANT FIX
    let url = "/api/students";
    let method = "POST";

    if (studentId) {
      url = `/api/students/${studentId}`;
      method = "PUT";
    }

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    });

    const data = await res.json();

    console.log("Saved:", data);

    statusBox.innerText = studentId
      ? "✅ Student updated successfully!"
      : "✅ Student saved successfully!";
    statusBox.style.color = "green";

    form.reset();

    setTimeout(() => {
      window.location.href = "students.html";
    }, 1000);

  } catch (err) {
    console.error(err);
    statusBox.innerText = "❌ Error saving student!";
    statusBox.style.color = "red";
  }
});
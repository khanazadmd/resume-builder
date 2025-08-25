const form = document.getElementById("resumeForm");
const preview = document.getElementById("resumePreview");
const previewPhoto = document.getElementById("previewPhoto");

// Add Experience field
function addExperience() {
    const container = document.getElementById("experienceContainer");
    const div = document.createElement("div");
    div.classList.add("experience");
    div.innerHTML = `
    <input type="text" placeholder="Job Role" class="jobRole">
    <input type="text" placeholder="Company" class="company">
    <input type="text" placeholder="Year" class="year">
  `;
    container.appendChild(div);
}

// Add Education field
function addEducation() {
    const container = document.getElementById("educationContainer");
    const div = document.createElement("div");
    div.classList.add("education");
    div.innerHTML = `
    <input type="text" placeholder="Degree" class="degree">
    <input type="text" placeholder="University" class="university">
    <input type="text" placeholder="Year" class="year">
  `;
    container.appendChild(div);
}

// Generate Resume
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Personal Info
    document.getElementById("previewName").textContent = document.getElementById("name").value;
    document.getElementById("previewTitle").textContent = document.getElementById("title").value;
    document.getElementById("previewEmail").textContent = "Email: " + document.getElementById("email").value;
    document.getElementById("previewPhone").textContent = "Phone: " + document.getElementById("phone").value;

    // Photo
    const photoInput = document.getElementById("photo").files[0];
    if (photoInput) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewPhoto.src = e.target.result;
            previewPhoto.classList.remove("hidden");
        };
        reader.readAsDataURL(photoInput);
    }

    // Skills
    const skills = document.getElementById("skills").value.split(",");
    const skillsList = document.getElementById("previewSkills");
    skillsList.innerHTML = "";
    skills.forEach(skill => {
        if (skill.trim() !== "") {
            const li = document.createElement("li");
            li.textContent = skill.trim();
            skillsList.appendChild(li);
        }
    });

    // Experience
    const expDivs = document.querySelectorAll(".experience");
    const expList = document.getElementById("previewExperience");
    expList.innerHTML = "";
    expDivs.forEach(exp => {
        const role = exp.querySelector(".jobRole").value;
        const company = exp.querySelector(".company").value;
        const year = exp.querySelector(".year").value;
        if (role || company || year) {
            const li = document.createElement("li");
            li.textContent = `${role} - ${company} (${year})`;
            expList.appendChild(li);
        }
    });

    // Education
    const eduDivs = document.querySelectorAll(".education");
    const eduList = document.getElementById("previewEducation");
    eduList.innerHTML = "";
    eduDivs.forEach(edu => {
        const degree = edu.querySelector(".degree").value;
        const university = edu.querySelector(".university").value;
        const year = edu.querySelector(".year").value;
        if (degree || university || year) {
            const li = document.createElement("li");
            li.textContent = `${degree} - ${university} (${year})`;
            eduList.appendChild(li);
        }
    });

    preview.classList.remove("hidden");
});

// Download PDF
document.getElementById("downloadBtn").addEventListener("click", () => {
    const element = document.getElementById("resumePreview");

    const name = document.getElementById("name").value.trim().replace(/\s+/g, "_");
    const filename = name ? `resume_${name}.pdf` : "my_resume.pdf";

    const opt = {
        margin: 0.5,
        filename: filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(opt).from(element).save();
});

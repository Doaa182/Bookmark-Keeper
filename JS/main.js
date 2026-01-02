var allSites = [];

if (localStorage.getItem("allSites") != null) {
  allSites = JSON.parse(localStorage.getItem("allSites"));
  displayAllSites();
}

var siteNameInput = document.getElementById("SiteName");
var siteUrlInput = document.getElementById("SiteUrl");

// CRUDs
function addSite() {
  var site = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };

  if (validateSiteName() == true && validateSiteUrl() == true) {
    allSites.push(site);
    localStorage.setItem("allSites", JSON.stringify(allSites));
    clearForm();
  } else {
    // var invalidModal = new bootstrap.Modal(
    //   document.getElementById("exampleModal")
    // );
    // invalidModal.show();

    showModal();
  }

  displayAllSites();
}

function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

function displayAllSites() {
  var concatSites = "";

  for (var i = 0; i < allSites.length; i++) {
    concatSites += `
        <tr>
            <td>${i + 1}</td>
            <td>${allSites[i].name}</td>
            <td>
                <button 
                type="button"
                class="btn btn-secondary" 
                title="View"
                onclick="window.open('${allSites[i].url}', '_blank')">
                <i class="fa-solid fa-eye"></i>
                </button>
             
                <button 
                type="button"
                class="btn btn-warning" 
                title="Edit"
                onclick="editSite(${i})" >
                <i class="fa-solid fa-pen-to-square"></i>                
                </button>
              
                <button 
                type="button"
                class="btn btn-danger" 
                title="Delete"
                onclick="deleteSite(${i})" >
                <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
        </tr>
    
    `;
  }

  document.getElementById("tableBody").innerHTML = concatSites;
}

function deleteSite(idx) {
  allSites.splice(idx, 1);
  localStorage.setItem("allSites", JSON.stringify(allSites));
  displayAllSites();
}

// Modal
var modal = document.getElementById("exampleModal");

// Show modal
function showModal() {
  modal.classList.add("show", "d-block");
  modal.classList.remove("d-none", "fade");
  modal.style.backgroundColor = "rgba(0,0,0,0.5)";
}

// Hide modal
function hideModal() {
  modal.classList.remove("show", "d-block");
  modal.classList.add("d-none", "fade");
}

var closeBtn = document.querySelector(".btn-close");

// Modal Close Btn
closeBtn.addEventListener("click", hideModal);

modal.addEventListener("click", function (e) {
  if (e.target === modal) hideModal();
});

// Validation
function validateSiteName() {
  var siteNameRegex = /^\w{3,}(\s+\w+)*$/;
  return siteNameRegex.test(siteNameInput.value);
}

function validateSiteUrl() {
  var siteUrlRegex =
    /^(https?:\/\/)(www\.)?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9\-\.]*)*\/?$/;
  return siteUrlRegex.test(siteUrlInput.value);
}

function changeInputStyle(inputElement) {
  var validateSiteNameOrUrl =
    inputElement.id == "SiteName" ? validateSiteName() : validateSiteUrl();

  if (validateSiteNameOrUrl == true) {
    inputElement.classList.add("is-valid");
    inputElement.classList.remove("is-invalid");
  } else {
    inputElement.classList.add("is-invalid");
    inputElement.classList.remove("is-valid");
  }
}

// Pencil Cursor
var pencilCursor = document.querySelector(".pencil-cursor");

document.addEventListener("mousemove", function (e) {
  pencilCursor.style.top = `${e.clientY}px`;
  pencilCursor.style.left = `${e.clientX}px`;

  var elementTouched = e.target;

  if (!elementTouched) return;

  if (
    elementTouched.closest("button") ||
    elementTouched.classList.contains("modeBtn")
  ) {
    pencilCursor.style.transform = `translate(-4%, -80%) scale(1.25)`;

    pencilCursor.style.transition = "transform 0.15s ease-out";
  } else if (elementTouched.tagName == "INPUT") {
    pencilCursor.classList.add("isWriting");
  } else {
    pencilCursor.style.transform = `translate(-4%, -80%) scale(1)`;
    pencilCursor.style.transition = "transform 0.15s ease-out";

    pencilCursor.classList.remove("isWriting");
  }

  if (document.body.classList.contains("dark-mode")) {
    pencilCursor.setAttribute("src", "./Assets/dark_pencil_cursor.png");
  } else {
    pencilCursor.setAttribute("src", "./Assets/pencil_cursor.png");
  }
});

// Theme Toggle
var themeToggle = document.querySelector(".mode");
var darkMode = document.querySelector(".fa-moon");
var lightMode = document.querySelector(".fa-sun");
var favIcon = document.querySelector("head title").nextElementSibling;

themeToggle.addEventListener("click", function (e) {
  lightMode.classList.toggle("d-none");
  darkMode.classList.toggle("d-none");
  document.body.classList.toggle("dark-mode");

  if (lightMode.classList.contains("d-none")) {
    favIcon.setAttribute(
      "href",
      "./Assets/bookmark_favicon.png?" + new Date().getTime()
    );
  } else {
    favIcon.setAttribute(
      "href",
      "./Assets/dark_bookmark_favicon.png?" + new Date().getTime()
    );
  }
});

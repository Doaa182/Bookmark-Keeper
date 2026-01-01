<<<<<<< HEAD
var allSites = [];

if (localStorage.getItem("allSites") != null) {
  allSites = JSON.parse(localStorage.getItem("allSites"));
  displayAllSites();
}

var siteNameInput = document.getElementById("SiteName");
var siteUrlInput = document.getElementById("SiteUrl");

var invalidSiteNameIcon = document.getElementById("invalidSiteNameIcon");
var validSiteNameIcon = document.getElementById("validSiteNameIcon");

var invalidSiteUrlIcon = document.getElementById("invalidSiteUrlIcon");
var validSiteUrlIcon = document.getElementById("validSiteUrlIcon");

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
    var invalidModal = new bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    invalidModal.show();
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
                class="btn visit-btn" 
                onclick="window.open('${allSites[i].url}', '_blank')">
                  <i class="fa-solid fa-eye"></i>
                  Visit
                </button>
              </td>

              <td>
                <button class="btn delete-btn" onclick="deleteSite(${i})" >
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
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
  inputElement.onblur = () => changeInputStyle(inputElement);

  var validateSiteNameOrUrl =
    inputElement.id == "SiteName" ? validateSiteName() : validateSiteUrl();

  var siteNameOrUrlValidIcon =
    inputElement.id == "SiteName" ? validSiteNameIcon : validSiteUrlIcon;

  var siteNameOrUrlInvalidIcon =
    inputElement.id == "SiteName" ? invalidSiteNameIcon : invalidSiteUrlIcon;

  if (validateSiteNameOrUrl == true) {
    inputElement.style.borderColor = "#198754";
    siteNameOrUrlValidIcon.style.display = "block";
    siteNameOrUrlInvalidIcon.style.display = "none";

    if (document.activeElement == inputElement) {
      inputElement.style.boxShadow = "0 0 0 0.25rem rgba(25, 135, 84, 0.25)";
    } else {
      inputElement.style.boxShadow = "none";
    }
  } else {
    inputElement.style.borderColor = "#dc3545";
    siteNameOrUrlValidIcon.style.display = "none";
    siteNameOrUrlInvalidIcon.style.display = "block";

    if (document.activeElement == inputElement) {
      inputElement.style.boxShadow = "0 0 0 0.25rem rgba(220, 53, 69, 0.25)";
    } else {
      inputElement.style.boxShadow = "none";
    }
  }
}

function employeebtn() {
  const btn = document.getElementsByClassName("add-employee-form")[0];
  const overlay = document.getElementsByClassName("overlay")[0];
  btn.style.display = "block";
  overlay.style.display = "block";
}
function close_form() {
  var close_btn = document.getElementsByClassName("add-employee-form")[0];
  close_btn.style.display = "none";
  const overlay_close = document.getElementsByClassName("overlay")[0]
  overlay_close.style.display = "none";
}

function btn_active(empID) {
  let btn_active = document.getElementById("btn-active");
  btn_active.innerHTML = `
    <div class="task-btn" id="taskbtn">
      <button class="task-btun"  onclick="viewEmployee('${empID}')" ><i class="fa-solid fa-eye"></i>View Details</button>
      <button class="task-btun" onclick="edit_employee('${empID}')" ><i class="fa-solid fa-user-pen"></i>Edit</button>
      <button class="task-btun" onclick="open_delete_employee('${empID}')"><i class="fa-solid fa-trash"></i>Delete</button>
    </div>`;
  btn_active.style.display = "block";

  const moreOptionToggles = document.querySelectorAll(".more-btn");
  moreOptionToggles.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      const buttonRect = event.target.getBoundingClientRect();
      btn_active.style.top = (buttonRect.top - 170) + "px";
      btn_active.style.display = btn_active.style.display === 'none' || btn_active.style.display === '' ? "block" : "none";
      event.stopPropagation();
    });
  });


  // Function to close the menu
  function closeMenu() {
    btn_active.style.display = "none";
    document.removeEventListener("mousedown", handleOutsideClick);
  }
  //------------- Function to handle click outside the menu-------------------
  function handleOutsideClick(event) {
    if (!btn_active.contains(event.target)) {
      closeMenu();
    }
  }
  document.addEventListener("mousedown", handleOutsideClick);
}

function edit_employee(empID) {
  const edit_btn = document.getElementById("edit-employee-form");
  const overlay = document.getElementsByClassName("overlay")[0];
  edit_btn.style.display = "block";
  overlay.style.display = "block";
  fetch(`http://localhost:3000/employees/${empID}`)
    .then(res => {
      return res.json();
    })

    .then(data => {
      console.log(data);
      const imagePreview = document.getElementById('image-preview');
      imagePreview.src = `http://localhost:3000/employees/${empID}/avatar`;
      document.getElementById('salutation-edit').value = data.salutation;
      document.getElementById('firstName-edit').value = data.firstName;
      document.getElementById('lastName-edit').value = data.lastName;
      document.getElementById('email-edit').value = data.email;
      document.getElementById('phone-edit').value = data.phone;
      const dobValue = data.dob;
      const [day, month, year] = dobValue.split('-');
      const formattedDob = `${year}-${month}-${day}`;
      document.getElementById('dob-edit').value = formattedDob;
      document.querySelector(`input[name="gender-edit"][value="${data.gender}"]`).checked = true;
      document.getElementById('qualifications-edit').value = data.qualifications;
      document.getElementById('address-edit').value = data.address;
      document.getElementById('country-edit').value = data.country;
      document.getElementById('state-edit').value = data.state;
      document.getElementById('city-edit').value = data.city;
      document.getElementById('pin-edit').value = data.pincode;
    });

  const btnMain = document.getElementById("btn-main");
  btnMain.addEventListener('click', async () => {
    editEmployee(empID);
    get_emp();
    edit_btn.style.display = "none";
    overlay.style.display = "none";
  })
    .catch(error => {
      console.error('Error:', error);
    });
}
function close_edit_form() {
  var close_btn = document.getElementById("edit-employee-form");
  close_btn.style.display = "none";
  var overlay_close = document.getElementsByClassName("overlay")[0]
  overlay_close.style.display = "none";
}
function open_delete_employee(empID) {
  var delete_btn = document.getElementById('delete_employee');
  delete_btn.style.display = "block";
  var overlay_close = document.getElementsByClassName("overlay")[0]
  overlay_close.style.display = "block";

  const deleteButton = document.getElementById('emp_del');
  deleteButton.addEventListener('click', () => {
    delete_employee(empID);
  })
}
function close_delete_employee() {
  var delete_btn = document.getElementById('delete_employee');
  delete_btn.style.display = "none";
  var overlay_close = document.getElementsByClassName("overlay")[0]
  overlay_close.style.display = "none";
}

function addedEmployee() {
  var addedEmployee = document.getElementById('added-emp');
  addedEmployee.style.display = "block";
  var overlay_close = document.getElementsByClassName("overlay")[0]
  overlay_close.style.display = "block";
}
function closeAddedEmployee() {
  var addedEmployee = document.getElementById('added-emp');
  addedEmployee.style.display = "none";
  var overlay_close = document.getElementsByClassName("overlay")[0]
  overlay_close.style.display = "none";
}
function editedEmployee() {
  var addedEmployee = document.getElementById('edited-emp');
  addedEmployee.style.display = "block";
  var overlay_close = document.getElementsByClassName("overlay")[0]
  overlay_close.style.display = "block";
}
function closeEditedEmployee() {
  var addedEmployee = document.getElementById('edited-emp');
  addedEmployee.style.display = "none";
  var overlay_close = document.getElementsByClassName("overlay")[0]
  overlay_close.style.display = "none";
}
function deletedEmployee() {
  var addedEmployee = document.getElementById('deleted-emp');
  addedEmployee.style.display = "block";
  var overlay_close = document.getElementsByClassName("overlay")[0]
  overlay_close.style.display = "block";
}
function closeDeketedEmployee() {
  var addedEmployee = document.getElementById('deleted-emp');
  addedEmployee.style.display = "none";
  var overlay_close = document.getElementsByClassName("overlay")[0]
  overlay_close.style.display = "none";
}

//-----FETCH-method-------------------------------------GET-method----------------------------------

get_emp();
let currentPage = 1;
const itemsPerPage = 4;
let employee = [];
function get_emp() {
  fetch("http://localhost:3000/employees")
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      let employeeData = data;
      var pageCount = Math.ceil(employeeData.length / itemsPerPage);
      pagination(pageCount);
      let start = itemsPerPage * (currentPage - 1);
      let end = Math.min(itemsPerPage * currentPage, data.length);
      const tableBody = document.getElementById('table-body');
      let temp = '';

      for (let i = start; i < end; i++) {
        const employee = data[i];

        temp += ` <tr>
        <td>#0${i + 1}</td>
        <td><img src='http://localhost:3000/employees/${employee.id}/avatar'>${employee.salutation + " " + employee.firstName + " " + employee.lastName}</td>
        <td>${employee.email}</td>
        <td>${employee.phone}</td>
        <td>${employee.gender}</td>
        <td>${employee.dob}</td>
        <td>${employee.country}</td>
        <td><button id="more-btn"class="more-btn" onclick=btn_active('${employee.id}')><span class="material-symbols-outlined">
                        more_horiz
                      </span></button></td>

                  <div id="btn-active">
                 
                  </div>
      </tr>`;
      }
      tableBody.innerHTML = temp;
    });

}


//-------------------------------------------------POST-method----------------------------------------------

const empForm_fetch = document.getElementById('btn-filled');
empForm_fetch.addEventListener('click', function (e) {
  e.preventDefault();
  const salutation = document.getElementById("salutation").value;
  const firstName = document.getElementById("FirstName").value;
  const lastName = document.getElementById("LastName").value;
  const email = document.getElementById("Email").value;
  const phone = document.getElementById("Phone").value;
  const dob = document.getElementById("dob").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  // Function for converting the format of date from yyyy-mm-dd to dd-mm-yyyy
  var dateofbirth = changeformat(dob);
  function changeformat(val) {
    const Array = val.split('-');
    let year = Array[0];
    let month = Array[1];
    let day = Array[2];
    let formatteddate = day + "-" + month + "-" + year;
    return formatteddate;
  }
  const qualifications = document.getElementById('Qualifications').value;
  const address = document.getElementById('address').value;
  const country = document.getElementById('country').value;
  const state = document.getElementById('state').value;
  const city = document.getElementById('city').value;
  const pincode = document.getElementById('pin').value;

  // Create a new employee object
  const newEmployee = {
    salutation,
    firstName,
    lastName,
    email,
    phone,
    dob: dateofbirth,
    gender,
    address,
    country,
    state,
    city,
    pincode,
    qualifications,
    username: firstName,
    password: phone,
  };
  // Sending the employee data to the server
  if (validateForm()) {
    fetch('http://localhost:3000/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEmployee)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Employee added:', data);
        // ------------------Image upload-------------------
        const uploadImage = document.getElementById('input-file');
        const formData = new FormData();
        formData.append("avatar", uploadImage.files[0]);
        fetch(`http://localhost:3000/employees/${data.id}/avatar`, {
          method: 'POST',
          body: formData,
        })
          .then(res => {
            console.log('Image uploaded:', res);
            get_emp();
            clearForm();
            close_form();
            addedEmployee();
          })
          .catch(error => {
            console.error('Error uploading image:', error);
          });
      })
      .catch(error => {
        console.error('Error adding employee:', error);
      });
  }
});




// -------------------------------------------DELETE-method-------------------------------------------

function delete_employee(empID) {
  fetch(`http://localhost:3000/employees/${empID}`, {
    method: 'DELETE',
  });
  close_delete_employee();
  get_emp();
  deletedEmployee();
}

//--------------------------------------------PUT-method-------------------------------------------------

async function editEmployee(empID) {
  const salutation = document.getElementById('salutation-edit').value;
  const firstName = document.getElementById('firstName-edit').value;
  const lastName = document.getElementById('lastName-edit').value;
  const email = document.getElementById('email-edit').value;
  const phone = document.getElementById('phone-edit').value;
  const dobValue = document.getElementById('dob-edit').value;
  const [year, month, day] = dobValue.split('-');
  const formattedDob = `${day}-${month}-${year}`;
  document.getElementById('dob-edit').value = formattedDob;
  const gender = document.querySelector('input[name="gender-edit"]:checked').value;
  const qualifications = document.getElementById('qualifications-edit').value;
  const address = document.getElementById('address-edit').value;
  const country = document.getElementById('country-edit').value;
  const state = document.getElementById('state-edit').value;
  const city = document.getElementById('city-edit').value;
  const pincode = document.getElementById('pin-edit').value;

  const dobformatted = `${day}-${month}-${year}`;

  const updatedEmployeeData = {
    salutation,
    firstName,
    lastName,
    email,
    phone,
    dob: dobformatted,
    qualifications,
    address,
    country,
    state,
    city,
    pincode,
    username: firstName,
    password: phone,
    gender,
  };

  await fetch(`http://localhost:3000/employees/${empID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedEmployeeData),
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      get_emp();
      close_edit_form();
      editedEmployee();
    })
    .catch(error => {
      console.error('Error adding employee:', error);
    });
}



// -----------------------------------------form-validation-------------------------------------------
function validateForm() {

  const errorAlerts = document.querySelectorAll('.error-alert');
  errorAlerts.forEach(alert => alert.style.display = 'none');

  const salutation = document.getElementById("salutation").value;
  const firstName = document.getElementById("FirstName").value;
  const lastName = document.getElementById("LastName").value;
  const email = document.getElementById("Email").value;
  const phone = document.getElementById("Phone").value;
  const dob = document.getElementById("dob").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const qualifications = document.getElementById("Qualifications").value;
  const address = document.getElementById("address").value;
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const pincode = document.getElementById("pin").value;

  // ----------Regular expressions for validation--------------------
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^\d{10}$/;
  const nameRegex = /^[a-zA-Z'-]+$/;

  function displayError(fieldId) {
    document.querySelector(`#${fieldId} + .error-alert`).style.display = 'block';
  }

  let isValid = true;

  if (salutation === "Select") {
    displayError("salutation");
    isValid = false;
  }

  if (!nameRegex.test(firstName) || firstName.trim() === "") {
    displayError("FirstName");
    isValid = false;
  }

  if (!nameRegex.test(lastName) || lastName.trim() === "") {
    displayError("LastName");
    isValid = false;
  }

  if (!emailRegex.test(email) || email.trim() === "") {
    displayError("Email");
    isValid = false;
  }

  if (!phoneRegex.test(phone) || phone.trim() === "") {
    displayError("Phone");
    isValid = false;
  }

  if (dob.trim() === "") {
    displayError("dob");
    isValid = false;
  }

  if (qualifications.trim() === "") {
    displayError("Qualifications");
    isValid = false;
  }

  if (address.trim() === "") {
    displayError("address");
    isValid = false;
  }

  if (country === "Select") {
    displayError("country");
    isValid = false;
  }

  if (state === "Select") {
    displayError("state");
    isValid = false;
  }

  if (city.trim() === "") {
    displayError("city");
    isValid = false;
  }

  if (pincode.trim() === "") {
    displayError("pin");
    isValid = false;
  }

  return isValid;
}



//-----------------------------------------------upload-image------------------------------------------------



const dropArea = document.getElementById('drop-area');
const inputFile = document.getElementById('input-file');
const imgView = document.getElementById('img-view');
inputFile.addEventListener("change", uploadImage);
function uploadImage() {
  let imgLink = URL.createObjectURL(inputFile.files[0]);
  const imgTAG = document.createElement('img');
  imgTAG.src = imgLink;
  imgView.textContent = "";
  imgView.appendChild(imgTAG);
  imgView.style.border = 0;
  imgView.style.width = '200px'
}


//-------------------------------------- search employee- search bar-----------------------------------------



function searchEmployee() {
  let searchValue = document.getElementById("searchEmployee").value;
  searchValue = searchValue.toLowerCase();
  let rows = document.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    if (!rows[i].innerHTML.toLowerCase().includes(searchValue)) {
      rows[i].style.display = "none";
     }
  }
}

// -----------------------------------------script for pagination----------------------------------------------



var CurrentPage = 1;
function pagination(totalPages) {
  console.log(totalPages);
  var pgnum = document.getElementById("pagination");
  let temp = '';
  for (let i = 1; i <= totalPages; i++) {
    temp += `<a href="#"id="page${i}">${i}</a> `;
  }
  pgnum.innerHTML = temp;

  for (var i = 1; i <= totalPages; i++) {
    (function (pageNumber) {
      const pageCounter = document.getElementById(`page${pageNumber}`);
      pageCounter.addEventListener('click', function (e) {
        currentPage = pageNumber;
        get_emp();
      });
    })(i);
  }

  var pageLeftButton = document.getElementById("pageleft");
  var pageRightButton = document.getElementById("pageright");
  if (CurrentPage === 1) {
    pageLeftButton.classList.add('hidden');
  } else {
    pageLeftButton.classList.remove('hidden');
  }
  if (CurrentPage === totalPages) {
    pageRightButton.classList.add('hidden');
  } else {
    pageRightButton.classList.remove('hidden');
  }
  pageLeftButton.addEventListener("click", function () {
    if (CurrentPage > 1) {
      CurrentPage--;
      get_emp();
    }
  });
  pageRightButton.addEventListener("click", function () {
    if (CurrentPage < totalPages) {
      CurrentPage++;
      get_emp();
    }
  });
}
function viewEmployee(empID) {
  window.location.href = `viewemployee.html?id=${empID}`;
}


// -----------------edit employee upload image-------------------------------



const editEmployeeImageLabel = document.getElementById('editForm-drop-area');
const editEmployeeFileInput = document.getElementById("editForm-input-file");
const selectedImage = document.getElementById("image-preview");

editEmployeeFileInput.addEventListener("change", displaySelectedImage);

function displaySelectedImage() {
  const file = editEmployeeFileInput.files[0];

  if (file) {
    const imgLink = URL.createObjectURL(file);
    selectedImage.src = imgLink;
    selectedImage.style.width = "110px";
    selectedImage.style.height = "110px";
  } else {
    selectedImage.src = "";
  }
}

const changeButton = document.querySelector("button");
changeButton.addEventListener("click", changeImage);

function changeImage() {
  editEmployeeFileInput.click();
}

// ---------------------------------cleaerForm----------------------------------------------



function clearForm() {
  document.getElementById("salutation").value = "";
  document.getElementById("FirstName").value = "";
  document.getElementById("LastName").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("Phone").value = "";
  document.getElementById("dob").value = "";

  const genderRadios = document.querySelectorAll('input[name="gender"]');
  genderRadios.forEach(radio => {
    radio.checked = false;
  });


  document.getElementById('Qualifications').value = "";
  document.getElementById('address').value = "";
  document.getElementById('country').value = "";
  document.getElementById('state').value = "";
  document.getElementById('city').value = "";
  document.getElementById('pin').value = "";
}












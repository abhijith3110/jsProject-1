//-------------------function to calculate age of the employee----------------------------

function age(dob) {
  const currentDate = new Date();
  const [date, month, year] = dob.split('-');
  const yearsDiff = currentDate.getFullYear() - year;
  return yearsDiff;
}

let params = new URLSearchParams(document.location.search);
let employeeid = params.get("id");
view_Employee(employeeid);
console.log(employeeid);
function view_Employee(_employeeid) {
  fetch(`http://localhost:3000/employees/${_employeeid}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      document.getElementById('employee-heading').innerHTML = `<div class="user-pic">
                    <img src="http://localhost:3000/employees/${_employeeid}/avatar" alt="" style="border-radius: 50%;">
                  </div>
                  <div class="employee-details-row">
                    <h4>${data.salutation}${data.firstName + " " + data.lastName}</h4>
                    <P>${data.email}</P>
                  </div>
              </div>
              <div class="row">
                <div class="input-section col-md-4">
                  <div class="card-box">
                    <div class="card-body-box">
                      <p>Gender</p>
                      <h5>${data.gender}</h5>
                    </div>
                  </div>
                </div>
                <div class="input-section col-md-4">
                  <div class="card-box">
                    <div class="card-body-box">
                      <p>Age</p>
                      <h5>${age(data.dob)}</h5>
                    </div>
                  </div>
                </div>
                <div class="input-section col-md-4">
                  <div class="card-box">
                    <div class="card-body-box">
                      <p>Date of Birth</p>
                      <h5>${data.dob}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="input-section col-md-6">
                  <div class="card-box">
                    <div class="card-body-box">
                      <p>Mobile Number</p>
                      <h5>${data.phone}</h5>
                    </div>
                  </div>
                </div>
                <div class="input-section col-md-6">
                  <div class="card-box">
                    <div class="card-body-box">
                      <p>Qualifications</p>
                      <h5>${data.qualifications}</h5>
                    </div>
                  </div>
                </div>
                <!-- row.3 -->
                <div class="row">
                  <div class="input-section col-md-6 box_add">
                    <div class="card-box">
                      <div class="card-body-box">
                        <p>Address</p>
                        <h5>${data.address}</h5>
                      </div>
                    </div>
                  </div>
                  <div class="input-section col-md-6 box_add">
                    <div class="card-box" style="padding-bottom: 17px;">
                      <div class="card-body-box">
                        <p>Username</p>
                        <h5>${data.username}</h5>
                      </div>
                    </div>
                  </div>
                  <!-- row.4 -->
                  <div class="row">
                    <div class="input-section col-md-12 mt-4 mb-3">
                      <button type="button" class="btn btn-danger btn-main">Delete</button>
                      <button type="button" class="btn btn-primary btn-filled btn-main">Edit Details</button>
                    </div>
                  </div>
                </div>
              </div>`
    });
}
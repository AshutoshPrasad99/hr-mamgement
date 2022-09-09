const url = "http://localhost:5000";

getEmployee();
document.getElementById("navbar-link").style.justifyContent = "end";

function getEmployee() {
  fetch(url + "/attendance", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      fetch(url, {
        method: "GET",
      })
        .then((response2) => {
          return response2.json();
        })
        .then((res2) => {
          var tableData = "";

          res2.forEach((emp) => {
            var attend =
              "<span style='font-weight: bold; color: red'>Absent</span>";

            if (res.indexOf(emp._id) != -1) {
              attend =
                "<span style='font-weight: bold; color: #00cd00'>Present</span>";
            }

            if (emp.role != "admin") {
              tableData +=
                "<tr><td>" +
                emp.first_name +
                "</td><td>" +
                emp.last_name +
                "</td><td>" +
                emp.email +
                "</td><td>" +
                emp.contact +
                "</td><td>" +
                emp.role +
                "</td><td>" +
                attend +
                "</td><td style='display: flex; justify-content: space-around'><button class='button-18' role='button' onclick='openRoleModel(`" +
                emp._id +
                "`,`" +
                emp.role +
                "`)'>Change Role</button><button class='button-18' role='button' style='background-color: red' onclick='deleteEmployee(`" +
                emp._id +
                "`)'>Delete</button></td></tr>";
            }
          });
          document.getElementById("empData").innerHTML = tableData;
        });
    });
}

function deleteEmployee(id) {
  fetch(url + "/" + id, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      getEmployee();
    });
}

const roleModal = document.getElementById("roleModal");
const roleClose = document.getElementById("roleClose");

function toggleRoleModal() {
  roleModal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === roleModal) {
    toggleRoleModal();
  }
}

roleClose.addEventListener("click", toggleRoleModal);
window.addEventListener("click", windowOnClick);

function openRoleModel(empId, role) {
  document.getElementById("emp_id").value = empId;
  document.getElementById("currentRole").innerText = role;
  toggleRoleModal();
}

function changeRole() {
  var empId = document.getElementById("emp_id").value;
  var role = document.getElementById("role").value;
  fetch(url + "/update_role", {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: empId,
      role: role,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      toggleRoleModal();
      getEmployee();
    });
}

function logout() {
  localStorage.clear();
  window.location.replace("index.html");
}

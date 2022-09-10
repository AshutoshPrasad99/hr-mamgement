const url = "https://backend-hr-1.herokuapp.com";
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

          if (emp.role != "HR" || emp.role != "admin") {
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
              attend +
              "</td><td><button class='button-18' role='button' onclick='getTask(`" +
              emp._id +
              "`)'>Task</button></td></tr>";
          }
        });
        document.getElementById("empData").innerHTML = tableData;
      });
  });

function getTask(empId) {
  fetch(url + "/emp_task", {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ employee_id: empId }),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      var tableData = "";
      res.forEach((task) => {
        tableData +=
          "<tr><td>" +
          task.task_name +
          "</td><td>" +
          task.deadline +
          "</td><td>" +
          task.status +
          "</td><td><button class='button-18' role='button' style='background-color: red' onclick='deleteTask(`" +
          task._id +
          "`)'>Delete</button></td></tr>";
      });
      document.getElementById("taskData").innerHTML = tableData;
      document.getElementById("emp-id").value = empId;
      toggleTaskModal();
    });
}

function deleteTask(id) {
  fetch(url + "/task/" + id, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      const empId = document.getElementById("emp-id").value;
      getTask(empId);
    });
}

function addTask() {
  const empId = document.getElementById("emp-id").value;
  const task = document.getElementById("task-name").value;
  const deadline = document.getElementById("task-deadline").value;
  if (task !== "" && deadline !== "") {
    fetch(url + "/add_task", {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_name: task,
        deadline: deadline,
        employee_id: empId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        toggleAssignTaskModal();
        const empId = document.getElementById("emp-id").value;
        getTask(empId);
      });
  }
}

const taskModal = document.getElementById("taskModal");
const assignTaskModal = document.getElementById("assignTaskModal");
const taskClose = document.getElementById("taskClose");
const assignTaskClose = document.getElementById("assignTaskClose");

function toggleTaskModal() {
  taskModal.classList.toggle("show-modal");
}

function toggleAssignTaskModal() {
  assignTaskModal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === taskModal) {
    toggleTaskModal();
  } else if (event.target === assignTaskModal) {
    toggleAssignTaskModal();
  }
}

taskClose.addEventListener("click", toggleTaskModal);
assignTaskClose.addEventListener("click", toggleAssignTaskModal);
window.addEventListener("click", windowOnClick);

function attendance() {
  const attendance = document.getElementById("attendance").value;
  document.getElementById("attendance").value =
    attendance === "on" ? "off" : "on";

  var endPoint = "";
  var payload = {};
  if (attendance === "off") {
    endPoint = "/attendance_check_in";
    payload = {
      employee_id: localStorage.getItem("id"),
      employee_name: localStorage.getItem("name"),
    };
  } else {
    endPoint = "/attendance_check_out";
    payload = {
      id: localStorage.getItem("attendanceId"),
    };
  }

  fetch(`${url + endPoint}`, {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      if (endPoint === "/attendance_check_in") {
        localStorage.setItem("attendanceId", res._id);
        alert("Attendance Mark.");
      }
    });
}

function logout() {
  localStorage.clear();
  window.location.replace("index.html");
}

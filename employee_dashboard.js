const url = "https://backend-hr-1.herokuapp.com";
myTask();
function myTask() {
  id = { employee_id: localStorage.getItem("id") };
  fetch(url + "/emp_task", {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
    cache: "default",
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      var tableData = "";
      res.forEach((emp) => {
        tableData +=
          "<tr><td>" +
          emp.task_name +
          "</td><td>" +
          emp.createdAt +
          "</td><td>" +
          emp.deadline +
          "</td><td>" +
          emp.status +
          "</td><td><button class='button-18' role='button' style='background-color:#00cd00' onclick='updateStatus(`" +
          emp._id +
          "`,`" +
          "In Progress" +
          "`)'>In Progress</button>&nbsp;&nbsp;&nbsp;<button class='button-18' role='button' onclick='updateStatus(`" +
          emp._id +
          "`,`" +
          "Completed" +
          "`)'>Completed</button></td></tr>";
      });
      document.getElementById("empTask").innerHTML = tableData;
    });
}

function updateStatus(taskId, status) {
  var data = {
    id: taskId,
    status: status,
  };
  fetch(url + "/update_status", {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      alert(res);
      myTask();
    });
}

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

  console.log(attendance);
}

function logout() {
  localStorage.clear();
  window.location.replace("index.html");
}

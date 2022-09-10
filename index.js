function save() {
  var data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  fetch("https://backend-hr-1.herokuapp.com", {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "default",
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      console.log(res);
      if (res !== null) {
        localStorage.setItem("id", res._id);
        localStorage.setItem("name", res.first_name + " " + res.last_name);
        if (res.role === "admin") {
          window.location.replace("admin_dashboard.html");
        } else if (res.role === "HR") {
          window.location.replace("hr_dashboard.html");
        } else {
          window.location.replace("employee_dasboard.html");
        }
      } else {
        alert("Incorrect Email ID or Password");
      }
    });
}

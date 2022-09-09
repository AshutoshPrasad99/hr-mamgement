function save() {
  var pass = document.getElementById("password").value;
  var repass = document.getElementById("repassword").value;

  if (pass == repass) {
    var data = {
      first_name: document.getElementById("first").value,
      last_name: document.getElementById("last").value,
      email: document.getElementById("email").value,
      contact: document.getElementById("contact").value,
      password: pass,
    };
    fetch("http://localhost:5000/add_employee", {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "default",
    })
      .then((response) => {
        if (response.status == 409) {
          alert("Email already exist.");
        } else {
          return response.json();
        }
      })
      .then((res) => {
        if (res != "email found") {
          localStorage.setItem("id", res._id);
          localStorage.setItem("name", res.first_name + " " + res.last_name);
          window.location.replace("employee_dasboard.html");
        }
      });
  } else {
    alert("confirm Password should be same as Password.");
  }
}

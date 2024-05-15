/*----------------------For Nav List-----------------------*/
let profileDropdownList = document.querySelector(".profile-dropdown-list");
let btn = document.querySelector(".profile-dropdown-btn");
let classList = profileDropdownList.classList;
const toggle = () => classList.toggle("active");
window.addEventListener("click", function (e) {
  if (!btn.contains(e.target)) classList.remove("active");
});

const Nav = ()=>{
  const user = firebase.auth().currentUser;
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  if(displayName != null || photoURL != null){
  $("#uloger").text(displayName);
  $(".profile-img").css("background-image", "url("+photoURL+")");
  }
}
/******************Nav Items**********************/
//Change Fassword
const changePassword = (currentPassword, newPassword) => {
  // Check if the user is authenticated
const user = firebase.auth().currentUser;
    firebase.auth().signInWithEmailAndPassword(user.email, currentPassword).then(() => {
       user.updatePassword(newPassword)
  .then(()=> {
    firebase.auth().signOut()
    .then(() => {
      console.log("user signed out");
      // Redirect the user to the login page
       Swal.fire({
            title: "Password Changed",
            html: `Please Login Again!`,
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("li");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              window.location.href = "../index.html";
            }
          });
    });
  })
  .catch((error) => {
    console.error('Error updating password:', error);
  });
      }).catch((err) => {
      displayError(err.message);
    });
    
}

const chaPass = document.querySelector('.changepass');
chaPass.addEventListener('click', () => {
  var user = firebase.auth().currentUser;
  Swal.fire({
    title: 'Create New Password',
    html: `<h4 style="text-align: left;">For :<span id="passEmail">${user.email}</span></h4><br><form><div class="pass-group"><label for="oldPassword"><b>Old Password:</b></label><br><input type="password" id="oldPassword" class="swal2-input" required></div><br><div class="pass-group"><label for="newPassword"><b>New Password:</b></label><br><input type="text" id="newPassword" class="swal2-input" required></div><br><div class="pass-group"><label for="confirmPassword"><b>Confirm Password:</b></label><br><input type="password" id="confirmPassword" class="swal2-input" required></div></form>`,
    inputAttributes: {
      'aria-label': 'oldPassword, newPassword, confirmPassword'
    },
    showCancelButton: true,
    confirmButtonText: 'Change',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const oldPass = Swal.getPopup().querySelector('#oldPassword').value;
      const newPass = Swal.getPopup().querySelector('#newPassword').value;
      const conPass = Swal.getPopup().querySelector('#confirmPassword').value;

      if (newPass === conPass) {
        changePassword(oldPass,newPass);
      } else {
        displayError("New password and Confirm Password doesn't match");
      }
    }
  });
  });


//Activating Operation
const operationButton = document.querySelector('.mf-operation');
operationButton.addEventListener('click', () => {
  operationButton.classList.toggle('active');
  const operationButtons = document.querySelectorAll('.operation');
  operationButtons.forEach(button => button.toggleAttribute('hidden'));
});

//Making Logout
const Logout = document.querySelector('.Logout');
Logout.addEventListener('click', () => {
  logout();
});

/******************End Of Nav Items**********************/

/******************Operation Items**********************/

//Delete Data
const deleteData = (key, fundName, fdate) => {
  let id = fundName+key;
  Swal.fire({
    title: "Are you sure?",
    text: "You want to delete entry of Date : "+fdate,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      if (checkAdmin()) {
        firebase.database().ref(fundName).child(key).remove()
        .then(() => {
          let timerInterval;
          Swal.fire({
            title: "Updated",
            html: `<b>The data of ${fdate}, has been deleted successfully.</b>`,
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("li");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              location.reload();
            }
          });
        })
        .catch((error) => {
          displayError(error.message);
        });
     } else {
        displayWarning("Please login from Admin email.");
      }
    }
  });
}


//Update Data
const editData = (oldDate, fundName, fdate) => {
  Swal.fire({
    title: 'Edit Data Of '+fdate,
    html: `<form><div class="form-row"><div class="form-group"><label for="Name"><b>Name:</b></label><br><div class="radio-group"><input type="radio" id="uName1" name="uName" value="Javed Iqbal" class="swal2-input"><label for="uName1">Javed Iqbal</label><br><input type="radio" id="uName2" name="uName" value="Javed & Obaidur" class="swal2-input"><label for="uName2">Javed & Obaidur</label></div></div></div><div class="form-row"><div class="form-group"><label for="fundAmount"><b>Amount:</b></label><input type="number" id="uAmount" class="swal2-input"></div></div><div class="form-row"><div class="form-group"><label for="fundNav"><b>Nav:</b></label><input type="number" id="uNav" class="swal2-input"></div></div><div class="form-row"><div class="form-group"><label for="fundUnit"><b>Unit:</b></label><input type="number" id="uUnit" class="swal2-input"></div></div><div class="form-row"><div class="form-group"><label for="fundDate"><b>Date:</b></label><input type="date" id="uDate" class="swal2-input"></div></div></form>`,
    inputAttributes: {
      'aria-label': 'Name, Fund Amount, Fund Nav, Fund Unit, Date'
    },
    showCancelButton: true,
    confirmButtonText: 'Update',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const uName = Swal.getPopup().querySelector('input[name="uName"]:checked').value;
      const uAmount = Swal.getPopup().querySelector('#uAmount').value;
      const uNav = Swal.getPopup().querySelector('#uNav').value;
      const uUnit = Swal.getPopup().querySelector('#uUnit').value;
      const uDate = Swal.getPopup().querySelector('#uDate').value;

      if (!uName || !uAmount || !uNav || !uUnit || !uDate) {
        Swal.fire("Error", `Please input all the field`, "error");
      } else {
        updateData(fundName, oldDate, uDate, uName, uAmount, uNav, uUnit, fdate);
      }
    }
  });
}

const updateData = (fundName, oldDate, uDate, uName, uAmount, uNav, uUnit, fdate)=> {
  const updates = {};
  updates[oldDate] = null;
  updates[uDate] = {
    name: uName,
    amount: uAmount,
    nav: uNav,
    unit: uUnit
  };
  if (checkAdmin) {
    firebase.database().ref(fundName).update(updates)
    .then(() => {
      let timerInterval;
      Swal.fire({
        title: "Updated",
        html: `<b>The data of ${oldDate} has been updated to ${uDate} successfully.<b>`,
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("li");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          location.reload();
        }
      });
    }).catch((error) => {
      displayError(`Failed to update: ${error.message}`);
    });
  } else {
    displayWarning("Please login from main email.");
  }
}







const Profile = ()=>{
  const user = firebase.auth().currentUser;
user.updateProfile({
  displayName: "Javed Iqbal",
  photoURL: "https://firebasestorage.googleapis.com/v0/b/marcon-b89cd.appspot.com/o/IMG_20240514_142826.jpg?alt=media&token=4c87654e-e911-49ee-9b19-941bc4397ed8"
}).then(() => {
  console.log("update");
}).catch((error) => {
  console.log(error);
});  
}
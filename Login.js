
auth.onAuthStateChanged(user => {
  if (user) {
    window.location.href = "./Login/MutualFund.html";
  } else {
    console.log("no user");
  }
});


// validation
$('#login-button').click((e) => {
  e.preventDefault();
  var email = $("#login-email").val();
  var password = $("#login-pass").val();

  if (email == "" || password == "") {
    displayError("Email & Password can't be empty");
  } else {
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
      user = userCredential.user;
      displaySuccessToast("Sign In Successfully");
    }).catch((err) => {
      displayError(err.message);
    });
  }
});

$('#send-link-button').click((e) => {
  e.preventDefault();
  var email = $("#login-email").val();

  if (email == "") {
    displayError("Enter the email id!");
  } else {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      displaySuccessToast("Link Send");
  
      $("#login-email").val("");
      $("#login-button").css("display", "initial");
      $("#send-link-button").css("display", "none");
      $("#forgot-password-label").css("display", "initial");
      $("#send-link-label").css("display", "none");
      $("#passInput").css("display", "grid");

    }).catch((err) => {
      displayError(err.message);
});
  }
});


/*=============== SHOW HIDDEN - PASSWORD ===============*/

const showHiddenPass = (loginPass, loginEye) =>{

   const input = document.getElementById(loginPass),
         iconEye = document.getElementById(loginEye)

   iconEye.addEventListener('click', () =>{
      // Change password to text
      if(input.type === 'password'){
         // Switch to text
         input.type = 'text'

         // Icon change
         iconEye.classList.add('ri-eye-line')
         iconEye.classList.remove('ri-eye-off-line')
      } else{
         // Change to password
         input.type = 'password'

         // Icon change
         iconEye.classList.remove('ri-eye-line')
         iconEye.classList.add('ri-eye-off-line')
      }
   })
}

showHiddenPass('login-pass','login-eye')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', ()=> {
    navigator.serviceWorker.register('./sw.js').then((reg)=> {
      // Registration was successful
      //console.log('Registration successful with scope: ', reg.scope);
    }, (err)=> {
      // registration failed :(
      // console.log('Registration failed: ', err);
    });
  });
}

let deferredPrompt;
$("#install").css("display", "none");
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  $("#install").css("display", "block");
  $("#install").click((e) => {
    $("#install").css("display", "none");
    deferredPrompt.prompt();
    deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        // console.log('User accepted the A2HS prompt');
      } else {
        //console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});
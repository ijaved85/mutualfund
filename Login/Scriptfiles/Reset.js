
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const handlePasswordReset = (newPassword, actionCode, language) => {
  // Verify the password reset code is valid.
  auth.verifyPasswordResetCode(actionCode)
    .then((email) => {
      const accountEmail = email;
      const newPasss = newPassword;

      // Save the new password.
      return auth.confirmPasswordReset(actionCode, newPasss);
    })
    .then((response) => {
      displaySuccessToast("Password Reset");
      $("#new-pass").val("");
      $("#con-pass").val("");
     setTimeout(() => {
      window.location.href = "./index.html";
    }, 2000);
    })
    .catch((error) => {
      displayErrorToast(error);
    });
};


const handleResetLinkClick = (event) => {
  event.preventDefault();
  const mode = getParameterByName('mode');
  const actionCode = getParameterByName('oobCode');
  const email = getParameterByName('email');
  const language = getParameterByName('lang') || 'en';

  const newPassword = $("#new-pass").val();
  const confirmPassword = $("#con-pass").val();

  if (newPassword !== "" && confirmPassword !== "") {
    if (newPassword === confirmPassword) {
      handlePasswordReset(newPassword, actionCode, language);
    } else {
      displayError("New password doesn't match with confirm password");
    }
  } else {
    displayError("New password and Current password cannot be empty");
  }
};

$('#reset-link-button').click(handleResetLinkClick);



/*=============== SHOW HIDDEN - PASSWORD ===============*/
const showHidePassword = (passwordInputId, eyeIconId) => {
  const passwordInput = document.getElementById(passwordInputId);
  const eyeIcon = document.getElementById(eyeIconId);

  eyeIcon.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      // Switch to text
      passwordInput.type = 'text';

      // Icon change
      eyeIcon.classList.add('ri-eye-line');
      eyeIcon.classList.remove('ri-eye-off-line');
    } else {
      // Change to password
      passwordInput.type = 'password';

      // Icon change
      eyeIcon.classList.remove('ri-eye-line');
      eyeIcon.classList.add('ri-eye-off-line');
    }
  });
};

showHidePassword('new-pass', 'login-eye');


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
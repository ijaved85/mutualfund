//Variable
var email, password, user, errCode, errMessage;

auth.onAuthStateChanged(user => {
  if (user) {
    window.location.href = "./Login/MutualFund";
  } else {
    console.log("no user");
  }
});



$('#password').focusin(() => {
  $('form').addClass('up');
});
$('#password').focusout(() => {
  $('form').removeClass('up');
});

// Panda Eye move
$(document).on("mousemove", (event) => {
  var dw = $(document).width() / 15;
  var dh = $(document).height() / 15;
  var x = event.pageX / dw;
  var y = event.pageY / dh;
  $('.eye-ball').css({
    width: x,
    height: y
  });
});

// validation
$('.btn').click((e) => {
  e.preventDefault();
  email = $("#username").val();
  password = $("#password").val();
  if (email == "" || password == "") {
    swal({
      position: 'center',
      icon: 'error',
      title: 'Invalid Credentials..!!',
      button: false,
      timer: 2000
    });
  } else {
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
      user = userCredential.user;
    }).catch((err) => {
      errCode = err.code;
      errMessage = err.message;

      swal({
        position: 'center',
        icon: 'error',
        title: errMessage,
        button: true,
        timer: 3000
      });
      
    });
  }
});
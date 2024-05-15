//Variable
var owner, auth, email, password;

owner = "8PThQBjGZuRT8RCIn9zusxPtv8J3";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5Vtu_9A0TNg53mt_-hS68A1ZZoTa_rIQ",
  authDomain: "marcon-b89cd.firebaseapp.com",
  databaseURL: "https://marcon-b89cd-default-rtdb.firebaseio.com",
  projectId: "marcon-b89cd",
  storageBucket: "marcon-b89cd.appspot.com",
  messagingSenderId: "247021981840",
  appId: "1:247021981840:web:11d39842edfe024e31c815",
  measurementId: "G-GC2KJ42MT1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
auth = firebase.auth();



const checkAdmin = () =>{
  var user = firebase.auth().currentUser;
  if(user.uid === "8PThQBjGZuRT8RCIn9zusxPtv8J3"){
    return true;
  }else{
    return false;
  }
}

const logout = ()=> {
  Swal.fire({
    title: "Are you sure you want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Logout"
  }).then((result) => {
    if (result.isConfirmed) {
      auth.signOut().then(() => {
        console.log("user signout");
        window.location.href = "../index.html";
      });
      Swal.fire({
        title: "You have Logout",
        icon: "success"
      });
    }
  });
}

const forgotPassword = () => {
  $("#login-button").css("display",
    "none");
  $("#send-link-button").css("display",
    "initial");
  $("#forgot-password-label").css("display",
    "none");
  $("#send-link-label").css("display",
    "initial");
  $("#passInput").css("display",
    "none");
}

const sendLink = () => {
  $("#login-button").css("display",
    "initial");
  $("#send-link-button").css("display",
    "none");
  $("#forgot-password-label").css("display",
    "initial");
  $("#send-link-label").css("display",
    "none");
  $("#passInput").css("display",
    "grid");
}


const funds = [{
  id: '120197', name: 'ICICI Prudential Liquid Fund', value: 'ICICI', holderName: 'Javed Iqbal'
},
  {
    id: '122639', name: 'Parag Parikh Flexi Cap Fund', value: 'PARAG', holderName: 'Javed Iqbal'
  },
  {
    id: '120828', name: 'Quant Small Cap Fund', value: 'QSCF', holderName: 'Javed & Obaidur'
  },
  {
    id: '120847', name: 'Quant ELSS Tax Saver Fund', value: 'QTAX', holderName: 'Javed Iqbal'
  },
  {
    id: '125354', name: 'Axis Small Cap Fund', value: 'ASCF', holderName: 'Javed Iqbal'
  },
  {
    id: '135781', name: 'Mirae Asset ELSS Tax Saver Fund', value: 'MTAX', holderName: 'Javed Iqbal'
  }];

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});






// Extracted functions for displaying toasts
const displaySuccessToast = (message) => {
  Toast.fire({
    icon: "success",
    title: message
  });
};


const displayErrorToast = (message) => {
  Toast.fire({
    icon: "error",
    title: message
  });
};


const displayError = (error) => {
 
  Swal.fire({
    position: 'center',
    icon: 'error',
    text: error,
    showConfirmButton: false,
    timer: 20000
  });
};

const displayWarning = (warning) => {
  Swal.fire({
    icon: "warning",
    position: "center",
    title: "Error",
    text: warning,
    button: false,
    timer: 2000
  });
}
//Variable
var owner, auth, email, password;

owner = "8PThQBjGZuRT8RCIn9zusxPtv8J3";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5Vtu_9A0TNg53mt_-hS68A1ZZoTa_rIQ",
  authDomain: "marcon-b89cd.firebaseapp.com",
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


const logout = ()=> {
  swal({
    title: "Are you sure you want to logout?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("You Have Logout", {
        icon: "success",
      });
      auth.signOut().then(() => {
        console.log("user signout");
        window.location.href = "../index";
      });
    }else{
      window.location.href = "./MutualFund";
    }
  });
}
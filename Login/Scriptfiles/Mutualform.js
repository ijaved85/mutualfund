var uid, i;
auth.onAuthStateChanged(user => {
  uid = user.uid;
  if (user) {
    $("body").css("display", "initial");
  } else {
    window.location.href = "../index";
  }
});


let HolderName, Amount, SipDate, Nav, Unit, fund;
const entry = () => {
  if (uid == owner) {
    Pay();
  } else {
    swal({
      position: 'center',
      icon: 'error',
      title: 'Error',
      text: 'Please login from main email.',
      button: false,
      timer: 2000
    });
  }
}

const Pay = () => {
  if ($('#sel').val() == "ICICI") {

    fund = 'ICICI Prudential Technology Fund/';
    if ($('#hn').is(':checked')) {
      HolderName = "Javed & Obaidur";
    } else {
      HolderName = "Javed Iqbal";
    }

  } else if ($('#sel').val() == "Parag") {

    fund = 'Parag Parikh Flexi Cap Fund/';
    HolderName = "Javed Iqbal";

  } else if ($('#sel').val() == "TaxSaver") {

    fund = 'Mirae Asset Tax Saver Fund - Direct Plan - Growth/';
    HolderName = "Javed Iqbal";

  }else if ($('#sel').val() == "TaxPlan") {

    fund = 'Quant Tax Plan - Growth Option - Direct Plan/';
    HolderName = "Javed Iqbal";

  }  else {

    fund = 'Quant Liquid Fund - Growth Option - Direct Plan/';
    HolderName = "Javed Iqbal";

  }

  Amount = $("#amnt").val();
  SipDate = $("#sipdate").val();
  Nav = $("#navval").val();
  Unit = Amount / Nav;
  if (HolderName == "" || Amount == "" || SipDate == "") {
    alert("Field Empty");
  } else {
    SipDate = dateformat(SipDate);
    firebase.database().ref(fund + SipDate).set(
      {
        name: HolderName,
        amount: Amount,
        nav: Nav,
        unit: Unit
      }, (err)=> {
        if (err) {
          swal({
            position: 'center',
            icon: 'error',
            title: 'Error',
            text: 'Error while adding your data',
            button: false,
            timer: 2000
          });
        } else {
          swal({
            position: 'center',
            icon: 'success',
            title:'Success',
            text: 'Successfully Added',
            button: false,
            timer: 2000
          });
          setInterval(()=> {
            $('#hn')[0].checked;
            $("#amnt").val("");
            $("#sipdate").val("");
            window.location.href = "./MutualFund";
          }, 2000);
        }
      });
  }

}

const reverseString = (str) => {
  // empty string
  let newString = "";
  for (i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
}

const dateformat = (str) => {
  if (str != "") {
    let dd = str.slice(8);
    let mm = str.slice(5, 7);
    let yy = str.slice(0, 4);
    let newdate = dd+' '+monthConvet(mm)+' '+yy;
    return newdate;
  } else {
    return "01 January 2001";
  }
}

const monthConvet = (mm) => {
  console.log(mm);
  if (mm == "01") {
    return 'January';
  } else if (mm == "02") {
    return 'February';
  } else if (mm == "02") {
    return 'March';
  } else if (mm == "04") {
    return 'April';
  } else if (mm == "05") {
    return 'May';
  } else if (mm == "06") {
    return 'June';
  } else if (mm == "07") {
    return 'July';
  } else if (mm == "08") {
    return 'August';
  } else if (mm == "09") {
    return 'September';
  } else if (mm == "10") {
    return 'October';
  } else if (mm == "11") {
    return 'November';
  } else {
    return 'December';
  }
}

$('#sel').change(function() {
  var value = $(this).val();
  console.log(value);
  if (value == "ICICI") {
    $("#siphol").css("display", "initial");
  } else {
    $("#siphol").css("display", "none");
  }
});
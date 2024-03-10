var uid, i;
auth.onAuthStateChanged(user => {
  uid = user.uid;
  if (user) {
    $("body").css("display", "initial");
  } else {
    window.location.href = "../index";
  }
});
const funds = [{
  name: 'ICICI Prudential Liquid Fund', value: 'ICICI', holderName: 'Javed Iqbal'
},
  {
    name: 'Parag Parikh Flexi Cap Fund', value: 'PARAG', holderName: 'Javed Iqbal'
  },
  {
    name: 'Quant Small Cap Fund', value: 'QSCF', holderName: 'Javed & Obaidur'
  },
  {
    name: 'Quant ELSS Tax Saver Fund', value: 'QTAX', holderName: 'Javed Iqbal'
  },
  {
    name: 'Axis Small Cap Fund', value: 'ASCF', holderName: 'Javed Iqbal'
  },
  {
    name: 'Mirae Asset ELSS Tax Saver Fund', value: 'MTAX', holderName: 'Javed Iqbal'
  }];

const sel = document.getElementById('seel');

funds.forEach((fund) => {
  const option = document.createElement('option');
  option.value = fund.value;
  option.textContent = fund.name;
  sel.appendChild(option);
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
  const selValue = $('#seel').val();
  const selectedFund = funds.find(fund => fund.value === selValue);
  console.log(selectedFund);
  if (!selectedFund) {
    alert("Invalid Fund Selection");
    return;
  }

  const Amount = $("#amnt").val();
  const SipDate = $("#sipdate").val();
  const Nav = parseFloat($("#navval").val());
  const Unit = Amount / Nav;
  const FixUnit = Unit.toFixed(3);
  const FixNav = Nav.toFixed(3);
  if (!Amount || !SipDate) {
    alert("Field Empty");
  } else {
    //SipDate = dateformat(SipDate);
    firebase.database().ref(selectedFund.name + '/' + SipDate).set(
      {
        name: selectedFund.holderName,
        amount: Amount,
        nav: FixNav,
        unit: FixUnit
      }, (err) => {
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
            title: 'Success',
            text: 'Successfully Added',
            button: false,
            timer: 2000
          });
          setInterval(() => {
            $('#hn')[0].checked;
            $("#amnt").val("");
            $("#sipdate").val("");
            window.location.href = "./MutualFund";
          }, 2000);
          alert("done");
        }
      });
  }
}

$('#seel').change(function() {
  const value = $(this).val();
  const selectedFund = funds.find(fund => fund.value === value);

  if (selectedFund && selectedFund.holderName === 'Javed & Obaidur') {
    $("#siphol").css("display", "initial");
    console.log(selectedFund, selectedFund.holderName);
  } else {
    $("#siphol").css("display", "none");
    console.log(selectedFund, selectedFund.holderName);
  }
});

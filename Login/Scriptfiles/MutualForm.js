var i;
auth.onAuthStateChanged(user => {
  if (user) {
    $("body").css("display", "initial");
  } else {
    window.location.href = "../index.html";
  }
});

const sel = document.getElementById('seel');

funds.forEach((fund) => {
  const option = document.createElement('option');
  option.value = fund.value;
  option.textContent = fund.name;
  sel.appendChild(option);
});


let HolderName, Amount, SipDate, Nav, Unit, fund, fName;
const entry = () => {
  if (checkAdmin) {
    Pay();
  } else {
    displayWarning("Please login from admin email");
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
  if (selectedFund.holderName === 'Javed Iqbal') {
    fName = selectedFund.holderName;
  } else {
    fName = $("input[name='holdername']:checked").val();
  }
  const SipDate = $("#sipdate").val();
  const Nav = parseFloat($("#navval").val());
  const Unit = Amount / Nav;
  const FixUnit = Unit.toFixed(3);
  const FixNav = Nav.toFixed(4);
  if (!Amount || !SipDate) {
    alert("Field Empty");
  } else {
    //SipDate = dateformat(SipDate);
    firebase.database().ref(selectedFund.name + '/' + SipDate).set(
      {
        name: fName,
        amount: Amount,
        nav: FixNav,
        unit: FixUnit
      }, (err) => {
        if (err) {
displayError(err.message);
        } else {
          displaySuccessToast("Successfully Added");
          setInterval(() => {
            $('#hn')[0].checked;
            $("#amnt").val("");
            $("#sipdate").val("");
            window.location.href = "./MutualFund.html";
          }, 2000);

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
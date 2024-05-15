
auth.onAuthStateChanged(user => {
  if (user) {
    $("body").css("display", "initial");
  } else {
    window.location.href = "../index.html";
  }
});

let Invested = 0;
let Current = 0;
let TotalReturn = 0;
var TotalAmount = 0;
var CurrentNAV = 0;
var TotalUnit = 0;
var SIPRedeem = 0;
var fillData, Key, Data, date, name, amount, nav, unit, calc, res, data, PAL, rowName, id;

const baseApiUrl = 'https://api.mfapi.in/mf/';
const fetchDataForFund = async (fundId) => {
  const url = `${baseApiUrl}${fundId}`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  return data;
};


const fetchAllData = async () => {
  const allData = [];
  for (const fund of funds) {
    const data = await fetchDataForFund(fund.id);
    // Extract necessary data from the response
    const fundData = {
      id: fund.id,
      name: fund.name,
      nav: data.data[0].nav,
    };
    allData.push(fundData);
  }
  return allData;
};


fetchAllData().then((data) => {
  var i = 1;
  data.forEach((fundData) => {
    let addTab = "";

    firebase.database().ref(fundData.name).once('value',
      (snap)=> {
        addTab += createTable(i);
        $('#MainTable').append(addTab);

        let addRow, addCal;
        snap.forEach((fire)=> {
          Key = fire.key;
          Data = fire.val();
          let dateString = Key;
          name = Data.name;
          amount = Data.amount;
          nav = Data.nav;
          unit = Data.unit;
          calc = Number(amount);
          TotalAmount += calc;
          calc = Number(unit);
          TotalUnit += calc;
          date = new Date(dateString);
          let options = {
            day: '2-digit', month: 'short', year: 'numeric'
          };
          let formattedDate = date.toLocaleDateString('en-IN', options);

          /*---------------------Fund Data-----------------*/
          $('#FundName'+i).text(fundData.name);
          rowName = fundData.name+Key;
          addRow += '<tr id="'+rowName+'"><td data-label="Date">'+formattedDate+'</td><td data-label="Name">'+name+'</td><td data-label="Amount">₹ '+amount+'</td><td data-label="Nav">'+nav+'</td><td data-label="Unit">'+unit+'</td><td class="operation" onclick="deleteData(\''+Key+'\',\''+fundData.name+'\',\''+formattedDate+'\')" hidden><i class="fa fa-trash-o" aria-hidden="true"></i></td><td class="operation" onclick="editData(\''+Key+'\',\''+fundData.name+'\',\''+formattedDate+'\')" hidden><i class="fa fa-pencil-square-o" aria-hidden="true"></i></td></tr>';
        });
        $('#table_data'+i).append(addRow);


        //Calculation
        CurrentNAV = fundData.nav;
        SIPRedeem = (CurrentNAV * TotalUnit).toFixed(3);
        Current += Number(SIPRedeem);
        PAL = (SIPRedeem - TotalAmount).toFixed(3);
        Invested += TotalAmount;
        calc = TotalAmount.toFixed(2);
        TotalAmount = calc;

        /*----------------------Fund Main Data---------------*/
        addCal = '<tr id="sdata"><td data-label="Total Amount">₹ '+TotalAmount+'</td><td data-label="Current NAV">'+CurrentNAV+'</td><td data-label="Total Unit">'+TotalUnit+'</td><td data-label="Redeem">₹ '+SIPRedeem+'</td><td data-label="P&L" id="PAL'+i+'">₹ '+PAL+'</td></tr>';
        $('#Summary_data'+i).append(addCal);

        $("#PAL"+i).css("fontWeight", "bold");
        $("#sdata").css("backgroundColor", "#dfe6e9");

        if (PAL > 1) {
          $("#PAL"+i).css("backgroundColor", "#00b894");
        } else {
          $("#PAL"+i).css("color", "#fff");
          $("#PAL"+i).css("backgroundColor", "#d63031");
        }

        i++;
        TotalAmount = 0;
        CurrentNAV = 0;
        TotalUnit = 0;
        SIPRedeem = 0;
        PAL = 0;

        Invested = Math.round(Invested);
        Current = Math.round(Current);
        TotalReturn = Current - Invested;

        /*------------------------Main Data-----------------*/
        $('#Main_data').text("");
        addCal = '<tr id="mdata"><td data-label="Invested">₹ '+Invested+'</td><td data-label="Current">₹ '+Current+'</td><td data-label="Total Returns" id="TR">₹ '+TotalReturn+'</td></tr>';
        $('#Main_data').append(addCal);

        //Filling Data
        $("#TR").css("fontWeight", "bold");
        $("#mdata").css("backgroundColor", "#dfe6e9");

        if (TotalReturn >= 0) {
          $("#TR").css("backgroundColor", "#00b894");
        } else {
          $("#TR").css("color", "#fff");
          $("#TR").css("backgroundColor", "#d63031");
        }
      });
  });
  fade();
}).catch((error) => {
  console.error(error);
});


/***************Create Heading For Table*************/
const createTable = (i)=> {
  let creTab;
  creTab = '<h1 id="FundName'+i+'">Fnud Name</h1><br><table class="table"><thead><tr><th>Date</th><th>Name</th><th>Amount</th><th>Nav</th><th>Unit</th><th colspan="2" class="operation" hidden>Operation</th></tr></thead><tbody id="table_data'+i+'"></tbody></table><table class="table summary"><thead><tr><th>Total Amount</th><th>Current NAV</th><th>Total Unit</th><th>Current Amount</th><th>P&L</th></tr></thead><tbody id="Summary_data'+i+'"></tbody></table><br><br>';
  return creTab;
}
//Fade Out
const fade = ()=> {
  Nav();
  setTimeout(() => {
    $("#datta").css("display",
      "initial");
    $("#preloader").css("display",
      "none");
    $(".navbar").css("display", "flex");
  },
    5000);
}
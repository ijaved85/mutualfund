auth.onAuthStateChanged(user => {
  if (user) {
    $("body").css("display", "initial");

  } else {
    window.location.href = "../index";
  }
});
var Invested = 0; var Current = 0; var TotalReturn = 0;
var fillData, Key, Data, date, name, amount, nav, unit, calc, res, data, res2, res3, res4, data2, data3, data4, pal, api_url, api_url2, api_url3, api_url4;

var TotalAmount = 0;
var CurrentNAV = 0;
var CurrentNAV2 = 0;
var CurrentNAV3 = 0;
var CurrentNAV4 = 0;
var TotalUnit = 0;
var SIPRedeem = 0;

api_url = 'https://api.mfapi.in/mf/120594';
api_url2 = 'https://api.mfapi.in/mf/122639';
api_url3 = 'https://api.mfapi.in/mf/120837';
api_url4 = 'https://api.mfapi.in/mf/120847';
const api = async()=> {
  // fetching
  res = await fetch(api_url);
  res2 = await fetch(api_url2);
  res3 = await fetch(api_url3);
  res4 = await fetch(api_url4);
  data = await res.json();
  data2 = await res2.json();
  data3 = await res3.json();
  data4 = await res4.json();
  CurrentNAV = data.data[0].nav;
  CurrentNAV2 = data2.data[0].nav;
  CurrentNAV3 = data3.data[0].nav;
  CurrentNAV4 = data4.data[0].nav;
  $('#FundName1').text(capi(data.meta.scheme_name));
  $('#FundName2').text(capi(data2.meta.scheme_name));
  $('#FundName3').text(capi(data3.meta.scheme_name));
  $('#FundName4').text(capi(data4.meta.scheme_name));
  getdata();
}

const getdata = ()=> {
  $('#table_data').text("");
  $('#Summary_data').text("");
  firebase.database().ref('ICICI Prudential Technology Fund').once('value',
    (snap)=> {
      snap.forEach((fire)=> {
        Key = fire.key;
        Data = fire.val();
        date = Key;
        name = Data.name;
        amount = Data.amount;
        nav = Data.nav;
        unit = (Data.unit).toFixed(3);
        // unit = unit.toFixed(3);

        //Storing The Data In A Variable
        fillData += '<tr><td data-label="Date">'+date+'</td><td data-label="Name">'+name+'</td><td data-label="Amount">₹ '+amount+'</td><td data-label="Nav">'+nav+'</td><td data-label="Unit">'+unit+'</td></tr>';

        calc = Number(amount);
        TotalAmount += calc;
        calc = Number(unit);
        TotalUnit += calc;
      });

      //Pussing Data In The Table
      $('#table_data').append(fillData);

      //Calculation
      SIPRedeem = (CurrentNAV * TotalUnit).toFixed(3);
      Current += Number(SIPRedeem);
      pal = (SIPRedeem - TotalAmount).toFixed(3);
      Invested += TotalAmount;

      fillData = '<tr  id="sdata"><td data-label="Total Amount">₹ '+TotalAmount+'</td><td data-label="Current NAV">'+CurrentNAV+'</td><td data-label="Total Unit">'+TotalUnit+'</td><td data-label="SIP Redeem">₹ '+SIPRedeem+'</td><td data-label="P&L" id="pal">₹ '+pal+'</td></tr>';

      $('#Summary_data').append(fillData);

      $("#pal").css("fontWeight", "bold");
      $("#sdata").css("backgroundColor", "#dfe6e9");

      if (SIPRedeem > TotalAmount) {
        $("#pal").css("backgroundColor", "#00b894");
      } else {
        $("#pal").css("color", "#fff");
        $("#pal").css("backgroundColor", "#d63031");
      }
    });
  getdata2();
}

const getdata2 = ()=> {
  $('#table_data2').text("");
  $('#Summary_data2').text("");

  firebase.database().ref('Parag Parikh Flexi Cap Fund').once('value',
    (snap)=> {
      fillData = "";
      TotalAmount = 0;
      TotalUnit = 0;
      SIPRedeem = 0;
      snap.forEach((fire)=> {
        Key = fire.key;
        Data = fire.val();
        date = Key;
        name = Data.name;
        amount = Data.amount;
        nav = Data.nav;
        unit = (Data.unit).toFixed(3);
        fillData += '<tr><td data-label="Date">'+date+'</td><td data-label="Name">'+name+'</td><td data-label="Amount">₹ '+amount+'</td><td data-label="Nav">'+nav+'</td><td data-label="Unit">'+unit+'</td></tr>';

        calc = Number(amount);
        TotalAmount += calc;
        calc = Number(unit);
        TotalUnit += calc;
      });
      $('#table_data2').append(fillData);
      SIPRedeem = (CurrentNAV2 * TotalUnit).toFixed(3);
      Current += Number(SIPRedeem);
      pal = (SIPRedeem - TotalAmount).toFixed(3);
      Invested += TotalAmount;

      fillData = '<tr  id="sdata2"><td data-label="Total Amount">₹ '+TotalAmount+'</td><td data-label="Current NAV">'+CurrentNAV2+'</td><td data-label="Total Unit">'+TotalUnit+'</td><td data-label="SIP Redeem">₹ '+SIPRedeem+'</td><td data-label="P&L" id="pal2">₹ '+pal+'</td></tr>';

      //Filling Data
      $('#Summary_data2').append(fillData);

      $("#pal2").css("fontWeight", "bold");
      $("#sdata2").css("backgroundColor", "#dfe6e9");

      if (SIPRedeem > TotalAmount) {
        $("#pal2").css("backgroundColor", "#00b894");
      } else {
        $("#pal2").css("color", "#fff");
        $("#pal2").css("backgroundColor", "#d63031");
      }
      getdata3();
    });
}

const getdata3 = ()=> {
  $('#table_data3').text("");
  $('#Summary_data3').text("");

  firebase.database().ref('Quant Liquid Fund - Growth Option - Direct Plan').once('value',
    (snap)=> {
      fillData = "";
      TotalAmount = 0;
      TotalUnit = 0;
      SIPRedeem = 0;
      snap.forEach((fire)=> {
        Key = fire.key;
        Data = fire.val();
        date = Key;
        name = Data.name;
        amount = Data.amount;
        nav = Data.nav;
        unit = (Data.unit).toFixed(3);
        fillData += '<tr><td data-label="Date">'+date+'</td><td data-label="Name">'+name+'</td><td data-label="Amount">₹ '+amount+'</td><td data-label="Nav">'+nav+'</td><td data-label="Unit">'+unit+'</td></tr>';

        calc = Number(amount);
        TotalAmount += calc;
        calc = Number(unit);
        TotalUnit += calc;
      });
      $('#table_data3').append(fillData);
      SIPRedeem = (CurrentNAV3 * TotalUnit).toFixed(3);
      Current += Number(SIPRedeem);
      pal = (SIPRedeem - TotalAmount).toFixed(3);
      Invested += TotalAmount;

      fillData = '<tr  id="sdata3"><td data-label="Total Amount">₹ '+TotalAmount+'</td><td data-label="Current NAV">'+CurrentNAV3+'</td><td data-label="Total Unit">'+TotalUnit+'</td><td data-label="SIP Redeem">₹ '+SIPRedeem+'</td><td data-label="P&L" id="pal3">₹ '+pal+'</td></tr>';

      //Filling Data
      $('#Summary_data3').append(fillData);

      $("#pal3").css("fontWeight", "bold");
      $("#sdata3").css("backgroundColor", "#dfe6e9");

      if (SIPRedeem > TotalAmount) {
        $("#pal3").css("backgroundColor", "#00b894");
      } else {
        $("#pal3").css("color", "#fff");
        $("#pal3").css("backgroundColor", "#d63031");
      }
      getdata4();
    });
}


const getdata4 = ()=> {
  $('#table_data4').text("");
  $('#Summary_data4').text("");

  firebase.database().ref('Quant Tax Plan - Growth Option - Direct Plan').once('value',
    (snap)=> {
      fillData = "";
      TotalAmount = 0;
      TotalUnit = 0;
      SIPRedeem = 0;
      snap.forEach((fire)=> {
        Key = fire.key;
        Data = fire.val();
        date = Key;
        name = Data.name;
        amount = Data.amount;
        nav = Data.nav;
        unit = (Data.unit).toFixed(3);
        fillData += '<tr><td data-label="Date">'+date+'</td><td data-label="Name">'+name+'</td><td data-label="Amount">₹ '+amount+'</td><td data-label="Nav">'+nav+'</td><td data-label="Unit">'+unit+'</td></tr>';

        calc = Number(amount);
        TotalAmount += calc;
        calc = Number(unit);
        TotalUnit += calc;
      });
      $('#table_data4').append(fillData);
      SIPRedeem = (CurrentNAV4 * TotalUnit).toFixed(3);
      Current += Number(SIPRedeem);
      pal = (SIPRedeem - TotalAmount).toFixed(3);
      Invested += TotalAmount;

      fillData = '<tr  id="sdata4"><td data-label="Total Amount">₹ '+TotalAmount+'</td><td data-label="Current NAV">'+CurrentNAV4+'</td><td data-label="Total Unit">'+TotalUnit+'</td><td data-label="SIP Redeem">₹ '+SIPRedeem+'</td><td data-label="P&L" id="pal4">₹ '+pal+'</td></tr>';

      //Filling Data
      $('#Summary_data4').append(fillData);

      $("#pal4").css("fontWeight", "bold");
      $("#sdata4").css("backgroundColor", "#dfe6e9");

      if (SIPRedeem > TotalAmount) {
        $("#pal4").css("backgroundColor", "#00b894");
      } else {
        $("#pal4").css("color", "#fff");
        $("#pal4").css("backgroundColor", "#d63031");
      }
      mainInfo();
    });
}

const mainInfo = () => {
  $('#Main_data').text("");
  TotalReturn = (Current - Invested).toFixed(2);
  console.log(Invested,
    Current,
    TotalReturn)
  fillData = '<tr id="mdata"><td data-label="Invested">₹ '+Invested+'</td><td data-label="Current">₹ '+Current+'</td><td data-label="Total Returns" id="TR">₹ '+TotalReturn+'</td></tr>';

  //Filling Data
  $('#Main_data').append(fillData);

  $("#TR").css("fontWeight",
    "bold");
  $("#mdata").css("backgroundColor",
    "#dfe6e9");

  if (TotalReturn >= 0) {
    $("#TR").css("backgroundColor", "#00b894");
  } else {
    $("#TR").css("color", "#fff");
    $("#TR").css("backgroundColor", "#d63031");
  }
  fade();
}

const fade = ()=> {
  $("#datta").css("display",
    "initial");
  $("#preloader").css("display",
    "none");
}

const capi = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
window.onload = api;
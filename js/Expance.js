function loadExpanceLimit() {
  let Amt = localStorage.getItem("Amount");
  if (!Amt) {
    document.getElementById("Balance").innerHTML = `Avalible Balance:0`;
  } else {
    document.getElementById("Balance").innerHTML = `Avalible Balance:${Amt}`;
  }
}
function AddAmt() {
  let Amt = document.getElementById("AddExpanceLimit").value;
  let amt = localStorage.getItem("Amount");
  if (!amt) {
    document.getElementById("Balance").innerHTML = `Avalible Balance:${Amt}`;
    localStorage.setItem("Amount", Amt);
  } else {
    let finnal = parseInt(Amt) + parseInt(amt);
    localStorage.setItem("Amount", finnal);
    loadExpanceLimit();
  }
}

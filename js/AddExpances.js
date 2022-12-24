const AddExpanceBtn = document.getElementById("AddExpance");
const CategoryList = document.getElementById("AddExpanceCategory");
const ExpanceName = document.getElementById("ExpanceName");
const ExpanceAmount = document.getElementById("ExpanceAmount");
const Description = document.getElementById("ExpanceDescription");
data = [];

const GetData = () => {
  if (localStorage.getItem("data") != null)
    data = JSON.parse(localStorage.getItem("data"));
};
const UpdateLclStorage = () => {
  localStorage.setItem("data", JSON.stringify(data));
};
var FillCategoryFlag = 0;
const loadAddExpances = () => {
  GetData();
  SeletedCategoryIndex = -1;
  if (FillCategoryFlag == 0) {
    data.forEach((Current, Index, array) => {
      let option = document.createElement("option");
      option.value = Current.Name;
      option.text = Current.Name;

      CategoryList.appendChild(option);
    });
    FillCategoryFlag = -1;
  }

  document.getElementById("ExpanceName").disabled = true;
  document.getElementById("ExpanceDescription").disabled = true;
  document.getElementById("ExpanceAmount").disabled = true;
};
AddExpanceBtn.addEventListener("click", () => {
  var text = CategoryList.options[CategoryList.selectedIndex].text;
  data.forEach((Current, index, array) => {
    if (Current.Name == text) {
      // CategoryJson = {
      //   Name: CatName,
      //   ExpanceLimit: Exp,
      //   ExpanceName: [],
      //   ExpanceDescription: [],
      //   ExpanceAmount: [],
      // };
      Current.ExpanceName.push(ExpanceName.value);
      Current.ExpanceDescription.push(Description.value);
      Current.ExpanceAmount.push(ExpanceAmount.value);
      // let currentamt=data[index].AvalibleAmount
      // console.log(currentamt);
      data[index].AvalibleAmount =
        data[index].AvalibleAmount - ExpanceAmount.value;
    }
  });
  UpdateLclStorage();
  alert(`Add ${ExpanceName.value} In ${text} Category`);
  loadAddExpances();
});

const IndexofCategory = () => {
  SeletedCategoryIndex =
    document.getElementById("AddExpanceCategory").selectedIndex - 1;
  if (SeletedCategoryIndex != -1) {
    document.getElementById("ExpanceName").disabled = false;
    document.getElementById("ExpanceDescription").disabled = false;
    document.getElementById("ExpanceAmount").disabled = false;
  }
};

// Testing
var ExpanceLimitAlertFlag = 0;
const CheckExpanceLimit = (e) => {
  AvalibleBalance = localStorage.getItem("Avalible");
  let indexvalue = data[SeletedCategoryIndex].ExpanceLimit;
  let Expancevalue = document.getElementById("ExpanceAmount").value;
  console.log(indexvalue);
  if (
    parseInt(Expancevalue) <=
    parseInt(data[SeletedCategoryIndex].AvalibleAmount)
  ) {
    document.getElementById("ExpanceAmount").style.color = "black";
    ExpanceLimitAlertFlag = 0;
  } else {
    document.getElementById("ExpanceAmount").style.color = "red";
    if (ExpanceLimitAlertFlag == 0) {
      if (
        confirm(
          `It is Above ${data[SeletedCategoryIndex].Name} Category Limit Or Total Expance Limit Can you Add Expance ???`
        ) != true
      ) {
        document.getElementById("ExpanceAmount").value = "";
        document.getElementById("ExpanceDescription").value = "";
        document.getElementById("ExpanceName").value = "";
        document.getElementById("AddExpanceCategory").selectedIndex = "0";
      }
      ExpanceLimitAlertFlag = 1;
    }
  }
};

const AddExpanceBtn = document.getElementById("AddExpance");
const CategoryList = document.getElementById("AddExpanceCategory");
const ExpanceName = document.getElementById("ExpanceName");
const ExpanceAmount = document.getElementById("ExpanceAmount");
const Description = document.getElementById("ExpanceDescription");
data=[]

const GetData = () => {
    if(localStorage.getItem("data")!=null)
       data = JSON.parse(localStorage.getItem("data"));
   };
const UpdateLclStorage = () => {
    localStorage.setItem("data", JSON.stringify(data));
  };
const loadAddExpances = () => {
    GetData();
    let Avalible = localStorage.getItem("Avalible");
    data.forEach((Current, Index, array) => {
      let option = document.createElement("option");
      option.value = Current.Name;
      option.text = Current.Name;
      CategoryList.appendChild(option);
    });
    if (Avalible < 1) {
      document.getElementById("ExpanceName").disabled = true;
      document.getElementById("ExpanceDescription").disabled = true;
      document.getElementById("ExpanceAmount").disabled = true;
      document.getElementById("AddExpanceCategory").disabled = true;
    }
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
      }
    });
    UpdateLclStorage();
    alert(`Add ${ExpanceName.value} In ${text} Category`);
    loadAddExpances();
  });
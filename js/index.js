let data=[]
const GetData = () => {
  data = JSON.parse(localStorage.getItem("data"));
};
const UpdateLclStorage = () => {
  localStorage.setItem("data", JSON.stringify(data));
};

const loadindex=()=> {
    GetData();
    if (data.length != 0) {
      const CategoryTbl = document.getElementById("CategoryTbl");
      const ExpanceTbl = document.getElementById("ExpanceTbl");
      CategoryTbl.innerHTML = `<caption>
      <h3>Category</h3>
    </caption>
    <tr>
      <th>SR</th>
      <th>Category</th>
      
    </tr>`;
      ExpanceTbl.innerHTML = `<caption>
      <h3>Expances</h3>
    </caption>
    <tr>
      <th style="width:15%">Category</th>
      <th style="width:15%">Expance</th>
      <th style="width:40%;text-align: center;overflow: hidden;">Description</th>
      <th style="width:10%">Amount</th>
      <th>&nbsp</th>
      <th>&nbsp</th>
    </tr>`;
    TotalExpanceAmount=0
      data.forEach((cur, index, array) => {
        let length = cur.ExpanceName.length;
  
        cur.ExpanceName.forEach((current, index, array) => {
           TotalExpanceAmount+=parseInt(cur.ExpanceAmount[index])  
          
          let tbldata = `
          <tr>
          <td value="${cur.Name}" id="Id">${cur.Name}</td>
          <td value="${current}" id="Id">${current}</td>
          <td value="${cur.ExpanceDescription[index]}" id="Id" style="column">${cur.ExpanceDescription[index]}</td>
          <td value="${cur.ExpanceAmount[index]}" id="Id">${cur.ExpanceAmount[index]}</td>
          
          
          <td><button id="EditCategory" onclick="EditExpance(this)" value="${index}">Edit</button></td>
          <td><button id="DeleteCategory" onclick="DeleteExpance(this)" value="${index}">Delete</button></td>
          
          </tr>
          `;
  
          ExpanceTbl.insertAdjacentHTML("beforeend", tbldata);
        });
      });
  
      data.forEach((cur, index, arr) => {
        let tbldata = `
          <tr>
          <td value="${index + 1}" id="Id">${index + 1}</td>
  
          <td value="${
            cur.Name
          }" style="cursor: pointer;" onclick="FilterCategory(this)">${
          cur.Name
        }</td>
          
          </tr>
          `;
  
        CategoryTbl.insertAdjacentHTML("beforeend", tbldata);
      });
    } else {  
      console.log("data not Found");
      const DivClass = document.getElementById("row");
      DivClass.innerHTML = "Data Not Found";
    }
  
    let amt = localStorage.getItem("Amount");
    document.getElementById("expanceLimitAmount").innerHTML = `${amt}`;
    document.getElementById("TotalExpanceAmount").innerHTML = `${TotalExpanceAmount}`;
    
    AvalibleBalance = parseInt(amt) - parseInt(TotalExpanceAmount);
    localStorage.setItem("Avalible", AvalibleBalance);
    document.getElementById(
      "AvalibleBalanceAmount"
    ).innerHTML = `${AvalibleBalance}`;
    TotalExpanceAmount = 0;
  }
  
const EditExpance=(o)=> {
    editValue=o.value
    console.log(editValue)
    const EditCategoryList=document.getElementById('EditExpanceCategory')
    GetData();
        document.getElementById('InfoTbl').style.display = "none";
        document.getElementById('EditTbl').style.display = "inline-table";
        let Avalible = localStorage.getItem("Avalible");
    data.forEach((Current, Index, array) => {
      
      let option = document.createElement("option");
      option.value = Current.Name;
      option.text = Current.Name;
      EditCategoryList.appendChild(option);})
      var p = o.parentNode.parentNode;
      document.getElementById("ExpanceNameTxt").value = p.childNodes[3].innerHTML;
      document.getElementById("ExpanceDescriptionTxt").value = p.childNodes[5].innerHTML;
      document.getElementById("ExpanceAmountTxt").value = p.childNodes[7].innerHTML;
      CategoryName=o.parentNode.parentNode.childNodes[1].innerHTML;
      
      let selectObj=document.getElementById("EditExpanceCategory")
      
      for (var i = 0; i < selectObj.options.length; i++) {
        if (selectObj.options[i].text== CategoryName) {
            selectObj.options[i].selected = true;
            return;
        }
    }
  
    index = o.value;
  
  }
const SaveEditExpances=()=>
  {
    
    let CategoryList=document.getElementById("EditExpanceCategory")
    var text = CategoryList.options[CategoryList.selectedIndex].text;
    let ExpanceName=document.getElementById("ExpanceNameTxt")
    let Description=document.getElementById("ExpanceDescriptionTxt")
    let ExpanceAmount=document.getElementById("ExpanceAmountTxt")
    if(CategoryName==text)
    {
      data.forEach((Current, index, array) => {
        if (Current.Name == text) {
          // CategoryJson = {
          //   Name: CatName,
          //   ExpanceLimit: Exp,
          //   ExpanceName: [],
          //   ExpanceDescription: [],
          //   ExpanceAmount: [],
          // };
          console.log(editValue)
          let a = Current.ExpanceName.splice(editValue, 1,ExpanceName.value);
          let b = Current.ExpanceDescription.splice(editValue, 1,Description.value);
          let c = Current.ExpanceAmount.splice(editValue, 1,ExpanceAmount.value);
          editValue=0
          // Current.ExpanceName.push(ExpanceName.value);
          // Current.ExpanceDescription.push(Description.value);
          // Current.ExpanceAmount.push(ExpanceAmount.value);
        }
      });
      UpdateLclStorage();
      document.getElementById('InfoTbl').style.display = "inline-table";
        document.getElementById('EditTbl').style.display = "none";
      loadindex();
      // alert(`Add ${ExpanceName.value} In ${text} Category`);
      
    }
    else
    {
      console.log(editValue);
  
    }
  }
  const DeleteExpance=(o)=> {
    let value = o.value;
    let CatName = o.parentNode.parentNode.childNodes[1].innerHTML;
    data.forEach((current, index, array) => {
      if (current.Name == CatName) {
        let a = current.ExpanceName.splice(value, 1);
        let b = current.ExpanceDescription.splice(value, 1);
        let c = current.ExpanceAmount.splice(value, 1);
      }
    });
  
    UpdateLclStorage();
    loadindex();
  }
  
  // Filter
  var prevRow = null;
  var prevColor = null;
  const FilterCategory=(o)=> {
    let FilterCategoryName = o.innerHTML;
    
    let CatExpance = 0;
    let TotalCatexpance = 0;
    if (prevRow != null) {
      prevRow.style.backgroundColor = prevColor;
    }
    prevRow = o;
    prevColor = o.style.backgroundColor;
    if (o.style.backgroundColor == "none" || o.style.backgroundColor == "") {
      o.style.backgroundColor = "yellow";
    } else {
      o.style.backgroundColor = "";
    }
  
    data.forEach((cur, index, array) => {
      if (cur.Name == FilterCategoryName) {
        TotalCatexpance = cur.ExpanceLimit;
        ExpanceTbl.innerHTML = `<caption>
      <h3>Expances</h3>
    </caption>
    <tr>
      <th>Category</th>
      <th>Expance</th>
      <th>Description</th>
      <th>Amount</th>
      <th>&nbsp</th>
      <th>&nbsp</th>
    </tr>`;
        cur.ExpanceName.forEach((current, index, array) => {
          CatExpance += parseInt(cur.ExpanceAmount[index]);
          let tbldata = `
      <tr>
      <td value="${cur.Name}" id="Id">${cur.Name}</td>
      <td value="${current}" id="Id">${current}</td>
      <td value="${cur.ExpanceDescription[index]}" id="Id">${cur.ExpanceDescription[index]}</td>
      <td value="${cur.ExpanceAmount[index]}" id="Id">${cur.ExpanceAmount[index]}</td>
      
      <td><button id="EditCategory" onclick="EditExpance(this) value="${index}">Edit</button></td>
      
      <td><button id="DeleteCategory" onclick="DeleteExpance(this)" value="${index}">Delete</button></td>
      
      </tr>
      `;
  
          ExpanceTbl.insertAdjacentHTML("beforeend", tbldata);
        });
      }
    });
    document.getElementById(
      "expanceLimitLbl"
    ).innerHTML = `${FilterCategoryName} Category Expance Limit:`;
    document.getElementById(
      "expanceLimitAmount"
    ).innerHTML = `${TotalCatexpance}`;
    document.getElementById(
      "TotalExpanceLbl"
    ).innerHTML = `Total Expance Of ${FilterCategoryName} Category`;
    document.getElementById("TotalExpanceAmount").innerHTML = `${CatExpance}`;
    document.getElementById("AvalibleBalanceLbl").style.visibility = "hidden";
    document.getElementById("AvalibleBalanceAmount").style.visibility = "hidden";
  }
  
  
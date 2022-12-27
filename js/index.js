let data=[]
const GetData = () => {
  data = JSON.parse(localStorage.getItem("data"));
};
const UpdateLclStorage = () => {
  localStorage.setItem("data", JSON.stringify(data));
};


AvalibleBalance = localStorage.getItem("Avalible");








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
      <th style="width:40%;text-align: center;">Description</th>
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
          <td value="${cur.Name}" id="Id" style="width:15%">${cur.Name}</td>
          <td value="${current}" id="Id" style="width:15%">${current}</td>
          
          <td style="width:100px;">
              ${cur.ExpanceDescription[index]}</td>
          <td value="${cur.ExpanceAmount[index]}" id="Id" style="width:10%">${cur.ExpanceAmount[index]}</td>
          
          
          <td><button id="EditCategory" onclick="EditExpance(this)" value="${index}">Edit</button></td>
          <td><button id="DeleteCategory" onclick="DeleteExpance(this)" value="${index}">Delete</button></td>
          
          </tr>
          `;
          
          ExpanceTbl.insertAdjacentHTML("beforeend", tbldata);
        });

      });
  
      data.forEach((cur, index, arr) => {
        let tbldata = `
          <tr id="Category${index}">
          <td value="${index + 1}" id="Id">${index + 1}</td>
  
          <td value="${
            cur.Name
          }" style="cursor: pointer;" onclick="FilterCategory(this)">${
          cur.Name
        }</td>
          <td><img src="alert-icon-red-11.png" style="width:30%;display:none" id="img${index}"></td>
          </tr>
          `;
        
        CategoryTbl.insertAdjacentHTML("beforeend", tbldata);
        if(parseInt(data[index].AvalibleAmount)<0)
        {
          document.getElementById(`Category${index}`).style.color="red"
          document.getElementById(`img${index}`).style.display="inline-table"
        }
        else
        {
          document.getElementById(`Category${index}`).style.color="black"
        }
        
      });
    } else {  
      console.log("data not Found");
      const DivClass = document.getElementById("row");
      document.getElementById('InfoTbl').style.display="none"
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








  var FillCategoryFlag = 0;
  const EditExpance=(o)=> {
    
      editValue=o.value
      // console.log(editValue)
      const EditCategoryList=document.getElementById('EditExpanceCategory')
      GetData();
      SeletedCategoryIndex = -1;
          document.getElementById('InfoTbl').style.display = "none";
          document.getElementById('EditTbl').style.display = "inline-table";
          // let Avalible = localStorage.getItem("Avalible");
          if (FillCategoryFlag == 0) {
      data.forEach((Current, Index, array) => {
        
        let option = document.createElement("option");
        option.value = Current.Name;
        option.text = Current.Name;
        EditCategoryList.appendChild(option);})
        FillCategoryFlag = -1;
      }
        var p = o.parentNode.parentNode;
        CurrentExpanceAmount=p.childNodes[7].innerHTML
        document.getElementById("ExpanceNameTxt").value = p.childNodes[3].innerHTML;
        document.getElementById("ExpanceDescriptionTxt").value = p.childNodes[5].innerHTML;
        document.getElementById("ExpanceAmountTxt").value = p.childNodes[7].innerHTML;
        CategoryName=o.parentNode.parentNode.childNodes[1].innerHTML;
        
        let selectObj=document.getElementById("EditExpanceCategory")
        
        for (var i = 0; i < selectObj.options.length; i++) {
          if (selectObj.options[i].text== CategoryName) {
              selectObj.options[i].selected = true;
              SeletedCategoryIndex=i-1
              
  
              return;
          }
      }
    
      index = o.value;
    
    }
  











var ExpanceLimitAlertFlag = 0;
const CheckExpanceLimit = (e) => {
  
  
  let Expancevalue = document.getElementById("ExpanceAmountTxt").value;
  let CategoryAvalibleBalance=data[SeletedCategoryIndex].AvalibleAmount
  
  
  if(ExitExpanceCategoryChange==0)
  {
  //   console.log("Expance Value",Expancevalue)
  // console.log("Avable value Value",CategoryAvalibleBalance)
    if(parseInt(Expancevalue)<parseInt(CategoryAvalibleBalance))
    {
      // console.log("Expance Value",Expancevalue)
      // console.log("Avable value Value",CategoryAvalibleBalance)
      document.getElementById("ExpanceAmountTxt").style.color="black";
      ExpanceLimitAlertFlag= 0;
    }
    else
    {
      document.getElementById("ExpanceAmountTxt").style.color="red";
      console.log("Expance Value",Expancevalue)
      console.log("Avable value Value",CategoryAvalibleBalance)
      if (ExpanceLimitAlertFlag == 0)
      {
        if (
          confirm(`It is Above ${data[SeletedCategoryIndex].Name} Category Limit Or Total
          Expance Limit Can you Add Expance ???`
          ) != true)
          {
            document.getElementById('InfoTbl').style.display="inline-table";
            document.getElementById('EditTbl').style.display="none";
          }
          ExpanceLimitAlertFlag= 1;
      }
    }
  
  }

  };








  var ExitExpanceCategoryChange=0

const IndexofCategory = () => {
    SeletedCategoryIndex =
      // document.getElementById("EditExpanceCategory").selectedIndex - 1;
      ExitExpanceCategoryChange=1
    // if (SeletedCategoryIndex != -1) {
    //   document.getElementById("ExpanceName").disabled = false;
    //   document.getElementById("ExpanceDescription").disabled = false;
    //   document.getElementById("ExpanceAmount").disabled = false;
    // }
  };



























const SaveEditExpances=()=>
  {
    
    let CategoryList=document.getElementById("EditExpanceCategory")
    var text = CategoryList.options[CategoryList.selectedIndex].text;
    let ExpanceName=document.getElementById("ExpanceNameTxt")
    let Description=document.getElementById("ExpanceDescriptionTxt")
    let ExpanceAmount=document.getElementById("ExpanceAmountTxt")
    if(CategoryName==text)
    {
      
        // let CategoryAvalibleBalance=data[SeletedCategoryIndex].AvalibleAmount
        let Diffrance=parseInt(CurrentExpanceAmount)-parseInt(ExpanceAmount.value)
        data[SeletedCategoryIndex].AvalibleAmount+=parseInt(Diffrance)
        alert(data[SeletedCategoryIndex].AvalibleAmount)
      data[SeletedCategoryIndex].ExpanceName[editValue]=ExpanceName.value
      data[SeletedCategoryIndex].ExpanceDescription[editValue]=Description.value
      data[SeletedCategoryIndex].ExpanceAmount[editValue]=ExpanceAmount.value
      
      // data.forEach((Current, index, array) => {
      //   if (Current.Name == text) {
          
      //     // console.log(editValue)
      //     let a = Current.ExpanceName.splice(editValue, 1,ExpanceName.value);
      //     let b = Current.ExpanceDescription.splice(editValue, 1,Description.value);
      //     let c = Current.ExpanceAmount.splice(editValue, 1,ExpanceAmount.value);
      //     editValue=0
          
      //   }
      // });
      
      
      
    }
    else
    {
      let index=parseInt(CategoryList.selectedIndex)-1

      alert(CategoryList.selectedIndex);
      alert(editValue)
      data.forEach((current, index, array) => {
        if (current.Name == CategoryName) {
          let a = current.ExpanceName.splice(editValue, 1);
          let b = current.ExpanceDescription.splice(editValue, 1);
          data[index].AvalibleAmount+=parseInt(CurrentExpanceAmount)
          let c = current.ExpanceAmount.splice(editValue, 1);
        }
      });
      data[index].ExpanceName.push(ExpanceName.value)
      data[index].ExpanceDescription.push(Description.value)
      data[index].ExpanceAmount.push(ExpanceAmount.value)
      data[index].AvalibleAmount-=parseInt(ExpanceAmount.value)


      
    }
    UpdateLclStorage();
      document.getElementById('InfoTbl').style.display = "inline-table";
        document.getElementById('EditTbl').style.display = "none";
      loadindex();
  }
  const DeleteExpance=(o)=> {
    let value = o.value;
    let CatName = o.parentNode.parentNode.childNodes[1].innerHTML;
    data.forEach((current, index, array) => {
      if (current.Name == CatName) {
        let a = current.ExpanceName.splice(value, 1);
        let b = current.ExpanceDescription.splice(value, 1);
        data[index].AvalibleAmount+=parseInt(current.ExpanceAmount[value])
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
      
      <td><button id="EditCategory" onclick="EditExpance(this)" value="${index}">Edit</button></td>
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

    
    document.getElementById("AvalibleBalanceAmount").innerHTML = `${TotalCatexpance-CatExpance} `;
  }
  
  
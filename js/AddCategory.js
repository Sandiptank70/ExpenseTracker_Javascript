var data = [];
var index = -1;
const GetData = () => {
 if(localStorage.getItem("data")!=null)
    data = JSON.parse(localStorage.getItem("data"));
  display();
};
const test=()=>{
    console.log(data[1]);
    console.log(window.data);

};
const UpdateLclStorage = () => {
    localStorage.setItem("data", JSON.stringify(data));
  };
// Edit Category

const EditCategory=(o)=> {
    var p = o.parentNode.parentNode;
    document.getElementById("Name").value = p.childNodes[3].innerHTML;
    document.getElementById("Expance").value = p.childNodes[5].innerHTML;
  
    index = o.value;
  }
  
  // Delete Category
const DeleteCategory=(o)=> {
    let value = o.value;
    console.log(value);
    let a = data.splice(value, 1);
    display();
    UpdateLclStorage();
  }
 var CatagoryTotalAmount=0 
const display = () => {
    const tbl = document.getElementById("ListCategory");
    tbl.innerHTML = `<tr>
    <th>No</th>
    <th>Category Name</th>
    <th>Expance Limit</th>
    <th></th>
    <th></th> 
  </tr>`;
    data.forEach((cur, index, array) => {
      CatagoryTotalAmount+=parseInt(cur.ExpanceLimit)
      let tbldata = `
        <tr>
        <td value="${index + 1}" id="Id">${index + 1}</td>
        <td value="${cur.Name}">${cur.Name}</td>
        <td value="${cur.ExpanceLimit}">${cur.ExpanceLimit}</td>
        <td><button id="EditCategory" onclick="EditCategory(this)" value="${index}">Edit</button></td>
        <td><button id="DeleteCategory" onclick="DeleteCategory(this)" value="${index}">Delete</button></td>
        </tr>
        `;
  
      tbl.insertAdjacentHTML("beforeend", tbldata);
    });
  };
const myCreateFunction=()=> {
    let CatName = document.getElementById("Name").value;
    console.log(index);
    let Exp = document.getElementById("Expance").value;
    document.getElementById("Name").innerHTML = "";
    document.getElementById("Expance").innerHTML = "";
    let CategoryJson = {};
    
    if (index == -1) {
      CategoryJson = {
        Name: CatName,
        ExpanceLimit: Exp,
        ExpanceName: [],
        ExpanceDescription: [],
        Date:[],
        ExpanceAmount: [],
        AvalibleAmount:Exp
      };
        console.log(window.data)
      data.push(CategoryJson)
    } else {
      
      data.forEach((current,Index,array)=>{
        if(Index==index)
        {
          let Diffrance=parseInt(Exp)-parseInt(current.ExpanceLimit)
          current.Name=CatName
          current.ExpanceLimit=Exp
          let curAvalible =current.AvalibleAmount
          
          alert(Diffrance)
          if(parseInt(Diffrance)<0)
          {
            alert("less")
          current.AvalibleAmount=curAvalible+Diffrance
          }
          else
          {
            alert("More")
            
            current.AvalibleAmount+=Diffrance
        }

        }
      })
      
    }
    index=-1
    UpdateLclStorage();
    document.getElementById("Name").value = ""
    document.getElementById("Expance").value=""
    display();
  }



  var ExpanceLimitAlertFlag = 0;
const CheckExpanceLimit = (e) => {
  AvalibleBalance = localStorage.getItem("Amount");
  // let indexvalue = data[SeletedCategoryIndex].ExpanceLimit;
  let Expancevalue = document.getElementById("Expance").value;
  
  if (
    parseInt(Expancevalue) <=
    parseInt(AvalibleBalance-CatagoryTotalAmount)
  ) {
    document.getElementById("Expance").style.color = "black";
    // document.getElementById("Alart").style.display="none"
    ExpanceLimitAlertFlag = 0;
  } else {
    //document.getElementById("Expance").style.color = "red";
    // document.getElementById("Alart").style.display="inline-block"
    if (ExpanceLimitAlertFlag == 0) {
      
        alert(
          `You can Not Add Morethan Your Expance Limit ???`
        ) 
       
        document.getElementById("Expance").value = "";
        document.getElementById("Name").value = "";
        
      
      ExpanceLimitAlertFlag = 1;
    }
  }
};

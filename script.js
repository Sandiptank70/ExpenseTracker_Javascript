const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
let TotalExpanceAmount=0
let AvalibleBalance=0
let flag=0;
let index=0;
let data = [];
/* Toggle mobile menu */
function toggleMenu() {
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");

    // adds the menu (hamburger) icon
    toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
  } else {
    menu.classList.add("active");

    // adds the close (x) icon
    toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
  }
}

const UpdateLclStorage = () => {
  localStorage.setItem("data", JSON.stringify(data));
};


/* Event Listener */
toggle.addEventListener("click", toggleMenu, false);
// ====================================================================================
// Add Expances 
// ====================================================================================

function myCreateFunction() {
  let CatName = document.getElementById("Name").value;
  console.log(index)
  let Exp = document.getElementById("Expance").value;
  document.getElementById("Name").innerHTML = "";
  document.getElementById("Expance").innerHTML = "";
  let CategoryJson = {};
  CategoryJson = {
    Name: CatName,
    ExpanceLimit: Exp,
    ExpanceName: [],
    ExpanceDescription: [],
    ExpanceAmount: [],
  };
  if(index==0)
  {
  data.push(CategoryJson);
  }
  else
  {
    data.splice(index,1,CategoryJson);
  }
  UpdateLclStorage();
  display();
}
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

// Edit Category

function EditCategory(o) {
  var p = o.parentNode.parentNode;
  document.getElementById("Name").value = p.childNodes[3].innerHTML;
  document.getElementById("Expance").value = p.childNodes[5].innerHTML;
  
  index=o.value
  

}


// Delete Category
function DeleteCategory(o) {
  let value = o.value;
  console.log(value);
  let a = data.splice(value, 1);
  display();
  UpdateLclStorage();
}

// get Data From Local storage
const GetData = () => {
  data = JSON.parse(localStorage.getItem("data"));
  if(document.title=="Add Category")
  {
  display();
  }
};

const AddExpanceBtn=document.getElementById('AddExpance');
const CategoryList=document.getElementById('AddExpanceCategory');
const ExpanceName=document.getElementById('ExpanceName');
const ExpanceAmount=document.getElementById('ExpanceAmount');
const Description=document.getElementById('ExpanceDescription');
AddExpanceBtn.addEventListener('click',()=>{
var text = CategoryList.options[CategoryList.selectedIndex].text;
data.forEach((Current,index,array)=>{
if(Current.Name==text)
{
  // CategoryJson = {
  //   Name: CatName,
  //   ExpanceLimit: Exp,
  //   ExpanceName: [],
  //   ExpanceDescription: [],
  //   ExpanceAmount: [],
  // };
  Current.ExpanceName.push(ExpanceName.value);
  Current.ExpanceDescription.push(Description.value)
  Current.ExpanceAmount.push(ExpanceAmount.value)
}
})
UpdateLclStorage();
alert(`Add ${ExpanceName.value} In ${text} Category`)
loadAddExpances();
});

const loadAddExpances=()=>{
  GetData();
  let Avalible=localStorage.getItem('Avalible')
  data.forEach((Current,Index,array)=>{
    let option = document.createElement("option");
          option.value = Current.Name ;
          option.text=Current.Name
          CategoryList.appendChild(option);
  })
  
  if(Avalible<1)
  {
    document.getElementById("ExpanceName").disabled =true;
    document.getElementById("ExpanceDescription").disabled =true;
    document.getElementById("ExpanceAmount").disabled =true;
    document.getElementById("AddExpanceCategory").disabled =true;
  }
 
}


// =======================================================================
// Home Page
// =======================================================================
function loadindex()
{
  GetData();
  if(data.length!=0)
  {
    const CategoryTbl=document.getElementById('CategoryTbl')
    const ExpanceTbl=document.getElementById('ExpanceTbl');
    CategoryTbl.innerHTML=`<caption>
    <h3>Category</h3>
  </caption>
  <tr>
    <th>SR</th>
    <th>Category</th>
    
  </tr>`
    ExpanceTbl.innerHTML=`<caption>
    <h3>Expances</h3>
  </caption>
  <tr>
    <th>Category</th>
    <th>Expance</th>
    <th>Description</th>
    <th>Amount</th>
    <th>&nbsp</th>
    <th>&nbsp</th>
  </tr>`
    
    data.forEach((cur, index, array) => {
      let length=cur.ExpanceName.length

      cur.ExpanceName.forEach((current,index,array)=>{
        TotalExpanceAmount+=parseInt(cur.ExpanceAmount[index])
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
      })
      

      
    });
    
    data.forEach((cur,index,arr)=>{
      let tbldata = `
        <tr>
        <td value="${index+1}" id="Id">${index+1}</td>

        <td value="${cur.Name}" style="cursor: pointer;">${cur.Name}</td>
        
        </tr>
        `;
  
        CategoryTbl.insertAdjacentHTML("beforeend", tbldata);
    });
    

  }
  else
  {
    console.log("data not Found")
    const DivClass=document.getElementById('row')
    DivClass.innerHTML="Data Not Found"
    
  }
  
      let amt=localStorage.getItem('Amount');
      document.getElementById('expanceLimitAmount').innerHTML=`${amt}`  
      document.getElementById('TotalExpanceAmount').innerHTML=`${TotalExpanceAmount}`  
      AvalibleBalance=parseInt(amt)-parseInt(TotalExpanceAmount)
      localStorage.setItem('Avalible',AvalibleBalance)
      document.getElementById('AvalibleBalanceAmount').innerHTML=`${AvalibleBalance}`  
      TotalExpanceAmount=0

}
function EditExpance(o)
{

}
function DeleteExpance(o)
{
  let value = o.value;
  let CatName=o.parentNode.parentNode.childNodes[1].innerHTML;
  data.forEach((current,index,array)=>{
    if(current.Name==CatName)
    {
      
      let a = current.ExpanceName.splice(value, 1);
      let b = current.ExpanceDescription.splice(value, 1);
      let c = current.ExpanceAmount.splice(value, 1);
      
    }
  })
  
  
  UpdateLclStorage();
  loadindex();
}


// =======================================================================
// Expance Limit
// =======================================================================

function loadExpanceLimit(){
  let Amt=localStorage.getItem('Amount');
  if(!Amt)
  {
    document.getElementById('Balance').innerHTML=`Avalible Balance:0`
  }
  else
  {
    document.getElementById('Balance').innerHTML=`Avalible Balance:${Amt}`
  }
  
  
}
function AddAmt(){
  
  let Amt=document.getElementById('AddExpanceLimit').value
  let amt=localStorage.getItem('Amount');
  if(!amt)
  {
    
    document.getElementById('Balance').innerHTML=`Avalible Balance:${Amt}`
    localStorage.setItem('Amount',Amt)
  }
  else
  {
    let finnal=parseInt(Amt)+parseInt(amt)
    localStorage.setItem('Amount',finnal)
    loadExpanceLimit();
    
  }
  
  
  
}
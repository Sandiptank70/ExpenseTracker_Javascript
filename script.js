const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");

let data=[]
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
  localStorage.setItem('data',JSON.stringify(data))
  
};


/* Event Listener */
toggle.addEventListener("click", toggleMenu, false);

function myCreateFunction() {
  let CatName=document.getElementById("Name").value
  
  let Exp=document.getElementById("Expance").value
  document.getElementById("Name").innerHTML=""
      document.getElementById("Expance").innerHTML=""
  let CategoryJson={}
  CategoryJson={Name:CatName,ExpanceLimit:Exp,ExpanceName:[],ExpanceDescription:[],ExpanceAmount:[]};
  data.push(CategoryJson);
  
  
  UpdateLclStorage();
  display();
}
const display=()=>{
  const tbl=document.getElementById("ListCategory")
  tbl.innerHTML=`<tr>
  <th>No</th>
  <th>Category Name</th>
  <th>Expance Limit</th>
  <th></th>
  <th></th> 
</tr>`
  data.forEach((cur,index,array)=>{
      let tbldata=`
      <tr>
      <td value="${index+1}" id="Id">${index+1}</td>
      <td value="${cur.Name}">${cur.Name}</td>
      <td value="${cur.ExpanceLimit}">${cur.ExpanceLimit}</td>
      <td><button id="EditCategory" onclick="EditCategory(this)" value="${index}">Edit</button></td>
      <td><button id="DeleteCategory" onclick="DeleteCategory(this)" value="${index}">Delete</button></td>
      </tr>
      `
      
      tbl.insertAdjacentHTML("beforeend", tbldata);

  });
  
  
  
}

// Edit Category

function EditCategory(o) {
  var p = o.parentNode.parentNode;
   var q=p.parentNode.querySelector(".name");
   console.log();
  document.getElementById("fname").value ="abc";
  document.getElementById("lname").value = "2000";
}

// Delete Category
function DeleteCategory(o) {
  let value=o.value
  console.log(value)
  let a=data.splice(value, 1)
  display();
  UpdateLclStorage()
  
}

// get Data From Local storage
const GetData=()=>{
  
  data=JSON.parse(localStorage.getItem('data'))
  display();
}
 
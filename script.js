const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");

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
  const Category=document.querySelectorAll('tr');
  
  const rows=[];
  Category.forEach((row)=>{
    console.log(row)
  })

};


/* Event Listener */
toggle.addEventListener("click", toggleMenu, false);

function myCreateFunction() {
  var table = document.getElementById("ListCategory");
  
  const tabledata = `<tr>
      <td>2</td>
      <td class="name" value="${document.getElementById("fname").value}">${
    document.getElementById("fname").value
  }</td>
      <td value="${document.getElementById("fname").value}" class="lname">${document.getElementById("lname").value}</td>
      <td><button id="EditCategory" onclick="EditCategory(this)">Edit</button></td>
      <td><button id="DeleteCategory" onclick="DeleteCategory(this)">Delete</button></td>
    </tr>`;
  table.insertAdjacentHTML("beforeend", tabledata);
  UpdateLclStorage();
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
  console.log(o);
  var p = o.parentNode.parentNode;
  p.parentNode.removeChild(p);
}

let productContainer = document.querySelector("#product-container>div");
let brandCategoryFilter = document.querySelectorAll("input");


window.addEventListener("load", () => {
    fetchAndRender();
})
let globalDataArr = [];
async function fetchAndRender() {
    try {
        let res = await fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products")
        res = await res.json();
        console.log(res.data);
        globalDataArr = res.data;
        display(res.data);
    } catch (error) {
        console.log(error);
    }
}

function display(data){
    let str = "";
    data.forEach((el)=>{
        str += `<div class="card" data-id="${el.id}">
            <img src=${el.image} alt="photo">
            <h3 class="name">${el.title}</h3>
            <h4 class="brand">${el.brand}</h4>
            <h5 class="category">${el.category}</h5>
            <h5 class="price">${el.price}</h5>
            <button class="addToCart">Add To Cart</button>
      </div>`
    })
    productContainer.innerHTML = str;
}

brandCategoryFilter.forEach((el)=>{
    el.addEventListener("change",()=>{
        let checkedValues = getCheckedValue();
        filterItems(checkedValues);
    })
})

function getCheckedValue(){
    let checkedValues= {};

    brandCategoryFilter.forEach((el)=>{
        if(el.checked){
            if(checkedValues[el.name]) {
                checkedValues[el.name].push(el.value);
            }else{
                checkedValues[el.name] = [el.value];
            }
        }
    })
    return checkedValues;
}

function filterItems(checkedValues){
    let filtereddata = [];

    if(checkedValues.brand==undefined && checkedValues.category==undefined){
        display(globalDataArr);
        return
    }
    else if(checkedValues.category==undefined){
        globalDataArr.forEach((el)=>{
            if(checkedValues.brand.includes(el.brand)){
                filtereddata.push(el);
            }
        })
    }else if(checkedValues.brand==undefined){
        globalDataArr.forEach((el)=>{
            if(checkedValues.category.includes(el.category)){
                filtereddata.push(el);
            }
        })
    }else{
        globalDataArr.forEach((el)=>{
            if(checkedValues.brand.includes(el.brand) && checkedValues.category.includes(el.category)){
                filtereddata.push(el);
            }
        })
    }

    display(filtereddata);
}


const sale = document.querySelector(".sale");
const order = document.querySelector(".order");
const products = document.querySelector(".products");
const product_item = Array.from(products.children);
let order_type = 0;


for (let item of product_item) {
    let x = item.lastElementChild.children[1].textContent.trim();
    let name = item.lastElementChild.children[0].textContent.trim();
    let price = parseInt(x.split(" ")[0]);
    item.setAttribute('data-identifier', price);
    item.setAttribute("data-name", name);
}

init();

function checkSale (product) {

    for (let data of product.children) {
        for (let child of data.children) {
            if (child.classList.contains("product-old-price")) {
                return true;
            }
        }
    }

    return false;
}

function rendezAr (products, product_item, asc) {

    let  dm, sortli;
    dm = asc ? 1 : -1;
    sortli = product_item.sort((a, b)=>{
        const ax = parseInt(a.getAttribute('data-identifier'));
        const bx = parseInt(b.getAttribute('data-identifier'));
        return ax > bx ? (1*dm) : (-1*dm);
    });

    products.append(...sortli);

}



function rendezAbc (products, product_item, asc) {
    let  dm, sortli;
    dm = asc ? 1 : -1;
    sortli = product_item.sort((a, b)=>{
        const ax = a.getAttribute('data-name');
        const bx = b.getAttribute('data-name');
        return ax > bx ? (1*dm) : (-1*dm);
    });

    products.append(...sortli);
    
}

rendezAbc(products, product_item, true);



    sale.addEventListener("click", function() {
        if (sale.checked) {
             Array.from(document.querySelectorAll(".product")).filter((product) => !checkSale(product)).map((product) => {
                product.style.display = "none";
             })
        } else {
            Array.from(document.querySelectorAll(".product")).map((product) => {
                product.style.display = "";
             })
        }
    })



    order.addEventListener("change", function() {

        order_type = parseInt(order.value);
        category();
    });

    function category () {
        switch(order_type) {
            case 0: rendezAr(products, product_item, true); break;
            case 1: rendezAr(products, product_item, false); break;
            case 2: rendezAbc(products, product_item, true); break;
            case 3: rendezAbc(products, product_item, false); break;
            default: rendezAr(products, product_item, true);
    
        }
    }


category();



function init() {
    sale.checked = false;
}


document.getElementById("keyword").addEventListener("keyup", function(event) {
    const keyword = event.target.value;

       product_item.forEach((product) => {
        product.style.display = "";
       }) 

      product_item.filter((name) => !name.getAttribute("data-name").toLowerCase().includes(keyword.toLowerCase())).map((product) => {
        product.style.display = "none";
    })

    
})
let products = JSON.parse(localStorage.getItem("products")) || [];

let currentCategory = "all";

const menu = document.getElementById("menu");
const logoPreview = document.getElementById("logoPreview");
const cafeVideo = document.getElementById("cafeVideo");

// لوگو
const savedLogo = localStorage.getItem("logo");

if (savedLogo) {
    logoPreview.src = savedLogo;
}

// ویدئو
const savedVideo = localStorage.getItem("video");

if (savedVideo) {
    cafeVideo.src = savedVideo;
} else {
    cafeVideo.src = "video.mp4";
}

function renderProducts() {

    menu.innerHTML = "";

    const list = currentCategory === "all"
        ? products
        : products.filter(item => item.category === currentCategory);

    if (list.length === 0) {

        menu.innerHTML = `
        <h2 style="text-align:center;color:#d4af37;padding:40px;">
        هنوز محصولی ثبت نشده است
        </h2>`;

        return;
    }

    list.forEach((item, index) => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${item.name}</h3>

            <p>${Number(item.price).toLocaleString()} تومان</p>

            <button class="deleteBtn"
            onclick="deleteProduct(${index})">
            حذف محصول
            </button>
        `;

        menu.appendChild(card);

    });

}

renderProducts();
function filterCategory(category){

    currentCategory = category;

    document.querySelectorAll(".cat").forEach(btn=>{
        btn.classList.remove("active");
    });

    renderProducts();

}

function openAdmin(){

    const pass = prompt("رمز مدیریت را وارد کنید");

    if(pass === "4030"){

        document
        .getElementById("adminPanel")
        .classList.remove("hidden");

    }else{

        alert("رمز اشتباه است");

    }

}

function closeAdmin(){

    document
    .getElementById("adminPanel")
    .classList.add("hidden");

}

function saveProduct(){

    const name = document.getElementById("name").value.trim();

    const price = document.getElementById("price").value.trim();

    const category = document.getElementById("category").value;

    const logoFile = document.getElementById("logo").files[0];

    const videoFile = document.getElementById("video").files[0];

    // ثبت محصول
    if(name !== "" && price !== ""){

        products.push({

            name: name,

            price: price,

            category: category

        });

        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );

    }

    // ذخیره لوگو
    if(logoFile){

        const logoReader = new FileReader();

        logoReader.onload = function(e){

            logoPreview.src = e.target.result;

            localStorage.setItem(
                "logo",
                e.target.result
            );

        };

        logoReader.readAsDataURL(logoFile);

    }

    // ذخیره ویدئو
    if(videoFile){

        const videoReader = new FileReader();

        videoReader.onload = function(e){

            cafeVideo.src = e.target.result;

            localStorage.setItem(
                "video",
                e.target.result
            );

        };

        videoReader.readAsDataURL(videoFile);

    }

    renderProducts();

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";

    alert("اطلاعات ذخیره شد.");

    closeAdmin();

}
function deleteProduct(index){

    const pass = prompt("رمز مدیریت را وارد کنید");

    if(pass !== "4030"){
        alert("رمز اشتباه است");
        return;
    }

    if(!confirm("آیا از حذف این محصول مطمئن هستید؟")){
        return;
    }

    products.splice(index, 1);

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    renderProducts();

    alert("محصول حذف شد.");

}

window.addEventListener("load", () => {

    renderProducts();

});

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){
        closeAdmin();
    }

});

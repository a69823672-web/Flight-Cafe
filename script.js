let products = [];
let currentCategory = "all";

const menu = document.getElementById("menu");
const logoPreview = document.getElementById("logoPreview");
const cafeVideo = document.getElementById("cafeVideo");

// خواندن محصولات از فایل JSON
fetch("products.json")
.then(response => response.json())
.then(data => {
    products = data;
    renderProducts();
})
.catch(error => {
    console.error("خطا در خواندن products.json", error);
});

// لوگو
const savedLogo = localStorage.getItem("logo");

if(savedLogo){
    logoPreview.src = savedLogo;
}

// ویدئو
const savedVideo = localStorage.getItem("video");

if(savedVideo){
    cafeVideo.src = savedVideo;
}else{
    cafeVideo.src = "video.mp4";
}

function renderProducts(){

    menu.innerHTML = "";

    const list = currentCategory === "all"
        ? products
        : products.filter(item => item.category === currentCategory);

    if(list.length === 0){

        menu.innerHTML = `
        <h2 style="text-align:center;color:#d4af37;padding:40px;">
        محصولی وجود ندارد
        </h2>`;

        return;
    }

    list.forEach((item,index)=>{

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
function filterCategory(category){

    currentCategory = category;

    document.querySelectorAll(".cat").forEach(btn=>{
        btn.classList.remove("active");
    });

    const activeBtn = [...document.querySelectorAll(".cat")]
        .find(btn => btn.textContent.trim() === category || (category === "all" && btn.textContent.trim() === "همه"));

    if(activeBtn){
        activeBtn.classList.add("active");
    }

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

    alert(
        "در نسخه products.json باید محصولات را داخل فایل products.json ویرایش کنید."
    );

    closeAdmin();

}
function deleteProduct(index){

    alert("برای حذف محصول باید فایل products.json را ویرایش کنید.");

}

window.addEventListener("load", () => {

    renderProducts();

});

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){
        closeAdmin();
    }

});

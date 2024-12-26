let elLoginBtn = document.querySelector(".login-btn")
let elLoginForm = document.querySelector(".login-form")
const username = elLoginForm.elements['username'].value; 
const password = elLoginForm.elements['password'].value;

if (elLoginForm && elLoginBtn) {
    elLoginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const data = {
            username: e.target.username.value,
            password: e.target.password.value
        };
        elLoginBtn.innerHTML = `<img src="images/Rolling@1x-1.0s-200px-200px.png" class="mx-auto" alt="loading" width="40" height="40">`;
        if (data.username == "Abdurahmon" && data.password == "123") {
            setTimeout(() => {
                elLoginBtn.innerHTML = "SIGN IN";
                localStorage.setItem("user", JSON.stringify(data));
                location.pathname = "./admin.html";
            }, 1000);
        } else {
            setTimeout(() => {
                elLoginBtn.className = "login-btn w-[415px] h-[44px] items-center justify-center rounded-[4px] mt-[35px] text-white text-[14px] font-semibold text-red-500";
                elLoginBtn.innerHTML = "Invalid Entry";
            }, 1000);
            setTimeout(() => {
                elLoginBtn.className = "login-btn w-[415px] h-[44px] items-center justify-center rounded-[4px] mt-[35px] text-white text-[14px] font-semibold";
                elLoginBtn.innerHTML = "SIGN IN";
            }, 2500);
        }
    });
}
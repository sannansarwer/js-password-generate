// Elements
const password = document.getElementById("password");
const copyPassword = document.getElementById("copyPassword");

const genPassBtn = document.getElementById("genPassBtn");
const resetBtn = document.getElementById("resetBtn");

const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const numPassword = document.getElementById("numPassword");
const symbolsPassword = document.getElementById("symbolsPassword");

// Characters
const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-={}[]|:;<>,.?/~`";

// Slider Function
lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

// Generate Password Function
const generatePassword = () => {
    let charset = "";

    // Only include types that are checked
    if(numPassword.checked) {
        charset += numbers;
    }
    if(symbolsPassword.checked) {
        charset += symbols;
    }

    // Always include letters if no checkboxes are selected
    if(!numPassword.checked && !symbolsPassword.checked) {
        charset = letters;
    }

    let passLength = Number(lengthSlider.value);
    if(passLength <= 0) {
        password.value = "";
        return;
    }

    let generatedPass = "";
    for(let i = 0; i < passLength; i++){
        let randomIndex = Math.floor(Math.random() * charset.length);
        generatedPass += charset[randomIndex];
    }

    password.value = generatedPass;
};

// Generate button event
genPassBtn.addEventListener("click", generatePassword);

// Copy Password
copyPassword.addEventListener("click", () => {
    if(password.value === "") return;

    navigator.clipboard.writeText(password.value);

    copyPassword.innerHTML = '<i class="fa-solid fa-check"></i>';

    setTimeout(() => {
        copyPassword.innerHTML = '<i class="fa-solid fa-copy"></i>';
    }, 1500);
});

// Reset Function
resetBtn.addEventListener("click", () => {
    password.value = "";
    lengthSlider.value = 0;
    lengthValue.textContent = 0;

    numPassword.checked = false;
    symbolsPassword.checked = false;
});
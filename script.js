const passwordDisplay = document.querySelector("#passwordDisplay");
const passwordForm = document.querySelector("#passwordForm");
const copyButton = document.querySelector("#copyButton");
const customAlert = document.querySelector('#customAlert');
const alertText = document.querySelector('#alertText');
const closeAlertButton = document.querySelector('#closeAlertButton');

const CHAR_SET = {
    uppercase: [...Array(26)].map((_, i) => String.fromCharCode(i + 65)),
    lowercase: [...Array(26)].map((_, i) => String.fromCharCode(i + 97)),
    numbers: [...Array(10)].map((_, i) => String(i)),
    symbols: Array.from("!@#$%^&*()-=_+{}[];:'\",.<>/?\\|`~"),
};

const generatePassword = (
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
) => {
    let charSet = [...CHAR_SET.lowercase];
    if (includeUppercase) charSet = [...charSet, ...CHAR_SET.uppercase];
    if (includeSymbols) charSet = [...charSet, ...CHAR_SET.symbols];
    if (includeNumbers) charSet = [...charSet, ...CHAR_SET.numbers];

    return [...Array(characterAmount)]
        .map(() => charSet[Math.floor(Math.random() * charSet.length)])
        .join("");
};

// Funkcja do wyświetlania alerta
function showAlert(message) {
    alertText.innerText = message;
    customAlert.style.display = 'block';
}

// Funkcja do ukrywania alerta po kliknięciu przycisku "Zamknij"
function hideAlert() {
    customAlert.style.display = 'none';
}

// Funkcja do kopiowania tekstu do schowka
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Obsługa kliknięcia na przycisk "Generuj hasło"
passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Ukryj wygenerowane hasło i customowy alert
    passwordDisplay.innerText = '';
    hideAlert();

    setTimeout(() => {
        const characterAmount = +passwordForm.querySelector("#passwordLength").value;
        const includeUppercase = passwordForm.querySelector("#includeUppercase").checked;
        const includeNumbers = passwordForm.querySelector("#includeNumbers").checked;
        const includeSymbols = passwordForm.querySelector("#includeSymbols").checked;

        const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols);
        passwordDisplay.innerText = password;

        copyToClipboard(password);
        showAlert('Hasło zostało wygenerowane i skopiowane do schowka!');
    }, 500);
});

// Obsługa kliknięcia na przycisk "Kopiuj hasło"
copyButton.addEventListener("click", () => {
    const passwordText = passwordDisplay.innerText;
    copyToClipboard(passwordText);
    alert("Hasło zostało skopiowane do schowka!");
});

// Obsługa kliknięcia na przycisk "Zamknij" w customowym alercie
closeAlertButton.addEventListener('click', hideAlert);

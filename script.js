const generateBtn = document.getElementById("generate-btn")
const colorInput = document.getElementById("input-field")
const selectEl = document.getElementById("select-field")
const colorDisplay = document.getElementById("color-display")

function generateColorScheme() {
    const color = colorInput.value.replace("#", ""); // remove the #
    const scheme = selectEl.value;

    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}&count=4`, {method: "GET"})
        .then(res => res.json())
        .then(data => {
            colorDisplay.innerHTML = ""; // clear previous results
            for (let c of data.colors) {
                colorDisplay.innerHTML += `
                    <div class="color-scheme" onclick="copy('${c.hex.value}')">
                        <div style="background:${c.hex.value}"></div>
                        <p>${c.hex.value}</p>
                    </div>
                `;
            }
        })
        .catch(err => console.error("Error fetching color scheme:", err));
}

function copy(hexValue) {
    navigator.clipboard.writeText(hexValue)
        .then(() => {
            alert(`Copied ${hexValue} to clipboard!`);
        })
        .catch(err => console.error("Failed to copy text:", err));
}

generateBtn.addEventListener("click", generateColorScheme)

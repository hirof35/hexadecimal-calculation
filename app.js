"use strict";
function convertBase(value, fromRadix, toRadix) {
    const sanitizedValue = value.trim().toLowerCase();
    if (!sanitizedValue)
        throw new Error("値を入力してください。");
    const baseRegex = new RegExp(`^[0-9a-z]{1,}$`);
    if (!baseRegex.test(sanitizedValue))
        throw new Error("無効な文字が含まれています。");
    for (const char of sanitizedValue) {
        if (parseInt(char, 36) >= fromRadix) {
            throw new Error(`文字 '${char}' は ${fromRadix} 進数の範囲を超えています。`);
        }
    }
    const decimalValue = parseInt(sanitizedValue, fromRadix);
    return decimalValue.toString(toRadix).toUpperCase();
}
function calculateBase(val1, val2, radix, operator) {
    const num1 = parseInt(val1.trim(), radix);
    const num2 = parseInt(val2.trim(), radix);
    if (isNaN(num1) || isNaN(num2))
        throw new Error("入力された値が不正です。");
    let result;
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0)
                throw new Error("0で割ることはできません。");
            result = Math.floor(num1 / num2);
            break;
        default: throw new Error("無効な演算子です。");
    }
    return result.toString(radix).toUpperCase();
}
// --- UI操作・DOM連携 ---
document.addEventListener("DOMContentLoaded", () => {
    var _a, _b;
    const fromBaseSelect = document.getElementById("convert-from-base");
    const toBaseSelect = document.getElementById("convert-to-base");
    const calcBaseSelect = document.getElementById("calc-base");
    // 2〜36のオプションをセレクトボックスに動的に追加
    for (let i = 2; i <= 36; i++) {
        const createOption = (defaultSelected) => {
            const opt = document.createElement("option");
            opt.value = i.toString();
            opt.textContent = `${i}進数`;
            if (i === 10 && defaultSelected)
                opt.selected = true; // デフォルトは10進数
            return opt;
        };
        fromBaseSelect.appendChild(createOption(true));
        toBaseSelect.appendChild(createOption(false));
        calcBaseSelect.appendChild(createOption(true));
    }
    // 1. 変換ボタンのイベント
    (_a = document.getElementById("btn-convert")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        const input = document.getElementById("convert-input").value;
        const fromRadix = parseInt(fromBaseSelect.value);
        const toRadix = parseInt(toBaseSelect.value);
        const resultDiv = document.getElementById("convert-result");
        try {
            const result = convertBase(input, fromRadix, toRadix);
            resultDiv.textContent = `結果: ${result}`;
            resultDiv.classList.remove("error");
        }
        catch (error) {
            resultDiv.textContent = `エラー: ${error.message}`;
            resultDiv.classList.add("error");
        }
    });
    // 2. 計算ボタンのイベント
    (_b = document.getElementById("btn-calc")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        const val1 = document.getElementById("calc-input1").value;
        const val2 = document.getElementById("calc-input2").value;
        const op = document.getElementById("calc-op").value;
        const radix = parseInt(calcBaseSelect.value);
        const resultDiv = document.getElementById("calc-result");
        try {
            const result = calculateBase(val1, val2, radix, op);
            resultDiv.textContent = `結果: ${result}`;
            resultDiv.classList.remove("error");
        }
        catch (error) {
            resultDiv.textContent = `エラー: ${error.message}`;
            resultDiv.classList.add("error");
        }
    });
});

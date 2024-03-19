document.addEventListener('DOMContentLoaded', function () {
    const inputFormat = document.getElementById('input-format');
    const outputFormat = document.getElementById('output-format');
    const inputData = document.getElementById('input-data');
    const outputData = document.getElementById('output-data');
    const swapButton = document.getElementById('swap-button');
    const clearButton = document.getElementById('clear-button');
    const copyButton = document.getElementById('copy-button');
    const customToast = document.getElementById('custom-toast');

    inputFormat.addEventListener('change', convertData);
    outputFormat.addEventListener('change', convertData);
    inputData.addEventListener('input', convertData);
    swapButton.addEventListener('click', swapFormats);
    clearButton.addEventListener('click', clearFields);
    copyButton.addEventListener('click', copyToClipboard);

    function convertData() {
        const input = inputData.value.trim();
        const inputFormatValue = inputFormat.value;
        const outputFormatValue = outputFormat.value;
        let result = '';

        if (!input) {
            outputData.value = '';
            return;
        }

        if (inputFormatValue === 'text' && outputFormatValue === 'text') {
            result = input;
        } else if (inputFormatValue === 'text') {
            result = textToOtherFormats(input, outputFormatValue);
        } else if (outputFormatValue === 'text') {
            result = otherFormatsToText(input, inputFormatValue);
        } else {
            const decimal = parseInt(input, getBase(inputFormatValue));
            result = decimal.toString(getBase(outputFormatValue)).toUpperCase();
        }

        outputData.value = result;
    }


    function textToOtherFormats(text, outputFormat) {
        if (outputFormat === 'binary') {
            return text.split('').map(char => char.charCodeAt(0).toString(2)).join(' ');
        } else if (outputFormat === 'decimal') {
            return text.split('').map(char => char.charCodeAt(0)).join(' ');
        } else if (outputFormat === 'hexadecimal') {
            return text.split('').map(char => char.charCodeAt(0).toString(16)).join(' ');
        } else if (outputFormat === 'octal') {
            return text.split('').map(char => char.charCodeAt(0).toString(8)).join(' ');
        }
    }

    function otherFormatsToText(data, inputFormat) {
        if (inputFormat === 'binary') {
            return data.split(' ').map(binary => String.fromCharCode(parseInt(binary, 2))).join('');
        } else if (inputFormat === 'decimal') {
            return String.fromCharCode.apply(null, data.split(' ').map(num => parseInt(num)));
        } else if (inputFormat === 'hexadecimal') {
            return data.split(' ').map(hex => String.fromCharCode(parseInt(hex, 16))).join('');
        } else if (inputFormat === 'octal') {
            return data.split(' ').map(octal => String.fromCharCode(parseInt(octal, 8))).join('');
        }
    }

    function getBase(format) {
        if (format === 'binary') return 2;
        if (format === 'decimal') return 10;
        if (format === 'hexadecimal') return 16;
        if (format === 'octal') return 8;
    }

    function clearFields() {
        inputData.value = '';
        outputData.value = '';
    }

    function copyToClipboard() {
        const textToCopy = outputData.value;
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    showCustomToast(`✔ Copied!`);
                })
                .catch((error) => {
                    console.error('Failed to copy: ', error);
                });
        }
    }

    function showCustomToast(message) {
        customToast.textContent = message;
        customToast.classList.add('show-toast');
        setTimeout(() => {
            customToast.classList.remove('show-toast');
        }, 2000);
    }

    function swapFormats() {
        const tempFormat = inputFormat.value;
        inputFormat.value = outputFormat.value;
        outputFormat.value = tempFormat;

        const tempData = inputData.value;
        inputData.value = outputData.value;
        outputData.value = tempData;

        convertData();
    }

});

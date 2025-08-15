// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Get references to all necessary DOM elements
    // Ensure these IDs exactly match the 'id' attributes in your HTML file (index.html)
    const inputValue = document.getElementById('inputValue');
    const inputUnit = document.getElementById('inputUnit');
    const outputUnit = document.getElementById('outputUnit');
    const convertBtn = document.getElementById('convertBtn');
    const resultDiv = document.getElementById('result');

    // Add event listener to the "Convert" button for click events
    if (convertBtn) { // Check if the button element exists before adding listener
        convertBtn.addEventListener('click', convertTemperature);
    } else {
        console.error("Error: 'convertBtn' element not found. Check your HTML ID.");
    }

    // Add event listener to the input field for 'Enter' key presses
    if (inputValue) { // Check if the input element exists before adding listener
        inputValue.addEventListener('keyup', (event) => {
            // If the 'Enter' key is pressed, trigger the conversion
            if (event.key === 'Enter') {
                convertTemperature();
            }
        });
    } else {
        console.error("Error: 'inputValue' element not found. Check your HTML ID.");
    }


    /**
     * Converts the temperature from the selected input unit to the selected output unit.
     */
    function convertTemperature() {
        // Retrieve the numerical value from the input field
        // If inputValue is null (not found in HTML), value will be NaN.
        const value = parseFloat(inputValue ? inputValue.value : '');
        // Retrieve the selected units from the dropdowns
        const fromUnit = inputUnit ? inputUnit.value : '';
        const toUnit = outputUnit ? outputUnit.value : '';

        // --- Input Validation ---
        // Check if the input value is a valid number
        if (isNaN(value)) {
            // Ensure resultDiv exists before trying to manipulate it
            if (resultDiv) {
                resultDiv.textContent = 'Please enter a valid number!';
                resultDiv.classList.add('text-red-600'); // Apply error styling
            }
            return; // Stop execution if input is invalid
        } else {
            if (resultDiv) {
                resultDiv.classList.remove('text-red-600'); // Remove error styling if previously applied
            }
        }

        let celsius; // Variable to hold the temperature standardized to Celsius

        // --- Convert Input to Celsius (Standardization Step) ---
        switch (fromUnit) {
            case 'celsius':
                celsius = value; // If input is Celsius, no conversion needed
                break;
            case 'fahrenheit':
                // Formula: (Fahrenheit - 32) * 5/9 = Celsius
                celsius = (value - 32) * 5 / 9;
                break;
            case 'kelvin':
                // Formula: Kelvin - 273.15 = Celsius
                celsius = value - 273.15;
                break;
            default:
                if (resultDiv) {
                    resultDiv.textContent = 'Invalid input unit.';
                }
                return;
        }

        let convertedValue; // Variable to hold the final converted value
        let unitSymbol;     // Variable to hold the symbol for the output unit

        // --- Convert from Celsius to Desired Output Unit ---
        switch (toUnit) {
            case 'celsius':
                convertedValue = celsius; // If output is Celsius, use the standardized Celsius value
                unitSymbol = '°C';
                break;
            case 'fahrenheit':
                // Formula: (Celsius * 9/5) + 32 = Fahrenheit
                convertedValue = (celsius * 9 / 5) + 32;
                unitSymbol = '°F';
                break;
            case 'kelvin':
                // Formula: Celsius + 273.15 = Kelvin
                convertedValue = celsius + 273.15;
                unitSymbol = 'K';
                break;
            default:
                if (resultDiv) {
                    resultDiv.textContent = 'Invalid output unit.';
                }
                return;
        }

        // --- Display the Result ---
        // Format the converted value to two decimal places and display with its unit symbol
        if (resultDiv) {
            resultDiv.textContent = `${convertedValue.toFixed(2)} ${unitSymbol}`;
        }
    }
});

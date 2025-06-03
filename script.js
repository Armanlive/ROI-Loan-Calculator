document.addEventListener('DOMContentLoaded', () => {
    const principalInput = document.getElementById('principal');
    const annualRateInput = document.getElementById('annualRate');
    const termYearsInput = document.getElementById('termYears');
    const termMonthsInput = document.getElementById('termMonths');
    const calculateBtn = document.getElementById('calculateBtn');
    const monthlyPaymentSpan = document.getElementById('monthlyPayment');
    const errorMessageDiv = document.getElementById('error-message');

    calculateBtn.addEventListener('click', () => {
        errorMessageDiv.textContent = '';
        errorMessageDiv.style.display = 'none';

        const principal = parseFloat(principalInput.value);
        const annualRate = parseFloat(annualRateInput.value);
        let termYears = parseFloat(termYearsInput.value);
        let termMonthsDirect = parseFloat(termMonthsInput.value);

        if (isNaN(principal) || principal <= 0) {
            showError("Please enter a valid principal amount greater than 0.");
            return;
        }
        if (isNaN(annualRate) || annualRate < 0) {
            showError("Please enter a valid annual interest rate (0 or greater).");
            return;
        }

        let totalMonths;
        if (!isNaN(termMonthsDirect) && termMonthsDirect > 0) {
            totalMonths = termMonthsDirect;
        } else if (!isNaN(termYears) && termYears > 0) {
            totalMonths = termYears * 12;
        } else {
            showError("Please enter a valid loan term in years (>0) or months (>0).");
            return;
        }
        
        if (totalMonths <= 0) {
             showError("Loan term must be greater than 0 months.");
            return;
        }

        if (annualRate === 0) {
            const monthlyPayment = principal / totalMonths;
            // Round and set currency
            monthlyPaymentSpan.textContent = `₹${Math.round(monthlyPayment)}`; 
        } else {
            const monthlyRate = annualRate / 100 / 12;
            const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths);
            const denominator = Math.pow(1 + monthlyRate, totalMonths) - 1;

            if (denominator === 0) {
                showError("Calculation error: Denominator is zero. Check inputs.");
                return;
            }
            
            const monthlyPayment = numerator / denominator;
            // Round and set currency
            monthlyPaymentSpan.textContent = `₹${Math.round(monthlyPayment)}`; 
        }
    });

    function showError(message) {
        errorMessageDiv.textContent = message;
        errorMessageDiv.style.display = 'block';
        monthlyPaymentSpan.textContent = '₹0'; // Changed to ₹0
    }

    // Optional: Auto-calculate on input change
    // [principalInput, annualRateInput, termYearsInput, termMonthsInput].forEach(input => {
    //     input.addEventListener('input', () => {
    //         if (principalInput.value && annualRateInput.value && (termYearsInput.value || termMonthsInput.value)) {
    //             calculateBtn.click();
    //         } else {
    //             monthlyPaymentSpan.textContent = '₹0'; // Changed to ₹0
    //             errorMessageDiv.style.display = 'none';
    //         }
    //     });
    // });
});

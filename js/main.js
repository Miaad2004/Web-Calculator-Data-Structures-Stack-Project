
class CalculatorUserInterface
{
    constructor(prevExpressionTxtElement, currExpressionTxtElement, radiansRadio, trigModeArcRadio, trigButtons)
    {
        this.calculator = new Calculator()

        this.prevExpressionTxtElement = prevExpressionTxtElement
        this.currExpressionTxtElement = currExpressionTxtElement
        this.radiansRadio = radiansRadio
        this.trigModeArcRadio = trigModeArcRadio
        this.trigButtons = trigButtons    // List of all the trigonometry buttons
        
        this.currentOperand = ' '
        this.previousExpression = []
        this.currentExpression = []

        this.clearAll()
    }

    appendOperand(operand)
    {
        // Prevent invalid floating points
        if (operand === '.' && this.currentOperand.includes('.'))
            return
        
        // Handle the -/+ button
        if (operand === '-')
        {
            if (this.currentOperand.includes('-'))
                this.currentOperand = this.currentOperand.slice(1)

            else
                this.currentOperand = '-' + this.currentOperand

            return
        }

        // Add the new operand to the current one
        this.currentOperand += operand.toString()
    }

    appendOperator(operatorSymbol)
    {
        // Make sure all the operands have been added to the expression
        if (this.currentOperand !== '')
        {
            this.currentExpression.push(this.currentOperand)
            this.currentOperand = ''
        }

        // Add the new operator
        this.currentExpression.push(MathOperations.symbolToOperator(operatorSymbol))
    }

    delete()
    {
        // If user was entering a number that isn't in the expression array
        if (this.currentOperand != '')
            this.currentOperand = ''

        else
            this.currentExpression.pop()

        this.refreshDisplay()
    }

    clearAll()
    {
        this.currentOperand = ""
        this.previousExpression = []
        this.currentExpression = []
        this.calculator.clear()

        this.refreshDisplay()
    }

    evaluate()
    {
        // Make sure all the operands have been added to the expression
        if (this.currentOperand !== '')
        {
            this.currentExpression.push(this.currentOperand)
            this.currentOperand = ''
        }

        // Make sure there are no invalid parentheses
        if (!Calculator.isParenthesesSeqValid(this.currExpressionTxtElement.innerText).isSequenceValid)
        {
            this.sendNotification("Please check and close all parentheses in the input sequence.")
            return
        }

        // Make sure the input expression isn't empty
        if (this.currentExpression.length == 0)
        {
            sendNotification("Please enter a valid expression.")
            return
        }

        // Try evaluating the expression
        try
        {
            this.previousExpression = this.currentExpression
            var result = this.calculator.evaluateExpression(this.currentExpression)
            this.currentExpression = [result]
        }

        catch (err)
        {
            sendNotification(err.message)
            this.clearAll()
            this.currentExpression = ["Error"]

            console.log(err)
        }

        this.refreshDisplay()
    }

    highlightInvalidParentheses()
    {
        this.removeParenthesesHighlighting()
        const textElement = this.currExpressionTxtElement
        const checkResult = Calculator.isParenthesesSeqValid(textElement.innerText)

        if (!checkResult.isSequenceValid)
        {   
            let invalidIndexes = checkResult.invalidIndexes
            let highlightedText = ''
            

            for (let i = 0; i < textElement.innerText.length; i++)
            {
                const char = textElement.innerText[i];
                if (invalidIndexes.includes(i))
                {
                    highlightedText += `<span class="highlight">${char}</span>`;
                }

                else
                {
                    highlightedText += char;
                }
            }

            textElement.innerHTML = highlightedText;
        }
    }

    removeParenthesesHighlighting()
    {
        this.currExpressionTxtElement.innerHTML = this.currExpressionTxtElement.innerText
    }

    expressionToText(expression)
    {
        let outputText = ""

        for (let i = 0; i < expression.length; i++)
        {
            let token = expression[i]

            if (token instanceof Operator)
                outputText  += token.symbol

            // if token is a number
            else
                outputText += token
            
            // add space padding
            outputText += ' '
        }
        
        return outputText
    }

    onAngleModeChanged()
    {
        MathOperations.radianMode = this.radiansRadio.checked
    }

    onTrigModeChanged()
    {
        this.trigButtons.forEach(button =>
        {
            let base_mode = button.getAttribute('data-trig')

            // convert to arc  (example: sin => arcSin)
            if (this.trigModeArcRadio.checked)
            {
                button.innerHTML = "a" + base_mode
                button.setAttribute('data-operator', "a" + base_mode)
            }

            // convert back to default 
            else
            {
                button.innerHTML = base_mode
                button.setAttribute('data-operator', base_mode)
            }
        });
    }

    refreshDisplay()
    {
        this.prevExpressionTxtElement.innerHTML = this.expressionToText(this.previousExpression)
        this.currExpressionTxtElement.innerText = this.expressionToText(this.currentExpression) + this.currentOperand
        this.highlightInvalidParentheses()
    }
}

function sendNotification(message)
{
    // Set the notification's message
    var notificationTextElement = document.getElementById('notification-message')
    notificationTextElement.innerHTML = message;

    // Get the notification box element
    var notificationBox = document.getElementById('push-notification')
    var notification = new bootstrap.Toast(notificationBox)

    notification.show()   
}


function main()
{
    // Mode selectors
    const radiansRadio = document.getElementById('radians');
    const degreesRadio = document.getElementById('degrees');
    const trigModeArcRadio = document.getElementById('arc')
    const trigModeDefaultRadio = document.getElementById('default')

    radiansRadio.addEventListener('change', () => {calculatorUI.onAngleModeChanged()})
    degreesRadio.addEventListener('change', () => {calculatorUI.onAngleModeChanged()})
    trigModeArcRadio.addEventListener('change', () => {calculatorUI.onTrigModeChanged()})
    trigModeDefaultRadio.addEventListener('change', () => {calculatorUI.onTrigModeChanged()})


    // Main buttons
    const equalsButton = document.querySelector('[equals]')
    const clearAllButton = document.querySelector('[clear-all]')
    const deleteButton = document.querySelector('[delete]')

    equalsButton.addEventListener('click', () => {calculatorUI.evaluate()})
    clearAllButton.addEventListener('click', () => {calculatorUI.clearAll()})
    deleteButton.addEventListener('click', () => {calculatorUI.delete()})

    // Text elements
    const prevExpressionTxtElement = document.getElementById('previous-expression')
    const currExpressionTextElement = document.getElementById('current-expression')


    // Button arrays
    const operandButtons = document.querySelectorAll('[data-operand]')
    const operationButtons = document.querySelectorAll('[data-operator]')
    const trigButtons = document.querySelectorAll('[data-trig]')

    operandButtons.forEach(button =>
    {
        button.addEventListener('click', () =>
        {
            calculatorUI.appendOperand(button.getAttribute('data-operand'))
            calculatorUI.refreshDisplay()
        })
    });

    operationButtons.forEach(button =>
    {
        button.addEventListener('click', () =>
        {
            calculatorUI.appendOperator(button.getAttribute('data-operator'))
            calculatorUI.refreshDisplay()
        })
    });


    const calculatorUI = new CalculatorUserInterface(prevExpressionTxtElement, currExpressionTextElement, radiansRadio, trigModeArcRadio, trigButtons)

    // Add keyboard handler
    document.addEventListener('keydown', function(event)
    {
        console.log(`Button ${event.key} clicked.`)

        switch (event.key)
        {
            case 'Backspace': 
                deleteButton.click();
                break;
            
            case 'Delete': 
                clearAllButton.click();
                break;
            
            case '=':             
            case 'Enter': 
                equalsButton.click();
                break;
            
            case '-':
                operationButtons.forEach(button =>
                    {
                        if (button.getAttribute('data-operator') == '-')
                            button.click()
                    });
                break;
            
            default:
                operationButtons.forEach(button =>
                    {
                        if (button.getAttribute('data-operator') == event.key)
                            button.click()
                    });
                    
                operandButtons.forEach(button =>
                    {
                        if (button.getAttribute('data-operand') == event.key)
                            button.click()
                    });
        }
    });

    // Hide the loading overlay
    const loadingOverlay = document.getElementById("loading-overlay")
    loadingOverlay.hidden = true
}


// Loading timeout 
setTimeout(function() {
    const loadingOverlay = document.getElementById("loading-overlay")

    if (!loadingOverlay.hidden)
        sendNotification("Loading timed out.")
    
    loadingOverlay.hidden = true
}, 8500);

window.onload = main




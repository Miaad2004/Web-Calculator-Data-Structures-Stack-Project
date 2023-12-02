
class Operator
{
    constructor(priority, symbol, func)
    {
        this.symbol = symbol;
        this.priority = priority;
        this.func = func;
    }

    hasHigherPriority (otherOperator)
    {
        if (otherOperator === '(')
            return true;

        return this.priority > otherOperator.priority;
    }

    toString ()
    {
        return this.symbol;
    }

    nRequiredArgs()
    {
        // Returns the number of required arguments for this operator
        return this.func.length;
    }
}


class Calculator
{
    #_operandsStack;
    #_operatorsStack;

    constructor ()
    {
        this.#_operandsStack = new Stack();
        this.#_operatorsStack = new Stack();
    }

    evaluateOperator (operator)
    {
        if (this.#_operandsStack.getLength() < operator.nRequiredArgs())
            throw new InvalidOperatorError(`Not enough operands exist for operator <mark>${operator}</mark>`);

        const requiredArgs = [];

        for (let i = 0; i < operator.nRequiredArgs(); i++)
            requiredArgs.unshift(this.#_operandsStack.pop());
        
        const result = operator.func(...requiredArgs);
        this.#_operandsStack.push(result);
    }

    evaluateExpression(expression)
    {
        for (let i = 0; i < expression.length; i++)
        {
            const token = expression[i];
            
            // If token is a number
            if (!isNaN(token))
            {
                this.#_operandsStack.push(token * 1)
            }

            // If token is the pi number
            else if (token === "π")
            {
                this.#_operandsStack.push(Math.PI)
            }

            // If token is the euler's number
            else if (token === "e")
            {
                this.#_operandsStack.push(Math.E)
            }

            // If token is an operator
            else if (token instanceof Operator)
            {
                while (!this.#_operatorsStack.isEmpty() && !token.hasHigherPriority(this.#_operatorsStack.top()))
                {
                    this.evaluateOperator(this.#_operatorsStack.pop());
                }
                
                this.#_operatorsStack.push(token);
            }

            else if (token === '(')
            {
                this.#_operatorsStack.push(token);
            }

            else if (token === ')')
            {
                while (this.#_operatorsStack.top() !== '(')
                {
                    this.evaluateOperator(this.#_operatorsStack.pop());
                }

                this.#_operatorsStack.pop();
            }

            else
                throw new InvalidTokenError(`token <mark>${token}</mark> was not recognized.`);
        }
        
        // Make sure all the operations have been done
        while (!this.#_operatorsStack.isEmpty())
        {
            this.evaluateOperator(this.#_operatorsStack.pop());
        }

        // The result should be at the top of the operands stack 
        return this.#_operandsStack.top();
    }

    clear()
    {
        this.#_operandsStack.clear();
        this.#_operatorsStack.clear();
    }

    static isParenthesesSeqValid(sequence)
    {
        /* This method takes a string and returns the indexes of invalid parentheses if any*/
        var isSequenceValid = true;
        const stack = new Stack();
        const invalidIndexes = [];

        for (let i = 0; i < sequence.length; i++)
        {
            const char = sequence[i];
            switch (char)
            {
                case '(':
                    stack.push({type: "open", index: i})
                    break;
                
                case ')':
                    if (stack.isEmpty() || stack.pop().type !== "open")
                    {
                        isSequenceValid = false;
                        invalidIndexes.push(i);
                    }
                    break;
            }
        }

        while (!stack.isEmpty())
        {
            isSequenceValid = false;
            invalidIndexes.push(stack.pop().index);
        }

        return {isSequenceValid, invalidIndexes}
    }
}
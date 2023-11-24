const Stack = require('./stack');

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
        return this.priority > otherOperator.priority;
    }

    toString ()
    {
        return this.symbol;
    }

    nRequiredArgs()
    {
        return this.func.length;
    }
}

class Calculator
{
    #_operandsStack;
    #_operatorsStack;

    constructor (operators)
    {
        this.#_operandsStack = new Stack();
        this.#_operatorsStack = new Stack();
        this.operators = operators;
        this.radianMode = false;
    }

    evaluateOperator (operator)
    {
        if (this.#_operandsStack.length <= operator.nRequiredArgs())
            throw new InvalidOperatorError(`Not enough operands exist for operator ${operator}`);

        const requiredArgs = [];
    
        for (let i = 0; i < operator.nRequiredArgs(); i++)
            requiredArgs.unshift(this.#_operandsStack.pop());
        
        const result = operator.func(requiredArgs);
        this.#_operandsStack.push(result);
    }

    evaluateExpression(expression)
    {
        for (let i = 0; i < expression.length; i++)
        {
            const token = expression[i];
            if (typeof(token) === 'number')
            {
                this.#_operandsStack.push(token)
            }

            else if (token instanceof Operator)
            {
                while (!token.hasHigherPriority(this.#_operatorsStack.top()))
                {
                    this.evaluateOperator(token);
                }
                
                this.#_operatorsStack.push(token);
            }

            else
                throw new InvalidTokenError(`token ${token} was not recognized.`);
        }

        while (!this.#_operatorsStack.isEmpty())
        {
            this.evaluateOperator(this.#_operatorsStack.pop());
        }

        return this.#_operandsStack.top();
    }

    clear()
    {
        this.#_operandsStack.clear();
        this.#_operatorsStack.clear();
    }

    static isParenthesesSeqValid(sequence)
    {
        
        var isValid = true;
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
                    if (stack.isEmpty() || stack.pop().type !== "open") {
                        isValid = false;
                        invalidIndexes.push(i);
                    }
                    break;
            }
        }

        while (!stack.isEmpty())
        {
            isValid = false;
            invalidIndexes.push(stack.pop().index);
        }

        return {isValid, invalidIndexes}
    }
}


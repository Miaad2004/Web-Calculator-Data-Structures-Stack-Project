const Stack = require('./stack');

class Operator
{
    #_priority;
    #_func;
    #_hasIndefiniteArgs

    constructor(priority, symbol, func, hasIndefiniteArgs=false)
    {
        this.symbol = symbol;
        this.#_priority = priority;
        this.#_func = func;
        this.#_hasIndefiniteArgs = hasIndefiniteArgs;
    }

    get priority ()
    {
        return this.#_priority;
    }

    get func ()
    {
        return this.#_func
    }

    get hasIndefiniteArgs ()
    {
        return this.#_hasIndefiniteArgs;
    }

    hasHigherOrEqualPriority (otherOperator)
    {
        return this.priority() >= otherOperator.priority();
    }
}

class Calculator
{
    constructor (operators)
    {

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


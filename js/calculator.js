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


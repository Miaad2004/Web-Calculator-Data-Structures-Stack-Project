const Stack = require('./stack');

class Calculator
{
    constructor()
    {

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


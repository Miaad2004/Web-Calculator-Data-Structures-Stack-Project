class StackEmptyError extends Error
{
    constructor (msg)
    {
        super(msg);
        this.name = "StackEmptyError";
    }
}

class Stack
{
    #_array;

    constructor()
    {
        this.#_array = [];
    }

    push(element)
    {
        this.array.push(element);
    }

    pop()
    {
        if (this.array.length == 0) {
            throw new StackEmptyError("Can't pop from an empty stack.");    
        }

        return this.array.pop();
    }

    size()
    {
        return this.array.length;
    }

    top()
    {
        return this.array[this.array.length - 1];
    }

    isEmpty()
    {
        return this.array.length == 0;
    }

    clear ()
    {
        while (!this.isEmpty())
        {
            this.pop();
        }
    }
}

module.exports = Stack;
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
        this.#_array.push(element);
    }

    pop()
    {
        if (this.#_array.length == 0) {
            throw new StackEmptyError("Can't pop from an empty stack.");    
        }

        return this.#_array.pop();
    }

    size()
    {
        return this.#_array.length;
    }

    top()
    {
        return this.#_array[this.#_array.length - 1];
    }

    isEmpty()
    {
        return this.#_array.length == 0;
    }

    clear ()
    {
        while (!this.isEmpty())
        {
            this.pop();
        }
    }

    getLength ()
    {
        return this.#_array.length;
    }

    toString ()
    {
        return this.#_array.toString();
    }
}
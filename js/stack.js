class Stack
{
    constructor()
    {
        this.array = [];
    }

    push(element)
    {
        this.array.push(element);
    }

    pop()
    {
        if (this.array.length == 0) {
            throw "Can't pop from an empty stack.";    
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
}
class InvalidTokenError extends Error
{
    constructor (msg)
    {
        super(msg);
        this.name = "InvalidTokenError";
    }
}

class InvalidOperatorError extends Error
{
    constructor (msg)
    {
        super(msg);
        this.name = "InvalidOperatorError";
    }
}
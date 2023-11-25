function addFunction(a, b)
{
    return a + b;
}

function subtractFunction(a, b)
{
    return a - b;
}

function multiplyFunction(a , b)
{
    return a * b;
}

function divideFunction(a, b)
{
    if (b == 0)
        throw new Error(`Can not divide ${a} by ${b}`);

    return a / b
}

function modFunction(a, b)
{
    return a % b;
}





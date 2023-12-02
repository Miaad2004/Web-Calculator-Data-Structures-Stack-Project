
class MathOperations 
{
  // Property for switching between degrees/radians mode
  static radianMode = true;        

  static toRadians(angle)
  {
    return (angle * Math.PI) / 180;
  }

  static toDegrees(angle)
  {
    return (angle * 180) / Math.PI;
  }

  static throwError(message)
  {
    throw new Error(message);
  }
  
  // Dictionary of math functions
  static mathFunctions =
  {
    add: (a, b) => a + b,

    subtract: (a, b) => a - b,

    multiply: (a, b) => a * b,

    divide: (a, b) => 
    {
      if (b === 0) 
        MathOperations.throwError(`Can not divide ${a} by zero.`);

      return a / b;
    },

    floorDivision: (a, b) =>
    {
      if (b === 0)
        MathOperations.throwError(`Can not perform floor division of ${a} by zero.`);

      return Math.floor(a / b);
    },

    mode: (a , b) => a % b,   

    sqr: (a) => Math.pow(a, 2),

    pow: (a, b) => Math.pow(a, b),

    cubeRoot: (a) => Math.cbrt(a),

    squareRoot: (a) =>
    {
      if (a < 0)
        MathOperations.throwError("Square root is not defined for negative numbers.");
    
      return Math.sqrt(a);
    },

    ln: (a) =>
    {
      if (a <= 0)
        MathOperations.throwError("Natural logarithm is not defined for non-positive numbers.");

      return Math.log(a);
    },

    log10: (a) =>
    {
      if (a <= 0) 
        MathOperations.throwError("Logarithm base 10 is not defined for non-positive numbers.");

      return Math.log10(a);
    },

    factorial: (n) =>
    {
      if (n < 0) 
        MathOperations.throwError("Factorial is not defined for negative numbers.");

      if (n === 0 || n === 1)
        return 1;

      return n * this.mathFunctions.factorial(n - 1);
    },

    floor: (a) => Math.floor(a),
    
    ceil: (a) => Math.ceil(a),

    // Trigonometric functions
    sin: (a) => this.radianMode ? Math.sin(a) : Math.sin(this.toRadians(a)),

    cos: (a) => this.radianMode ? Math.cos(a) : Math.cos(this.toRadians(a)),

    tan: (x) =>
    {
      if (Math.abs(x % Math.PI) === Math.PI / 2)
        MathOperations.throwError("tangent is not defined for multiples of PI/2.");
      
      return this.radianMode ? Math.tan(x) : Math.tan(this.toRadians(a))
    },

    cot: (x) =>
    {
      if (Math.abs(x % Math.PI) === Math.PI)
        MathOperations.throwError("Cotangent is not defined for multiples of PI.");
      
      return this.radianMode ? 1 / Math.tan(x) : 1 / Math.tan(this.toRadians(a))
    },

    sec: (x) => 
    {
      if (Math.abs(x % Math.PI) === Math.PI / 2) 
        MathOperations.throwError("Secant is not defined for multiples of PI/2.");
      
      return this.radianMode ? 1 / Math.cos(x) : 1 / Math.cos(this.toRadians(a))
    },

    // Inverse trigonometric functions
    asin: (x) =>
    {
        if (x < -1 || x > 1) 
          MathOperations.throwError(`ArcSin is not defined for ${x}. Value should be between -1 and 1.`);
        
        return this.radianMode ? Math.asin(x) : this.toDegrees(Math.asin(x))
    },

    acos: (x) =>
    {
        if (x < -1 || x > 1) 
          MathOperations.throwError(`ArcCos is not defined for ${x}. Value should be between -1 and 1.`);
        
        return this.radianMode ? Math.acos(x) : this.toDegrees(Math.acos(x))
    },

    atan: (a) => this.radianMode ? Math.atan(a) : this.toDegrees(Math.atan(a)),

    acot: (x) =>
    {
        let result = Math.PI / 2 - Math.atan(x)

        return this.radianMode ? result : this.toDegrees(result)
    },

    asec: (x) =>
    {
        if (x <= 0) 
          MathOperations.throwError(`ArcSec is not defined for non-positive number ${x}.`);
        
        return this.radianMode ? Math.acos(1 / x) : this.toDegrees(Math.acos(1 / x)); 
    },
  };
  
  
  static createOperator(priority, symbol, func)
  { 
    return new Operator(priority, symbol, func);
  }
  
  static operators =
  {
      '+':     this.createOperator(1, '+',    this.mathFunctions.add),
      '-':     this.createOperator(1, '-',    this.mathFunctions.subtract),
      '*':     this.createOperator(2, 'x',    this.mathFunctions.multiply),
      '/':     this.createOperator(2, '&divide',    this.mathFunctions.divide),
      '//':    this.createOperator(2, '//',   this.mathFunctions.floorDivision),
      '%':    this.createOperator(2, 'mod',   this.mathFunctions.mode),
      '^':    this.createOperator(3, '^',   this.mathFunctions.pow),
      'sqr':   this.createOperator(3, "<sup>2</sup>",  this.mathFunctions.sqr),
      'sqrt':  this.createOperator(3, '√', this.mathFunctions.squareRoot),
      'cbrt':  this.createOperator(3, '∛', this.mathFunctions.cubeRoot),
      'ln':    this.createOperator(4, 'ln',   this.mathFunctions.ln),
      'log10': this.createOperator(4, 'log<sub>10</sub>',this.mathFunctions.log10),
      '!':     this.createOperator(4, '!',    this.mathFunctions.factorial),
      'floor': this.createOperator(4, 'floor',this.mathFunctions.floor),
      'ceil':  this.createOperator(4, 'ceil', this.mathFunctions.ceil),
      'sin':   this.createOperator(4, 'sin',  this.mathFunctions.sin),
      'cos':   this.createOperator(4, 'cos',  this.mathFunctions.cos),
      'tan':   this.createOperator(4, 'tan',  this.mathFunctions.tan),
      'cot':   this.createOperator(4, 'cot',  this.mathFunctions.cot),
      'sec':   this.createOperator(4, 'sec',  this.mathFunctions.sec),
      'asin':  this.createOperator(4, 'asin', this.mathFunctions.asin),
      'acos':  this.createOperator(4, 'acos', this.mathFunctions.acos),
      'atan':  this.createOperator(4, 'atan', this.mathFunctions.atan),
      'acot':  this.createOperator(4, 'acot', this.mathFunctions.acot),
      'asec':  this.createOperator(4, 'asec', this.mathFunctions.asec),
      '(': '(',
      ')': ')',
  };
  
  static symbolToOperator(symbol)
  {
      if (this.operators.hasOwnProperty(symbol))
          return this.operators[symbol]
      
      else
          throw new InvalidTokenError(`symbol <mark>${symbol}</mark> was not recognized.`);
  }
}
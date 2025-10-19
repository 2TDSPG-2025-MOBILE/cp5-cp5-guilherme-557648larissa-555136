export function performCalculation(num1: number, num2: number, operation: string): number {
  switch (operation) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '×':
      return num1 * num2;
    case '÷':
      return num1 / num2;
    default:
      return 0;
  }
}


export function performScientificOperation(num: number, func: string): number {
  switch (func) {
    case '√':
      return Math.sqrt(num);
    case 'x²':
      return Math.pow(num, 2);
    case 'sin':
      return Math.sin((num * Math.PI) / 180); // Converte graus para radianos
    case 'cos':
      return Math.cos((num * Math.PI) / 180); // Converte graus para radianos
    case 'tan':
      return Math.tan((num * Math.PI) / 180); // Converte graus para radianos
    case '%':
      return num / 100;
    case 'π':
      return Math.PI;
    default:
      return num;
  }
}
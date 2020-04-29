function convertStringToNumber(string, x) {
    if (arguments.length < 2) x = 10;
    var letters = ['a', 'b', 'c', 'd', 'e', 'f'];
    var chars = string.toLowerCase().split('');
    var flag = chars.includes('-');
    var number = 0;
    var i = 0;

    while (
        i < chars.length &&
        chars[i] !== '.' &&
        !letters.includes(chars[i])
    ) {
        number *= x;
        number += chars[i].codePointAt() - '0'.codePointAt();
        i++;
    }

    // 小数 
    if (chars[i] === '.') i++;    
    var fraction = 1;
    while (
        x === 10 &&
        i < chars.length &&
        chars[i] !== 'e' &&
        chars[i] !== '+' &&
        chars[i] !== '-'
    ) {
        fraction /= x;
        number += (chars[i].codePointAt() - '0'.codePointAt()) * fraction;
        i++;
    }
    
	// 指数
    if (x === 10 &&
        chars[i] ==='-' ||
        chars[i] === '+' ||
        chars[i] === 'e'
    ) i++;
    var index = 0;
    while (x === 10 && i < chars.length) {
        index *= x;
        index += convertStringToNumber(chars[i]);
        if (flag) number /= x ** index
        else number *= x ** index
        i++;
    }

    // 十六进制
    while (x === 16 && letters.includes(chars[i])) {
        number *= x;
        number += chars[i].codePointAt() - 87; // a 97
        i++;
    }

    return number;
}


function convertNumberToString(number, x = 10) {
    let integer = Math.floor(number);
    let decimal = number - integer;
    let string = !integer ? '0' : '';
    while (integer > 0) {
      string = `${integer % x}${string}`;
      integer = Math.floor(integer / x);
    }
  
    if (decimal) {
      string += '.';
      while (decimal && !/\.\d{20}$/.test(string)) { // 最大保留20位小数
        decimal *= x;
        string += `${Math.floor(decimal)}`;
        decimal -= Math.floor(decimal);
      }
    }
    return string;
  }
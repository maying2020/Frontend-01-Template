/* 1 写一个正则表达式 匹配所有 Number 直接量*/


let reg = /[0-9]{1,16}|[0-9]+\.[0-9]+|(NaN)|0[xX][1-9a-fA-F]+/;


/** 2 utf-8 encoding**/

  let result = "";
  for (let s of str) {
    result += `\\u${s.charCodeAt().toString(16)}`;
  }

/* 3 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号 */

let reg = /[\u0021-\u007E]{6,16}|[\x21-\x7E]{6,16}|(['"])(?:(?!\1).)*?\1/g;
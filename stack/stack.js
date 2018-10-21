/**
 * Created by xiaer on 2018/10/15.
 */
// 栈是一种线性结构，
// 先进后出，LIFO（last in first out）
// 程序调用的系统栈，子函数调用

// 具体底层实现，用户不关心。实际底层有多种实现方式。
// 学习不要追求完美，完美主义害死人。100分是收获，20分也是收获
// 学习中本着自己的目标去，了解各个数据结构的底层实现原理

class Stack {
  constructor () {
    this._stack = [];
  }
  push (value) {
    this._stack.push(value);
  }
  pop () {
    return this._stack.pop();
  }
  peek () {
    return this._stack[this._stack.length - 1];
  }
  getSize () {
    return this._stack.length;
  }
  isEmpty () {
    return this._stack.length === 0;
  }
}

// stack的应用：括号匹配，给定字符串“[{(”，判断括号是否匹配
function isValid (str) {
  let _stack = new Stack();
  for (let chr of str) {
    if (chr === '(' || chr === '[' || chr === '{') {
      _stack.push(chr);
    } else {
      if (_stack.isEmpty()) {
        return false;
      }
      let _topChr = _stack.pop();
      if (chr === ')' && _topChr !== '(') {
        return false;
      }
      if (chr === ']' && _topChr !== '[') {
        return false;
      }
      if (chr === '}' && _topChr !== '{') {
        return false;
      }
    }
  }
  return _stack.isEmpty();
}

console.log(isValid('[[]](){}'));

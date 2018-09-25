/**
 * Created by xiaer on 2018/9/25.
 */
let {swap} = require('../util/sortHelper')

// ʱ�临�Ӷȣ�O(n)�� �ռ临�Ӷȣ�O(n)
function moveZero(array) {
  let noneZeroArray = []
  for(let i = 0, len = array.length; i < len; ++i) {
    if (array[i] !== 0) {
      noneZeroArray.push(array[i])
    }
  }
  for (let i = 0, len = noneZeroArray.length; i < len; ++i) {
    array[i] = noneZeroArray[i]
  }
  for(let j = noneZeroArray.length, len = array.length; j < len; ++j) {
    array[j] = 0
  }

  return array
}

// �Ż��汾��[0---k)��Ϊ��0Ԫ��
// ʱ�临�Ӷȣ�O(n)���ռ临�Ӷȣ�O(1)
function moveZero2(array) {
  let k = 0
  for(let i = 0, len = array.length; i < len; ++i) {
    if (array[i] !== 0) {
      array[k++] = array[i]
    }
  }
  for(let i = k, len = array.length; i < len; i++) {
    array[i] = 0
  }

  return array
}

// �Ż��汾������һ��forѭ��
function moveZero3(array) {
  let k = 0
  for(let i = 0, len = array.length; i < len; ++i) {
    if (array[i] !== 0) {
      if (i !== k) {
        swap(array, i, k)
      }
      k += 1
    }
  }
}

let ary = [0,1,0,3,12]
console.log(moveZero(ary))
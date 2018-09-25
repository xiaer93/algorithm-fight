/**
 * Created by xiaer on 2018/9/25.
 */
// 167,125

// �����ⷨ: ʱ�临�Ӷ�O(n^2)

// nlg(n), ��������

// ��ײָ��???��O(n)
function twoSum(array, target) {
  let l = 0,
    r = array.length - 1

  let ret = [-1, -1]
  while (l < r) {
    let sum = array[l] + array[r]
    if (sum === target) {
      ret[0] = l + 1
      ret[1] = r + 1
    } else if (sum < target) {
      l++
    } else {
      r--
    }
  }

  return ret
}


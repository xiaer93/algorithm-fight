/**
 * Created by xiaer on 2018/9/26.
 */
// �Ե����ϵĹ鲢����
// �����������������ã�
function mergeSortBU (array) {
  for(let sz = 1, len = array.length; sz <= len; sz += sz) {
    for(let i = 0; i + sz < len; i += sz + sz) {
      // ��[i, i + sz - 1]��[i + sz, i + 2*sz - 1]���й鲢����
      _merge(array, i, i + sz - 1, Math.min(i + sz + sz - 1, len - 1))
    }
  }
}

// ��[left, right]�������ֽ�������
function _merge (array, left, mid, right) {
  // ǰ�պ������
  let i = left,
    j = mid + 1,
    k = left

  // �����ռ䣬��Ҳ�ǹ鲢��������ȱ��~~~
  let tmpArray = []
  while(i <= mid && j <= right) {
    if(array[i] < array[j]) {
      tmpArray.push(array[i++])
    } else {
      tmpArray.push(array[j++])
    }
  }
  while (i <= mid) {
    tmpArray.push(array[i++])
  }
  while (j <= right) {
    tmpArray.push(array[j++])
  }

  let index = 0
  while (k <= right) {
    array[k++] = tmpArray[index++]
  }
}

module.exports = {
  mergeSortBU
}
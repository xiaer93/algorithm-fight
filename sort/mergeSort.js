/**
 * Created by xiaer on 2018/9/26.
 */
// �߼������ͨ�÷����� ����С�ֶ����ݣ�ʹ�ò��������㷨�����������ڽ�����������������ܷǳ��ã�
// �鲢�����㷨���Զ����µĵݹ��㷨��ȫ��Ϊǰ�պ������
function mergeSort (array) {
  _mergeSort(array, 0, array.length - 1)
}

// ��[left, right]�������ֽ�������
function _mergeSort (array, left, right) {
  // todo: ��Էֶ�С��15�����ֵ����飬Ƕ����������㷨�������ܼ��Ż�����Ӱ��鲢�㷨��ʱ�临�Ӷȣ�
  if (left < right) {
    let mid = Math.floor((right - left) / 2) + left
    _mergeSort(array, left, mid)
    _mergeSort(array, mid + 1, right)
    // fixme: �鲢�����㷨���Ż���������÷ֶ�����ʱ���򲻽���_merge�㷨~
    if (array[mid] > array[mid+1]) {
      _merge(array, left, mid, right)
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
  mergeSort
}
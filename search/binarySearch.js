/**
 * Created by xiaer on 2018/9/25.
 */
// ���ַ�ʱ�临�Ӷȣ�O(lg2 n)  N*��1/2��^x=1����x=logn,������2
// arrayΪ�������飬targetΪ�����Ҷ���
function binarySearch(array, target) {
  // �ڡ�left, right���ķ�Χ��Ѱ��target
  let left = 0,
    right = array.length - 1

  //
  while (left <= right) {
    // ѭ����������Ҫʼ��ά��ѭ��������~~~
    // ѭ���к�ѭ������ʱѭ����������ѭ����ֹ��������ͬʱ������
    // let mid = Math.floor((left + right) / 2)
    let mid = Math.floor((right - left) / 2) + left //�������ּ���ʱ�������~~~
    if (array[mid] < target) {
      left = mid + 1  // target��[mid + 1, r]��~~~
    } else if (array[mid] > target) {
      right = mid - 1 // target��[l, mid - 1]��~~~
    } else {
      return mid
    }
  }

  return -1
}

module.exports = {
  binarySearch
}
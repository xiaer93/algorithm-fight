/**
 * Created by xiaer on 2018/9/25.
 */
// ���ַ�ʱ�临�Ӷȣ�O(lg2 n)  N*��1/2��^x=1����x=logn,������2
// arrayΪ�������飬targetΪ�����Ҷ���
// ����ҵ�target�򷵻����������򷵻�-1
function binarySearch(array, target) {
  // �������ĺ��嶨���������������ʹ��~~~
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

// ͨ���ݹ�ʵ�ֶ��ֲ��ҷ����ݹ��˼��ͷǵݹ�����𣿵ݹ������Բ�
// ���ֲ��ҷ��ı��ֺ����� floor��ceil����Ԫ�����ϱ߽�����~~~

// �ݹ�ʵ�ֶ��ֲ��ҷ�
function binarySearch2 (array, target) {
  // [l, r]����Ѱ��target
  let l = 0,
    r = array.length - 1

  return _innerSearch(array, target, l, r)
}
function _innerSearch (array, target, left, right) {
  if (left > right) {
    return -1
  }

  let ret
  let mid = left + Math.floor((right - left) / 2)
  if (array[mid] < target) {
    ret = _innerSearch(array, target, mid + 1, right)
  } else if (array[mid] > target) {
    ret = _innerSearch(array, target, left, mid - 1)
  } else {
    ret = mid
  }

  return ret
}

// ���ַ����ֺ���floor��Ѱ���±߽�
function floor (array, target) {
  // [l,r]����Ѱ��target
  let l = 0,
    r = array.length - 1

  let ret
  while (l <= r) {
    let mid = l + Math.floor((r - l) / 2)
    if (array[mid] < target) {
      ret = l
      l = mid + 1
    } else if (array[mid] > target) {
      ret = l - 1
      r = mid - 1
    } else {
      while (mid > 0 && array[mid - 1] === target) {
        mid--
      }
      ret = mid
      break
    }
  }

  return ret
}

// ���ַ����ֺ���floor��Ѱ���±߽�
function ceil (array, target) {
  // [l,r]����Ѱ��target
  let l = 0,
    r = array.length - 1

  let ret
  while (l <= r) {
    let mid = l + Math.floor((r - l) / 2)
    if (array[mid] < target) {
      ret = r + 1
      l = mid + 1
    } else if (array[mid] > target) {
      ret = r
      r = mid - 1
    } else {
      while (mid > 0 && array[mid - 1] === target) {
        mid--
      }
      ret = mid
      break
    }
  }

  return ret
}

module.exports = {
  binarySearch
}
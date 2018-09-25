/**
 * Created by xiaer on 2018/9/25.
 */
let {generateRandomArray, generateNearlyOrderArray, printArray, testSort, copyArray} = require('../util/sortHelper')
let {selectionSort} = require('./selectionSort')
let {insertSort, insertSort2} = require('./insertSort')
let {bubbleSort, bubbleSort2} = require('./bubbleSort')
let {shellSort} = require('./shellSort')

let a = generateRandomArray(10000, 1, 10000)
let b = generateNearlyOrderArray(10000, 100)
// printArray(selectionSort(a))

let a1 = copyArray(a)
let a2 = copyArray(a)
let a3 = copyArray(a)
let a4 = copyArray(a)
let a5 = copyArray(a)
testSort(selectionSort, a1)
testSort(insertSort, a2)
testSort(insertSort2, a3)
testSort(bubbleSort, a4)
testSort(bubbleSort2, a5)

console.log('---------------------------------')

let b1 = copyArray(b)
let b2 = copyArray(b)
let b3 = copyArray(b)
let b4 = copyArray(b)
let b5 = copyArray(b)
let b6 = copyArray(b)
testSort(selectionSort, b1)
testSort(insertSort, b2)
testSort(insertSort2, b3)
testSort(bubbleSort, b4)
testSort(bubbleSort2, b5)
testSort(shellSort, b5)
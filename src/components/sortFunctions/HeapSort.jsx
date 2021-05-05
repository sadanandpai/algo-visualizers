export async function* HeapSort(array, swap, highlight, markSort) {
  let arrLength = array.length;
  for (let i = Math.floor(arrLength / 2) - 1; i >= 0; i--) {
    yield* await maxHeap(i);
  }

  for (let i = array.length - 1; i > 0; i--) {
    arrLength--;
    markSort(arrLength);
    yield await swap(0, i);
    yield* await maxHeap(0);
  }

  markSort(0);

  async function* maxHeap(i) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;

    yield await highlight([left, right], i);

    if(left < arrLength){
      if (array[left] > array[max]) {
        max = left;
      }
    }

    if(right < arrLength){
      if (array[right] > array[max]) {
        max = right;
      }
    }

    if (max !== i) {
      yield await swap(i, max);
      yield* await maxHeap(max);
    }
  }
}

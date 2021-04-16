export async function HeapSort(array, swap, highlight, markSort) {
  let arrLength = array.length;
  for (let i = Math.floor(arrLength / 2) - 1; i >= 0; i--) {
    await maxHeap(i);
  }

  for (let i = array.length - 1; i > 0; i--) {
    arrLength--;
    markSort(arrLength);
    await swap(0, i);
    await maxHeap(0);
  }

  markSort(0);

  async function maxHeap(i) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;

    if(left < arrLength){
      await highlight([left, max]);
      if (array[left] > array[max]) {
        max = left;
      }
    }

    if(right < arrLength){
      await highlight([right, max]);
      if (array[right] > array[max]) {
        max = right;
      }
    }

    if (max !== i) {
      await swap(i, max);
      await maxHeap(max);
    }
  }
}

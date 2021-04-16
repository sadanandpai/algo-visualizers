export async function MergeSort(
  array,
  partition,
  offSet = 0,
  combine,
  highlight
) {
  if (array.length === 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  const arr = await merge(
    await MergeSort(left, partition, offSet, combine, highlight),
    await MergeSort(right, partition, offSet + middle, combine, highlight),
    offSet,
    offSet + middle
  );
  return arr;

  async function merge(left, right, off1, off2) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
      // await highlight([off1 + leftIndex, off2 + rightIndex]);
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        await combine(off1 + leftIndex, off1 + result.length - 1);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        await combine(off2 + rightIndex, off1 + result.length - 1);
        rightIndex++;
      }
    }

    while (leftIndex < left.length) {
      result.push(left[leftIndex]);
      await combine(off1 + leftIndex, off1 + result.length - 1);
      leftIndex++;
    }

    while (rightIndex < right.length) {
      result.push(right[rightIndex]);
      await combine(off2 + rightIndex, off1 + result.length - 1);
      rightIndex++;
    }

    return result;
  }
}

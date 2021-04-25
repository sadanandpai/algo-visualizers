export async function MergeSort(
  array,
  combine,
  highlight,
  markSort,
  offSet = 0,
  finalMerge = false
) {
  if (array.length === 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  const arr = await merge(
    await MergeSort(left, combine, highlight, markSort, offSet),
    await MergeSort(right, combine, highlight, markSort, offSet + middle),
    offSet,
    offSet + middle,
    finalMerge,
    markSort
  );
  return arr;

  async function merge(left, right, off1, off2, finalMerge = false, markSort) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] <= right[rightIndex]) {
        await highlight([off1 + leftIndex + rightIndex, off2 + rightIndex]);
        await combine(
          off1 + leftIndex + rightIndex,
          off1 + result.length,
        );
        if(finalMerge)
          await markSort(off1 + result.length);
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        await highlight([off1 + leftIndex + rightIndex, off2 + rightIndex]);
        await combine(off2 + rightIndex, off1 + result.length);
        if(finalMerge)
          await markSort(off1 + result.length);
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    while (leftIndex < left.length) {
      await highlight([off1 + leftIndex + rightIndex]);
      if(finalMerge)
          await markSort(off1 + leftIndex + rightIndex);
      result.push(left[leftIndex]);
      leftIndex++;
    }

    while (rightIndex < right.length) {
      await highlight([off1 + leftIndex + rightIndex]);
      if(finalMerge)
          await markSort(off1 + leftIndex + rightIndex);
      result.push(right[rightIndex]);
      rightIndex++;
    }

    return result;
  }
}

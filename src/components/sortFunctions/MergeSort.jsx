export async function MergeSort(
  array,
  combine,
  highlight,
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
    await MergeSort(left, combine, highlight, offSet),
    await MergeSort(right, combine, highlight, offSet + middle),
    offSet,
    offSet + middle,
    finalMerge
  );
  return arr;

  async function merge(left, right, off1, off2, finalMerge = false) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] <= right[rightIndex]) {
        await highlight([off1 + leftIndex + rightIndex, off2 + rightIndex]);
        await combine(
          off1 + leftIndex + rightIndex,
          off1 + result.length,
          finalMerge
        );
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        await highlight([off1 + leftIndex + rightIndex, off2 + rightIndex]);
        await combine(off2 + rightIndex, off1 + result.length, finalMerge);
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    while (leftIndex < left.length) {
      await highlight([off1 + leftIndex + rightIndex], finalMerge);
      result.push(left[leftIndex]);
      leftIndex++;
    }

    while (rightIndex < right.length) {
      await highlight([off1 + leftIndex + rightIndex], finalMerge);
      result.push(right[rightIndex]);
      rightIndex++;
    }

    return result;
  }
}

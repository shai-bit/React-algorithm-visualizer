export const getMergesortAnimations = (array) => {
  let mainArray = array.slice();
  let animations = [];
  const auxArray = array.slice();
  mergesort(mainArray, 0, array.length - 1, auxArray, animations);
  return animations;
};

function mergesort(mainArray, startIdx, endIdx, auxArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  // Does left
  mergesort(auxArray, startIdx, middleIdx, mainArray, animations);
  // Does right
  mergesort(auxArray, middleIdx + 1, endIdx, mainArray, animations);
  merge(mainArray, startIdx, middleIdx, endIdx, auxArray, animations);
}

function merge(mainArray, startIdx, middleIdx, endIdx, auxArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // Here we set the value to null because we´re only comparing
    animations.push(["comparing", i, j, null]);
    if (auxArray[i] <= auxArray[j]) {
      // Here the value equals to the smallest number in that comparison
      animations.push(["swapping", k, i, auxArray[i]]);
      mainArray[k] = auxArray[i];
      i++;
    } else {
      // Here too the value equals to the smallest number in that comparison
      animations.push(["swapping", k, j, auxArray[j]]);
      mainArray[k] = auxArray[j];
      j++;
    }
    k++;
  }
  // Copies the remaining values
  while (i <= middleIdx) {
    animations.push(["swapping", k, i, auxArray[i]]);
    mainArray[k] = auxArray[i];
    i++;
    k++;
  }

  while (j <= endIdx) {
    animations.push(["swapping", k, j, auxArray[j]]);
    mainArray[k] = auxArray[j];
    j++;
    k++;
  }
}

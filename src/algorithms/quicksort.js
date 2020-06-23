export const getQuicksortAnimations = (array) => {
  let animations = [];
  let auxArray = array.slice();
  quicksort(auxArray, 0, auxArray.length - 1, animations);
  return [auxArray, animations];
};

function quicksort(array, start, end, animations) {
  if (start < end) {
    let pIndex = partition(array, start, end, animations);
    quicksort(array, start, pIndex - 1, animations);
    quicksort(array, pIndex + 1, end, animations);
  }
}

function swap(array, index1, index2) {
  let tmp = array[index2];
  array[index2] = array[index1];
  array[index1] = tmp;
}

function partition(array, start, end, animations) {
  let pivot = array[end];
  let pIndex = start;
  for (let i = start; i < end; i++) {
    animations.push([0, pIndex, i, end]);
    if (array[i] <= pivot) {
      animations.push([1, pIndex, i, end]);
      swap(array, i, pIndex);
      pIndex++;
    }
  }
  swap(array, pIndex, end);
  animations.push([1, pIndex, end - 1, end]);
  return pIndex;
}

export const getBubblesortAnimations = (array) => {
  let animations = [];
  let auxArray = array.slice();
  bubblesort(auxArray, animations);
  return animations;
};

function bubblesort(array, animations) {
  let sorted = false;
  let length = array.length - 1;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < length; i++) {
      animations.push(["comparing", i, i + 1]);
      if (array[i] > array[i + 1]) {
        sorted = false;
        animations.push(["swapping", i, i + 1]);
        swap(array, i, i + 1);
      }
    }
    length--;
  }
  return array;
}

function swap(array, indexOne, indexTwo) {
  let tmp = array[indexOne];
  array[indexOne] = array[indexTwo];
  array[indexTwo] = tmp;
}

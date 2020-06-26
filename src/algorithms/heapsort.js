export const getHeapsortAnimations = (array) => {
  let animations = [];
  let auxArray = array.slice();
  heapsort(auxArray, animations);
  return animations;
};

function heapsort(array, animations) {
  let n = array.length;

  //Build Max Heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }

  for (let i = n - 1; i > 0; i--) {
    let tmp = array[0];
    array[0] = array[i];
    array[i] = tmp;
    animations.push(["swapping", 0, i]);
    heapify(array, i, 0, animations);
  }
}

function heapify(array, arrayLength, i, animations) {
  let largest = i;
  let left = i * 2 + 1;
  let right = i * 2 + 2;

  if (right < arrayLength && array[right] > array[largest]) {
    animations.push(["comparing", largest, right]);
    largest = right;
  }

  if (left < arrayLength && array[left] > array[largest]) {
    animations.push(["comparing", largest, left]);
    largest = left;
  }

  if (largest !== i) {
    animations.push(["swapping", largest, i]);
    let tmp = array[i];
    array[i] = array[largest];
    array[largest] = tmp;
    heapify(array, arrayLength, largest, animations);
  }
}

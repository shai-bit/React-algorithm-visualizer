const getMergesortAnimations = (array) => {
  let animations = [];
  let auxArray = array.slice();
  mergesort(auxArray, animations);
  return animations;
};

function mergesort(array, animations) {
  if (array.length > 1) {
    let mid = Math.floor(array.length / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid);
    mergesort(left, animations);
    mergesort(right, animations);
    merge(array, left, right, animations);
  }
}

function merge(array, left, right, animations) {
  let i, j, k;
  i = j = k = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      array[k] = left[i];
      i++;
    } else {
      array[k] = right[j];
      j++;
    }
    k++;
  }
  while (i < left.length) {
    array[k] = left[i];
    i++;
    k++;
  }

  while (j < right.length) {
    array[k] = right[j];
    j++;
    k++;
  }
}

function merge(leftHalfArray, rightHalfArray, fn) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while((leftIndex < leftHalfArray.length) && (rightIndex < rightHalfArray.length)) {
        const sortingOrder = fn(leftHalfArray[leftIndex], rightHalfArray[rightIndex]);
        if(sortingOrder < 0) {
            result.push(leftHalfArray[leftIndex]);
            leftIndex++;
        } else {
            result.push(rightHalfArray[rightIndex]);
            rightIndex++;
        }
    }
    result = result.concat(leftHalfArray.slice(leftIndex)).concat(rightHalfArray.slice(rightIndex));
    return result;
}

function mergeSort(array, fn) {
    const arrayLength = array.length;
    if(arrayLength === 1) {
        return array;
    }
    const halfLength = Math.floor(arrayLength/2);
    const leftHalfArray = array.slice(0, halfLength);
    const rightHalfArray = array.slice(halfLength);
    return merge(
        mergeSort(leftHalfArray),
        mergeSort(rightHalfArray),
        fn
    );
}

export default mergeSort;
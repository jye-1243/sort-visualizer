// JavaScript source code

// Selection Sort
export function selectionSort(array) {
    let list = [];
    for (let i = 0; i < array.length; i++) {
        list.push(array[i])
    }

    let steps = [];
    for (let i = 0; i < list.length; i++) {
        let min = list[i];
        let min_index = i;
        let temp = list[i];

        // Mark as swap target
        steps.push([1, i,i]);

        for (let j = i + 1; j < list.length; j++) {
            // Check
            steps.push([0, j]);
            if (list[j] < min) {
                steps.push([1, min_index, j]);
                min = list[j];
                min_index = j;
            }
        }
        //Swap
        steps.push([2, i, min_index]);
        list[i] = list[min_index];
        list[min_index] = temp;
    }
    return steps;
}

// Merge Sort
export function mergeSort(unsortedArray, steps, startIndex) {

    if (unsortedArray.length === 1) {
        steps.push([0, startIndex]);
        return unsortedArray;
    }

    else if (unsortedArray.length === 0) {
        return unsortedArray;
    }

    const mid = Math.floor(unsortedArray.length / 2);

    const leftHalf = unsortedArray.slice(0, mid);
    const rightHalf = unsortedArray.slice(mid);
    return merge(mergeSort(leftHalf, steps, startIndex), mergeSort(rightHalf, steps, mid+startIndex), startIndex, steps);
}

export function merge(left, right, start, steps) {
    let leftIndex = 0, rightIndex = 0;

    let original = left.concat(right);
    let moves = [];

    while (leftIndex < left.length && rightIndex < right.length) {
        steps.push([1, start + leftIndex, start + left.length + rightIndex]);

        //let temp = original[leftIndex+rightIndex];

        if (left[leftIndex] < right[rightIndex]) {
            //result.push(left[leftIndex]);

            moves.push([2, start + leftIndex + rightIndex, left[leftIndex]]);

            //original[original.indexOf(left[leftIndex])] = temp;
            original[leftIndex + rightIndex] = left[leftIndex];
            leftIndex++;

        }
        else {
            //result.push(right[rightIndex])
            moves.push([2, start + leftIndex + rightIndex, right[rightIndex]]);

            //original[original.indexOf(right[rightIndex])] = temp;
            original[leftIndex + rightIndex] = right[rightIndex];

            rightIndex++;
        }

    }

    //result = result.concat(right.slice(rightIndex));
    //result = result.concat(left.slice(leftIndex));

    while (rightIndex < right.length) {
        //let temp = original[leftIndex + rightIndex];

        moves.push([2, start + leftIndex + rightIndex, right[rightIndex]]);

        //original[original.indexOf(right[rightIndex])] = temp;
        original[leftIndex + rightIndex] = right[rightIndex];

        rightIndex++;
    }

    while (leftIndex < left.length) {
        //let temp = original[leftIndex + rightIndex];

        moves.push([2, start + leftIndex + rightIndex, left[leftIndex]]);

        //original[original.indexOf(left[leftIndex])] = temp;
        original[leftIndex + rightIndex] = left[leftIndex];

        leftIndex++;
    }


    // console.log( moves);
    for (let i = 0; i < moves.length; i++) {
        steps.push(moves[i]);
    }

    //console.log("RESULT: " + result);
    //console.log("MODIFIED: " + original);
    return original;
}
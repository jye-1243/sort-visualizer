// JavaScript source code
export function selectionSort(array) {
    let list = [];
    for (let i = 0; i < array.length; i++) {
        list.push(array[i])
    }
    let steps = [];
    let min, min_index;
    for (let i = 0; i < list.length; i++) {
        min = list[i];
        let min_index = i;
        let temp = list[i];

        // Mark as swap target
        steps.push([1, list[i],list[i]]);

        for (let j = i + 1; j < list.length; j++) {
            // Check
            steps.push([0, list[j]]);
            if (list[j] < min) {
                steps.push([1, list[min_index], list[j]]);
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

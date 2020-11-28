// JavaScript source code
import React from 'react';
import './sortvisualizer.scss';
import * as algorithms from './Algorithms.js';

// Constants
const LENGTH = 200;
const SPEED = 10;
var x = [];

class SortVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        }

        this.selectionSort = this.selectionSort.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
        this.resetArray = this.resetArray.bind(this);
        this.quickSort = this.quickSort.bind(this);
        this.heapSort = this.heapSort.bind(this);

    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        for (let i = 0; i < x.length; i++) {
            clearTimeout(x[i]);
        }

        const array = [];
        // Random values from 1 to length
        for (let i = 0; i < LENGTH; i++)
            array[i] = Math.floor(Math.random() * LENGTH) + 1;

        //// Below is for list of unique values from 1 to length
        //// From https://stackoverflow.com/questions/5836833/create-an-array-with-random-values
        //var tmp, current, top = LENGTH;
        //if (top) while (--top) {
        //    current = Math.floor(Math.random() * (top + 1));
        //    tmp = array[current];
        //    array[current] = array[top];
        //    array[top] = tmp;
        //}

        this.setState({ array });
    }

    // Reset graph on screen with style
    resetVisual() {
        this.resetArray();

        for (let i = 0; i < LENGTH; i++) {
            let bar = document.getElementById("bar-" + String(i));
            bar.style.setProperty('background-color', '#ff4136');
        }
    }

    // Merge sort visualization
    mergeSort() {

        let { array } = this.state;
        let steps = [];
        algorithms.mergeSort(array, steps, 0);

        //console.log(array);
        //console.log(steps);

        // Iterate through steps
        for (let i = 0; i < steps.length; i++) {
            // Check bar
            if (steps[i][0] === 0) {
                x.push(setTimeout(() => {
                    let check_bar = document.getElementById("bar-" + String(steps[i][1]));
                    check_bar.style.setProperty('background-color', 'blue')
                    x.push(setTimeout(() => {
                        check_bar.style.setProperty('background-color', '#ff4136')
                    }, SPEED));
                }, i * SPEED));
            }
            // Compare bars
            else if (steps[i][0] === 1) {
                x.push(setTimeout(() => {
                    let comp1 = document.getElementById("bar-" + String(steps[i][1]));
                    let comp2 = document.getElementById("bar-" + String(steps[i][2]));
                    comp1.style.setProperty('background-color', '#00ff00')
                    comp2.style.setProperty('background-color', '#00ff00')
                    x.push(setTimeout(() => {
                        comp1.style.setProperty('background-color', '#ff4136')
                        comp2.style.setProperty('background-color', '#ff4136')
                    }, SPEED));
                }, i * SPEED));
            }
            // Change bar value
            else if (steps[i][0] === 2) {
                x.push(setTimeout(() => {
                    //let temp = array[steps[i][1]];
                    array[steps[i][1]] = steps[i][2];
                    //array[steps[i][2]] = temp;
                    this.setState({ array });
                }, i * SPEED));
             }

            //console.log(this.state);
        }
    }

    // Selection sort visualizer
    selectionSort() {
        let { array } = this.state;
        console.log(array);
        let steps = algorithms.selectionSort(array);

        // Iterate through steps
        for (let i = 0; i < steps.length; i++) {
            // Check bar
            if (steps[i][0] === 0) {
                x.push(setTimeout(() => {
                    let check_bar = document.getElementById("bar-" + String(steps[i][1]));
                    check_bar.style.setProperty('background-color', 'blue')
                    x.push(setTimeout(() => {
                        check_bar.style.setProperty('background-color', '#ff4136')
                    }, SPEED));
                }, i * SPEED));
            }
            // Compare two bars to find minimum
            else if (steps[i][0] === 1) {
                x.push(setTimeout(() => {
                    let removed = document.getElementById("bar-" + String(steps[i][1]));
                    let added = document.getElementById("bar-" + String(steps[i][2]));
                    x.push(setTimeout(() => {
                        removed.style.setProperty('background-color', '#ff4136')
                        added.style.setProperty('background-color', '#00ff00')
                    }, 1));
                }, i * SPEED));
            }
            // Set bar at front
            else if (steps[i][0] === 2) {
                x.push(setTimeout(() => {
                    let temp = array[steps[i][1]];
                    array[steps[i][1]] = array[steps[i][2]];
                    array[steps[i][2]] = temp;
                    this.setState({ array });
                    console.log(steps[i]);

                    x.push(setTimeout(() => {
                        for (let j = steps[i][1]; j < LENGTH; j++) {
                            let bar = document.getElementById("bar-" + String(j));
                            if (j === steps[i][1]) {
                                bar.style.setProperty('background-color', 'yellow');
                                console.log(j);
                            }
                            else {
                                bar.style.setProperty('background-color', '#ff4136');
                            }
                        }
                    }, 1));
                    
                }, i * SPEED));
            }
        }
    }

    // Quick Sort
    quickSort() {
        let { array } = this.state;
        let copy = [];

        for (let i = 0; i < array.length; i++)
            copy.push(array[i])

        let steps = [];
        algorithms.quickSort(copy, 0, LENGTH - 1, steps);
        let currPiv = 0;

        // Iterate through steps
        for (let i = 0; i < steps.length; i++) {
            // Compare bars
            if (steps[i][0] === 1) {
                let piv = steps[i][2];
                x.push(setTimeout(() => {
                    let bar = document.getElementById("bar-" + String(steps[i][1]));
                    let pivot = document.getElementById("bar-" + String(piv));
                    bar.style.setProperty('background-color', '#0000ff')
                    pivot.style.setProperty('background-color', '#0000ff')
                    x.push(setTimeout(() => {
                        bar.style.setProperty('background-color', '#ff4136')
                        if (piv != currPiv) {
                            pivot.style.setProperty('background-color', '#ff4136')
                        }
                    }, SPEED));
                }, i * SPEED));

                currPiv = steps[i][2];
            }
            // Change bar value
            else if (steps[i][0] === 2) {
                x.push(setTimeout(() => {

                    let comp1 = document.getElementById("bar-" + String(steps[i][1]));
                    let comp2 = document.getElementById("bar-" + String(steps[i][2]));
                    comp1.style.setProperty('background-color', '#00ff00')
                    comp2.style.setProperty('background-color', '#00ff00')
                    x.push(setTimeout(() => {
                        comp1.style.setProperty('background-color', '#ff4136')
                        comp2.style.setProperty('background-color', '#ff4136')
                    }, SPEED));

                    let temp = array[steps[i][1]];
                    array[steps[i][1]] = array[steps[i][2]];
                    array[steps[i][2]] = temp;
                    this.setState({ array });
                }, i * SPEED));
            }
        }
    }

    heapSort() {
        let { array } = this.state;

        let steps = [], copy = [];

        for (let i = 0; i < array.length; i++)
            copy.push(array[i])

        console.log(array);
        algorithms.heapSort(copy, steps);

        // Iterate through steps
        for (let i = 0; i < steps.length; i++) {
            // Compare bars
            if (steps[i][0] === 1) {
                x.push(setTimeout(() => {
                    let bar = document.getElementById("bar-" + String(steps[i][1]));
                    let pivot = document.getElementById("bar-" + String(steps[i][2]));
                    bar.style.setProperty('background-color', '#0000ff')
                    pivot.style.setProperty('background-color', '#0000ff')
                    x.push(setTimeout(() => {
                        bar.style.setProperty('background-color', '#ff4136')
                        pivot.style.setProperty('background-color', '#ff4136')
                    }, SPEED));
                }, i * SPEED));

            }
            // Change bar value
            else if (steps[i][0] === 2) {
                x.push(setTimeout(() => {

                    let comp1 = document.getElementById("bar-" + String(steps[i][1]));
                    let comp2 = document.getElementById("bar-" + String(steps[i][2]));
                    comp1.style.setProperty('background-color', '#00ff00')
                    comp2.style.setProperty('background-color', '#00ff00')
                    x.push(setTimeout(() => {
                        comp1.style.setProperty('background-color', '#ff4136')
                        comp2.style.setProperty('background-color', '#ff4136')
                    }, SPEED));

                    let temp = array[steps[i][1]];
                    array[steps[i][1]] = array[steps[i][2]];
                    array[steps[i][2]] = temp;
                    this.setState({ array });
                }, i * SPEED));
            }
        }
        console.log(array);
        this.setState({ array }); 
    }

    // Render function
    render() {
        const { array } = this.state;
        return (
            <div>
                <div className="nav-bar">
                    <button className="restart-btn" onClick={() => this.resetVisual()}>Restart</button>
                    <button className="sort-btn" onClick={this.selectionSort}>Selection Sort</button>
                    <button className="sort-btn" onClick={this.mergeSort}>Merge Sort</button>
                    <button className="sort-btn" onClick={this.quickSort}>Quick Sort</button>
                    <button className="sort-btn" onClick={this.heapSort}>Heap Sort</button>
                </div>
                <div className="bar-graph">
                    {array.map((value, idx) => (
                        < div className={"bar-" + String(value)} id={"bar-" + String(idx)} key={idx} data-value={value}>
                            
                        </div >
                    ))}
                </div>

            </div>
        );
    }
}

export default SortVisualizer;
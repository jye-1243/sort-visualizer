// JavaScript source code
import React from 'react';
import './sortvisualizer.scss';
import * as algorithms from './Algorithms.js';

const LENGTH = 100;
const SPEED = 10;

class SortVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        }

        this.selectionSort = this.selectionSort.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
        this.resetArray = this.resetArray.bind(this);
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
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

    resetVisual() {
        this.resetArray();

        for (let i = 0; i < LENGTH; i++) {
            let bar = document.getElementById("bar-" + String(i));
            bar.style.setProperty('background-color', '#ff4136');
        }
    }

    mergeSort() {
        let { array } = this.state;
        let steps = [];
        algorithms.mergeSort(array, steps, 0);

        //console.log(array);
        //console.log(steps);

        for (let i = 0; i < steps.length; i++) {
            if (steps[i][0] === 0) {
                setTimeout(() => {
                    let check_bar = document.getElementById("bar-" + String(steps[i][1]));
                    check_bar.style.setProperty('background-color', 'blue')
                    setTimeout(() => {
                        check_bar.style.setProperty('background-color', '#ff4136')
                    }, SPEED);
                }, i * SPEED);
            }
            else if (steps[i][0] === 1) {
                setTimeout(() => {
                    let comp1 = document.getElementById("bar-" + String(steps[i][1]));
                    let comp2 = document.getElementById("bar-" + String(steps[i][2]));
                    comp1.style.setProperty('background-color', '#00ff00')
                    comp2.style.setProperty('background-color', '#00ff00')
                    setTimeout(() => {
                        comp1.style.setProperty('background-color', '#ff4136')
                        comp2.style.setProperty('background-color', '#ff4136')
                    }, SPEED);
                }, i * SPEED);
            }
             if (steps[i][0] === 2) {
                setTimeout(() => {
                    //let temp = array[steps[i][1]];
                    array[steps[i][1]] = steps[i][2];
                    //array[steps[i][2]] = temp;
                    this.setState({ array });
                }, i * SPEED);
             }

            //console.log(this.state);
        }
    }

    selectionSort() {
        let { array } = this.state;
        console.log(array);
        let steps = algorithms.selectionSort(array);

        for (let i = 0; i < steps.length; i++) {
            if (steps[i][0] === 0) {
                setTimeout(() => {
                    let check_bar = document.getElementById("bar-" + String(steps[i][1]));
                    check_bar.style.setProperty('background-color', 'blue')
                    setTimeout(() => {
                        check_bar.style.setProperty('background-color', '#ff4136')
                    }, SPEED);
                }, i * SPEED);
            }
            else if (steps[i][0] === 1) {
                setTimeout(() => {
                    let removed = document.getElementById("bar-" + String(steps[i][1]));
                    let added = document.getElementById("bar-" + String(steps[i][2]));
                    setTimeout(() => {
                        removed.style.setProperty('background-color', '#ff4136')
                        added.style.setProperty('background-color', '#00ff00')
                    }, 1);
                }, i * SPEED);
            }
            else if (steps[i][0] === 2) {
                setTimeout(() => {
                    let temp = array[steps[i][1]];
                    array[steps[i][1]] = array[steps[i][2]];
                    array[steps[i][2]] = temp;
                    this.setState({ array });
                    console.log(steps[i]);

                    setTimeout(() => {
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
                    }, 1);
                    
                }, i * SPEED);
            }
        }
    }

    render() {
        const { array } = this.state;
        return (
            <div>
                <div className="bar-graph">
                    {array.map((value, idx) => (
                        < div className={"bar-" + String(value)} id={"bar-" + String(idx)} key={idx} data-value={value}>
                            
                        </div >
                    ))}
                </div>
                <button onClick={() => this.resetVisual() }>Restart</button>
                <button onClick={this.selectionSort}>Selection Sort</button>
                <button onClick={this.mergeSort}>Merge Sort</button>
            </div>
        );
    }
}

export default SortVisualizer;
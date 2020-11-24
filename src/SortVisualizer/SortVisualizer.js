// JavaScript source code
import React from 'react';
import './sortvisualizer.scss';
import * as algorithms from './Algorithms.js';

const LENGTH = 100;

class SortVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        }
        this.swap = this.swap.bind(this);

        this.selectionSort = this.selectionSort.bind(this);
        this.resetArray = this.resetArray.bind(this);
        this.test = this.test.bind(this);
    }

    componentDidMount() {
        this.resetArray();
        //this.selectionSort();
        //setTimeout(this.swap, 2000);
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < LENGTH; i++)
            array[i] = i+1;

        // From https://stackoverflow.com/questions/5836833/create-an-array-with-random-values
        var tmp, current, top = LENGTH;
        if (top) while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }

        this.setState({ array });
    }

    resetVisual() {
        this.resetArray();

        for (let i = 0; i < LENGTH; i++) {
            let bar = document.getElementById("bar-" + String(i+1));
            bar.style.setProperty('background-color', '#ff4136');
        }
    }

    test() {
        let bar = document.getElementById("bar-3");
        bar.style.setProperty('background-color', 'black');
    }

    swap() {
        let { array } = this.state;
        let tmp = array[0];
        array[0] = array[10];
        array[10] = tmp;

        this.setState({ array });
    }

    selectionSort() {
        let { array } = this.state;
        let steps = algorithms.selectionSort(array);

        for (let i = 0; i < steps.length; i++) {
            if (steps[i][0] === 0) {
                setTimeout(() => {
                    let check_bar = document.getElementById("bar-" + String(steps[i][1]));
                    check_bar.style.setProperty('background-color', 'blue')
                    setTimeout(() => {
                        check_bar.style.setProperty('background-color', '#ff4136')
                    }, 10);
                }, i * 10);
            }
            else if (steps[i][0] === 1) {
                setTimeout(() => {
                    let removed = document.getElementById("bar-" + String(steps[i][1]));
                    let added = document.getElementById("bar-" + String(steps[i][2]));
                    setTimeout(() => {
                        removed.style.setProperty('background-color', '#ff4136')
                        added.style.setProperty('background-color', '#00ff00')
                    }, 1);
                }, i * 10);
            }
            else if (steps[i][0] === 2) {
                setTimeout(() => {
                    let temp = array[steps[i][1]];
                    array[steps[i][1]] = array[steps[i][2]];
                    array[steps[i][2]] = temp;
                    this.setState({ array });

                    for (let j = array[steps[i][1]]; j <= LENGTH; j++) {
                        let bar = document.getElementById("bar-" + String(j));
                        if (j === array[steps[i][1]]) {
                            bar.style.setProperty('background-color', 'yellow');
                        }
                        else {
                            bar.style.setProperty('background-color', '#ff4136');
                        }
                    }
                }, i * 10);
            }
        }
    }

    render() {
        const { array } = this.state;
        return (
            <div>
                <div className="bar-graph">
                    {array.map((value, idx) => (
                        < div className="bar" id={"bar-" + String(value)} key={idx} value={value}>
                            
                        </div >
                    ))}
                </div>
                <button onClick={() => this.resetVisual() }>Restart</button>
                <button onClick={this.selectionSort}>Selection Sort</button>
                <button onClick={this.test}>Test</button>
            </div>
        );
    }
}

export default SortVisualizer;
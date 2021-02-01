import {Component} from 'react';
import Atom from "./Atom";

type PeriodicProps = {
}


class Periodic extends Component<PeriodicProps> {

    private static ari1: number[] = [1, 3, 11, 19, 37, 55, 87, 58, 90];
    private static ari2: number[] = [2, 5, 13, 22, 40, 72, 104];

    private readonly maxNumber:number
    private readonly maxBound:number

    constructor(props:PeriodicProps) {
        super(props);
        // @ts-ignore
        this.maxNumber = document.querySelectorAll('[name="treactor-max-number"]')[0].content
        // @ts-ignore
        this.maxBound = document.querySelectorAll('[name="treactor-max-number"]')[0].content
    }



    createPeriod(row: number) {
        let children = []
        let element = Periodic.ari1[row - 1]
        for (let i = 1; i <= 3; i++) {
            if (
                ((row >= 1) && (i <= 1)) ||
                ((row >= 2) && (i <= 2)) ||
                ((row >= 4) && (i <= 3))
            ) {
                children.push(<td><Atom enabled={element <= this.maxNumber} element={element++} healthInterval={0}/></td>)
            } else {
                children.push(<td></td>)
            }
        }
        children.push(<td></td>)
        element = Periodic.ari2[row - 1]
        for (let i = 4; i <= 18; i++) {
            if (
                ((row >= 1) && (i >= 18)) ||
                ((row >= 2) && (i >= 13)) ||
                ((row >= 4) && (i >= 4))
            ) {
                children.push(<td><Atom enabled={element <= this.maxNumber} element={element++} healthInterval={0}/></td>)
            } else {
                children.push(<td></td>)
            }
        }
        return children
    }

    createExtraRow (row: number) {
        let children = []
        for (let i = 1; i <= 3; i++) {
            children.push(<td></td>)
        }
        children.push(<td></td>)
        let element = Periodic.ari1[row - 1]
        for (let i = 4; i <= 17; i++) {
            children.push(<td><Atom enabled={element <= this.maxNumber} element={element++} healthInterval={0}/></td>)
        }
        children.push(<td></td>)
        return children
    }

    table() {
        let table = []
        for (let i = 1; i <= 7; i++) {
            table.push(<tr>{this.createPeriod(i)}</tr>)
        }
        table.push(<tr></tr>)
        for (let i = 8; i <= 9; i++) {
            table.push(<tr>{this.createExtraRow(i)}</tr>)
        }
        return table
    }

    render() {
        return (
            <table>
                <tbody>
                {this.table()}
                </tbody>
            </table>
        )
    }

}

export default Periodic;
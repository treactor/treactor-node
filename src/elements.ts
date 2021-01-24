import yaml from "js-yaml";
import fs from "fs";

export interface IAtom {
    number: number;
    symbol: string;
    element: string;
}

export class Elements {
    private elementsByNumber = new Map<number, IAtom>()
    private elementsBySymbol = new Map<string, IAtom>()

    constructor() {
        try {
            const doc = yaml.load(fs.readFileSync('elements.yaml', 'utf8')) as object;
            // @ts-ignore
            let e = doc.elements as Array<IAtom>;
            e.forEach(atom => {
                this.elementsByNumber.set(atom.number, atom)
                this.elementsBySymbol.set(atom.symbol.toLowerCase(), atom)
            })
        } catch (e) {
            console.log(e);
        }
    }

    byNumber(n: number) {
        return this.elementsByNumber.get(n)
    }


    bySumbol(s: string) {
        return this.elementsBySymbol.get(s.toLowerCase())
    }
}
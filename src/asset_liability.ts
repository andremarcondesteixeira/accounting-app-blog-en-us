import type { MoneyFacade } from "./money";
import money from "./money";

export abstract class Priceable {
    constructor(private _name: string, private _value: MoneyFacade) {}

    get name() {
        return this._name;
    }

    get value() {
        return this._value;
    }
}

export class Asset extends Priceable {
    constructor(name: string, value: MoneyFacade) {
        super(name, value);
    }
}

export class Liability extends Priceable {
    constructor(name: string, value: MoneyFacade) {
        super(name, value);
    }
}

export function sum(items: Priceable[]) {
    return items.reduce((total, item) => {
        return total.add(item.value);
    }, money("USD", 0));
}

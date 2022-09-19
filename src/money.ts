import Dinero from "dinero.js";

export class MoneyFacade {
    private _wrappedObj: Dinero.Dinero;

    constructor(private _currency: Currency, private _valueInMinorUnits: number) {
        this._wrappedObj = Dinero({
            amount: this._valueInMinorUnits,
            currency: this._currency,
        });
    }

    add(other: MoneyFacade) {
        return this.fromWrappedLibInstance(this._wrappedObj.add(other._wrappedObj));
    }

    subtract(other: MoneyFacade) {
        return this.fromWrappedLibInstance(this._wrappedObj.subtract(other._wrappedObj));
    }

    multiply(factor: number) {
        return this.fromWrappedLibInstance(this._wrappedObj.multiply(factor));
    }

    divide(factor: number) {
        return this.fromWrappedLibInstance(this._wrappedObj.divide(factor));
    }

    isLessThan(other: MoneyFacade) {
        return this._wrappedObj.lessThan(other._wrappedObj);
    }

    isLessThanOrEqualTo(other: MoneyFacade) {
        return this._wrappedObj.lessThanOrEqual(other._wrappedObj);
    }

    isEqualTo(other: MoneyFacade) {
        return this._wrappedObj.equalsTo(other._wrappedObj);
    }

    isGreaterThanOrEqualTo(other: MoneyFacade) {
        return this._wrappedObj.greaterThanOrEqual(other._wrappedObj);
    }

    isGreaterThan(other: MoneyFacade) {
        return this._wrappedObj.greaterThan(other._wrappedObj);
    }

    format(locale: string) {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: this._currency,
            // in order to keep the code simple, let's assume all currencies have
            // minor units that are 1/100 of the major unit
        }).format(this._valueInMinorUnits / 100);
    }

    private fromWrappedLibInstance(obj: Dinero.Dinero) {
        return new MoneyFacade(obj.getCurrency(), obj.getAmount());
    }
}

export type Currency = Dinero.Currency;

export default function money(currency: Currency, valueInMinorUnits: number) {
    return new MoneyFacade(currency, valueInMinorUnits);
}

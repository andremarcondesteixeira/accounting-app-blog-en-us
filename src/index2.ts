// Example 2
// You own a computer that is worth $5,000 if you sell it today.
// You bought it for $7,500 and paid $4,000 so far.
// Apart from that, you have $2,000 in your checkings account and $1,500 of bills to be paid.

import { Asset, Liability, sum } from "./asset_liability";
import money from "./money";

const assets: Asset[] = [
    new Asset("Computer", money("USD", 5_000_00)),
    new Asset("Money in the checkings account", money("USD", 2_000_00)),
];

const liabilities: Liability[] = [
    new Liability("Installments payable for the computer", money("USD", 3_500_00)),
    new Liability("Bills to be paid", money("USD", 1_500_00)),
];

// In the case of a person, the equity is how much money you actually have
// It is the value of your assets subtracted by all your present and future expenses
const equity: Liability[] = [new Liability("What you actually have", money("USD", 2_000_00))];

const leftSideOfTheEquation = sum(assets);
const rightSideOfTheEquation = sum(liabilities).add(sum(equity));
expect(leftSideOfTheEquation.isEqualTo(rightSideOfTheEquation)).toBe(true);

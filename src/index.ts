// Example 1
// John decided to open a company.
// He invested $20,000 to buy raw materials.
// In the first month of operation, he used $5,000 worth of raw materials and had $25,000 of total sales.
// He also has $10,000 of bills to pay.

import { Asset, Liability, sum } from "./asset_liability";
import money from "./money";

const assets: Asset[] = [
    new Asset("Raw materials", money("USD", 15_000_00)),
    new Asset("Total sales", money("USD", 25_000_00)),
];

const liabilities: Liability[] = [new Liability("Bills to pay", money("USD", 10_000_00))];

// The equity is a liability because the company must return it to the shareholders
const equity: Liability[] = [
    // The capital stock is part of the equity.
    // When John decided to open a company, he made an initial investment of $20,000.
    // This is the capital stock of the company, and the company owes this money to John.
    // If the company owes this to John, then it is a liability
    new Liability("Capital stock", money("USD", 20_000_00)),

    // The profit (or the loss) is the difference between the all the other assets and liabilities,
    // and it gives the balance to the equation
    new Liability("Profit", money("USD", 10_000_00)),
];

const leftSideOfTheEquation = sum(assets);
const rightSideOfTheEquation = sum(liabilities).add(sum(equity));
expect(leftSideOfTheEquation.isEqualTo(rightSideOfTheEquation)).toBe(true);

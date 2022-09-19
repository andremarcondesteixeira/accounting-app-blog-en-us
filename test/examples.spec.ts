import { Asset, Liability, sum } from "../src/asset_liability";
import money from "../src/money";

test("Example 1", () => {
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
});

test("Example 2", () => {
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
});

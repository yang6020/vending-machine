**Vending Machine**

a 10 slot vending machine

![Vending Machine](./ss.png?raw=true/"Title")

**Setup**

- download the repo
- npm install
- npx jest vending-machine

**Functionalities:**

able to add,remove,refill, and replace an item in a slot

able to purchase an item and return change (with the smallest amount of coin)

able to refill change

able to list the products and or their names

1. Accept Money
   As a vendor
   I want a vending machine that accepts money

The vending machine will accept valid coins (toonies,loonies, nickels, dimes, and quarters) and reject invalid money larger than 20. When a valid amount is inserted

2. Select Product
   As a vendor
   I want customers to select products

When the slot button is pressed and enough money has been inserted, the product is returned. If there is not enough money inserted then the machine displays Insufficient funds

3. Make Change
   As a vendor
   I want customers to receive correct change

Change is dispenesed after a customer adds more money than the product he wants to purchase. The smallest number of coins is returned

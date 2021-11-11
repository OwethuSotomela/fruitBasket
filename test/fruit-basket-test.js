const assert = require("assert");
const tastyFruit = require("../fruitBasket");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/fruitBasket';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const basket = tastyFruit(pool);

describe("Create Fruit Basket", async function () {

    it("Should insert all fruit baskets to the database", async function () {

        var allBaskets = ["Banana"]
        var fruitBasket = [];

        await basket.createFruitBasket("Banana", 1, 3, 3)

        var getFruitName = await basket.getFruit("")

        getFruitName.forEach(element => {
            fruitBasket.push(element.fruit_name)
        });

        console.log(fruitBasket)
        assert.equal(allBaskets.length, fruitBasket.length)
    })
});

describe('Find fruit basket', async function () {
    it('Should find all fruit basket for a given fruit type', async function () {

        var Banana = await basket.findFruit("Banana")

        assert.equal("Banana", Banana[0]["fruit_name"]);

    })
});

describe('Update fruit basket', async function () {
    it('Should update the quantity of the given fruit basket', async function () {

        var bananaBasket = ["Banana"];
        var fruitBasket = []

        await basket.updateFruit("Banana", 1, 3);

        var getFruitName = await basket.getFruit("")

        getFruitName.forEach(element => {
            fruitBasket.push(element.quantity)
        });
        console.log(fruitBasket)

        assert.equal(bananaBasket.length, fruitBasket.length)

    });
});

describe('Show Total Price', async function () {
    it("Should show the total price for a given fruit basket", async function () {

        var bananaBasket = ["Banana"];
        var fruitBasket = [];

        var getFruitName = await basket.getFruit("")

        getFruitName.forEach(element => {
            fruitBasket.push(element.price)
        });
        console.log(fruitBasket)

        assert.equal(bananaBasket.length, fruitBasket.length, await basket.showPrice());
    })
});

describe('Show sum of total', async function () {
    it('Should show the sum of total for a given type of basket', async function () {

        var bananaBasket = ["Banana"];
        var fruitBasket = [];

        var getFruitName = await basket.getFruit("")
        var Banana = await basket.getFruitSum("Banana")

        getFruitName.forEach(element => {
            fruitBasket.push(element.price)
        });

        assert.equal(bananaBasket.length, Banana.length, await basket.showPrice());

    })
});







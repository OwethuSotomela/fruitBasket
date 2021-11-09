const assert = require("assert");
const tastyFruit = require("../fruitBasket");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || 'postgresql://@localhost:5432/travis_ci_test';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const basket = tastyFruit(pool);

describe("Create Fruit Basket", async function () {

    beforeEach(async function () {
        await pool.query("DELETE FROM fruit_basket;");

        await pool.query("INSERT INTO fruit_basket (fruit_name, quantity, price, original_price) VALUES ($1, $2, $3, $4)", ["Banana", 1, 3, 3])
        await pool.query("INSERT INTO fruit_basket (fruit_name, quantity, price, original_price) VALUES ($1, $2, $3, $4)", ["Apple", 1, 3.50, 3.50])
        await pool.query("INSERT INTO fruit_basket (fruit_name, quantity, price, original_price) VALUES ($1, $2, $3, $4)", ["Orange", 1, 3.50, 3.50])
    });

    it("Should insert all fruit baskets to the database", async function () {

        var allBaskets = ["Banana", "Apple", "Orange"]
        var fruitBasket = [];

        await basket.createFruitBasket("Banana", 1, 3)
        await basket.createFruitBasket("Apple", 1, 3.50)
        await basket.createFruitBasket("Orange", 1, 3.50)

        var getFruitName = await basket.getFruit("")
        var getFruitName = await basket.getFruit("")
        var getFruitName = await basket.getFruit("")

        getFruitName.forEach(element => {
            fruitBasket.push(element.fruit_name)
        });

        assert.equal(allBaskets.length, fruitBasket.length)
    })

    it("Should create a new basket to the database", async function () {

        var allBaskets = ["Banana", "Apple", "Orange", "Peach"]
        var fruitBasket = [];

        await basket.createFruitBasket("Peach", 10, 50)

        var getFruitName = await basket.getFruit("")

        getFruitName.forEach(element => {
            fruitBasket.push(element.fruit_name)
        });

        assert.equal(allBaskets.length, fruitBasket.length)
    })

});

describe('Find fruit basket', async function () {
    it('Should find all fruit basket for a given fruit type', async function () {

        var Apple = await basket.findFruit("Apple")
        var Banana = await basket.findFruit("Banana")
        var Orange = await basket.findFruit("Orange")
        assert.equal("Banana", Banana[0]["fruit_name"]);
        assert.equal("Apple", Apple[0]["fruit_name"]);
        assert.equal("Orange", Orange[0]["fruit_name"]);

    })
});

describe('Show Total Price', async function () {
    it("Should show the total price for a given fruit basket", async function () {

        var allBaskets = ["Banana", "Apple", "Orange", "Peach"];
        var fruitBasket = [];
        var getFruitName = await basket.getFruit("")
                
        getFruitName.forEach(element => {
            fruitBasket.push(element.price)
        });

        assert.equal(allBaskets.length, fruitBasket.length)
        assert.deepEqual(fruitBasket, await basket.showPrice());
        
    })
});

describe('Show sum of total', async function () {
    it('Should show the sum of total for a given type of basket', async function () {

        var alllBasket = ["Banana", "Apple", "Orange", "Peach"];
        console.log(alllBasket);
        var Apple = await basket.getFruitSum("Apple")
        var Banana = await basket.getFruitSum("Banana")
        var Orange = await basket.getFruitSum("Orange")
        assert.equal(3, Banana[0]["price"]);
        console.log(Banana[0]["price"])
        assert.equal(3.50, Apple[0]["price"]);
        assert.equal(3.50, Orange[0]["price"]);

    })
});







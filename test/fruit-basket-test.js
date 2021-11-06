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

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from fruit_basket;");
        // add valid colors
        await pool.query("delete from fruit_basket;");
        await pool.query("INSERT INTO fruit_basket (fruit_name, quantity, price, original_price) VALUES ($1, $2, $3, $4)", ["Banana", 1, 3, 3])
        await pool.query("INSERT INTO fruit_basket (fruit_name, quantity, price, original_price) VALUES ($1, $2, $3, $4)", ["Apple", 1, 3.50, 3.50])
        await pool.query("INSERT INTO fruit_basket (fruit_name, quantity, price, original_price) VALUES ($1, $2, $3, $4)", ["Orange", 1,  3.50, 3.50])
    });

    it("Should insert Banana baskets to the database", async function () {

        var allBaskets = ["Banana", "Apple", "Orange"]
        var fruitBasket = [];

        await basket.createFruitBasket("Banana", 1, 3)
        var getFruitName = await basket.getFruit("")

        getFruitName.forEach(element => {
            fruitBasket.push(element.fruit_name)
        });

        assert.equal(allBaskets.length, fruitBasket.length)
    })

    it("Should insert Apple baskets to the database", async function () {

        var allBaskets = ["Banana", "Apple", "Orange"]
        var fruitBasket = [];

        await basket.createFruitBasket("Apple", 1, 3.50)
        var getFruitName = await basket.getFruit("")

        getFruitName.forEach(element => {
            fruitBasket.push(element.fruit_name)
        });

        assert.equal(allBaskets.length, fruitBasket.length)
    })

    it("Should insert an Orange baskets to the database", async function () {

        var allBaskets = ["Banana", "Apple", "Orange"]
        var fruitBasket = [];

        await basket.createFruitBasket("Orange", 1, 3.50)
        var getFruitName = await basket.getFruit("")

        getFruitName.forEach(element => {
            fruitBasket.push(element.fruit_name)
        });

        assert.equal(allBaskets.length, fruitBasket.length)
    })

    it("Should insert allBaskets fruit baskets to the database", async function () {

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

    it("Should insert allBaskets fruit baskets to the database", async function () {

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

describe('Show Total Price', async function () {
    it("Should show the total price for given fruit basket", async function () {

        var bananaBasket = ["Banana"];
        var fruitBasket = [];
        await basket.createFruitBasket("Banana")
        var getFruitName = await basket.getFruit("")

        getFruitName.forEach(element => {
            fruitBasket.push(element.price)
            console.log(element.price)
            console.log(fruitBasket)
        });

        assert.equal(bananaBasket.length, fruitBasket.length)
        assert.equal([fruitBasket.price], await basket.showPrice());
    })
})






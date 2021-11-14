const assert = require("assert");
const tastyFruit = require("../fruitBasket");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/travis_ci_test';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const basket = tastyFruit(pool);

beforeEach(async function () {

    await pool.query("DELETE FROM fruit_basket")
})

describe("Create Fruit Basket", async function () {

    it("Should insert all fruit baskets to the database", async function () {

        await basket.createFruitBasket("Banana", 1, 3)

        assert.deepEqual([
            {
                fruit_name: 'Banana',
                price: '3.00',
                quantity: '1'
            }
        ] , await basket.getFruit())
    })

});

describe('Find fruit basket', async function () {
    it('Should find all fruit basket for a given fruit type', async function () {

        await basket.createFruitBasket("Peach", 1, 3)

        assert.deepEqual([
            {
                fruit_name: 'Peach'
            }
        ], await basket.findFruit("Peach")
        );
    })
});

describe('Update fruit basket', async function () {
    it('Should update the quantity of the given fruit basket', async function () {

        await basket.createFruitBasket("Apple", 1, 3)
        await basket.updateFruit("Apple", 4);

        assert.deepEqual([
            {
                fruit_name: 'Apple',
                price: '3.00',
                quantity: '5'
            }
        ], await basket.getFruit())

    });
});

describe('Show Total Price', async function () {
    it("Should show the total price for a given fruit basket", async function () {

        await basket.createFruitBasket("Orange", 2, 3)

        assert.deepEqual([
            {
                total_price: '6.00'
            }
        ], await basket.showPrice("Orange"));
    })
});

describe('Show sum of total', async function () {
    it('Should show the sum of total for a given type of basket', async function () {

    await basket.createFruitBasket("Pineapple", 4, 3)

    assert.deepEqual([
        {
          sum: '12.00'
        }
      ], await basket.getFruitSum("Pineapple"))

    })
});







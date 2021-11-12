module.exports = function FruitBasket(pool) {

    async function createFruitBasket(fruit, qty, price) {
            await pool.query(`INSERT INTO fruit_basket (fruit_name, quantity, price) VALUES ($1, $2, $3)`, [fruit, qty, price])
    }

    async function getFruit() {
        var fruitName = await pool.query("SELECT fruit_name, quantity, price FROM fruit_basket")
        return fruitName.rows;
    }

    async function findFruit(fruit) {
        var fruitName = await pool.query("SELECT fruit_name FROM fruit_basket where fruit_name=$1", [fruit])
        return fruitName.rows;
    }

    async function updateFruit(fruit, qty) {
        await pool.query("UPDATE fruit_basket SET quantity = quantity + $2 WHERE fruit_name = $1", [fruit, qty])
    }

    async function showPrice(fruit) {
        var fruitName = await pool.query("SELECT SUM(price * quantity) FROM fruit_basket WHERE fruit_name = $1", [fruit])
        return fruitName.rows;
    }

    async function getFruitSum() {
        var fruitName = await pool.query("SELECT SUM(price) FROM fruit_basket")
        return fruitName.rows;
    }

    return {
        createFruitBasket,
        getFruit,
        findFruit,
        updateFruit,
        showPrice,
        getFruitSum
    }
}
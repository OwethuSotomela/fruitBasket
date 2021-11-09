module.exports = function FruitBasket(pool) {

    async function createFruitBasket(fruit, qty, price) {
        var fruitName = await pool.query("SELECT * FROM fruit_basket WHERE fruit_name = $1", [fruit])
        if (fruitName.rows.length == 0) {
            await pool.query(`INSERT INTO fruit_basket (fruit_name, quantity, price, original_price) VALUES ($1, $2, $3, $4)`, [fruit, qty, price, price/qty])
        } else {
            await pool.query(`UPDATE fruit_basket SET quantity = quantity + 1, price = price + original_price WHERE fruit_name = $1`, [fruit])
            // console.log(fruitName.rows)
        }
    }

    async function getFruit() {
        var fruitName = await pool.query("SELECT * FROM fruit_basket")
        return fruitName.rows;
    }

    async function findFruit(fruit) {
        var fruitName = await pool.query("SELECT fruit_name FROM fruit_basket where fruit_name=$1", [fruit])
        return fruitName.rows;
    }

    async function getFruitSum(fruit) {
        var fruitName = await pool.query("SELECT price FROM fruit_basket where fruit_name=$1", [fruit])
        return fruitName.rows;
    }

    async function emptyDB(){
        await pool.query("DELETE FROM fruit_basket");
    }

    async function showPrice(){
       var getPrice = await pool.query("SELECT * FROM fruit_basket")
       const basketPrice = [];
       for (let i = 0; i < getPrice.rows.length; i++) {
           const origPrice = getPrice.rows[i]
           basketPrice.push(origPrice.price);
       }
       return basketPrice;
    }

    return {
        createFruitBasket,
        getFruit,
        findFruit,
        emptyDB,
        showPrice,
        getFruitSum,
    }
}
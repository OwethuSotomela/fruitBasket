module.exports = function FruitBasket(pool) {

    async function createFruitBasket(fruit, qty, price) {
        var fruitName = await pool.query("SELECT * FROM fruit_basket WHERE fruit_name = $1", [fruit])
        if (fruitName.rows.length == 0) {
            await pool.query(`INSERT INTO fruit_basket (fruit_name, quantity, price, original_price) VALUES ($1, $2, $3, $4)`, [fruit, qty, price, price/qty])
        } else {
            await pool.query(`UPDATE fruit_basket SET quantity = quantity + 1, price = price + original_price WHERE fruit_name = $1`, [fruit])
            console.log(fruitName.rows)
        }
    }

    async function getFruit() {
        var fruitName = await pool.query("SELECT * FROM fruit_basket")
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
        //    console.log(origPrice.price)
       }

       return basketPrice;
    }

    async function sumOf(){
        var fruitTypeSum = await pool.query("SELECT SUM(quantity) FROM fruit_basket")
        return fruitTypeSum.rows;
    }

    return {
        createFruitBasket,
        getFruit,
        emptyDB,
        showPrice,
        sumOf
    }
}
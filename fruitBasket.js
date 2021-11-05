module.exports = function FruitBasket(pool) {

    async function createFruitBasket(fruit) {
        // console.log(fruit)
        var fruitName = await pool.query("SELECT * FROM fruit_basket WHERE fruit_name = $1", [fruit])
        if (fruitName.rows.length == 0) {
            await pool.query(`INSERT INTO fruit_basket (fruit_name, quantity, price) VALUES ($1, $2, $3)`, [fruit, 1, 0])
        } else {
            await pool.query(`UPDATE fruit_basket SET quantity = quantity + 1, price = price + 1 WHERE fruit_name = $1`, [fruit])
            // console.log(fruitName.rows)
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

    return {
        createFruitBasket,
        getFruit,
        emptyDB,
        showPrice
    }
}
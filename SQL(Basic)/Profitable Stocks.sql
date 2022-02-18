/*
Enter your query below.
Please append a semicolon ";" at the end of the query
*/
SELECT today.stock_code
FROM price_today today JOIN price_tomorrow tomorrow USING(stock_code)
WHERE tomorrow.price > today.price;
/*
Enter your query below.
Please append a semicolon ";" at the end of the query
*/
SELECT c.customer_name, ROUND(SUM(i.total_price), 6)
FROM customer c JOIN invoice i
ON c.id = i.customer_id
GROUP BY c.id, c.customer_name, i.total_price
HAVING SUM(i.total_price) <= (SELECT AVG(total_price) FROM invoice) / 4
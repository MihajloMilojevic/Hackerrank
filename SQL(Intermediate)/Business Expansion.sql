/*
Enter your query below.
Please append a semicolon ";" at the end of the query
*/
SELECT c.user_account_id, u.first_name, u.last_name, c.customer_id, cus.customer_name, COUNT(c.customer_id)
FROM (contact c JOIN user_account u 
ON c.user_account_id = u.id)
JOIN customer cus ON cus.id = c.customer_id
GROUP BY c.user_account_id, c.customer_id, u.first_name, u.last_name, cus.customer_name
HAVING (COUNT(c.customer_id) > 1)  


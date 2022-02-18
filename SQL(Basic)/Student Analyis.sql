/*
Enter your query below.
Please append a semicolon ";" at the end of the query
*/
SELECT s.roll_number, s.name
FROM student_information s JOIN examination_marks e USING(roll_number)
WHERE (e.subject_one + e.subject_two + e.subject_three) < 100;
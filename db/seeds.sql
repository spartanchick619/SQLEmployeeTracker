INSERT INTO departments (department_name)
VALUES
('Executive Board'),
('Marketing'),
('Human Resources'),
('Finance'),
('Engineering'),
('Information Technology'),
('Customer Relations'),
('Research and Development'),
('Legal'),
('Maintenance');

INSERT INTO roles (title,salary, department_id)
('Chief Executive Officer', 444000.00, 1),
('Marketing Manager', 115000.00, 2),
('HR Director', 190000.00, 3),
('Finance Head', 150000.00, 4),
('Senior Engineer', 222000.00, 5),
('IT Manager', 130000.00, 6),
('Customer Relations Manager', 80000.00, 7),
('Research and Development Manager ', 190000.00, 8),
('Legal Manager', 91000.00, 9),
('Maintenance Manager', 142000.00, 10);

INSERT INTO employee ( first_name, last_name, role_id, manager_id) 
VALUES 
("Megan", "Rapinoe",1, 1),
("Alex", "Morgan"2, 2),
("Julie", "Ertz", 3,3),
("Kelly", "O'Hara", 4,4),
("Becky", "Sauerbrunn", 5,5),
("Hope", "Solo", 6,6),
("Ali","Krieger", 7,7),
("Ashlyn", "Harris", 8,8),
("Trinity", "Rodman",9,9),
("Alyssa", "Thompson", 10,10)

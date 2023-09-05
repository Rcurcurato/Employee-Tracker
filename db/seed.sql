INSERT INTO departments (department_name)
VALUES ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (role_title, salary, department_id)
VALUES ('Sales Lead', 1000000, 1),
('Saleperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
('Mike', 'Chan', 2,1),
('Ashley', 'Rodriguez',3 ,1),
('Kevin', 'Tupik', 4, 2),
('Kunal', 'Singh', 5, 2), 
('Malia', 'Brown', 6, 3),
('Sarah', 'Lourd', 7, 3),
('Tom', 'Allen', 8, 4);
    
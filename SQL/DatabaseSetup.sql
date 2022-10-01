
CREATE DATABASE reg_numbers;
CREATE ROLE reg LOGIN PASSWORD 'reg123';
grant all privileges on database reg_numbers to reg;

-- for the tests
CREATE DATABASE test_reg_numbers;
CREATE ROLE test LOGIN PASSWORD 'test123';
grant all privileges on database test_reg_numbers to test;
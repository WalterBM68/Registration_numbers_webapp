
CREATE DATABASE reg_numbers;
CREATE ROLE reg LOGIN PASSWORD 'reg123';
grant all privileges on database reg_numbers to reg;

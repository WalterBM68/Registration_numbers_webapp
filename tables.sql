CREATE TABLE towns(
    id serial not null primary key, 
    town_name text not null,
    startswith text not null
);

CREATE TABLE no_plates(
    id serial not null primary key, 
    reg_no VARCHAR(14) not null, 
    town_id int, 
    foreign key (town_id) references towns(id)
);

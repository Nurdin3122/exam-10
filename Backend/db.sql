create database news;
use news;

create table news (
    id int auto_increment primary key,
    title varchar(255) not null,
    content text not null,
    image_url varchar(255),
    created_at datetime default now()
);

create table comments (
    id int auto_increment primary key,
    news_id int not null,
    author varchar(255) default 'anonymous',
    text text not null,
    foreign key (news_id) references news(id) on delete cascade
);
INSERT INTO news (title, content, image_url, created_at) VALUES ('Новость про машины', 'что то тут булет написано 2', 'https://www.shutterstock.com/image-photo/dynamic-collage-athletes-various-sports-260nw-2493176587.jpg', '2024-08-24 13:56:33')
INSERT INTO news (title, content, image_url, created_at) VALUES ('Новость про машины', 'что то тут булет написано ', 'photo.jpg', '2024-08-24 13:56:33');
INSERT INTO news (title, content, image_url, created_at) VALUES ('Новость про готовку', 'что то тут булет написано ', 'photo.jpg', '2024-08-24 13:56:33');
INSERT INTO comments (news_id, author, text) VALUES (1, 'steve', 'coll post');
INSERT INTO comments (news_id, author, text) VALUES (3, 'log', ' post');
INSERT INTO comments (news_id, author, text) VALUES (6, 'nick', 'coll post');

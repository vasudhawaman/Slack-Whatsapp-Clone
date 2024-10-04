CREATE TABLE `connections` (
    sender MEDIUMINT NOT NULL,
    receiver MEDIUMINT NOT NULL,
    status VARCHAR(45) DEFAULT '0',
    PRIMARY KEY (sender, receiver)
);
CREATE TABLE `files` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL,
    filename TEXT ,
    time TEXT,
    mimetype TEXT,
    text LONGTEXT,
    user TEXT,
    file LONGBLOB,
    date TEXT,
    type TEXT
);
CREATE TABLE `group` (
    group_name VARCHAR(255) PRIMARY KEY,
    groupid INT NOT NULL,
    image LONGBLOB,
    img_mimetype VARCHAR(45),
    adminid INT
);

CREATE TABLE `group_room` (
    userid INT PRIMARY KEY,
    group_roomid INT
);

CREATE TABLE `room` (
    roomid INT PRIMARY KEY,
    userids INT
);

CREATE TABLE `users` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username LONGTEXT NOT NULL,
    password LONGTEXT NOT NULL,
    email LONGTEXT NOT NULL,
    status VARCHAR(255) DEFAULT 'Hello,I am using TalkPal!',
    image LONGBLOB,
    filename VARCHAR(255)
);

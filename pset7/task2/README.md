#Easy Chat

Easy chat is a simple chat site designed for educational purposes.

#Getting Started

To use the chat, just copy the chat directory to the root directory of your server,
and create a database according to the recommendations listed below.

#Prerequisites

Before copying the chat directory, you will need to install a service capable of
raising a local server on your local machine with a MySQL database (e.g. XAMPP).

Second you need PHP 5 >= 5.5.0, PHP 7;

```
https://www.apachefriends.org/ru/index.html
```

#Settings for XAMPP

Xampp Virtual Host
We will configure a Virtual Host in Xampp for a Easy Chat, and in this example,
we want to configure the domain 'easychat' for our project.

We need to edit httpd-vhosts.conf that is located in
C:\xampp\apache\conf\extra\httpd-vhosts.conf and add following lines
at the end of the file:

VirtualHost for EasyChat

```
<VirtualHost easychat.dev:80>
  DocumentRoot "C:\xampp\htdocs\easychat"
  ServerAdmin easychat.dev
  <Directory "C:\xampp\htdocs\easychat">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
  </Directory>
</VirtualHost>
```
After this, our apache is listening to 'easychat' connections, but we have to
configure our hosts file that allows to redirect 'easychat'
to the localhost that is located in
C:\Windows\System32\drivers\etc

IMPORTANT!: To edit this file, maybe we should give access, click properties
and allow your user to modify this file.

Edit hosts file adding our localhost for 'easychat':

```
# localhost name resolution is handled within DNS itself.
#	127.0.0.1       localhost
#	::1             localhost

127.0.0.1        easychat.dev
```
Save the file.

Copy chat directory to C:\xampp\htdocs\ directory

#Settings for DB (MySQL)

To enter the database, you must have 'admin' user with all rights
on localhost and password 'admin'.

All user info can change in model/dbConnect.php

Create the database on your local server and choose it with SQL query :

```
CREATE DATABASE IF NOT EXISTS `easy_chat` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `easy_chat`;
```

Next step you'll create tables in db 'easy_chat' by using SQL query:

```
CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `message` varchar(100) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `users_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
```

#Built With

PHP,
MySQL,
JavaScript,
CSS,
HTML,
JQuery

#Authors

Makcym Kocherzhenko

#License

FREE

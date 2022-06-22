CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255),
  `password` varchar(255),
  `nickname` varchar(255),
  `account` varchar(255),
  `balance` varchar(255),
  `private_key` int,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `posts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `post_content` varchar(255),
  `user_id` int
);

CREATE TABLE `image` (
  `id` in PRIMARY KEY AUTO_INCREMENT,
  `image_path` varchar(255),
  `post_id` int
);

CREATE TABLE `hashtags` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `hashtag` varchar(255)
);

CREATE TABLE `comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `comment_id` isnull,
  `comment` varchar(255),
  `post_id` int,
  `user_id` int
);

CREATE TABLE `posts_hashtags` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `post_id` int,
  `hashtag_id` int
);

CREATE TABLE `likes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `created_at` timestamp(0),
  `user_id` int,
  `post_id` int
);

ALTER TABLE `comments` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

ALTER TABLE `posts_hashtags` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`id`) REFERENCES `users` (`id`);

ALTER TABLE `posts_hashtags` ADD FOREIGN KEY (`hashtag_id`) REFERENCES `hashtags` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`id`) REFERENCES `likes` (`user_id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`id`) REFERENCES `likes` (`post_id`);

ALTER TABLE `image` ADD FOREIGN KEY (`id`) REFERENCES `posts` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`id`) REFERENCES `comments` (`user_id`);

ALTER TABLE `hashtags` ADD FOREIGN KEY (`hashtag`) REFERENCES `posts` (`post_content`);

ALTER TABLE `users` 
CHANGE COLUMN `created_at` `created_at` VARCHAR(255) NOT NULL DEFAULT 'now()' ,
CHANGE COLUMN `updated_at` `updated_at` VARCHAR(255) NOT NULL DEFAULT 'now()' ;

ALTER TABLE `posts` 
CHANGE COLUMN `created_at` `created_at` VARCHAR(255) NOT NULL DEFAULT 'now()' ;


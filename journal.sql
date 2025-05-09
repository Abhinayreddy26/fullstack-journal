-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2025 at 05:28 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `journal`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `title`, `content`, `created_at`, `updated_at`) VALUES
(1, 3, 'Welcome to the Land', 'The global trade environment in 2025 has become increasingly complex due to a series of new tariffs and trade disputes. The United States has implemented significant tariffs on imports from China, Canada, and Mexico, aiming to reduce trade deficits and bolster domestic industries. These measures have prompted retaliatory tariffs from the affected countries, leading to heightened tensions and uncertainty in international markets.\nen.wikipedia.org\n\nIn the East African region, the East African Community (EAC) continues to operate under a Common External Tariff (CET) system, which imposes varying duty rates depending on the type of goods imported. Kenya, as a member of the EAC, benefits from this arrangement, which aims to protect local industries while facilitating trade among member states. Additionally, Kenya\'s Economic Partnership Agreement (EPA) with the European Union, effective since July 2024, allows for duty-free access of Kenyan goods to the EU market, while Kenya gradually reduces tariffs on EU imports over a 25-year period.\nen.wikipedia.org\nEU Trade\n\nThese developments underscore the importance of strategic trade policies and alliances in navigating the evolving global economic landscape. For Kenya, balancing regional commitments with international partnerships remains crucial in fostering economic growth and resilience amid global trade challenges.', '2025-05-03 13:08:06', '2025-05-03 13:10:34'),
(2, 3, 'Navigating the 2025 Trade Tariff Landscape', 'The global trade environment in 2025 has become increasingly complex due to a series of new tariffs and trade disputes. The United States has implemented significant tariffs on imports from China, Canada, and Mexico, aiming to reduce trade deficits and bolster domestic industries. These measures have prompted retaliatory tariffs from the affected countries, leading to heightened tensions and uncertainty in international markets.\nen.wikipedia.org\n\nIn the East African region, the East African Community (EAC) continues to operate under a Common External Tariff (CET) system, which imposes varying duty rates depending on the type of goods imported. Kenya, as a member of the EAC, benefits from this arrangement, which aims to protect local industries while facilitating trade among member states. Additionally, Kenya\'s Economic Partnership Agreement (EPA) with the European Union, effective since July 2024, allows for duty-free access of Kenyan goods to the EU market, while Kenya gradually reduces tariffs on EU imports over a 25-year period.\nen.wikipedia.org\nEU Trade\n\nThese developments underscore the importance of strategic trade policies and alliances in navigating the evolving global economic landscape. For Kenya, balancing regional commitments with international partnerships remains crucial in fostering economic growth and resilience amid global trade challenges.', '2025-05-03 13:09:51', '2025-05-03 13:09:51'),
(3, 3, 'Another Journal', 'The global trade environment in 2025 has become increasingly complex due to a series of new tariffs and trade disputes. The United States has implemented significant tariffs on imports from China, Canada, and Mexico, aiming to reduce trade deficits and bolster domestic industries. These measures have prompted retaliatory tariffs from the affected countries, leading to heightened tensions and uncertainty in international markets.\nen.wikipedia.org\n\nIn the East African region, the East African Community (EAC) continues to operate under a Common External Tariff (CET) system, which imposes varying duty rates depending on the type of goods imported. Kenya, as a member of the EAC, benefits from this arrangement, which aims to protect local industries while facilitating trade among member states. Additionally, Kenya\'s Economic Partnership Agreement (EPA) with the European Union, effective since July 2024, allows for duty-free access of Kenyan goods to the EU market, while Kenya gradually reduces tariffs on EU imports over a 25-year period.\nen.wikipedia.org\nEU Trade\n\nThese developments underscore the importance of strategic trade policies and alliances in navigating the evolving global economic landscape. For Kenya, balancing regional commitments with international partnerships remains crucial in fostering economic growth and resilience amid global trade challenges.', '2025-05-03 13:10:26', '2025-05-03 13:10:26'),
(4, 4, ' The Impact of New Trade Tariffs in 2025', 'Trade tariffs continue to shape the global economic landscape in 2025. Recently, several countries have imposed or increased tariffs as part of efforts to protect local industries, respond to economic pressures, or assert political leverage. The United States, for example, has raised tariffs on certain electronics and automotive parts from China, citing unfair trade practices and national security concerns.\n\nThese actions have triggered a ripple effect globally. China has responded with counter-tariffs on agricultural goods, further straining relations. Meanwhile, developing countries like Kenya are navigating these changes carefully, as global tariff policies can indirectly affect export markets and supply chains.\n\nIn East Africa, regional cooperation within the EAC (East African Community) has remained strong. However, member states are still grappling with balancing affordable imports and protecting local production. Kenya’s growing trade with the EU under the EPA agreement continues to offer opportunities, but rising global protectionism could pose risks.\n\nOverall, the shift toward more protectionist trade policies raises concerns about long-term global cooperation. For countries like Kenya, maintaining strategic trade relationships and enhancing local production capacity will be essential to weather potential disruptions in international trade.', '2025-05-03 13:12:02', '2025-05-03 13:12:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `created_at`) VALUES
(1, 'john_doe', 'john@example.com', '$2a$10$K0x6z0vq7jXqF3E7V0slQu5qEZoD3HFq9ZHz8yM3TwCAVOHbU24Qa', '2025-05-03 03:16:52'),
(2, 'jane_doe', 'jane@example.com', '$2b$10$zUtYxH7W8tg3syhgZKFwOeJ.J1urx1irDM6ZE3hCY2ZL3fyA6Mq9u', '2025-05-03 03:37:53'),
(3, 'user1', 'muindekivai@gmail.com', '$2b$10$8sjg5O9V.Xl8/CMo4smQPe2ga/.Cq1EgngeDVHhWV.cKfOfblC7MC', '2025-05-03 12:53:17'),
(4, 'another user', 'muindejosphat@gmail.com', '$2b$10$BAOdjN8e.F4nVPB9D/Lvq.grY2FkwKXa8VacONRr6skC6nCcGLs9C', '2025-05-03 13:11:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

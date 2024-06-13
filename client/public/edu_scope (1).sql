-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: localhost
-- Tid vid skapande: 13 jun 2024 kl 15:40
-- Serverversion: 10.6.18-MariaDB-cll-lve
-- PHP-version: 8.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `edu_scope`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `data_access`
--

CREATE TABLE `data_access` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `updated` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Dumpning av Data i tabell `data_access`
--

INSERT INTO `data_access` (`id`, `name`, `updated`) VALUES
(1, 'Prenumerant', '2024-05-28 17:35:13'),
(2, 'Admin', '2024-05-28 17:35:25');

-- --------------------------------------------------------

--
-- Tabellstruktur `data_articles`
--

CREATE TABLE `data_articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `shortinfo` text DEFAULT NULL,
  `longinfo` text DEFAULT NULL,
  `added` datetime NOT NULL DEFAULT current_timestamp(),
  `updated` datetime NOT NULL DEFAULT current_timestamp(),
  `subscriptionid` int(11) NOT NULL DEFAULT 1,
  `active` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Dumpning av Data i tabell `data_articles`
--

INSERT INTO `data_articles` (`id`, `title`, `shortinfo`, `longinfo`, `added`, `updated`, `subscriptionid`, `active`) VALUES
(1, 'Bianca Ingrosso har försvunnit helt – detta har hänt: ”Obehagligt”', 'Bianca Ingrosso har inte lagt upp något på länge.\r\nNu avslöjas sanningen bakom frånvaron.', 'Bianca Ingrosso har blivit en av Sveriges mest inflytelserika personer inom sociala medier. Hon är känd för sitt öppenhjärtiga sätt att dela med sig av både sina framgångar och utmaningar, vilket har skapat en stark och lojal följarskara.\n\nHon är stor på både Instagram, Tiktok och Youtube, men på den sistnämnda plattformen har hon på senaste tiden ekat med sin frånvaro.. Nu berättar hon varför!\n\nDet är när Bianca har en frågestund på Instagram som en massa följare undrar samma sak: Varför har hon försvunnit från Youtube?\n\nDetta svarar hon nu på i en lång text. Hon säger att det hela mest beror på att hon prioriterar sitt mående, och att hon inte vill dela med sig av precis allt hela tiden.\n\n”Alltså mina jävla älsklingar 🫶 Majoriteten av alla frågor var om jag skulle börja vlogga igen 🥲🫶 Ni är så fina!!!! Jag själv kollar fortfarande lika mycket (obehagligt mycket) på alla vloggar så tro mig intresset finns till 100% kvar för det är min favorit plattform. Men något hände för ca 2 år sen när jag totalt tappade intresset för att dela med mig av mitt liv.”\n\nHon fortsätter:\n\n”Det har varit sååå skönt och sunt att minska erbjudandet att döma mig på varenda litet sätt som går. Jag behövde läka lite och bli stark igen utan en massa elakt brus mitt i allt det. Tyvärr finns inte tiden just nu eller engagemanget från mitt håll att tänka på kameran hela dagarna för det hade gjort mig disträ från annat som också betyder massor. Men men jag har en liten plan för hur detta ska gå för målet är att komma tillbaka i sommar. Länge leve youtube asså”.', '2024-05-28 17:48:07', '2024-05-28 17:48:07', 3, 1),
(2, 'Lord of the rings', 'Frodo and gang', 'frodo and the fellowship', '2024-06-03 14:36:27', '2024-06-03 14:36:27', 3, 1),
(3, 'Khazad\'dum', 'Moria', 'Mines of moria', '2024-06-04 12:06:09', '2024-06-04 12:06:09', 1, 1),
(4, 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu dui tellus. Donec non massa convallis, pretium elit quis, pellentesque felis. Duis sit amet maximus sem. Nulla consectetur magna non enim efficitur eleifend. Nulla neque tortor, rutrum sed diam in, aliquet ornare felis. Suspendisse massa nulla, gravida pulvinar orci id, vestibulum lobortis dui. Quisque eu iaculis metus. Curabitur cursus nisi sapien, ut consequat ex venenatis in. Curabitur aliquam mi a tellus suscipit, ut ullamcorper ipsum commodo. Mauris sed pulvinar dui. Fusce auctor sem augue, sit amet sollicitudin quam pulvinar sit amet. Morbi eget gravida nisl, at vestibulum risus. Aliquam molestie eget tortor ac condimentum. Pellentesque luctus enim vel ullamcorper fringilla. Praesent sit amet dictum augue, sit amet tristique lacus.', '2024-06-04 12:06:09', '2024-06-04 12:06:09', 1, 1),
(5, 'Test plus', 'Rgrg g', 'Rggr rgrgr g', '2024-06-06 23:40:45', '2024-06-06 23:40:45', 2, 1),
(6, 'Grrgr', 'Rgrgrg w', 'Grw grwgg r', '2024-06-06 23:48:20', '2024-06-06 23:48:20', 2, 1),
(7, 'Kalle Ankas brorsöner är försvunna', 'Kalle Ankas brorsöner är försvunnafeg fee', 'Kalle Ankas brorsöner är försvunna  fe efefefef', '2024-06-06 23:49:36', '2024-06-06 23:49:36', 2, 1),
(8, 'K78k78k 8k78k878', 'K8k87k876 k76', 'K78 7k78k78k78k78k8', '2024-06-06 23:58:45', '2024-06-06 23:58:45', 1, 1),
(9, 'Test 4 4 4', 'G tsrt6r 6g g53', ' 555q3vmeif fiefieifnew ifnefweiuf', '2024-06-07 00:01:17', '2024-06-07 00:01:17', 3, 1),
(10, 'Test 45', 'Test 4555 5', 'G rgrrgegrgrgr wg', '2024-06-07 02:09:31', '2024-06-07 02:09:31', 1, 1),
(15, 'Kalle Anka fyller 90 år: ”Trams! Jag är bara 30”', '1934 var startskottet för Kalle Ankas karriär. Världens kändaste anka fyller alltså jämnt i år, men jubilaren själv tycker det är trams – i hans huvud är han ju fortfarande en ungtupp, eller möjligtvis en ungduck, säger röstskådespelaren Andreas Nilsson som gjort Kalles röst i snart 40 år.', '– ”Trams! Herregud, jag är ju bara trettio” hade han sagt. Varje gång han ställs inför ett problem är han lika insiktslös, han går i samma fällor jämt. Och då har han ändå haft 90 år på sig att lära sig något, säger Andreas Nilsson.\n\nVad tänker du om 90-årsjubileet?\n\n– Det är häftigt att en figur som skapades för så länge sedan fortfarande engagerar. Det är bra gjort av en nittioåring. Jag hoppas han får leva sitt lyckliga, olyckliga liv ett tag till.\n\nHur mår stämbanden efter snart 40 år som Kalles röst?\n\n– Man använder inte stämbanden. Det är tungvibrationer och så formar man munhålan för att få fram vokaler. Du skulle kunna vara stum och göra dig förstådd om du lärde dig Kalle Anka-språket. Och vilket roligt samhälle det skulle bli om folk pratade med varandra på det sättet.\n\nHur har dina år tillsammans med Kalle varit?\n\n– Vi har trivts bra ihop, Kalle och jag. Men om man jämför med att dubba en vanlig serie är det mycket mer ansträngande att göra Kalle. Man blir slut i käften till slut, munnen blir slapp.\n\nHar Kalle Anka förändrats genom åren?\n\n– När jag började göra rösten, 1987, var det mer actionbaserat – storyn drevs av aktioner. Därifrån och framåt sattes dialogen i förarsätet. Då blev det svårare för mig, rösten går ju inte att göra hur tydlig som helst. Man hör kanske 80 procent av vad han säger. Det går till exempel inte att säga ordet g i en mening. Som i ”tugga” (här säger Andreas Nilsson tugga i Kalles röst).\n\nSa du gubbe?\n– Tugga (fortfarande i Kalle-röst).\n\nKudde?\n– Tugga!', '2024-06-10 11:10:11', '2024-06-10 11:10:11', 3, 1),
(17, 'On the road again', 'Road again', 'On the', '2024-06-12 16:43:35', '2024-06-12 16:43:35', 3, 1);

-- --------------------------------------------------------

--
-- Tabellstruktur `data_subscriptions`
--

CREATE TABLE `data_subscriptions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `info` text DEFAULT NULL,
  `price` decimal(19,2) NOT NULL DEFAULT 0.00,
  `updated` datetime NOT NULL DEFAULT current_timestamp(),
  `active` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Dumpning av Data i tabell `data_subscriptions`
--

INSERT INTO `data_subscriptions` (`id`, `name`, `info`, `price`, `updated`, `active`) VALUES
(1, 'SCOPE STANDARD', 'SCOPE STANDARD INFO', 2.00, '2024-05-28 17:52:05', 1),
(2, 'SCOPE PLUS', 'SCOPE PLUS INFO', 4.00, '2024-05-28 17:52:05', 1),
(3, 'SCOPE EXCLUSIVE', 'SCOPE EXCLUSIVE INFO', 6.00, '2024-05-28 17:52:19', 1);

-- --------------------------------------------------------

--
-- Tabellstruktur `data_users`
--

CREATE TABLE `data_users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `accessid` int(11) NOT NULL DEFAULT 1,
  `added` datetime NOT NULL DEFAULT current_timestamp(),
  `updated` datetime NOT NULL DEFAULT current_timestamp(),
  `stripecustomerid` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Dumpning av Data i tabell `data_users`
--

INSERT INTO `data_users` (`id`, `email`, `password`, `firstname`, `lastname`, `accessid`, `added`, `updated`, `stripecustomerid`) VALUES
(1, 'admin@admin.se', '$2a$12$t2X4v4Ib9iAix9uekDmv4eU4yBcdmhuTynhuhDl9BWAzoOCaIBSfi', 'Admina', 'Adminsson', 2, '2024-05-28 17:39:12', '2024-05-28 17:39:12', ''),
(2, 'user@user.se', '$2a$12$XUNbW93OJ0ua0A16zzciQOtZ9K5rKBT3mSB0MpQz09CXVW/u37Yli', 'Kalle', 'Anka', 1, '2024-05-28 17:39:57', '2024-05-28 17:39:57', ''),
(3, 'asd@asd.com', 'abc123', 'asd', 'asd', 1, '2024-05-31 11:27:29', '2024-05-31 11:27:29', ''),
(4, 'patrik@test.com', '$2b$10$0.i4jzVQO.HMHsbFC25KvO2escH.lvHMba.rTdJVTl76mKfSOZBK6', 'Patrik', 'Test', 1, '2024-06-03 12:14:02', '2024-06-11 14:17:42', ''),
(5, 'user2@user.se', '$2a$12$XUNbW93OJ0ua0A16zzciQOtZ9K5rKBT3mSB0MpQz09CXVW/u37Yli', 'Kalle2', 'Anka', 1, '2024-05-28 17:39:57', '2024-05-28 17:39:57', ''),
(6, 'kalle@anka.se', '$2b$10$Q67hhaHZbdVMuo74lF3ooOliKjWMxIwTYF7RrDXdW5fB89EtcysZ.', 'Kalle3', 'Anka', 1, '2024-06-07 01:59:33', '2024-06-07 01:59:33', ''),
(7, 'lukas@user.se', '$2b$10$Q67hhaHZbdVMuo74lF3ooOliKjWMxIwTYF7RrDXdW5fB89EtcysZ.', 'Alexander', 'Lukas', 1, '2024-06-10 10:31:31', '2024-06-10 10:31:31', ''),
(23, 'pespi@gmail.com', '$2b$10$4qK32z/65IvgHvw7adPYr.DLwDaftgfJf9vSJpi38iXYML0fizfSO', 'Pepsi', 'Nocco', 1, '2024-06-12 10:04:10', '2024-06-12 10:04:44', ''),
(24, 'PatrikFrida@gmail.com', '$2b$10$y6M340Tb4XGnxGF1qSu7QeiyrYhFPx7EGBSr0jPDCBKm18bAgbDUW', 'Patrik', 'Frida', 1, '2024-06-12 10:49:34', '2024-06-12 10:50:18', ''),
(25, 'patrik@gmail.com', '$2b$10$FF7Pkt1xjFdmCBBs7z.AneP7EkgJAHf6AU4XbEjLQ.dnAXmC/mr3i', 'Frida', 'Patrik', 1, '2024-06-12 10:58:51', '2024-06-12 10:59:16', ''),
(26, 'fridahello@gmail.com', '$2b$10$WyGENMa2Pdm83gYMjCvPkehVwTvyMl9UjzM2FvX7Pi8FAvRbtpsmG', 'Frida', 'Hello', 1, '2024-06-12 11:23:19', '2024-06-12 11:23:46', ''),
(27, 'abc@gmail.com', '$2b$10$SS8Vw0lsqFLPs2ZD5Q8.OuXAnBr2ux/SGM7yaT8I9JepIGROfGLjq', 'Abc', 'Abc', 1, '2024-06-12 11:37:36', '2024-06-12 11:37:36', ''),
(28, 'qwe@gmail.com', '$2b$10$vXwV1oRtCjMGPG45Qgwrs.kg7WaibwGtBkkZIkrXPJtaGLL7uXvMW', 'Qwe', 'Qwe', 1, '2024-06-12 11:42:41', '2024-06-12 11:42:41', ''),
(29, '123@gmail.com', '$2b$10$O79793QDeCYlwtLq3qIbTeVT5BcBgSfoCAoKCYG88TEfDWwO0qyGW', '123123', '123', 1, '2024-06-12 11:48:13', '2024-06-12 11:51:59', ''),
(30, 'patrik123@gmail.com', '$2b$10$O8ojiIAD1xWKrtzMZOGQTuC/FfwaqcaLYaXE5puvLF6TFmDHezB.W', 'Patrik', 'Patrik', 1, '2024-06-12 11:56:47', '2024-06-12 11:57:14', ''),
(31, 'zxc@gmail.com', '$2b$10$b/Au8VgL.o2j0PsOYtN2U.stYAanYo2k1IHupASz2JPfjumUuvaxq', 'Zxc', 'Zxc', 1, '2024-06-12 12:07:30', '2024-06-12 12:38:13', ''),
(32, 'patrikb99@gmail.com', '$2b$10$Q4cUIqzYveJP/tpx257baOLxPMGKOJvQx.KxcgmZffANudODIGg3y', 'Patrik', 'Bajkusa', 1, '2024-06-12 12:29:39', '2024-06-12 12:29:39', ''),
(33, 'zxczxc@gmail.com', '$2b$10$67DCPlHXw7e1wYuuIXnhneEhNfb7MZ2s74Tbr12JqV1brEmi3zA7K', 'Zxczxc', 'Zxczxc', 1, '2024-06-12 12:38:41', '2024-06-12 12:39:45', ''),
(34, 'ads@gmail.com', '$2b$10$KrqsdOMocltkEs5/s5Do5Or0L7hD6hquG2SaJf1UK6T2kho7iF7CS', 'Asdasd', 'Asd', 1, '2024-06-12 13:15:00', '2024-06-12 13:15:23', ''),
(35, 'patrikb@gmail.com', '$2b$10$Bu8ZLXqpyiZui736r8QZV.oB1Fs4jOsd0TiaAVCMVoMebQAFzN2HW', 'Asd123', '123', 1, '2024-06-12 14:33:08', '2024-06-12 14:33:42', ''),
(38, 'arneanka@user.se', '$2b$10$vUdjgWyiL3wvkntkqFZayuFF9NOKBpD4F3IJx1BYlZbODy0nRP1LK', 'Arne', 'Anka', 1, '2024-06-12 15:22:55', '2024-06-12 15:48:45', 'cus_QHPyyvZNvQH4dV'),
(39, 'sdf@gmail.com', '$2b$10$1Oiyt3GVWt6OOeOwHkyzVOhxUSPcvd2cuMZsW/C6JjtHMunqmia1W', 'Sdf', 'Sdf', 1, '2024-06-12 15:25:29', '2024-06-12 15:26:13', NULL),
(40, 'frida@gmail.com', '$2b$10$PJe/Eu7guWsV4IoXua59tu5j8.PRB.TG14eRnkDB9/bUy/w/tmw66', 'Frida', 'Frida', 1, '2024-06-12 15:38:18', '2024-06-12 15:38:43', NULL),
(41, 'arne2@user.se', '$2b$10$B04kIseHoINecrNmz7FSh.82jfnvqQnxRnGcV9EOXNWAjAqy3n5U.', 'Arne2', 'Anka', 1, '2024-06-12 16:03:03', '2024-06-12 16:03:03', 'cus_QHQctOLTZYxiZw'),
(42, 'aaa@gmail.com', '$2b$10$HPxy4Ot1niRu8LB1y7jsAetmnTBpo4ta6J8N6Cqya3gOQOJ40ueYq', 'Aaa', 'Aaa', 1, '2024-06-12 16:17:17', '2024-06-12 16:17:17', NULL),
(43, 'asdasd@gmail.com', '$2b$10$iuoASmcRLKBMRaEIsHsuAOtesGi8fpud00W8gUAqLp63/x8tnPDkG', 'Patrik', 'Bajkusa', 1, '2024-06-12 17:02:43', '2024-06-12 17:02:43', 'cus_QHRauzgdv1V0pz'),
(44, 'hello@gmail.com', '$2b$10$pqnhtE.1ZJCg.jSSvvAzTO.vrBSCemx/yG4om5Gp7WhS4Gaj9SYxC', 'Hello', 'World', 1, '2024-06-12 17:29:09', '2024-06-12 17:29:09', 'cus_QHS07JopaJpPub'),
(45, 'alo@gmail.com', '$2b$10$YBMn91JC/khXEaFiiuNbnubxjJ1.j8b7gwnXmwHePAt24MNtYD/2a', 'Aloalo', 'Alo', 1, '2024-06-12 17:42:04', '2024-06-12 17:42:04', 'cus_QHSDT4VysJXMoc'),
(46, 'hallon@gmail.com', '$2b$10$cKWR0KxmAKrD94Lr56ONhu4wBr9gmGpBAn8sV1hTHA1MCea6Rvpvm', 'Hallon', 'Svartvinbär', 1, '2024-06-12 22:27:07', '2024-06-12 22:27:07', 'cus_QHWorqDg8VbAmQ'),
(47, 'xcv@gmail.com', '$2b$10$PtEVDfPBa./JPNBeuyqsWuzlyEffoqmjzXKLo5F46nBEHAO3PyOee', 'Xcv', 'Xcv', 1, '2024-06-12 22:34:26', '2024-06-12 22:34:26', 'cus_QHWwc2NKHRUMX2'),
(48, 'patrikb99@hotmail.com', '$2b$10$qbcDDd6zoR2UrM9HXhK2kO1PcdtZhUvDxoPabPCmivpezmop315E.', 'Patrik', 'Bajkusa', 1, '2024-06-13 13:03:39', '2024-06-13 13:03:39', 'cus_QHkxjZHPGbtRBh'),
(49, 'Cakmak@gmail.com', '$2b$10$Ra5If3biX92L3.8Bktto5eBfBV3IY3R.sOin3nu86GbDOY1r1LIei', 'Aloalo', 'Alo', 1, '2024-06-13 13:20:49', '2024-06-13 13:20:49', 'cus_QHlEpSNHJebgsi'),
(50, 'magi@gmail.com', '$2b$10$likmKHblWB2m6bfXYHf4RORUCfROH3.Vhj6PYNdBoq1/SuMKvmMey', 'Abra', 'Kadabra', 3, '2024-06-13 13:28:58', '2024-06-13 13:28:58', 'cus_QHlMmpfVOvEUKp'),
(51, 'hejabc@gmail.com', '$2b$10$4/q8lQUKhD9zCmwMKqHA0ewvnlS8FsB2iyYU.osFX/JqLNQWrDg56', 'Hejhej', 'Hejehj', 3, '2024-06-13 13:30:42', '2024-06-13 13:30:42', 'cus_QHlOWTiajxxk0f'),
(52, 'erik@gmail.com', '$2b$10$K.khGKup8OT/VWHicUtEp.h4yGGDJetX7oBMw3Tv/IETJ7C22hr5O', 'Eriksson', 'Erkan', 1, '2024-06-13 13:44:31', '2024-06-13 13:44:31', 'cus_QHlce4RCwkBeUw'),
(53, 'ccc@gmail.com', '$2b$10$opB8R7nAnssQavze6eQtoOsRgsAAeq3/ZNgAQesQxdhdUlPjrMOVG', 'Ccc', 'Ccc', 1, '2024-06-13 13:49:15', '2024-06-13 13:49:15', 'cus_QHlgpNr6pGYISJ');

-- --------------------------------------------------------

--
-- Tabellstruktur `data_users_subscriptions`
--

CREATE TABLE `data_users_subscriptions` (
  `id` int(11) NOT NULL,
  `subscriptionid` int(11) NOT NULL DEFAULT 0,
  `uid` int(11) NOT NULL DEFAULT 0,
  `added` datetime NOT NULL DEFAULT current_timestamp(),
  `enddate` datetime DEFAULT NULL,
  `active` int(11) NOT NULL DEFAULT 1,
  `payed` int(11) NOT NULL DEFAULT 1,
  `stripeSubId` varchar(255) DEFAULT NULL,
  `stripeInvoiceUrl` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Dumpning av Data i tabell `data_users_subscriptions`
--

INSERT INTO `data_users_subscriptions` (`id`, `subscriptionid`, `uid`, `added`, `enddate`, `active`, `payed`, `stripeSubId`, `stripeInvoiceUrl`) VALUES
(1, 1, 2, '2024-05-28 17:53:09', '2024-01-28 17:52:45', 1, 1, NULL, NULL),
(2, 2, 5, '2024-05-28 17:53:09', '2024-01-28 17:52:45', 1, 1, NULL, NULL),
(19, 3, 4, '2024-06-10 21:03:52', '2024-06-17 21:03:52', 1, 1, NULL, NULL),
(20, 2, 4, '2024-06-10 21:15:39', '2024-06-17 21:15:39', 1, 1, NULL, NULL),
(24, 3, 4, '2024-06-11 11:15:54', '2024-06-18 11:15:54', 1, 1, NULL, NULL),
(25, 2, 4, '2024-06-11 11:47:07', '2024-06-18 11:47:07', 1, 1, NULL, NULL),
(34, 2, 23, '2024-06-12 10:04:44', '2024-06-19 10:04:44', 1, 1, 'sub_1PQmAeGtY97KMuDY5SgsZ6Gi', NULL),
(35, 2, 24, '2024-06-12 10:50:18', '2024-06-19 10:50:18', 1, 1, 'sub_1PQmsjGtY97KMuDYcgPY1E9L', NULL),
(36, 2, 25, '2024-06-12 10:59:16', '2024-06-19 10:59:16', 1, 1, 'sub_1PQn1PGtY97KMuDYzhJM9YaA', NULL),
(37, 2, 26, '2024-06-12 11:23:46', '2024-06-19 11:23:46', 1, 1, 'sub_1PQnP6GtY97KMuDYN9TOLfT0', NULL),
(38, 2, 29, '2024-06-12 11:51:59', '2024-06-19 11:51:59', 1, 1, 'sub_1PQnqQGtY97KMuDYfRhVRggW', NULL),
(39, 2, 30, '2024-06-12 11:57:14', '2024-06-19 11:57:14', 1, 1, 'sub_1PQnvVGtY97KMuDYtts2Qk7q', NULL),
(40, 2, 31, '2024-06-12 12:08:06', '2024-06-19 12:08:06', 1, 1, 'sub_1PQo61GtY97KMuDY4vlRjybU', NULL),
(41, 2, 31, '2024-06-12 12:34:17', '2024-06-19 12:34:17', 1, 1, 'sub_1PQoVMGtY97KMuDYJQRZGztr', NULL),
(42, 2, 33, '2024-06-12 12:39:45', '2024-06-19 12:39:45', 1, 1, 'sub_1PQoadGtY97KMuDYqS5jNWHz', NULL),
(43, 2, 34, '2024-06-12 13:15:23', '2024-06-19 13:15:23', 1, 1, 'sub_1PQp97GtY97KMuDYt8lE1gQH', NULL),
(44, 3, 35, '2024-06-12 14:33:42', '2024-06-19 14:33:42', 0, 1, 'sub_1PQqMuGtY97KMuDYm5UQGD48', NULL),
(45, 2, 39, '2024-06-12 15:26:13', '2024-06-19 15:26:13', 0, 1, 'sub_1PQrBlGtY97KMuDYJRKg4GCB', NULL),
(46, 1, 38, '2024-06-12 15:35:24', '2024-06-19 15:35:24', 1, 1, 'sub_1PQrKeGtY97KMuDYYUeQ5W1e', 'https://invoice.stripe.com/i/acct_1POGifGtY97KMuDY/test_YWNjdF8xUE9HaWZHdFk5N0tNdURZLF9RSFNGSk9ZbEsxRm5EMzk5em5pOEF5eTlaeFcyVmc3LDEwODc0NzgxNw0200XY7eLHTz?s=ap'),
(47, 3, 40, '2024-06-12 15:38:43', '2024-06-19 15:38:43', 0, 1, 'sub_1PQrNrGtY97KMuDYlrQBLpno', NULL),
(48, 2, 43, '2024-06-12 17:08:40', '2024-06-19 17:08:40', 0, 1, 'sub_1PQsmtGtY97KMuDY6y8WgXas', NULL),
(49, 3, 44, '2024-06-12 17:29:43', '2024-06-19 17:29:43', 0, 1, 'sub_1PQt7FGtY97KMuDY6jdomxei', NULL),
(50, 3, 44, '2024-06-12 17:29:42', '2024-06-19 17:29:42', 0, 1, 'sub_1PQt7FGtY97KMuDY6jdomxei', NULL),
(51, 3, 45, '2024-06-12 17:42:27', '2024-06-19 17:42:27', 0, 1, 'sub_1PQtJZGtY97KMuDYYGRNpyPz', 'https://invoice.stripe.com/i/acct_1POGifGtY97KMuDY/test_YWNjdF8xUE9HaWZHdFk5N0tNdURZLF9RSFNGSk9ZbEsxRm5EMzk5em5pOEF5eTlaeFcyVmc3LDEwODc0NzgxNw0200XY7eLHTz?s=ap'),
(52, 3, 45, '2024-06-12 17:42:26', '2024-06-19 17:42:26', 0, 1, 'sub_1PQtJZGtY97KMuDYYGRNpyPz', 'https://invoice.stripe.com/i/acct_1POGifGtY97KMuDY/test_YWNjdF8xUE9HaWZHdFk5N0tNdURZLF9RSFNGSk9ZbEsxRm5EMzk5em5pOEF5eTlaeFcyVmc3LDEwODc0NzgxNw0200XY7eLHTz?s=ap'),
(53, 2, 46, '2024-06-12 22:28:49', '2024-06-19 22:28:49', 1, 1, 'sub_1PQxmjGtY97KMuDYTRBuqmqO', NULL),
(54, 3, 47, '2024-06-12 22:35:34', '2024-06-19 22:35:34', 1, 1, 'sub_1PQxtGGtY97KMuDY3YITElOE', NULL),
(55, 3, 46, '2024-06-13 11:23:51', '2024-06-20 11:23:51', 1, 1, 'sub_1PR9slGtY97KMuDYN5M2xJ2f', NULL),
(56, 2, 48, '2024-06-13 13:04:45', '2024-06-20 13:04:45', 0, 1, 'sub_1PRBSNGtY97KMuDYu01AsL1U', 'https://invoice.stripe.com/i/acct_1POGifGtY97KMuDY/test_YWNjdF8xUE9HaWZHdFk5N0tNdURZLF9RSGt6ZTVSMWdzSzBjMlc3SWNCQlpVcG1IMVdrT1ZKLDEwODgxNzU3OA0200NpGXZrXT?s=ap'),
(57, 2, 48, '2024-06-13 13:04:44', '2024-06-20 13:04:44', 0, 1, 'sub_1PRBSNGtY97KMuDYu01AsL1U', 'https://invoice.stripe.com/i/acct_1POGifGtY97KMuDY/test_YWNjdF8xUE9HaWZHdFk5N0tNdURZLF9RSGt6ZTVSMWdzSzBjMlc3SWNCQlpVcG1IMVdrT1ZKLDEwODgxNzU3OA0200NpGXZrXT?s=ap'),
(58, 1, 0, '2024-06-13 13:20:49', NULL, 1, 1, NULL, NULL),
(59, 3, 50, '2024-06-13 13:29:36', '2024-06-20 13:29:36', 0, 1, 'sub_1PRBqSGtY97KMuDYX1lvnY5q', 'https://invoice.stripe.com/i/acct_1POGifGtY97KMuDY/test_YWNjdF8xUE9HaWZHdFk5N0tNdURZLF9RSGxPb1gwZmpLMmVvR3NWdDFKaU9Ha2p0VHNqRm1LLDEwODgxOTA1Nw0200HdhfkYri?s=ap'),
(60, 3, 50, '2024-06-13 13:29:37', '2024-06-20 13:29:37', 0, 1, 'sub_1PRBqSGtY97KMuDYX1lvnY5q', 'https://invoice.stripe.com/i/acct_1POGifGtY97KMuDY/test_YWNjdF8xUE9HaWZHdFk5N0tNdURZLF9RSGxPb1gwZmpLMmVvR3NWdDFKaU9Ha2p0VHNqRm1LLDEwODgxOTA1Nw0200HdhfkYri?s=ap'),
(61, 1, 51, '2024-06-13 13:30:42', NULL, 1, 1, NULL, NULL),
(62, 3, 51, '2024-06-13 13:31:52', '2024-06-20 13:31:52', 1, 1, 'sub_1PRBsdGtY97KMuDYGnaBi3UR', NULL),
(63, 3, 51, '2024-06-13 13:31:51', '2024-06-20 13:31:51', 1, 1, 'sub_1PRBsdGtY97KMuDYGnaBi3UR', NULL),
(64, 2, 53, '2024-06-13 13:49:38', '2024-06-20 13:49:38', 1, 1, 'sub_1PRC9pGtY97KMuDY3kPzKKJI', NULL),
(65, 2, 53, '2024-06-13 13:49:39', '2024-06-20 13:49:39', 1, 1, 'sub_1PRC9pGtY97KMuDY3kPzKKJI', NULL);

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `data_access`
--
ALTER TABLE `data_access`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `data_articles`
--
ALTER TABLE `data_articles`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `data_subscriptions`
--
ALTER TABLE `data_subscriptions`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `data_users`
--
ALTER TABLE `data_users`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `data_users_subscriptions`
--
ALTER TABLE `data_users_subscriptions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `data_access`
--
ALTER TABLE `data_access`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT för tabell `data_articles`
--
ALTER TABLE `data_articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT för tabell `data_subscriptions`
--
ALTER TABLE `data_subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT för tabell `data_users`
--
ALTER TABLE `data_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT för tabell `data_users_subscriptions`
--
ALTER TABLE `data_users_subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

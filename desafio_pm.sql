-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 17/12/2024 às 15:46
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `desafio_pm`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `deliveries`
--

CREATE TABLE `deliveries` (
  `deliveryID` int(11) NOT NULL,
  `driverID` int(11) NOT NULL,
  `truckID` int(11) NOT NULL,
  `departureDate` date NOT NULL,
  `arrivalDate` date NOT NULL,
  `type` text NOT NULL,
  `destination` text NOT NULL,
  `value` float NOT NULL,
  `secure` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `deliveries`
--

INSERT INTO `deliveries` (`deliveryID`, `driverID`, `truckID`, `departureDate`, `arrivalDate`, `type`, `destination`, `value`, `secure`) VALUES
(20, 4, 7, '2024-12-16', '2025-05-06', 'Eletrônicos', 'Amazônia', 60000, 0),
(21, 5, 9, '2024-12-17', '2024-12-18', 'Eletrônicos', 'Argentina', 28000, 1),
(22, 2, 8, '2024-12-17', '2024-12-26', 'Combustível', 'Nordeste', 39000, 0),
(23, 7, 11, '2024-12-17', '2070-07-08', 'Comum', 'Nordeste', 1300, 0),
(24, 8, 13, '2024-12-17', '3456-02-01', 'Comum', 'Centro-oeste', 2, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `drivers`
--

CREATE TABLE `drivers` (
  `driverID` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `drivers`
--

INSERT INTO `drivers` (`driverID`, `name`) VALUES
(2, 'Fernando Miguel'),
(3, 'Arnaldo Fernandes Marques'),
(4, 'Carlos Antônio Pereira'),
(5, 'Miguel Farias Marques'),
(6, 'Luiza Rocha Torres'),
(7, 'Seu Dudu verde'),
(8, 'cachorrinhos');

-- --------------------------------------------------------

--
-- Estrutura para tabela `trucks`
--

CREATE TABLE `trucks` (
  `truckID` int(11) NOT NULL,
  `model` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `trucks`
--

INSERT INTO `trucks` (`truckID`, `model`) VALUES
(7, 'Teste Max 2023/2024'),
(8, 'Teste Pro 2022'),
(9, 'Teste Devs 2021/2022'),
(10, 'Teste Atual 2023/2024'),
(11, 'Torres demais'),
(13, 'asdfghjkl;\'\'dfghnm,');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `name` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`userID`, `name`, `password`, `email`) VALUES
(1, 'Matheus Milfont', '12345678', 'matheusnmilfontc@gmail.com');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `deliveries`
--
ALTER TABLE `deliveries`
  ADD PRIMARY KEY (`deliveryID`);

--
-- Índices de tabela `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`driverID`);

--
-- Índices de tabela `trucks`
--
ALTER TABLE `trucks`
  ADD PRIMARY KEY (`truckID`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `deliveries`
--
ALTER TABLE `deliveries`
  MODIFY `deliveryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de tabela `drivers`
--
ALTER TABLE `drivers`
  MODIFY `driverID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `trucks`
--
ALTER TABLE `trucks`
  MODIFY `truckID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

/**
 * Author il12 (https://github.com/il12)
 */

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE TABLE IF NOT EXISTS `players` (
  `id` VARCHAR(22) NOT NULL COMMENT 'Player ID',
  `name` TEXT NOT NULL COMMENT 'Player nickname',
  `ip` TEXT NOT NULL COMMENT 'Player ip',
  `lastVisit` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `maps` (
  `uid` VARCHAR(27) NOT NULL COMMENT 'Map unique ID',
  `name` TEXT NOT NULL COMMENT 'Map name',
  `file` TEXT NOT NULL COMMENT 'Map path relative to UserData/Maps/',
  `author` TEXT NOT NULL COMMENT 'Map author\'s id',
  `bronze` TEXT NOT NULL COMMENT 'bronze medal time',
  `silver` TEXT NOT NULL COMMENT 'silver medal time',
  `gold` TEXT NOT NULL COMMENT 'gold medal time',
  `at` TEXT NOT NULL COMMENT 'at medal time',
  `isMultilap` BOOLEAN NOT NULL COMMENT 'Whether it\'s a multilap map',
  `nbLaps` INT NOT NULL COMMENT 'Number of Laps',
  `nbCheckpoints` INT NOT NULL COMMENT 'Number of Checkpoints',
  `type` TEXT NOT NULL COMMENT 'Map type',
  `style` TEXT NOT NULL COMMENT 'Map style',
  `tmxid` INT NOT NULL COMMENT 'Map\'s ID on TMX (-1 if absent)',
  PRIMARY KEY (`uid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `karma` (
  `id` VARCHAR(22) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci' NOT NULL COMMENT 'Player id',
  `uid` VARCHAR(27) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci' NOT NULL COMMENT 'Map unique ID',
  `vote` INT NOT NULL DEFAULT '0' COMMENT 'Karma vote',
  PRIMARY KEY (`id`, `uid`),
  INDEX `karmaUid` (`uid` ASC) VISIBLE,
  CONSTRAINT `karmaLogin`
    FOREIGN KEY (`id`)
    REFERENCES `players` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `karmaUid`
    FOREIGN KEY (`uid`)
    REFERENCES `maps` (`uid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `records` (
  `id` VARCHAR(22) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci' NOT NULL COMMENT 'Player id',
  `uid` VARCHAR(27) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci' NOT NULL COMMENT 'Map unique ID',
  `time` INT NOT NULL COMMENT 'Record time',
  PRIMARY KEY (`id`, `uid`),
  INDEX `id` (`id` ASC) VISIBLE,
  INDEX `recordsUid` (`uid` ASC) VISIBLE,
  CONSTRAINT `recordsLogin`
    FOREIGN KEY (`id`)
    REFERENCES `players` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `recordsUid`
    FOREIGN KEY (`uid`)
    REFERENCES `maps` (`uid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `checkpoints` (
  `cpNumber` INT NOT NULL COMMENT 'Checkpoint number',
  `time` INT NOT NULL COMMENT 'Record time on checkpoint',
  `id` VARCHAR(22) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci' NOT NULL COMMENT 'Player id',
  `uid` VARCHAR(27) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci' NOT NULL COMMENT 'Map unique ID',
  PRIMARY KEY (`id`, `uid`, `cpNumber`),
  INDEX checkpointsLogin (uid ASC, id, cpNumber) VISIBLE,
  CONSTRAINT checkpointsLogin
    FOREIGN KEY (id)
    REFERENCES players (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT checkpointsUid
    FOREIGN KEY (uid)
    REFERENCES maps (uid)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `settings` (
  `plugin` VARCHAR(255) NOT NULL COMMENT 'Plugin name',
  `settings` JSON NOT NULL COMMENT 'Settings JSON',
  PRIMARY KEY (`plugin`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `HUD` (
  `id` VARCHAR(255) NOT NULL COMMENT 'Player id',
  `settings` JSON NOT NULL COMMENT 'HUD settings JSON',
  PRIMARY KEY (`id`)),
  CONSTRAINT checkpointsLogin
    FOREIGN KEY (id)
    REFERENCES players (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;

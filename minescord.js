const Discord = require('discord.js');
const client = new Discord.Client();
const minesweeper = require('minesweeper');

const BoardStateEnum = minesweeper.BoardStateEnum;
const CellStateEnum = minesweeper.CellStateEnum;
const CellFlagEnum = minesweeper.CellFlagEnum;
const Board = minesweeper.Board;
const Cell = minesweeper.Cell;
const generateMineArray = minesweeper.generateMineArray;

function generateBoard(r,c,m) {
	var mineArray = minesweeper.generateMineArray({
		rows: r,
		cols: c,
		mines: m
	});
	var board = new Board(mineArray);
	var grid = board.grid();
	var strBoard = "Here's your " + r + "x" + c + "x" + m + " minesweeper game:\n";
	for (i = 0; i < board.numRows(); i++) {
		strBoard = strBoard + printRow(grid[i], i) + "\n";
	}
	return strBoard;
}

function toEmoji(x) {
	return [':zero:',':one:',':two:',':three:',':four:',':five:',':six:',':seven:',':eight:',':nine:'][x];
}

function printRow(rowArray, rowNum) {
	var i, cell, strRow = '';
	for (i=0; i<rowArray.length; i++) {
		cell = rowArray[i];
		if (cell.isMine) {
			strRow += getCellString(':bomb:');
		} else {
			strRow += getCellString(toEmoji(cell.numAdjacentMines));
		}
	  }
	 return strRow;
}

function getCellString(content) {
	return "|| " + content + " || "
}

client.on('ready', () => { console.log('time for some minesweeper! server ready'); });
client.on('message', msg => {
	testre = /^!mines ([0-9]+),([0-9]+),([0-9]+)$/;

	if (msg.content === '!mines') {
		msg.channel.send(generateBoard(10,10,15)).catch((err)=>console.log(err));
	} else if (testre.test(msg.content)) {
		matches = msg.content.match(testre);
		h = matches[1];
		w = matches[2];
		m = matches[3];
		if (w <= 0 || w > 30 || h <= 0 || h > 30 || m <= 0 || m > 60 || m > (w*h)) {
			msg.channel.send("nope :( check your board size").catch((err)=>console.log(err));
		} else {
			board = generateBoard((h,w,m));
			if (board.length > 2500) {
				msg.channel.send("nope :) check your board size").catch((err)=>console.log(err));
			} else {
				msg.channel.send(board).catch((err)=>console.log(err));
			}
		}
	}
});

client.login(process.env.DISCORD_USER_TOKEN).catch((err)=>console.log(err));

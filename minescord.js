const Discord = require('discord.js');
const client = new Discord.Client();
const minesweeper = require('minesweeper');

const BoardStateEnum = minesweeper.BoardStateEnum;
const CellStateEnum = minesweeper.CellStateEnum;
const CellFlagEnum = minesweeper.CellFlagEnum;
const Board = minesweeper.Board;
const Cell = minesweeper.Cell;
const generateMineArray = minesweeper.generateMineArray;

strs = {};
strs["en"] = ["Here's your ", " minesweeper game:\n", "time for some minesweeper! server ready", "Nope! Check your board size!"];
strs["es"] = ["Aquí tienes tu buscaminas de ", ":\n", "hora del buscaminas! servidor listo", "¡Nop! ¡Comprueba el tamaño del tablero!"];
strs["ca"] = ["Aquí tens el pescamines de ", ":\n", "hora del pescamines! servidor llest", "Nop! Comprova la mida del tauler de joc!"];

LANG = process.env.LANG || "en";

function generateBoard(r,c,m) {
	var mineArray = minesweeper.generateMineArray({
		rows: r,
		cols: c,
		mines: m
	});
	var board = new Board(mineArray);
	var grid = board.grid();
	var rowsBoard = [strs[LANG][0] + r + "x" + c + "x" + m + strs[LANG][1]];
	for (i = 0; i < board.numRows(); i++) {
		rowsBoard.push(printRow(grid[i], i));
	}
	return rowsBoard;
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

client.on('ready', () => { console.log(strs[LANG][2]); });
client.on('message', msg => {
	testre = /^!mines ([0-9]+),([0-9]+),([0-9]+)$/;

	if (msg.content === '!mines') {
		msg.channel.send(generateBoard(10,10,15).join('\n')).catch((err)=>console.log(err));
	} else if (testre.test(msg.content)) {
		matches = msg.content.match(testre);
		h = matches[1];
		w = matches[2];
		m = matches[3];
		if (w <= 0 || w > 30 || h <= 0 || h > 30 || m <= 0 || m > 60 || m > (w*h)) {
			msg.channel.send(strs[LANG][3]).catch((err)=>console.log(err));
		} else {
			rowsBoard = generateBoard(h,w,m);
			board = "";
			for (i=0; i<rowsBoard.length; i++) {
				if (board.length + rowsBoard[i].length > 2000) {
					msg.channel.send(board).catch((err)=>console.log(err));
					board = rowsBoard[i] + "\n";
				} else {
					board = board + rowsBoard[i] + "\n";
				}
			}
			msg.channel.send(board).catch((err)=>console.log(err));
		}
	}
});

client.login(process.env.DISCORD_USER_TOKEN).catch((err)=>console.log(err));

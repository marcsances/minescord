# minescord

a minesweeper bot for discord

# what?

![minesweeper bot for discord](https://i.imgur.com/8UDe9Bm.png)

this is a quick and dirty bot that will pop a minesweeper field in your discord server

very quickly put together for my fun purposes

# how?

minesweeper for node.js to generate the boards, discord.js for the bot things, discord new spoiler feature to hide the mines

!mines will generate a 10x10 board with 15 mines, to customize you can use !mines width,height,mines but we're heavily capped by Discord message length

# can I play it?

I'm considering hosting it for everyone, just not yet. If you want to use it now, install it manually.

# setup

```
export DISCORD_USER_TOKEN=your_bot_user_token
export LANG=en                       # or es, or ca
npm install
npm start
```

easy :)

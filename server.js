const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://welcobot.glitch.me/`);
}, 280000);


// كل البكجات الي ممكن تحتجها في اي بوت 
// كل البكجات الي ممكن تحتجها في اي بوت
const { Client, RichEmbed } = require("discord.js");
var { Util } = require('discord.js');
const {TOKEN, YT_API_KEY, prefix, devs} = require('./config')
const client = new Client({ disableEveryone: true})
const canvas = require("canvas");
const Canvas = require("canvas");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const botversion = require('./package.json').version;
const simpleytapi = require('simple-youtube-api')
const moment = require("moment");
const fs = require('fs');
const util = require("util")
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const { get } = require('snekfetch');
const guild = require('guild');
const dateFormat = require('dateformat');//npm i dateformat
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const pretty = require("pretty-ms");
client.login(TOKEN);
const queue = new Map();
var table = require('table').table
const Discord = require('discord.js');
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

console.log("==================================")
console.log("1")
console.log("2")
console.log("3")
console.log("=========> Bot Online <=========")
console.log("========> TestBot <========")
console.log("=======> Token Bot **** <=======")
console.log("3")
console.log("2")
console.log("1")
console.log("====================================")
console.log("Bot Online 24/7");

// ------------ = [Welcome - Leave - Invite By] = ------------ //

const welcome = JSON.parse(
  fs.readFileSync("./welcomer.json", "utf8")
);
client.on("message", async message => {
  let messageArray = message.content.split(" ");
  if (message.content.startsWith(prefix + "setLeave")) {
    let filter = m => m.author.id === message.author.id;
    let thisMessage;
    let thisFalse;

    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send("You don't have permission").then(msg => {
        msg.delete(4500);
        message.delete(4500);
      });

    message.channel
      .send(":pencil: **| من فضلك اكتب الرساله الان... :pencil2: **")
      .then(msg => {
        message.channel
          .awaitMessages(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            collected.first().delete();
            thisMessage = collected.first().content;
            let boi;
            msg
              .edit(":scroll: **| اكتب اسم الروم الان... :pencil2: **")
              .then(msg => {
                message.channel
                  .awaitMessages(filter, {
                    max: 1,
                    time: 90000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    collected.first().delete();
                    boi = collected.first().content;
                    msg.edit("✅ **| تم الاعداد بنجاح...  **").then(msg => {
                      message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      });
                      let embed = new Discord.RichEmbed()
                        .setTitle("**Done The Leave Msg Code Has Been Setup**")
                        .addField("Message:", `${thisMessage}`)
                        .addField("Channel:", `${boi}`)
                        .setThumbnail(message.author.avatarURL)
                        .setFooter(`${client.user.username}`);
                      message.channel.sendEmbed(embed);
                      welcome[message.guild.id] = {
                        leavechannel: boi,
                        leavemsg: thisMessage,
                        onoff: "On",
                        leave: "On"
                      };
                      fs.writeFile(
                        "./welcomer.json",
                        JSON.stringify(welcome),
                        err => {
                          if (err) console.error(err);
                        }
                      );
                    });
                  });
              });
          });
      });
  }
});


client.on("message", message => {
  if (!message.channel.guild) return;

  let room = message.content.split(" ").slice(1);
  let findroom = message.guild.channels.find("name", `${room}`);
  if (message.content.startsWith(prefix + "setWelcomer")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** <a:admins:650199479768711169>``MANAGE_GUILD``<a:admins:650199479768711169>"
      );
    if (!room) return message.channel.send("Please Type The Channel Name");
    if (!findroom)
      return message.channel.send(
        " Cant Find This Channel"
      );
    let embed = new Discord.RichEmbed()
      .setTitle(
        "** Done The Welcome Code Has Been Setup**"
      )
      .addField("Channel:", `${room}`)
      .addField("Requested By:", `${message.author}`)
      .setThumbnail(message.author.avatarURL)
      .setFooter(`${client.user.username}`);
    message.channel.sendEmbed(embed);
    welcome[message.guild.id] = {
      channel: room,
      onoff: "On",
      by: "On",
      dm: "Off",
      leave: "Off"
    };
    fs.writeFile(
      "./welcomer.json",
      JSON.stringify(welcome),
      err => {
        if (err) console.error(err);
      }
    );
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "toggleLeave")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!welcome[message.guild.id])
      welcome[message.guild.id] = {
        onoff: "Off",
        leave: "Off"
      };
    if (welcome[message.guild.id].leave === "Off")
      return [
        message.channel.send(
          `** The Leave Msg Is __𝐎𝐍__ !**`
        ),
        (welcome[message.guild.id].leave = "On")
      ];
    if (welcome[message.guild.id].leave === "On")
      return [
        message.channel.send(
          `**The Leave Msg Is __𝐎𝐅𝐅__ ! **`
        ),
        (welcome[message.guild.id].leave = "Off")
      ];
    fs.writeFile(
      "./welcomer.json",
      JSON.stringify(welcome),
      err => {
        if (err)
          console.error(err).catch(err => {
            console.error(err);
          });
      }
    );
  }
});
client.on("message", message => {
  if (message.content.startsWith(prefix + "toggleWelcome")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!welcome[message.guild.id])
      welcome[message.guild.id] = {
        onoff: "Off"
      };
    if (welcome[message.guild.id].onff === "Off")
      return [
        message.channel.send(
          `**The Welcome Is __𝐎𝐍__ ! **`
        ),
        (welcome[message.guild.id].onoff = "On")
      ];
    if (welcome[message.guild.id].onoff === "On")
      return [
        message.channel.send(
          `**The Welcome Is __𝐎𝐅𝐅__ ! **`
        ),
        (welcome[message.guild.id].onoff = "Off")
      ];
    fs.writeFile(
      "./welcomer.json",
      JSON.stringify(welcome),
      err => {
        if (err)
          console.error(err).catch(err => {
            console.error(err);
          });
      }
    );
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "toggleDmwelcome")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!welcome[message.guild.id])
      welcome[message.guild.id] = {
        dm: "Off"
      };
    if (welcome[message.guild.id].dm === "Off")
      return [
        message.channel.send(
          `**The Welcome Dm Is __𝐎𝐍__ !**`
        ),
        (welcome[message.guild.id].dm = "On")
      ];
    if (welcome[message.guild.id].dm === "On")
      return [
        message.channel.send(
          `**The Welcome Dm Is __𝐎𝐅𝐅__ !**`
        ),
        (welcome[message.guild.id].dm = "Off")
      ];
    fs.writeFile(
      "./welcomer.json",
      JSON.stringify(welcome),
      err => {
        if (err)
          console.error(err).catch(err => {
            console.error(err);
          });
      }
    );
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "toggleInvitedby")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!welcome[message.guild.id])
      welcome[message.guild.id] = {
        by: "Off"
      };
    if (welcome[message.guild.id].by === "Off")
      return [
        message.channel.send(
          `** The Invited By Is __𝐎𝐍__ !**`
        ),
        (welcome[message.guild.id].by = "On")
      ];
    if (welcome[message.guild.id].by === "On")
      return [
        message.channel.send(
          `**The Invited By Is __𝐎𝐅𝐅__ !**`
        ),
        (welcome[message.guild.id].by = "Off")
      ];
    fs.writeFile(
      "./welcomer.json",
      JSON.stringify(welcome),
      err => {
        if (err)
          console.error(err).catch(err => {
            console.error(err);
          });
      }
    );
  }
});
client.on("guildMemberRemove", member => {
  if (!welcome[member.guild.id])
    welcome[member.guild.id] = {
      onoff: "Off",
      leave: "Off"
    };

  if (welcome[member.guild.id].onoff === "Off") return;
  if (welcome[member.guild.id].leave === "Off") return;
  let welcomer = member.guild.channels.find(
    "name",
    `${welcome[member.guild.id].leavechannel}`
  );
  if (!welcomer) return;
  welcomer.send(`${member} ${welcome[member.guild.id].leavemsg}`);
});

client.on("guildMemberAdd", async member => {
  if (!welcome[member.guild.id])
    welcome[member.guild.id] = {
      onoff: "Off"
    };
  if (welcome[member.guild.id].onoff === "Off") return;
  const Canvas = require("canvas");
  const jimp = require("jimp");
  const w = [
    "./1.png",
  ];
  let Image = Canvas.Image,
    canvas = Canvas.createCanvas(400, 205),
    ctx = canvas.getContext("2d");
  ctx.patternQuality = "bilinear";
  ctx.filter = "bilinear";
  ctx.antialias = "subpixel";
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.stroke();
  ctx.beginPath();

  fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function(
    err,
    Background
  ) {
    if (err) return console.log(err);
    let BG = Canvas.Image;
    let ground = new Image();
    ground.src = Background;
    ctx.drawImage(ground, 0, 0, 400, 205);
  });

  let url = member.user.displayAvatarURL.endsWith(".webp")
    ? member.user.displayAvatarURL.slice(5, -20) + ".png"
    : member.user.displayAvatarURL;
  jimp.read(url, (err, ava) => {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
      if (err) return console.log(err);

      ctx.font = "17px Arial";
      ctx.fontSize = "72px";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(member.user.username, 260, 145);

      ctx.font = "8px Arial Bold";
      ctx.fontSize = "72px";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(`Your The Member ${member.guild.memberCount}`, 250, 155);

      let Avatar = Canvas.Image;
      let ava = new Avatar();
      ava.src = buf;
      ctx.beginPath();
      ctx.arc(130, 92, 71, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(ava, 60, 22, 145, 145);
      let c = member.guild.channels.find(
        "name",
        `${welcome[member.guild.id].channel}`
      );
      if (!c) return;
      c.sendFile(canvas.toBuffer());
      c.send(`**__W__elcome ~~T~~o** **${member.guild.name}**`)
      c.send("**  User : **" + `${member}` + "..");
      fs.writeFile(
        "./welcomer.json",
        JSON.stringify(welcome),
        err => {
          if (err)
            console.error(err).catch(err => {
              console.error(err);
            });
        }
      );
    });
  });
});

const invites = JSON.parse(fs.readFileSync("./invites.json", "UTF8"))

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    if(g.members.get(client.user.id).hasPermission("MANAGE_GUILD"))
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("guildMemberAdd", member => {
  if (!welcome[member.guild.id])
    welcome[member.guild.id] = {
      by: "Off"
    };
  if (welcome[member.guild.id].by === "Off") return;
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    const logChannel = member.guild.channels.find(
      channel => channel.name === `${welcome[member.guild.id].channel}`
    );
    if (!logChannel) return;
    setTimeout(() => {
      logChannel.send(`**Invited By: <@${inviter.id}>**


`);
    }, 2000);
    fs.writeFile(
      "./welcomer.json",
      JSON.stringify(welcome),
      err => {
        if (err)
          console.error(err).catch(err => {
            console.error(err);
          });
      }
    );
  });
});

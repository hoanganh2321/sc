const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');

const clientId = '1251194459052314766';
const guildId = '1230863461144068140';
const token = '';

const commands = [
    {
        name: 'serverinfo',
        description: 'Hiển thị thông tin về máy chủ.'
    },
    {
        name: 'ping',
        description: 'Kiểm tra ping của bot.'
    },
    {
        name: 'script',
        description: 'Chọn một tùy chọn từ danh sách.',
    },
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Slash commands đã được đăng ký thành công.');
    } catch (error) {
        console.error(error);
    }
})();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`Đã đăng nhập với tên: ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        const { commandName } = interaction;

        if (commandName === 'serverinfo') {
            const guild = interaction.guild;
            const serverInfo = `Tên máy chủ: ${guild.name}\nSố thành viên: ${guild.memberCount}`;
            await interaction.reply(serverInfo);
        } else if (commandName === 'ping') {
            const ping = Date.now() - interaction.createdTimestamp;
            await interaction.reply(`Pong! Latency: ${ping}ms`);
        } else if (commandName === 'script') {
            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId('select_menu')
                .setPlaceholder('Chọn một tùy chọn')
                .addOptions([
                    {
                        label: 'xQuartyx | Script King Legacy',
                        value: 'xQuartyx',
                        description: 'Sunny Hub Main Blox Fruit',
                    },
                    {
                        label: 'Buang Hub | Script Các Game Thủ Thành',
                        value: 'Buang Hub ',
                        description: 'Script Chuyên Về Các Game Thủ Thành',
                    },
                    {
                        label: 'Sunny Hub Auto Chest [Blox Fruit]',
                        value: 'Sunny Hub Auto Chest [Blox Fruit]',
                        description: 'Sunny Hub Auto Chest Blox Fruit',
                    },
                    {
                        label: 'Sunny Hub Auto Bounty [Blox Fruit]',
                        value: 'Sunny Hub Auto Bounty [Blox Fruit]',
                        description: 'Sunny Hub Auto Bounty Blox Fruit',
                    },
                ]);

            const row = new ActionRowBuilder().addComponents(selectMenu);

            await interaction.reply({ content: 'Vui lòng chọn một tùy chọn:', components: [row] });
        }
    } else if (interaction.isStringSelectMenu()) {
        const selectedValue = interaction.values[0];

        let embed;

        if (selectedValue === 'Sunny Hub Main [Blox Fruit]') {
            embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('xQuartyx')
                .setDescription('Đây là Script Của Bạn ! ')
                .addFields({ name: 'Script', value: '```lua\nloadstring(game:HttpGet"https://raw.githubusercontent.com/xQuartyx/DonateMe/main/ScriptLoader")()\n```' });
        } else if (selectedValue === 'Buang Hub') {
            embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Buang Hub')
                .setDescription('Đây là Script Của Bạn ! ')
                .addFields({ name: 'Script', value: '```lua\nloadstring(game:HttpGet("https://raw.githubusercontent.com/buang5516/buanghub/main/BUANGHUB.lua"))()\n```' });
        } else if (selectedValue === 'Sunny Hub Auto Chest [Blox Fruit]') {
            embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Sunny Hub Auto Chest [Blox Fruit]')
                .setDescription('Đây là Script Của Bạn ! ')
                .addFields({ name: 'Script', value: '```lua\ngetgenv().Setting = {\n    ["Team"] = "Marines", -- or Pirate\n    ["WhiteScreen"] = false,\n    ["FpsBoost"] = false,\n    ["AutoRejoin"] = true,\n    ["TimeReset"] = 4,\n    ["ModeFarm"] = {\n        ["StopItemLegendary"] = true,\n    },\n}\nloadstring(game:HttpGet("https://raw.githubusercontent.com/hihiae/Sunny/main/SunnyAutoChest"))()\n```' });
        } else if (selectedValue === 'Sunny Hub Auto Bounty [Blox Fruit]') {
            embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Sunny Hub Auto Bounty [Blox Fruit]')
                .setDescription('Đây là Script Của Bạn ! ')
                .addFields({ name: 'Script', value: '```lua\ngetgenv().Setting = {\n    ["Team"] = "Pirates",\n    ["Webhook"] = {\n        ["Enabled"] = true, \n        ["Url"] = ""\n    },\n    ["Auto Click"] = true,\n    ["V4"] = false,\n    ["Skip Race V4"] = true,\n    ["Chat"] = {\n        ["Enable"] = true,\n        ["Chat every sec"] = 17.5,\n        ["Text"] = {"Ngu Ngu Ngu"}\n    },\n    ["Misc"] = {\n        ["Enable Lock Bounty"] = true,\n        ["Lock Bounty"] = {0, 300000000},\n        ["Hide Health"] = {4500,5000},\n        ["Lock Camera"] = false,\n        ["Enable Cam Farm"] = false,\n        ["White Screen"] = false, \n        ["FPS Boost"] = false,\n        ["GunMethod"] = false, --// Beta [Maybe not work]\n        ["Bypass TP"] = true, \n        ["Random & Store Fruit"] = true,\n        ["IgnoreFriends"] = true -- Không tấn công bạn bè\n    },\n    ["Item"] = {\n        ["Melee"] = {["Enable"] = true,\n            ["Z"] = {["Enable"] = true, ["Hold Time"] = 1.5},\n            ["X"] = {["Enable"] = true, ["Hold Time"] = 0.1},\n            ["C"] = {["Enable"] = true, ["Hold Time"] = 0.1}\n        },\n        ["Blox Fruit"] = {["Enable"] = false,\n            ["Z"] = {["Enable"] = true, ["Hold Time"] = 1.5},\n            ["X"] = {["Enable"] = true, ["Hold Time"] = 0},\n            ["C"] = {["Enable"] = true, ["Hold Time"] = 0},\n            ["V"] = {["Enable"] = false, ["Hold Time"] = 0},\n            ["F"] = {["Enable"] = false, ["Hold Time"] = 0}\n        },\n        ["Sword"] = {["Enable"] = true,\n            ["Z"] = {["Enable"] = true, ["Hold Time"] = 0.1},\n            ["X"] = {["Enable"] = true, ["Hold Time"] = 0.1}\n        },\n        ["Gun"] = {["Enable"] = false,\n            ["Z"] = {["Enable"] = true, ["Hold Time"] = 0.1},\n            ["X"] = {["Enable"] = true, ["Hold Time"] = 0.1}\n        } \n    } \n}\nloadstring(game:HttpGet("https://raw.githubusercontent.com/hihiae/Sunny/main/SunnyAutoBounty"))()\n```' });
        }

        await interaction.update({ content: '', embeds: [embed], components: [] });
    }
});

client.login(token);
var builder = require('botbuilder');
var restify = require('restify');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Bot dialog
bot.dialog('/', function (session) {

    // Create and send attachment
    var attachment = {
        contentUrl: 'https://d1yn1kh78jj1rr.cloudfront.net/previews1/free-sample-stamp_MJl0grOu.jpg',
        contentType: 'image/png',
        name: 'BotFrameworkOverview.png'
    };

    var msg = new builder.Message(session)
        .addAttachment(attachment);

    session.send(msg);
});
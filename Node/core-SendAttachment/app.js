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

bot.dialog('/', [
    function (session) {
        builder.Prompts.attachment(session, "Upload a picture");
    },
    function (session, results) {
        if (results.response) {
         session.send('got something');
        }
    }
]);
/*
// Bot dialog
bot.dialog('/', function (session) {

    // Create and send attachment
    var attachment = {
        contentUrl: 'https://docs.botframework.com/en-us/images/faq-overview/botframework_overview_july.png',
        contentType: 'image/png',
        name: 'BotFrameworkOverview.png'
    };

    var msg = new builder.Message(session)
        .addAttachment(attachment);

    session.send(msg);
});
*/
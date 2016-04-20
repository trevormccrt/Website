var SERVER_SETTINGS={
	serverPort:3000,
	logRequests: true,
	userCacheTTL: 1000*60*60*24*31, //in milliseconds (1 month)
	emailSender: "postmaster@sandboxadb6400298ef46dab20b8fde539c47cf.mailgun.org", //when a request is submitted in the contact form, this is the email that sends it
	emailSenderPassword: process.env.EMAIL_PASSWORD,
	emailReceiver: "trevormccrt@gmail.com", //this is the email that the sender sends to in the contact form
	google_analytics_id:"UA-68186801-1"
};

module.exports=SERVER_SETTINGS;
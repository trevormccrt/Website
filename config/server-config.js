var SERVER_SETTINGS={
	serverPort:3000,
	logRequests: true,
	userCacheTTL: 1000*60*60*24*31, //in milliseconds (1 month)
	emailSender: "postmaster@sandbox49104c24db824bf39593ac8da0ffd6a1.mailgun.org", //when a request is submitted in the contact form, this is the email that sends it
	emailSenderPassword: process.env.EMAIL_PASSWORD,
	emailReceiver: "tj2mccou@uwaterloo.ca", //this is the email that the sender sends to in the contact form
	google_analytics_id:"UA-68186801-1"
};

module.exports=SERVER_SETTINGS;
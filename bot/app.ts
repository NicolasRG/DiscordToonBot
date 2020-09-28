import  Discord from 'discord.js';

const client = new Discord.Client();

//deepai
import  deepai from 'deepai'; 
deepai.setApiKey(process.env.openaiToken);

//discord bot 
client.on('message', message => {
	console.log(message);
	console.log(message.attachments);

	if (message.content === '!status') {
		message.channel.send('Alive');
	}
	
	if( message.attachments.size !== 0 ){
     	const attachments = mapAttachment(message.attachments.toJSON()[0]);

		if(isImageFile(attachments.name)){

			//excute logic for attachements
			console.log("on Image");
			getImage(attachments.url, (img)=>{
				console.log(img);
				message.channel.send(img.output_url);
			})
		}
	}
});



client.once('ready', () => {
	console.log('Ready!');
});

client.login(process.env.discordClientToken);


//Function to get image
const getImage = async (imgurl, callback:Function) => {
    let resp = await deepai.callStandardApi("toonify", {
            image: imgurl, 	
	});

	callback(resp);
}


//accepted image types
const imgTypes:Array<String> = ["gif", "png", "jpeg", "jpg"];


/**
 * Maps an attachments json to a smaller json (probably not needed)
 * @param msg 
 */
const mapAttachment = (msg) =>{
	const attachments = msg;
	const obj = {
		name : attachments.name,
		url : attachments.url
	}
	console.log(obj.url + " " + obj.name+"  attachements object");
	return obj; 
}

/**
 * Checks to see if a url is to an image
 * @param url url in question
 */
const isImageFile = (url:String)=>{
	
	const type:String =  url.split(".").slice(-1)[0];
	
	console.log("type : " + type);
	return imgTypes.includes(type);

}
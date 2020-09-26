import  Discord from 'discord.js';
import secrets from './secrets.json';

const client = new Discord.Client();
//deepai

import  deepai from 'deepai'; // OR include deepai.min.js as a script tag in your HTML

deepai.setApiKey(secrets.apiToken);

const getImage = async (imgurl, callback:Function) => {
    let resp = await deepai.callStandardApi("toonify", {
            image: imgurl, 	
	});

	callback(resp);
}



//discord bot 
client.on('message', message => {
	console.log(message);
	console.log(message.attachments);

	if (message.content === '!status') {
		message.channel.send('Aasdlive');
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

client.login(secrets.clientToken);


const imgTypes:Array<String> = ["gif", "png", "jpeg", "jpg"];

const mapAttachment = (msg) =>{
	const attachments = msg;
	const obj = {
		name : attachments.name,
		url : attachments.url
	}

	console.log(obj.url + " " + obj.name+"  attachements object");

	return obj; 


}

const isImageFile = (url:String)=>{
	
	const type:String =  url.split(".").slice(-1)[0];
	
	console.log("type : " + type);
	return imgTypes.includes(type);

}
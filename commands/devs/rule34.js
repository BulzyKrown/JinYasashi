const booru = require('booru');
const getBuffer = require('../../utils/getBuffer.js');
module.exports = {
	name: 'rule34',
	aliases: ['r', 'regla', 'r34'],
	cat: 'devs',
	cooldown: 0,
	run: async (bot, msg, args) => {
		var error_post = await booru.search('rule34', ['ahe_gao'], {
			limit: 1,
			random: true
		});
		var buffer_error = await getBuffer(error_post[0].fileUrl);
		var file_error = {
			file: buffer_error,
			name: error_post[0].data.image
		};
		const tags = args.join(' ');
		if (!tags)
			return msg.channel.createMessage("You didn't write your search, dummy");
		const json = await booru.search('rule34', [tags], {
			limit: 1,
			random: true
		});
		let post = json[0];
		if (!post)
			return msg.channel.createMessage(
				"I didn't find any post with your tags, sorry Sir"
			);

		const buffer = await getBuffer(post.fileUrl);
		let att = {
			file: buffer,
			name: post.data.image
		};
		msg.channel
			.createMessage('```' + post.tags.join(' ').slice(0, 2000) + '```', att)
			.catch(err => {
				if (err.code === 40005)
					try {
						msg.channel
							.createMessage(
								'The file is too big, but take, ahegao uwu',
								file_error
							)
							.catch(e => console.log('Dou'));
					} catch (e) {}
			});
	}
};

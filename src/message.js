import showText from "xtt-msg";
import { Reply } from "./db/models/reply.js";

showText.plugins(() => {
	return {
		"qq-当前回复": async () => {
			return await showText.showTextBrowser(`【变量-->>qq-当前回复】`);
		}
	};
});

let keywordMap = await Reply.findAll({
	attributes: ["keyword", "reply", "match"],
	raw: true
});

export const message = async (info) => {
	console.log("message");
	console.log("--------------------");
	console.log(info);

	if (!keywordMap?.length) {
		console.log("keywordMap");
		keywordMap = await Reply.findAll({
			attributes: ["keyword", "reply", "match"],
			raw: true
		});
	}

	if (info.group_id === 754923572) {
		let msg = info.raw_message;
		if (msg?.startsWith("#")) {
			msg = msg.replace("#", "");

			showText.showTextBrowser(`【变量-->>qq-当前回复-->>${msg}】`);

			keywordMap.some((item) => {
				switch (item.match) {
					case 0:
						if (msg === item.keyword) {
							msg = item.reply;
							return true;
						}

						break;
					case 1:
						if (msg.startsWith(item.keyword)) {
							msg = item.reply;
							return true;
						}
						break;
					case 2:
						if (msg.endsWith(item.keyword)) {
							msg = item.reply;
							return true;
						}
						break;
					case 3:
						if (msg.includes(item.keyword)) {
							msg = item.reply;
							return true;
						}
						break;
					case 4:
						if (new RegExp(item.keyword).test(msg)) {
							msg = item.reply;
							return true;
						}
						break;
				}
			});

			showText.showTextBrowser(msg).then((res) => {
				console.log(res);
				info.reply(res);
			});
		}
	}
};

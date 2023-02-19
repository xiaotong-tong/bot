import showText from "xtt-msg";
import { fetchPlugin } from "xtt-msg/plugin-fetch";
import { Reply } from "./db/models/reply.js";
import { segment } from "oicq";

showText.plugins(fetchPlugin);
showText.plugins(({ TextMatch, replaceText }) => {
	return {
		"qq-当前回复": async () => {
			return await showText.showTextBrowser(`【变量-->>qq-当前回复】`);
		},
		"qq-图片": async (text) => {
			const [path] = await TextMatch.doTextMatchList(text);
			if (!path) {
				return "";
			}
			return "<!0>img" + path + "<!0>";
		},
		"qq-换行": async () => {
			return "\n";
		}
	};
});

let getKeywordMap = async () => {
	const keywordMap = await Reply.findAll({
		attributes: ["keyword", "reply", "match", "trigger"],
		order: [["priority", "DESC"]],
		raw: true
	});

	const groupKeywordMap = keywordMap.filter(
		(item) => item.trigger === 1 || item.trigger === 0
	);
	const privateKeywordMap = keywordMap.filter(
		(item) => item.trigger === 2 || item.trigger === 0
	);

	getKeywordMap = () => {
		return {
			keywordMap,
			groupKeywordMap,
			privateKeywordMap
		};
	};
	return {
		keywordMap,
		groupKeywordMap,
		privateKeywordMap
	};
};

export const message = async (info) => {
	console.log("message");
	console.log("--------------------");
	console.log(info);

	if (info.group_id === 754923572) {
		let msg = info.raw_message;
		if (msg?.startsWith("#")) {
			msg = msg.replace("#", "");

			showText.showTextBrowser(`【变量-->>qq-当前回复-->>${msg}】`);

			const isMatched = (await getKeywordMap()).groupKeywordMap.some((item) => {
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

			if (!isMatched) {
				return;
			}

			showText.showTextBrowser(msg).then((res) => {
				console.log(res);
				if (res.includes("<!0>")) {
					res = res.split("<!0>").map((item) => {
						if (item.startsWith("img")) {
							item = item.replace("img", "");
							return segment.image(item);
						}
						return item;
					});
				}
				if (!res) {
					return;
				}
				info.reply(res);
			});
		}
	} else if (info.message_type === "private") {
		let msg = info.raw_message;

		showText.showTextBrowser(`【变量-->>qq-当前回复-->>${msg}】`);

		const isMatched = (await getKeywordMap()).privateKeywordMap.some((item) => {
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

		if (!isMatched) {
			return;
		}

		showText.showTextBrowser(msg).then((res) => {
			console.log(res);
			if (res.includes("<!0>")) {
				res = res.split("<!0>").map((item) => {
					if (item.startsWith("img")) {
						item = item.replace("img", "");
						return segment.image(item);
					}
					return item;
				});
			}

			if (!res) {
				return;
			}
			info.reply(res);
		});
	}
};

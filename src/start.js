import { createClient } from "oicq";
import { message } from "./message.js";
const account = 2848312752;

export class QQRobot {
	static client = null;

	static {
		this.client = createClient(account);
		this.client
			.on("system.login.qrcode", function (e) {
				//扫码后按回车登录
				process.stdin.once("data", () => {
					this.login();
				});
			})
			.login();

		this.client.on("message", message);
	}
}

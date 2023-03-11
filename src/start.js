import { createClient } from "icqq";
import { message } from "./message.js";
const account = 2848312752;

export class QQRobot {
	static client = null;

	static {
		this.client = createClient({
			platform: 3
		});

		// this.client.on("system.login.slider", (e) => {
		// 	console.log("输入滑块地址获取的ticket后继续。\n滑块地址:    " + e.url);
		// 	process.stdin.once("data", (data) => {
		// 		this.client.submitSlider(data.toString().trim());
		// 	});
		// });

		this.client
			.on("system.login.qrcode", (e) => {
				console.log("扫码完成后回车继续:    ");
				process.stdin.once("data", () => {
					this.client.login();
				});
			})
			.login();

		// this.client.on("system.login.device", (e) => {
		// 	console.log("请选择验证方式:(1：短信验证   其他：扫码验证)");
		// 	process.stdin.once("data", (data) => {
		// 		if (data.toString().trim() === "1") {
		// 			this.client.sendSmsCode();
		// 			console.log("请输入手机收到的短信验证码:");
		// 			process.stdin.once("data", (res) => {
		// 				client.submitSmsCode(res.toString().trim());
		// 			});
		// 		} else {
		// 			console.log("扫码完成后回车继续：" + e.url);
		// 			process.stdin.once("data", () => {
		// 				this.client.login();
		// 			});
		// 		}
		// 	});
		// });

		// this.client.login(account, password);

		this.client.on("message", message);
	}
}

import { createReplyCurry } from "../addreply.js";

const keyword = "/添加回复";
const reply = `请输入关键字：
【输入流】
【添加回复-->>【变量-->>输入流】】
请输入回复内容：
【输入流】
【添加回复-->>【变量-->>输入流】】
请输入匹配方式：【qq-换行】
0 完全匹配【qq-换行】
1 前缀匹配【qq-换行】
2 后缀匹配【qq-换行】
3 包含匹配【qq-换行】
4 正则匹配【qq-换行】
请输入数字序号
【输入流】
【添加回复-->>【变量-->>输入流】】
请输入触发方式：【qq-换行】
0 无限制【qq-换行】
1 群聊【qq-换行】
2 私聊【qq-换行】
请输入数字序号
【输入流】
【添加回复-->>【变量-->>输入流】】
`;
const match = 0;
const trigger = 0;

createReplyCurry(keyword)(reply)(match)(trigger);

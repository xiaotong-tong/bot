import { Sequelize } from "sequelize";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: path.join(__dirname, "../../storage/reply.sqlite")
});

try {
	await sequelize.authenticate();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

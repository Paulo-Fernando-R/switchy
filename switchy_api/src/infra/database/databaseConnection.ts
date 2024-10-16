import { MongoClient } from "mongodb";

export default class DatabaseConnection {
    private readonly url: string;
    private readonly client: MongoClient;
    private readonly _dbName: string;
    constructor() {
        this.url = process.env.DB_URL!;
        this.client = new MongoClient(this.url, { family: 4 });
        this._dbName = process.env.DB_NAME!;
    }

    async connect() {
        const connection = await this.client.connect();
        if (connection) {
            console.log("Connected successfully to server");
            return this.client;
        }

        console.log("Could not connect to database");
        throw new Error("Could not connect to database");
    }

    async disconnect() {
        await this.client.close();
    }

    get dbName() {
        return this._dbName;
    }
}

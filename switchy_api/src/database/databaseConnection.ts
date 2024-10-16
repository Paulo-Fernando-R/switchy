import { Error, connect } from "mongoose";

export default class DatabaseConnection {
    private readonly url: string;

    private readonly _dbName: string;
    constructor() {
        this.url = process.env.DB_URL!;

        this._dbName = process.env.DB_NAME!;
    }

    async connect() {
        try {
            await connect(this.url, { family: 4, dbName: this._dbName});
            console.warn("Connected to MongoDB");
        } catch (error) {
            throw new Error(`Cannot connect to database: ${error}`);
        }
    }

    get dbName() {
        return this._dbName;
    }
}

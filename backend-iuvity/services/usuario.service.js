const MongoLib = require("../lib/mongo");
const { ObjectId } = require("mongodb");

class UsuarioService {
    constructor() {
        this.collection = 'usuario';
        this.mongoDB = new MongoLib();
    }
    
    async find(query={}) {
        const result = await this.mongoDB.find(this.collection, query);
        return result;
    }
    async get(id) {
        const result = await this.mongoDB.get(this.collection,id);
        return result;
    }
    async create(user) {
        const result = await this.mongoDB.create(this.collection, user);
        return result;
    }
    async updateOne(id,user) {
        const result = await this.mongoDB.updateOne(this.collection, id, user);
        return result;
    }
    async deleteOne(id) {
        const result = await this.mongoDB.deleteOne(this.collection, id);
        return result;
    }
    async delete(query) {
        const result = await this.mongoDB.delete(this.collection, query);
        return result;
    }
    async deleteMany(query) {
        const result = await this.mongoDB.deleteMany(this.collection, query);
        return result;
    }

}

module.exports = UsuarioService;

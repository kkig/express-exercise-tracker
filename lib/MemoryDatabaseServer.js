const {MongoMemoryServer} = require('mongodb-memory-server');

class MemoryDatabaseServer {
  constructor() {
    this.mongod = new MongoMemoryServer();
  }

  async start() {
    return await this.mongod.create();
  }

  async stop() {
    return await this.mongod.stop();
  }

  async getConnectionString() {
    return await this.mongod.getUri();
  }
}

module.exports = new MemoryDatabaseServer();

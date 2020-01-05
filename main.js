const SHA256 = require("crypto-js/sha256")

class Block {
    constructor(index, timestamp, data, prevHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = "";
    }

    calculateHash() {

    }
}
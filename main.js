const SHA256 = require("crypto-js/sha256")

class Block {
    constructor(index, timestamp, data, prevHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock];
    }
    createGenesisBlock() {
        return new Block(0, "01/01/2020", "Genesis Block", "0")
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.prevHash !== previousBlock.hash) {
                return false;
            }
        }
        return true
    }
}

let moeCoin = new Blockchain();
moeCoin.addBlock(new Block(1, "02/01/2020", { amount: 10000 }))
moeCoin.addBlock(new Block(2, "02/01/2020", { amount: 100 }))
moeCoin.addBlock(new Block(3, "04/01/2020", { amount: 999 }))

// console.log(JSON.stringify(moeCoin, null, 4))

console.log("Is Block chain valid?", moeCoin.isChainValid())

moeCoin.chain[1].data = { amount: 3001 }

console.log("Is Block chain valid?", moeCoin.isChainValid())

class Block {
    constructor(index, data, previousHash = '') {
        this.index = index;
        this.timestamp = new Date().toLocaleString();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return CryptoJS.SHA256(
            this.index +
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.data)
        ).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let blockchain = new Blockchain();

function addBlock() {
    const dataInput = document.getElementById("blockData");
    const data = dataInput.value.trim();

    if (data === "") {
        alert("Please enter data for the block.");
        return;
    }

    const newBlock = new Block(blockchain.chain.length, data);
    blockchain.addBlock(newBlock);
    dataInput.value = "";
    displayChain();
}

function displayChain() {
    const chainDiv = document.getElementById("chain");
    chainDiv.innerHTML = '';

    blockchain.chain.forEach(block => {
        const blockDiv = document.createElement('div');
        blockDiv.className = 'block';
        blockDiv.innerHTML = `
      <pre>
Index: ${block.index}
Timestamp: ${block.timestamp}
Data: ${block.data}
Previous Hash: ${block.previousHash}
Hash: ${block.hash}
      </pre>
    `;
        chainDiv.appendChild(blockDiv);
    });
}

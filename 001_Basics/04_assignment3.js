const crypto = require("crypto");

function findHashWithPrefix(prefix) {
  let input = 0;

  while (true) {
    let inputStr =
      `
    Xyrix => Bixl | Rs 100
    XZY => ABC | Rs 10
` + input.toString();
    let hash = crypto.createHash("sha256").update(inputStr).digest("hex");
    if (hash.startsWith(prefix)) {
      return {
        input: inputStr,
        hash: hash,
      };
    }
    input++;
  }
}

const result = findHashWithPrefix("00000");
console.log(`Input: ${result.input}`);
console.log(`Hash: ${result.hash}`);

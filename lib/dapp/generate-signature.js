export default function GenerateSignature(payload) {
    const crypto = require("crypto");
    const data = JSON.stringify(payload);
    const privateKeyBuffer = Buffer.from(process.env.DAPP_SECRET, "base64");
    const privateKeyObject = crypto.createPrivateKey(privateKeyBuffer);
    const signature = crypto.sign(null, Buffer.from(data), privateKeyObject);
    return signature.toString("base64");
}

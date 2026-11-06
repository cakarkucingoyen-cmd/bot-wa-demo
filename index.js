const express = require('express');
const { default: makeWASocket } = require("@whiskeysockets/baileys");
const app = express();
app.use(express.json());
app.use(express.static('public'));

let sock;
let pairCode = "";
const ADMIN_PASS = "owner12345";
let ownerNumber = "";

async function startBot() {
  sock = makeWASocket({ printQRInTerminal: false });
  sock.ev.on("connection.update", async (update) => {
    if(update.qr) console.log("QR ada");
    if(update.pairingCode) pairCode = update.pairingCode;
  });
}
startBot();

app.get("/get‑pair", async (req, res) => {
  res.json({ code: pairCode||"Belum ada kode" });
});

app.post("/set‑owner", async (req, res) => {
  const { pass, no } = req.body;
  if(pass !== ADMIN_PASS) return res.json({status:"gagal","pesan":"Kode admin salah"});
  ownerNumber = no;
  res.json({status:"berhasil", pesan:"Nomor owner disimpan: "+ownerNumber});
});

const port = process.env.PORT||3000;
app.listen(port, ()=>console.log("Jalankan di port "+port));
  

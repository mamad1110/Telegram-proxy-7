// --- Telegram Reverse Proxy ---
// کاملاً سازگار برای POST و GET و ارسال پیام ربات

import express from "express";
import request from "request";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// مسیر اصلی پروکسی
app.use("/telegram", (req, res) => {
    const tgUrl = `https://api.telegram.org${req.url}`;

    req.pipe(request({
        url: tgUrl,
        method: req.method,
        qs: req.query,
        headers: { "Content-Type": req.headers["content-type"] }
    })).pipe(res);
});

app.get("/", (req, res) => {
    res.send("🔥 Telegram Proxy Active!");
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`🚀 Telegram Proxy running on ${port}`));

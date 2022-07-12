const message = (msg, status, data, res) => {
    let messages = {
        msg: msg,
        data: data
    };

    res.setHeader("Content-Type", "application/json");
    res.statusCode = status;
    res.json(messages);
};

module.exports = message;
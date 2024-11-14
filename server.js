const { timeStamp } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/images', (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const log = `IP: ${ip}, Imagen: ${req.url}, Fecha: ${new Date().toISOString()}\n`;

    fs.appendFile('access.log', log, (err) => {
        if (err){
            console.error('Error al guardar el log; ',err);
        }
    });
    console.log(log)
    next();
});

app.use('/images', express.static(path.join(__dirname,'images')));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})
const express = require('express');
const path = require('path');


const app = express();


app.use(express.static(path.join(__dirname, 'dist')));



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(process.env.WEB_PORT || 9000, () => {
    console.log("App launched on : \n- http://localhost:" + (process.env.WEB_PORT || 9000));

});

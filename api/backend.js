const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');


const app = express();
// const upload = multer({ dest: 'uploads/' });

//cors optimisation
// app.arguments(cors({ origin: '*'}));
// app.arguments(cors({ origin: '*' }));

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage

}).single('image'); 

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Ensure the file is uploaded
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Process the image using sharp
    const resizedImageBuffer = await sharp(req.file.buffer)
      .resize(442, 492)
      .toBuffer();

    // Set the response type and send the resized image
    res.set('Content-Type', 'image/png');
    res.send(resizedImageBuffer);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error processing image.');
  }
});
  
//   app.listen(3000, () => {
//     console.log('Server is running on port 3000');
//   });

module.exports = app;
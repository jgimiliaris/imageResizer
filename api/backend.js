const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');


const app = express();
// const upload = multer({ dest: 'uploads/' });

//cors optimisation
app.arguments(cors({ origin: '*'}));

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,

}).single('image');

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
      // const imagePath = req.file.path;
      // const outputPath = path.join('resized', `${Date.now()}_resized.png`);
      // console.log('debug1-enteredtheapp');
  
      // await sharp(imagePath)
      //   .resize(442, 492)
      //   .toFile(outputPath);

      //   console.log('debug2-enteredtheapp');
  
      // fs.unlinkSync(imagePath); // Remove the original file to save space
  
      // res.download(outputPath, (err) => {
      //   if (!err) fs.unlinkSync(outputPath); // Clean up after download

      //   console.log('debug3-noerror');
      // });

      console.log('hehehehehehehehehehehehe');

      const resizedImageBuffer = await sharp(req.file.buffer).resize(442, 492).toBuffer();
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
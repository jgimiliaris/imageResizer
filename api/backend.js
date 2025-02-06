const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const busboy = require('busboy');

const app = express();
// const upload = multer({ dest: 'uploads/' });

//cors optimisation
// app.arguments(cors({ origin: '*'}));
// app.arguments(cors({ origin: '*' }));

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage

}).single('image'); 

// const bus

app.post('/upload', (req, res) => {
  const bb = busboy({ headers: req.headers });
  let imageBuffer = Buffer.alloc(0);

  bb.on('file', (fieldname, file) => {
    file.on('data', (data) => {
      imageBuffer = Buffer.concat([imageBuffer, data]);
    });

    file.on('end', async () => {
      try {
        const resizedImageBuffer = await sharp(imageBuffer)
          .resize(442, 492)
          .toBuffer();

        res.set('Content-Type', 'image/png');
        res.send(resizedImageBuffer);
      } catch (error) {
        console.error('Error resizing image:', error);
        res.status(500).send('Error processing image.');
      }
    });
  });

  bb.on('error', (err) => {
    console.error('Busboy error:', err);
    res.status(500).send('File upload failed.');
  });

  req.pipe(bb);
});
//     })
//   })
//  } catch (error) {
//     console.log(error);
//     res.status(500).send('Error processing image.');
//   }
// });
  
//   app.listen(3000, () => {
//     console.log('Server is running on port 3000');
//   });

module.exports = app;
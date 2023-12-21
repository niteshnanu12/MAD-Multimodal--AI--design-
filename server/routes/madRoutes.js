import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI  from 'openai';

dotenv.config();

const router = express.Router();


const openai = new OpenAI({
    apikey: "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"
});

router.route('/').post(async (req, res) => {
  const { prompt } = req.body;
  try {
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt    
    });
    const url = image.data[0].url;    
    //const url='https://www.cameraegg.org/wp-content/uploads/2016/01/Nikon-D500-Sample-Images-2.jpg';
    res.status(200).json({ photo: url });
   
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.image.error.message || 'Something went wrong');
  }
});

export default router;

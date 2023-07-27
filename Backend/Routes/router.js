import express from 'express';
import {nanoid} from 'nanoid';
import Url from '../models/modelUrl.js';
import validateUrl from '../utils/utils.js';

const AppRouter = express.Router();

// Short URL Generator
AppRouter.post('/short', async (req, res) => {
  const { origUrl } = req.body.body;
  const base = process.env.BASE;

  const urlId = nanoid();
  if (validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  } else {
    res.status(400).json('Invalid Original Url');
  }
});


AppRouter.get('/:urlId', async (req, res) => {
    try {
      //console.log(req.params);
      console.log(req.params.urlId)
      const url = await Url.findOne({ urlId: req.params.urlId });
      console.log(url);
      if (url) {
        await Url.updateOne(
          {
            urlId: req.params.urlId,
          },
          { $inc: { clicks: 1 } }
        );
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.redirect(url.origUrl);
      } else res.status(404).json('Not found');
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  });
  

export default AppRouter;
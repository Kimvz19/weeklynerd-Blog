// ⭐️ IMPORTS ⭐️ //
import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

// ⭐️ LIQUID SETUP ⭐️ //
const engine = new Liquid({ extname: '.liquid' });
const app = new App();

// ⭐️ Middleware om path door te geven aan templates
app.use((req, _, next) => {
  req.templateData = {
    path: req.path
  };
  next();
});

// ⭐️ LIQUID TEMPLATE RENDERING ⭐️ //
const renderTemplate = (template, data = {}, req = {}) => {
  return engine.renderFileSync(template, {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...req.templateData,
    ...data
  });
};

// ⭐ ROUTES ⭐ //

app.get('/', async (req, res) => {
  try {
    res.send(renderTemplate('server/views/index.liquid', {
      title: 'home'
    }, req));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading homepage');
  }
});

app.get('/subjects-overview', async (req, res) => {
  try {
    res.send(renderTemplate('server/views/subjects-overview.liquid', {
      title: 'subjects overview'
    }, req));
  } catch (err) {
    console.error(err);
    res.status(500).send('subjects page kon niet laden');
  }
});

app.get('/weeklynerd-overview', async (req, res) => {
  try {
    res.send(renderTemplate('server/views/weeklynerd-overview.liquid', {
      title: 'weeklynerd overview'
    }, req));
  } catch (err) {
    console.error(err);
    res.status(500).send('weeklynerd page kon niet laden');
  }
});

app.get('/meesterproef', async (req, res) => {
  try {
    res.send(renderTemplate('server/views/meesterproef.liquid', {
      title: 'meesterproef'
    }, req));
  } catch (err) {
    console.error(err);
    res.status(500).send('meesterproef kon niet laden');
  }
});

app.get('/hackathon', async (req, res) => {
  try {
    res.send(renderTemplate('server/views/hackathon.liquid', {
      title: 'hackathon'
    }, req));
  } catch (err) {
    console.error(err);
    res.status(500).send('hackathon kon niet laden');
  }
});


// Projects work

app.get('/project-tapchat', async (req, res) => {
  try {
    res.send(renderTemplate('server/views/project-tapchat.liquid', {
      title: 'Tapchat'
    }, req));
  } catch (err) {
    console.error(err);
    res.status(500).send('Tapchat kon niet laden');
  }
});





// ⭐ STATIC FILES & SERVER START ⭐ //
app
  .use(logger())
  .use('/', sirv(process.env.NODE_ENV === 'development' ? 'client' : 'dist'))
  .use('/assets', sirv('assets'))
  .listen(3000, () => console.log('Server running at http://localhost:3000'));

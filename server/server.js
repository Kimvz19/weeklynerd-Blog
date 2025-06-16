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

app.get('/projects-overview', async (req, res) => {
  try {
    res.send(renderTemplate('server/views/projects-overview.liquid', {
      title: 'projects overview'
    }, req));
  } catch (err) {
    console.error(err);
    res.status(500).send('projects page kon niet laden');
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

app.get('/reflection', async (req, res) => {
  try {
    res.send(renderTemplate('server/views/projects/reflection.liquid', {
      title: 'reflection'
    }, req));
  } catch (err) {
    console.error(err);
    res.status(500).send('Reflection page kon niet laden');
  }
});


// Weekly nerds routes
const speakerRoute = (path, file, title) => {
  app.get(path, async (req, res) => {
    try {
      res.send(renderTemplate(`server/views/weeklynerds/${file}.liquid`, {
        title: title
      }, req));

    } catch (err) {
      console.error(err);
      res.status(500).send(`${title} kon niet laden`);
    }
  });
};

// Routes voor alle sprekers
speakerRoute('/speaker-kilian', 'speaker-kilian', 'Kilian');
speakerRoute('/speaker-peter-paul-koch', 'speaker-peter-paul-koch', 'Peter Paul Koch');
speakerRoute('/speaker-nils', 'speaker-nils', 'Nils Binder');
speakerRoute('/speaker-nienke', 'speaker-nienke', 'Nienke de Keijzer');
speakerRoute('/speaker-roel', 'speaker-roel', 'Roel Nieskens');
speakerRoute('/speaker-cassie', 'speaker-cassie', 'Cassie Evans');
speakerRoute('/speaker-krijn', 'speaker-krijn', 'Krijn');
speakerRoute('/speaker-jeremy', 'speaker-jeremy', 'Jeremy Keith');
speakerRoute('/speaker-julia', 'speaker-julia', 'Julia Miocene');
speakerRoute('/speaker-declan', 'speaker-declan', 'Declan');
speakerRoute('/speaker-cyd', 'speaker-cyd', 'Cyd');
speakerRoute('/speaker-rosa', 'speaker-rosa', 'Rosa');
speakerRoute('/speaker-niels', 'speaker-niels', 'Niels Leenheer');
speakerRoute('/speaker-iq', 'speaker-iq', 'Io Digital');
speakerRoute('/speaker-q42', 'speaker-q42', 'Q42');
speakerRoute('/speaker-marieke', 'speaker-marieke', 'Marieke');
speakerRoute('/speaker-miriam', 'speaker-miriam', 'Miriam');






// ⭐ STATIC FILES & SERVER START ⭐ //
app
  .use(logger())
  .use('/', sirv(process.env.NODE_ENV === 'development' ? 'client' : 'dist'))
  .use('/assets', sirv('assets'))
  .listen(3000, () => console.log('Server running at http://localhost:3000'));

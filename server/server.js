

// ⭐️ IMPORTS ⭐️ //
import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

// Imports for data opslaan & vewerken
// import bodyParser from 'body-parser';
// import { LocalStorage } from 'node-localstorage';

// ⭐️ LIQUID SETUP ⭐️ //
const engine = new Liquid({ extname: '.liquid' });
const app = new App();

//mapje wordt aangemaakt in de root van het project
// hierin wordt de favoriten data opgeslagen
// const localStorage = new LocalStorage('./scratch');

//  verwerkt post requests
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))


// ⭐️ variables ⭐️//



// ⭐️ LIQUID TEMPLATE RENDERING ⭐️ //
const renderTemplate = (template, data) => {
  // renderdata samenstellen
  return engine.renderFileSync(template, {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  });
};



// ⭐ Home page
app.get('/', async (req, res) => {
  try {
    res.send(renderTemplate('server/views/index.liquid', {
      title: 'home'
    }));

    //fout melding 
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading homepage');
  }
});


// ⭐ subjects overview
app.get('/subjects-overview', async (req, res) => {
  try {
     // data + geo gegevens renderen
    res.send(renderTemplate('server/views/subjects-overview.liquid', {
      title: 'subjects overview',
    }));

    //fout melding 
  } catch (err) {
    console.error(err);
    res.status(500).send('about me pagina kon niet laden');
  }
});

// ⭐ weekly nerd overview page
app.get('/weeklynerd-overview', async (req, res) => {

  res.send(renderTemplate('server/views/weeklynerd-overview.liquid', {
    title: 'weeklynerd overview',
  }));
});

// ⭐ meesterproef page
app.get('/meesterproef', async (req, res) => {

  res.send(renderTemplate('server/views/meesterproef.liquid', {
    title: 'meesterproef',
  }));
});

// ⭐ hackathon page
app.get('/hackathon', async (req, res) => {

  res.send(renderTemplate('server/views/hackathon.liquid', {
    title: 'hackathon',
  }));
});


// ⭐ Favorite POST ⭐ //
// app.post('/favorite', (req, res) => {
//   const animalId = req.body.animalId;
//   if (!animalId) return res.status(400).send('Geen dier ID');

//   let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');


//   if (favorites.includes(animalId)) {
//     favorites = favorites.filter(id => id !== animalId);

//   } else {
//     favorites.push(animalId);
//   }

//   localStorage.setItem('favorites', JSON.stringify(favorites));
//   res.redirect(req.headers.referer || '/');
// });



// const PORT = process.env.PORT || 3000;
// // 🔊 SERVER START

app
  .use(logger())
  .use('/', sirv(process.env.NODE_ENV === 'development' ? 'client' : 'dist'))
  .use('/assets', sirv('assets'))
  .listen(3000, () => console.log('Server running at http://localhost:3000'));
  // .listen(PORT, () => console.log(`Listening on ${PORT}`));

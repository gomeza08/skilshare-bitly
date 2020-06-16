const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "style.css");
});

app.get('/index.js', function(req, res) {
  res.sendFile(__dirname + "/" + "index.js");
});

app.use('/', router);
app.listen(process.env.port || 3000);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/shorten', (req, res) => {
  let shortenString = req.query.s;
  if(shortenString) {
    res.send(parseSentence(shortenString));
  } else {
    res.send('Nothing to shorten');
  }
})

app.get('/redirect/:redirectString', (req, res) => {
  let redirectString = req.params['redirectString'];
  if(redirectString && redirectMap[redirectString]) {
    redirectMap[redirectString].count ++;
    let redirectTarget = redirectMap[redirectString].redirectUrl;
    if(redirectTarget.indexOf('http') != 0) {
      redirectTarget = "https://"+ redirectTarget;
    }
    res.redirect(redirectTarget);
  } else {
    res.status(404).send('no shortened URL with that ID');
  }
})

app.get('/info/:redirectString', (req, res) => {
  let redirectString = req.params['redirectString'];
  if(redirectString && redirectMap[redirectString]) {
    res.send(redirectMap[redirectString]);
  } else {
    res.status(422).send('no shortened URL with that ID');
  }
})

let redirectMap = {};

function parseSentence(sentence) {
  let sentArr = sentence.split(' ');
  let sentence = "";
  let ids = [];
  for (let i = 0; i < sentArr.length; i++) {
    let currentWord = sentArr[i];
    if (validURL(currentWord)) {
      let trackerInfo = shortenUrl(currentWord);
      sentence += ' ' + trackerInfo.link;
      ids.push(trackerInfo.id);

    } else {
      sentence += ' ' + currentWord;
    }

  }

  return { sentence: result.trim(),
          ids: ids};
}

function shortenUrl(url) {
  let id = makeId();
  redirectMap[id] = {
    count: 0,
    redirectUrl: url
  };
  console.log(redirectMap);
  return { link : '<a href="http://127.0.0.1:3000/redirect/' + id + '">' + url + '</a>',
            id: id };
}

function makeId() {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 10; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  if(typeof redirectMap[result] !== 'undefined') {
    return makeId();
  } else {
    return result;
  }
}

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}
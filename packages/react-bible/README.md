# react-bible

An in memory Bible with as you type search and a verse list.

Try it here:

https://omysoul.github.io/omysoul/react-bible/

## Features

* As-you-type searching of Bible
* English and Chinese Bibles
* Works offline using service worker
* Peek around - click any verse returned by a search then use cursor keys to reveal verses before and after
* Verse lists are stored on the URL. Copy and Paste, email or tweet URL to a friend.

## Videos

* [RegExcellent](https://www.youtube.com/channel/UC4cxldtlfoKXcprllu6-EXg) (tech talk)
* [User Guide](https://www.youtube.com/watch?v=95KgkVCHmok)

## Run DevServer

```
git clone git@github.com:omysoul/omysoul.git
cd omysoul
npm install
cd packages/react-bible
npm install
npm start
```

[http://localhost:3000/examples/](http://localhost:3000/examples/)

## Npm package

```bash
npm install --save-dev @omysoul/react-bible
```

This package contains components related to searching the Bible and displaying returned verses as well a maintaining a verse list.  

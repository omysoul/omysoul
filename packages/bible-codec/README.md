# Bible Codec

This is the codec used to translate between JSON and txt bible formats. The JSON format is:

```javascript
type Verse = {n: number, txt: string}
type Chapter = Array<Verse>
type Book = Array<Chapter>
type Bible = Array<Book>

[
  [
    {"n": 1, "txt": },
    ...
  ],
  ...
]
```

The txt format has the following separators:

* book: `|||`
* chapter: `||`
* verse: `verse no|verse text`

```
1|In the beginning God created the heaven and the earth.2|And the earth was ...||1|Thus the heavens and the earth were finished, and all the host of them.2|And on the seventh day God ended ...26|So Joseph died, being an hundred and ten years old: and they embalmed him, and he was put in a coffin in Egypt.|||1|Now these are the names of the children of Israel, which came into Egypt;
```

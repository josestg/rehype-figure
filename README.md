# rehype-figure

[![Build Status](https://travis-ci.com/josestg/rehype-figure.svg?token=1ZtvVXXQrZXVL8domfez&branch=master)](https://travis-ci.com/josestg/rehype-figure)
![license](https://badgen.net/github/license/josestg/rehype-figure)
![release](https://badgen.net/github/release/josestg/rehype-figure)
![npm](https://badgen.net/npm/v/rehype-figure)

[rehype](https://github.com/rehypejs/rehype) plugins to support figure and caption!

## Install

```shell
npm install rehype-figure

or

yarn add rehype-figure
```

## Use

**Markdown:**

```md
# Images

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua

![This is a caption and image alt property](https://img.id/dog.png)
![These two images will be children 'rehype-container'](https://img.id/cat.png)

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua

![These two images will be children 'rehype-container'](https://img.id/cat.png)
```

**rehype-figure:**

```js
const unified = require("unified")
const remark = require("remark-parse")
const remark2rehype = require("remark-rehype")
const stringify = require("rehype-stringify")
const assert = require("assert")
const vfile = require("to-vfile")

const rehypeFigure = require("rehype-figure")

function compile(filename) {
  return unified()
    .use(remark)
    .use(remark2rehype)
    .use(rehypeFigure, { className: "my-figure" })
    .use(stringify)
    .processSync(vfile.readSync("./__example__/" + filename))
    .toString()
}
```

**Yields:**

```html
<h1>Images</h1>
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua
</p>
<div class="my-figure-container">
  <figure class="my-figure">
    <img
      src="https://img.id/dog.png"
      alt="This is a caption and image alt property"
    />
    <figcaption>This is a caption and image alt property</figcaption>
  </figure>
  <figure class="my-figure">
    <img
      src="https://img.id/cat.png"
      alt="These two images will be children &#x27;rehype-container&#x27;"
    />
    <figcaption>
      These two images will be children 'rehype-container'
    </figcaption>
  </figure>
</div>
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua
</p>
<figure class="my-figure">
  <img
    src="https://img.id/cat.png"
    alt="These two images will be children &#x27;rehype-container&#x27;"
  />
  <figcaption>These two images will be children 'rehype-container'</figcaption>
</figure>
```

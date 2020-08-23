const unified = require("unified")
const remark = require("remark-parse")
const remark2rehype = require("remark-rehype")
const stringify = require("rehype-stringify")
const rehypeFigure = require("./index")
const assert = require("assert")
const vfile = require("to-vfile")

function compile(file, opt) {
  return unified()
    .use(remark)
    .use(remark2rehype)
    .use(rehypeFigure, opt)
    .use(stringify)
    .processSync(vfile.readSync("./__example__/" + file))
    .toString()
}

describe("Parse markdown to HTML", () => {
  it("two or more images consecutively should be wrapped with 'div'.", () => {
    const want = `<div class="rehype-figure-container"><figure class="rehype-figure"><img src="https://img.id/dog.png" alt="This is a caption and image alt property"><figcaption>This is a caption and image alt property</figcaption></figure><figure class="rehype-figure"><img src="https://img.id/cat.png" alt="This thow images will be children of &#x27;rehype-container&#x27;"><figcaption>This thow images will be children of 'rehype-container'</figcaption></figure></div>`
    const got = compile("1.md")
    assert.equal(want, got)
  })

  it("Should be unwrapped with 'div'.", () => {
    const want = `<figure class="rehype-figure"><img src="https://img.id/dog.png" alt="This is a caption and image alt property"><figcaption>This is a caption and image alt property</figcaption></figure>\n<figure class="rehype-figure"><img src="https://img.id/cat.png" alt="This thow images will be children of &#x27;rehype-container&#x27;"><figcaption>This thow images will be children of 'rehype-container'</figcaption></figure>`
    const got = compile("2.md")
    assert.equal(want, got)
  })

  it("Custom className: Wrapped", () => {
    const got = compile("1.md", { className: "my-className" })
    const hasClassName = got.match(/class="my-className"/) !== null
    const hasContainer = got.match(/class="my-className-container"/) !== null
    assert.ok(hasClassName && hasContainer)
  })

  it("Custom className: Unwrapped", () => {
    const got = compile("2.md", { className: "my-className" })
    const hasClassName = got.match(/class="my-className"/) !== null
    assert.ok(hasClassName)
  })

  it("No caption", () => {
    const got = compile("4.md")
    assert.ok(got.match(/<figcaption>/) === null)
  })

  it("Example", () => {
    const got = compile("5.md")
    const want = `<h1>Images</h1>\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>\n<div class="rehype-figure-container"><figure class="rehype-figure"><img src="https://img.id/dog.png" alt="This is a caption and image alt property"><figcaption>This is a caption and image alt property</figcaption></figure><figure class="rehype-figure"><img src="https://img.id/cat.png" alt="This thow images will be children of &#x27;rehype-container&#x27;"><figcaption>This thow images will be children of 'rehype-container'</figcaption></figure></div>\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>\n<figure class="rehype-figure"><img src="https://img.id/cat.png" alt="This thow images will be children of &#x27;rehype-container&#x27;"><figcaption>This thow images will be children of 'rehype-container'</figcaption></figure>`

    assert.equal(got, want)
  })
})

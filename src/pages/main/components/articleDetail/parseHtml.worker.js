import Marked from "marked"
import hljs from "highlight.js"

Marked.setOptions({
  renderer: new Marked.Renderer(),
  gfm: true,
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  },
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true
});
self.addEventListener('message', function(e) {
  self.postMessage(Marked(e.data))
})

self.addEventListener('error', function(e) {
  self.postMessage(null)
})

var css = require('css');
var uuid = require('uuid');

var styles = css.parse(`
section.chapter {
  margin: 0;
  padding: 0;
  font-size: 11pt;
  line-height: 1.5;
}
body {
  counter-reset: chapter;
}
section.chapter .chapter-number {
  string-set: ChapterNumber content();
}

section.chapter .chapter-number {
  hyphens: none;
  font-family: "Archivo Narrow", serif;
  text-transform: uppercase !important;
  font-weight: 700;
  font-style: normal;
  font-size: 15pt;
  letter-spacing: 0.01em;
  color: white;
  text-align: center;
  background-color: black;
  width: 100%;
  height: 30px;
  margin-top: 20%;
  content: "Chapter "string(ChapterNumber);
}
section.chapter .chapter-title {
  hyphens: none;
  font-family: "EB Garamond", serif;
  font-weight: 400;
  font-size: 18pt;
  line-height: 24pt;
  letter-spacing: 0.05em;
  text-align: center;
  margin-top: 30px;
}
section.chapter .chapter-subtitle {
  hyphens: none;
  font-family: "EB Garamond", serif;
  font-weight: 300;
  font-style: italic;
  font-size: 16pt;
  line-height: 24pt;
  letter-spacing: 0.05em;
  text-align: center;
  margin-top: 15px;
}
section.chapter .chapter-author {
  hyphens: none;
  font-family: "EB Garamond", serif;
  font-weight: 300;
  font-size: 11pt;
  line-height: 21pt;
  text-transform: uppercase !important;
  letter-spacing: 0.06em;
  text-align: center;
  margin-top: 3.5em;
}
section.chapter .chapter-blockquote {
  font-size: 9pt;
  font-style: italic;
  margin: 3.5em 10% 5px 10%;
  padding-left: 1em;
}
section.chapter .chapter-blockquote-author {
  font-size: 8pt;
  text-align: right;
  padding-right: 1.6em;
}
section.chapter .chapter-content {
  margin: auto;
}
section.chapter .chapter-content p:first-of-type::first-letter {
  font-size: 3em;
  float: left;
  line-height: 1;
  margin: 0;
  padding: 0;
}
section.chapter .chapter-content h1{
  hyphens: none;
  font-family: "EB Garamond", serif;
  font-weight: bold;
  font-size: 10pt;
  text-indent: 0;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 8pt;
  text-align: left;
  page-break-after: avoid;
}

.weird-page chap:right .weird-top {
  content: string(Booktitle) " \a0 \a0 – \a0 \a0 " counter(page);
  font-size: 9pt;
  line-height: 1;
  font-family: "Archivo Narrow", serif;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing:.1em;
  text-align: right;
  vertical-align: top;
  margin: .5in 0 auto 0;
  padding: 0;

}

.weird-page chap:right .weird-bottom {
color:black;
float:outside;
margin: 'auto 0 0.5in 0';
content:"| " counter(page) " |";
padding:0;
font-size:9pt;
text-align:right;
font-family:"Archivo Narrow", serif;
font-weight:bold;
line-height:1;
vertical-align:bottom;
}

section.chapter .chapter-content h2{
  hyphens: none;
  font-family: "EB Garamond", serif;
  font-style: italic;
  font-weight: bold;
  font-size: 12pt;
  letter-spacing: 0.05em;
  margin-bottom: 4pt;
  text-align: left;
  text-indent: 0;
  page-break-after: avoid;
}
section.chapter .chapter-content h3{
  hyphens: none;
  font-family: "EB Garamond", serif;
  font-style: italic;
  font-size: 11.5pt;
  text-align: left;
  margin-bottom: 0;
  text-indent: 0;
  page-break-after: avoid;
}
ul, ol {
  font-family: ebgaramond;
}
table td {
  font-family: ebgaramond;
  font-size: 0.95em;
}

section.chapter {
  page: chap;
  prince-page-group: start;
  padding-bottom: .0625in;
  margin:auto;
}
section.full-title h1.title {
  string-set: Booktitle content();
}

section.full-title .author {
  string-set: Authorname content();
}

`);

var sectionTypeId = '00000-0000-0000-0000'
var layoutId = '1111-1111-1111-1111'

var parsedStyles = [];

styles.stylesheet.rules.forEach(rule => {
  parsedStyles.push([uuid.v4(),rule['selectors'].join(', '),getAllStyles(rule['declarations'])]);
})

function getAllStyles(declarations) {
	var styles = {}
	declarations.forEach(declaration => {
    styles[declaration['property']] = declaration['value'];
  });
  
  return styles;
}

const layoutPartMeta = []
const layoutPartStyle = []

parsedStyles.forEach(style => {
  const layoutPart = {
    id: style[0],
    sectionTypeId: sectionTypeId,
    cssSelector: style[1],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  layoutPartMeta.push(layoutPart)

  const layoutPartItem = {
    id: uuid.v4(),
    layoutId: layoutId,
    layoutPartMetaId: style[0],
    cssProperties: JSON.stringify(style[2])
  }
  layoutPartStyle.push(layoutPartItem)
})

console.log('--------------METADATA--------------------')
console.log(layoutPartMeta);
console.log('--------------PROPERTIES---------------------------')
console.log(layoutPartStyle);
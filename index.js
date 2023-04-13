
var css = require('css');
var uuid = require('uuid');

var styles = css.parse(`
section.chapter {
  margin: 0;
  padding: 0;
  font-size: 11pt;
  line-height: 1.5;
}

section .chapter-cap {
  display: block;
  hyphens: none;
  font-family: "Roboto";
  font-weight: 300;
  font-style: normal;
  color: #7a7a7a;
  border-right: solid 8px #979797;
  padding-right: 12px;
  font-size: 22pt;
  font-weight: 600;
  line-height: 24pt;
  letter-spacing: 0.05em;
  text-align: right;
  margin-right: 0;
  margin-top: 45px;
  height: 30px;
}

section .chapter-cap::before {
  content: "1";
}

section .chapter-title {
  hyphens: none;
  font-family: "Roboto";
  font-weight: 300;
  font-style: normal;
  font-size: 17pt;
  line-height: 27pt;
  color: inherit;
  text-align: right;
  border-right: none;
  text-transform: none;
  letter-spacing: 0.06em;
  margin: 40px 8px 0 0;
  padding: 0;
}

section .chapter-content {
  margin: 45px 20px 0 20px;
}

section .chapter-content p:first-letter {
  font-family: "Roboto";
  font-size: 3.5em;
  font-weight: 200;
  float: left;
  line-height: 0.9;
  margin: 0;
  padding: 0;
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
    cssProperties: JSON.stringify(style[2],null,1)
  }
  layoutPartStyle.push(layoutPartItem)
})

console.log('--------------METADATA--------------------')
console.log(layoutPartMeta);
console.log('--------------PROPERTIES---------------------------')
console.log(layoutPartStyle);
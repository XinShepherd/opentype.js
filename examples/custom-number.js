
const opentype = require('../dist/opentype');

const NUMBER_UNICODE_MAP = (() => {
    const map = {};
    const array = [];
    for (let i = 0; i < 10; i++) {
        array.push(i);
    }
    for (let i = 0; i < 10; i++) {
        let number = parseInt(Math.random() * array.length);
        map[`${i}`] = 48 + array[number];
        array.splice(number, 1);
    }
    return map;
})();

// Create the bézier paths for each of the glyphs.
// Note that the .notdef glyph is required.
let notdefGlyph = new opentype.Glyph({
    name: '.notdef',
    unicode: 0,
    advanceWidth: 650,
    path: new opentype.Path()
});
const roFont = opentype.loadSync('../fonts/Roboto-Black.ttf');

const glyphs = [notdefGlyph];
const names = Object.keys(NUMBER_UNICODE_MAP);
let mapping = {};
for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const glyph = roFont.charToGlyph(name);
    const newGlyph = new opentype.Glyph({
        name: name,
        unicode: NUMBER_UNICODE_MAP[name],
        advanceWidth: glyph.advanceWidth,
        path: glyph.path
    });
    glyphs.push(newGlyph);
    mapping[name] = String.fromCharCode(NUMBER_UNICODE_MAP[name]);
}

let font = new opentype.Font({
    familyName: 'OpenTypeSans',
    styleName: 'Medium',
    unitsPerEm: roFont.unitsPerEm,
    ascender: roFont.ascender,
    descender: roFont.descender,
    glyphs: glyphs});
console.log(mapping);
font.download();

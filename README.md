# Boundarizr

Layout boundaries are able to limit the root and scope of Chrome's layout
operations. This is a small library that highlights elements that can act as
potential layout boundaries in your page's DOM.

To be a layout boundary, the element must satisfy the following constraints:

* The element is an SVG root (`<svg>`).
* The element is a text or search `<input>` field.
* The element does not have a percentage height value.
* The element does not have an implicit or `auto` height value.
* The element does not have an implicit or `auto` width value.
* The element has an explicit overflow value (`scroll`, `auto` or `hidden`).
* The element is not a descendant of a `<table>` element.

Boundarizr makes use of `window.getMatchedCSSRules()` to determine what was applied to the elements in the DOM. As such, and in given that the rules for layout boundaries are implementation-specific, you should assume this will only work for Chrome.

## Usage

You can find a bookmarklet at `/bookmarklet.html` - just drag that to your
bookmarks in Chrome. You can include `/js/boundarizr.js` (or .min.js if you
prefer) and call `Boundarizr.testCurrentDocument()`.

## API

`Boundarizr` contains the following methods:

* `.testCurrentDocument()` - tests the current DOM, adds the boundaries and shows them.
* `.showBoundaries()` - shows the currently detected boundaries.
* `.hideBoundaries()` - hides the currently detected boundaries.
* `.kill()` - kills and removes Boundarizr.

And you can call individual tests against elements if you like:

* `.tests.isBoundary(elm)`
* `.tests.isSVGRoot(elm)`
* `.tests.isInputTextOrSearch(elm)`
* `.tests.hasPercentageHeight(elm)`
* `.tests.hasEmptyOrAutoHeight(elm)`
* `.tests.hasEmptyOrAutoWidth(elm)`
* `.tests.isNotOverflow(elm)`
* `.tests.isDescendantOfTable(elm)`

## Tests

Can be found at `/tests/index.html`

## License

Apache 2.0 - See `/LICENSE`

*Please note:* this is not a Google project

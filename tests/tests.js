function makeElement(type, styles, attributes) {
  var element = document.createElement(type);

  styles = styles || {};
  attributes = attributes || {};

  for (var i in styles) {
    if (styles.hasOwnProperty(i))
      element.style[i] = styles[i];
  }

  for (var a in attributes) {
    if (attributes.hasOwnProperty(a))
      element.setAttribute(a, attributes[a]);
  }

  return element;
}

QUnit.module("Starter for ten");
test("Boundarizr exists", function() {
  ok(typeof Boundarizr == "object");
});

QUnit.module("Basic boundary tests");
test("SVG root is a boundary", function() {
  var element = makeElement('svg');
  ok(Boundarizr.tests.isSVGRoot(element));
});

test("input is a boundary", function() {
  var element = makeElement('input');
  ok(Boundarizr.tests.isInputTextOrSearch(element));
  ok(Boundarizr.tests.isBoundary(element));
});

test("input[type='text'] is a boundary", function() {
  var element = makeElement('input', null, { type: 'text' });
  ok(Boundarizr.tests.isInputTextOrSearch(element));
  ok(Boundarizr.tests.isBoundary(element));
});

test("input[type='search'] is a boundary", function() {
  var element = makeElement('input', null, { type: 'search' });
  ok(Boundarizr.tests.isInputTextOrSearch(element));
  ok(Boundarizr.tests.isBoundary(element));
});

test("input[type='radio'] is not a boundary", function() {
  var element = makeElement('input', null, { type: 'radio' });
  ok(!Boundarizr.tests.isInputTextOrSearch(element));
  ok(!Boundarizr.tests.isBoundary(element));
});

QUnit.module("Style tests");

test("Height is not set as a percentage value", function() {
  var element = makeElement('div', { height: '50%' });

  ok(Boundarizr.tests.hasPercentageHeight(element));

  ok(!Boundarizr.tests.isBoundary(element));
});

test("Width is not empty or auto", function() {
  var elementAuto = makeElement('div', { width: 'auto' });
  var elementImplicit = makeElement('div');

  ok(Boundarizr.tests.hasEmptyOrAutoWidth(elementAuto));
  ok(Boundarizr.tests.hasEmptyOrAutoWidth(elementImplicit));

  ok(!Boundarizr.tests.isBoundary(elementImplicit));
  ok(!Boundarizr.tests.isBoundary(elementAuto));
});

test("Height is not empty or auto", function() {
  var elementAuto = makeElement('div', { height: 'auto' });
  var elementImplicit = makeElement('div');

  ok(Boundarizr.tests.hasEmptyOrAutoHeight(elementAuto));
  ok(Boundarizr.tests.hasEmptyOrAutoHeight(elementImplicit));

  ok(!Boundarizr.tests.isBoundary(elementImplicit));
  ok(!Boundarizr.tests.isBoundary(elementAuto));
});

test("Element has overflow property set", function() {
  var elementAuto = makeElement('div', { overflow: 'auto' });
  var elementScroll = makeElement('div', { overflow: 'auto' });
  var elementHidden = makeElement('div', { overflow: 'hidden' });
  var elementImplicit = makeElement('div');

  ok(!Boundarizr.tests.isNotOverflow(elementAuto));
  ok(!Boundarizr.tests.isNotOverflow(elementScroll));
  ok(!Boundarizr.tests.isNotOverflow(elementHidden));
  ok(Boundarizr.tests.isNotOverflow(elementImplicit));

  ok(!Boundarizr.tests.isBoundary(elementAuto));
  ok(!Boundarizr.tests.isBoundary(elementScroll));
  ok(!Boundarizr.tests.isBoundary(elementHidden));
  ok(!Boundarizr.tests.isBoundary(elementImplicit));
});

test("Element is not descended from table", function() {
  var table = makeElement('table');
  var tr = makeElement('tr');
  var td = makeElement('td');
  var div = makeElement('div');

  table.appendChild(tr);
  tr.appendChild(td);

  ok(Boundarizr.tests.isDescendantOfTable(table));
  ok(Boundarizr.tests.isDescendantOfTable(tr));
  ok(Boundarizr.tests.isDescendantOfTable(td));
  ok(!Boundarizr.tests.isDescendantOfTable(div));

  ok(!Boundarizr.tests.isBoundary(table));
  ok(!Boundarizr.tests.isBoundary(tr));
  ok(!Boundarizr.tests.isBoundary(td));
  ok(!Boundarizr.tests.isBoundary(div));
});

QUnit.module("Composite styles");
test("Element with requisite boundary styles (px)", function() {

  var element = makeElement('div', {
    width: "200px",
    height: "200px",
    overflow: "hidden"
  });

  ok(Boundarizr.tests.isBoundary(element));

});

test("Element with requisite boundary styles (em)", function() {

  var element = makeElement('div', {
    width: "200em",
    height: "200em",
    overflow: "auto"
  });

  ok(Boundarizr.tests.isBoundary(element));

});

test("Element with requisite boundary styles (% width)", function() {

  var element = makeElement('div', {
    width: "100%",
    height: "200em",
    overflow: "scroll"
  });

  ok(Boundarizr.tests.isBoundary(element));

});

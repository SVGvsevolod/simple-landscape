# Simple Landscape
JavaScript function that creates a canvas with landscape animation. It creates random number of clouds that consists of circles that forms those clouds visually, number of dandelions on ground and its flocks that comes out and when dandelion reaches out of flocks only stem of dandelion remains. When clouds go out of bounds to the right, new ones appear from the left, but unfortunately dandelions remains as stems.

This was a laboratory(practical) work for Computer Graphics discipline in university but it's quite universal and can be used for various purposes (like even a background (or not just background) for your homepage/new-tab-page in browser).

# Usage

### In browser

1. Include JavaScript file in Your document

```html
<script src="https://raw.githubusercontent.com/SVGvsevolod/simple-landscape/main/sl.min.js"></script>
```

2. Write a code that calls `sl` function with specified parameters

- `target` is the element in the document where You want to put the canvas
- The last parameter is the function for `onresize` event. Define it in case if you need the canvas to be adaptable to window size.

```js
sl(target, width, height, (canvas, event) => {
    canvas.width = width;
    canvas.height = height;
});
```

### As bundle-able module

```
npm install simple-landscape
```

```js
import sl from 'simple-landscape';
```
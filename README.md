# react-sequence-animator
This is a supper simple React library that lets us to create animations in an easy and straight forward manner.

I wrote this library in order to have animations that can be controlled very easily.

For example, a loader that transitions to a *success* or *fail* mode smoothly:

![Advanced Sequence Animation](./AdvancedSequenceAnimator.gif?raw=true "Advanced Sequence Animation")


## How to Install
```sh
npm install --save react-sequence-animator
# OR
yarn add react-sequence-animator
```

## What You Get

The library has two components:
`SpriteAnimator` and `SequenceAnimator`.

### `SpriteAnimator`
The `SpriteAnimator` receives one child, which it respects as a sprite image, and a `getPosition` function, which for every frame number
should return a position object of the form: `{top: 0, left: 0, width: 100, height: 100}`;

In order to use this component you should know where each frame is located in the sprite image.

### `SequenceAnimator`
The `SequenceAnimator` receives a sequence of images as its children, and *"plays"* them one after the other.

```javascript
const cat1 = require('./statics/cat1.png');
const cat2 = require('./statics/cat2.png');
const cat3 = require('./statics/cat3.png');
const cat4 = require('./statics/cat4.png');
const cat5 = require('./statics/cat5.png');
const cat6 = require('./statics/cat6.png');
const cat7 = require('./statics/cat7.png');
const cat8 = require('./statics/cat8.png');

class SequenceAnimatorExample extends React.Component {
  render() {
    return (
      <SequenceAnimator>
        <img src={cat1} alt="cat1"/>
        <img src={cat2} alt="cat2"/>
        <img src={cat3} alt="cat3"/>
        <img src={cat4} alt="cat4"/>
        <img src={cat5} alt="cat5"/>
        <img src={cat6} alt="cat6"/>
        <img src={cat7} alt="cat7"/>
        <img src={cat8} alt="cat8"/>
      </SequenceAnimator>
    );
  }
}
```

The `SequenceAnimator` receives several props:

|Name|Type|default|Description|
|:---|:---|:---|:---|
|`autoplay`| bool | true | should play automatically or not
|`duration`| number | 1000 | the duration in milliseconds of the animation
|`loop`| bool | true | should play in a loop
|`easing`| string | 'linear' | the easing of the animation (read more about this [here](#easing))
|`onSequenceEnd`| func | --- | a callback function that is called each time the sequence reached its end
|`children`| node or array of nodes | --- | the nodes to be "played"

#### Notice the children aren't restricted to being an image component. They can also be SVG's or even divs

## Easing
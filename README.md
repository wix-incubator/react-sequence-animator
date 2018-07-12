# react-sequence-animator
This is a supper simple React library that lets us create animations in an easy and straight forward manner.

The idea behind this library was to create animations that can be controlled very easily.

For example, a loader that has smooth transitions to a *success* and *fail* mode:

![Advanced Sequence Animation](./AdvancedSequenceAnimator.gif?raw=true "Advanced Sequence Animation")

## How to Install
```sh
npm install --save react-sequence-animator
```

## What You Get

The library has two components:
`SpriteAnimator` and `SequenceAnimator`.

### `SpriteAnimator`

The `SpriteAnimator` receives one child, which it respects as a sprite image, a `getPosition` function,
which for every frame number should return a position object of the form: `{top: 0, left: 0, width: 100, height: 100}`,
and the number of frames in the sequence.

In order to use this component you should know where each frame is located in the sprite image.

```javascript
const sprite = require('./sprites-cat-running.png');
const WIDTH = 512;
const HEIGHT = 256;

class SpriteAnimatorStory extends React.Component {
  constructor() {
    super();
    this._getPosition = this._getPosition.bind(this);
  }

  render() {
    return (
      <SpriteAnimator autoplay numOfFrames={8} getPosition={this._getPosition}>
        <img src={sprite} alt="my-sprite" width={WIDTH * 4} height={HEIGHT * 2}/>
      </SpriteAnimator>
    );
  }

  _getPosition(frame) {
    return {
      width: WIDTH,
      height: HEIGHT,
      top: (frame < 4) ? 0 : HEIGHT,
      left: (frame % 4) * WIDTH
    };
  }
}
```

The `SpriteAnimator` receives several props:

|Name|Type|default|Description|
|:---|:---|:---|:---|
|`children`| a single node | --- | the sprite to be "played"
|`getPosition`| function | () => {top: 0, left: 0, width: '100%', height: '100%'} | a function that is called for each frame and should return the position of the frame in the sprite
|`numOfFrames`| number | 0 | the number of frames in the animation
|`autoplay`| bool | true | should play automatically or not
|`duration`| number | 1000 | the duration in milliseconds of the animation
|`loop`| bool | true | should play in a loop
|`easing`| string | 'linear' | the easing of the animation (read more about this [here](#easing))
|`onSequenceEnd`| func | () => {} | a callback function that is called each time the sequence reached its end
|`onAnimationStop`| func | () => {} | a callback function that is called when the animation stops completely

##### Notice: There's no restriction on the type of element the child should be. It can also be an SVG or even a react component or a div

#### API
`play` - Plays the animation (from the current frame)
  
`stop` - Stops the animation  

`reset` - Resets the animation to the first frame (0)


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
|`children`| node or array of nodes | [] | the nodes to be "played"
|`autoplay`| bool | true | should play automatically or not
|`duration`| number | 1000 | the duration in milliseconds of the animation
|`loop`| bool | true | should play in a loop
|`easing`| string | 'linear' | the easing of the animation (read more about this [here](#easing))
|`onSequenceEnd`| func | () => {} | a callback function that is called each time the sequence reached its end
|`onAnimationStop`| func | () => {} | a callback function that is called when the animation stops completely

##### Notice: There's no restriction on the types of elements the children should be. They can also be SVG's or even react components or divs

#### API
`play` - Plays the animation (from the current frame)
  
`stop` - Stops the animation  

`reset` - Resets the animation to the first frame (0)

## Easing
The components can apply to the animations, easings as described in the library [easing-utils](https://github.com/AndrewRayCode/easing-utils).

It was initially introduced in order to allow control of the animation's duration (using the linear easing), but other easings may be applied.

It is recommended to use easings only on linear animations.

#### Notice: When using easings other than *linear*, we cannot be assured that all frames will be played

### Example:

![Ball Easing Example](./BallEasingAnimation.gif?raw=true "Ball Easing Example")

Both of the basketball animations above use the same sequence of images.

The right animation is played with a linear easing; A ball falling in a constant velocity.

Adding the easing `easeOutBounce` gives us the feeling of a ball in free fall, and bouncing after hitting the ground (left animation).

Notice how the eased animation (on the left) isn't as smooth as the linear animation.

That happens because the `easeOutBounce` skips some frames at the end.

In order to achieve a smoother animation, we would have needed much more frames (which really isn't cost effective).

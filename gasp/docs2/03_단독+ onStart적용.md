1. 기본 세팅
```html
<style>
    div {
        display: inline-block;
        width: 100px;
        height: 100px;

        background: red;
    }
</style>
```
```html
<div class="box"></div>

<script>
    new TweenMax.to(".box", 3, {
        x: 500,
    })
</script>
```


2. target에 `onStart: function() {}` + `onStartParams: []`으로 옵션을 줘서 console로 param이 넘어오는지 확인한다.
    - 값 1, 2, 3이 a,b,c로 넘어오는지 확인한다
```js
    new TweenMax.to(".box", 3, {
        x: 500,
        onStart: function (a, b, c) {
            console.log("onStartParmas: ", a, b, c)
        },
        onStartParams: ["1", "2", "3"]
    })
```
- `onStartParmas:  1 2 3`
- this를 찍어보면, **tweenMax가 잡혀서 처리가 안될 것이다.**
```js
onStart: function (a, b, c) {
    // console.log("onStartParmas: ", a, b, c)
    console.log(this)
}
```
- `TweenMax {... }`


3. **onStart: function 내부에 `this`를, `onStartScope: 객체,` 로 직접 지정해줄 수 있다.**
```html
<script>
    let obj = {name: 'obj'};

    new TweenMax.to(".box", 3, {
        x: 500,
        onStart: function (a, b, c) {
            // console.log("onStartParmas: ", a, b, c)
            console.log(this)
        },
        onStartParams: ["1", "2", "3"],
        onStartScope: obj,
    })
</script>
```
- `{name: 'obj'}`

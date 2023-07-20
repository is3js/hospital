1. inline-block의 50x50 div를 여러개 만든다
```html
<style>
    div {
        display: inline-block;
        width: 50px;
        height: 50px;

        background: #ccc;
        border: 1px solid #000;
        border-radius: 10px;
    }
</style>
```
```html
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
```


2. 여러 div를 다 지정하지말고 **let의 querySelectorAll**로 선택해서 입력할 수 있다.
```js
let oDivs = document.querySelectorAll(".box");
```

3. cycle로, 3가지 옵션을 target으로 돌아가도록 준다.
    - 여러개이므로, `다음것까지의 비동기 딜레이시간`을 duration과 같이 준다.
```html
<script>
    let oDivs = document.querySelectorAll(".box");
    new TweenMax.staggerTo(oDivs, 3, {
        cycle: {
            height: [100, 150, 200],
            backgroundColor: ["red", "green", "blue"]
        }
    })
</script>
```

1. 가져온다
- 공식홈피: http://shouce.jb51.net/velocity/index.html
- 다운: https://github.com/AzrDream/JS-new-features-popular-frameworks/tree/f10e43155d7d227ab0869c9d8aa68c6c6bd76ac5/05-%E6%B5%81%E8%A1%8C%E6%A1%86%E6%9E%B6%E9%9B%86/05-Bootstrap/huawei/js

2. 세팅
```html
    <style>
        div {
            width: 100px;
            height: 100px;
            background: red;
        }
    </style>
    <script src="js/velocity.js"></script>
```
```html
<div class="box"></div>
```

3. script에 element를 찾고, `Velocity`객체안에 1번째 인자로 주며, 2번째 {}로 변화옵션을 ""string을 준다. 3번째 {}에는 duration옵션을 준다.
    - height
```html
<script>
   let oDiv = document.querySelector(".box");
   Velocity(oDiv, {height: "300px"}, {duration: 3000});
</script>
```
4. jquery를 추가하면, $요소를 바로 찾아서 `.velocity({}, {})`로 바로 사용할 수 있다.
```html
<script src="js/jquery.js"></script>
<script src="js/velocity.js"></script>
```
```html
<script>
    /* 1. js */
   // let oDiv = document.querySelector(".box");
   // Velocity(oDiv, {height: "300px"}, {duration: 3000});

    /* 2. jquery*/
    $(".box").velocity({height: "300px"}, {duration:3000})
</script>
```


5. height외에 `marginLeft`옵션을 "px"로 주면 왼쪽으로 벌린다.
```js
/* 3. marginLeft*/
$(".box").velocity({marginLeft: "300px"}, {duration: 3000})
```

6. duration에 delay를 줄 수 있다.
```js
 $(".box").velocity({marginLeft: "300px"}, {
     duration:3000,
     delay: 2000,
 })
```

7. loop을 주면 반복할 수 있는데, 2를 주면 되돌아오는 것까지 한다.
```js
 /* 3. marginLeft*/
 $(".box").velocity({marginLeft: "300px"}, {
     duration:3000,
     // delay: 2000,
     loop: 2,
 })
```
8. 애니메이션 효과(속도조절)는 `easing`으로 준다
```js
/* 3. marginLeft 외 각종 효과*/
$(".box").velocity({marginLeft: "300px"}, {
  duration:3000,
  // delay: 2000,
  // loop: 2,
  easing: "easeInOutQuint"
})
```
9. 다끝나고 사라지는 것은 `display: "none"`으로 준다
```js
$(".box").velocity({marginLeft: "300px"}, {
  duration:3000,
  // delay: 2000,
  // loop: 2,
  // easing: "easeInOutQuint",
  display: "none",
})
```
- 자리는 차지시킬려면 visibility를 hidden으로 준다.
```js
$(".box").velocity({marginLeft: "300px"}, {
  duration:3000,
  // delay: 2000,
  // loop: 2,
  // easing: "easeInOutQuint",
  // display: "none",
  visibility: "hidden",
})
```


10. queue에 "큐이름"에 넣으면 jquery에 `.dequeue("큐이름")`수행시 시킬 수 있다.
```js
$(".box").velocity({marginLeft: "300px"}, {
  duration:3000,
  queue: "a",
});
$(".box").dequeue("a");
```

11. **2개 동작을 하려면, a와 b 2개의 queue에 넣어놓고, deque 1개 -> setTimeOut( )으로 2번재 deque를 해준다.**
- 앞queue를 dequeue해놓고, 그 때의 duration을 setTimeout에 적어준다.
```js
$(".box").velocity({marginLeft: "300px"}, {
   duration:3000,
   queue: "a",
});
$(".box").velocity({marginTop: "300px"}, {
   duration:3000,
   queue: "b",
});

$(".box").dequeue("a");

setTimeout(function () {
  $(".box").dequeue("b");
}, 3000)
```


12. 시작/완료 이벤트 달아주기
- **duration옵션안에 `begin: function`을 지정해주고, `e`를 받으면 `jquery로 잡은 element`를 사용할 수 있다**
```js
 /* 4. event */
 $(".box").velocity({marginLeft: "500px"}, {
     duration: 3000,
     begin: function (e) {
         console.log(e)
     }
 })
```

- complete에 function을 입력할 수 있다
```js
 /* 4. event */
 $(".box").velocity({marginLeft: "500px"}, {
     duration: 3000,
     begin: function (e) {
         console.log(e)
     },
     complete: function (e) {
         console.log(e)
     }
 })
```


13. progress 이벤트를 걸면, 여러가지 인자를 받을 수 있다.
    - complete인자를 * 100 해서 찍어보면, %가 된다.
```js
 /* 4. event */
 $(".box").velocity({marginLeft: "500px"}, {
     duration: 3000,
     begin: function (e) {
         console.log("시작", e)
     },
     complete: function (e) {
         console.log("종료", e)
     },
     progress: function (element, complete, remaining, start, tweenValue) {
         console.log((complete * 100) + "%")
     }
 })
```

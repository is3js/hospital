1. 세팅
```html
    <style>
        div {
            width: 100px;
            height: 100px;
            background: #ccc;
            border: 1px solid #000;
        }
    </style>
```
```html
<div class="box1"></div>
<div class="box2"></div>
<div class="box3"></div>
```
2. 각각을 순차적으로 시행할려면, 2번째부터 delay를 앞에 duration으로 줘야한다.
    - 각 개별로 TweenMax객체를 만들어서, delay를 앞에 duration으로 주는데 **순차적으로 줘야한다.**
```html
<script>
   /* 순차실행을 개별로 tm을 만들어서 실행하되, delay를 직접 순차적으로 줘야한다.*/
   new TweenMax.to(".box1", 3, {
       x: 500
   });
   new TweenMax.to(".box2", 3, {
       x: 400,
       delay: 3,
   });
   new TweenMax.to(".box3", 3, {
       x: 300,
       delay: 6,
   });
</script>
```

3. **개별로 tm을 만들지말고, timelineMax에 add를 하면, delay없이 알아서 순차실행 된다.**

```js
   /* timeline객체에 add하면, delay가 알아서 순차적으로 수행된다. */
   let tm = new TimelineMax();
   tm.add(
       new TweenMax.to(".box1", 3, {
           x: 500
       })
   )
   tm.add(
       new TweenMax.to(".box2", 3, {
           x: 400
       })
   )
   tm.add(
       new TweenMax.to(".box3", 3, {
           x: 300
       })
   )
```

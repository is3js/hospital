1. .footer > .footer-in 으로 틀 잡고, 내부에 footer-top, -bottom 2부분으로 나눈다.
```html
<!-- footer -->
<div class="footer">
    <div class="footer-in">
        <div class="footer-top"></div>
        <div class="footer-bottom"></div>
    </div>
</div>
```

2. .footer 자체에는 w100%, bg, padding-top을 준다.
```css
/* footer */
.footer {
    width: 100%;
    padding-top: 60px;
    background: var(--color-main);
}
```

3. .footer-in 은 container개념으로 width를 section과 같은 비율( `lg 70% -> 모바일 85%` )만들어준다.
    - h는 임의로 1000px을 주고, `margin: 0 auto;`로 top, bottom을 가운데 정렬을 만든다.
    - 배경은 임의로 red로 준다.
```css
.footer > .footer-in {
    width: 70%;
    margin: 0 auto;

    height: 1000px;
    background: red;
}

@media screen and (max-width: 991px) {
    .footer > .footer-in {
        width: 85%;
    }
}
``` 
![img.png](../ui/320.png)


4. top에는 left와 right를 75/25%로 갈라준다.
   - **flex를 안쓰고 가르려면, `부모.clearfix` + `왼쪽.float-start` + `오른쪽.float-end`를 준다.**
```html

<div class="footer-top clearfix">
    <div class="footer-top-left w-75 float-start"></div>
    <div class="footer-top-right w-25 float-end"></div>
</div>
```
- 확인을 위해 배경만 css로 넣어주고, height는 전체의 절반인 500px로 준다.

![img.png](../ui/321.png)

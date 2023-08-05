### section 하위로서 영역 추가 
1. .section2안에 `.section2-middle2`를 만들고, `.section-subtitle`을 새롭게 만들어, 첫번째 p가 없는 새로운 영역을 만든다.
    - .section-title의 구성에서 첫번째 div의 첫번째 p만 사라지고, css설정도 .section-title의 p(2)를 p(1)에 대입해준다.
    - **subtitle만 오른쪽div의 padding-top을 줄이고, 이전위치 + velocity를 적용안한다**
```html
<!-- 치료후기 -->
<div class="section2-middle2 mt-5">
   <div class="section-subtitle">
      <div>
         <p>치료 후기</p>
      </div>
      <div>
         <strong>자필/ 웹/ 네이버후기 등</strong> 다양한 루트의 후기를 살펴봐요!
      </div>
   </div>
   <div class="review-box">
   </div>
</div>
```
```css
/* 섹션 title 설정 */
.section-title,
.section-subtitle {}
/* - 섹션 title 왼쪽 div 속 p 2개 설정 */
.section-title > div:nth-of-type(1) p:nth-of-type(1) {}
.section-title > div:nth-of-type(1) p:nth-of-type(2),
.section-subtitle > div:nth-of-type(1) p:nth-of-type(1) {}
/* - 섹션 title 오른쪽 div 설정 */
.section-title > div:nth-of-type(2),
.section-subtitle > div:nth-of-type(2) {}
/* - 섹션 subtitle은 오른쪽의 위쪽공간을 조금 줄인다. */
.section-subtitle > div:nth-of-type(2) {
   padding-top: 2vw;
}
```


2. jquery로 subtitle을 보이게 한다.
   - 이 때, **인사말인 top이 onLeave할 때 + middel애니메이션의 height를 offset으로 주고 나타나게 한다.**
   - **애니메이션을 offset으로 줘야 드래그시 적당히 잘 나타남**
```js
 // section2-middle2 치료후기 - title with Velocity
 let scene7 = new ScrollMagic.Scene({
     triggerElement: ".section2-top",
     triggerHook: "onLeave",
     offset: $(".section2-middle").height() + 15,
 });
 scene7.setVelocity([".section2-middle2 > .section-subtitle > div"], {
     top: "0px",
     opacity: "1"
 }, {
     duration: "300",
 });
 controller.addScene(scene7);
```

!function(){var t=document.querySelector("body"),n=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");var o={intervalId:null,isActive:!1,onStartChangeBodyBg:function(){this.isActive||(this.intervalId=setInterval((function(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3),this.isActive=!0)},onStopChangeBodyBg:function(){clearInterval(this.intervalId),this.isActive=!1}};n.addEventListener("click",(function(){o.onStartChangeBodyBg()})),e.addEventListener("click",(function(){o.onStopChangeBodyBg()}))}();
//# sourceMappingURL=01-color-switcher.82fb4c46.js.map

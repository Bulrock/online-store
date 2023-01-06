(()=>{"use strict";var r={577:(r,n,e)=>{e.d(n,{Z:()=>i});var t=e(645),o=e.n(t)()((function(r){return r[1]}));o.push([r.id,"* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  word-wrap: break-word;\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n}\r\n\r\np {\r\n  margin: 0;\r\n}\r\n\r\nbody {\r\n  height: 100vh;\r\n  margin: 0;\r\n  padding: 0;\r\n  width: 100%;\r\n  display: grid;\r\n  grid-template-columns: 1fr 3fr;\r\n  grid-template-rows: 10vh 1fr 8vh;\r\n  grid-template-areas:\r\n    'header header'\r\n    'main main'\r\n    'footer footer';\r\n  background-color: rgb(238, 238, 238);\r\n  font-family: 'Times New Roman', Times, sans-serif;\r\n}\r\n\r\nh3 {\r\n  margin: 0;\r\n  text-align: center;\r\n  color: #ff5a00;\r\n  font-size: 115%;\r\n  background-color: rgb(255, 255, 255);\r\n  border-bottom: 1px solid #ff5a00;\r\n  border-top-left-radius: 10px;\r\n  border-top-right-radius: 10px;\r\n}\r\n\r\n.header-main {\r\n  grid-area: header;\r\n  background-color: #fff;\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  color: #ff5a00;\r\n  box-shadow: 0 8px 16px rgba(0,0,0,0.2);\r\n  margin-bottom: 1em;\r\n  padding-left: 4%;\r\n  padding-right: 4%;\r\n}\r\n\r\n.header-main a {\r\n  text-decoration: none;\r\n  color: #ff5a00;\r\n}\r\n\r\n.header-logotype {\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: center;\r\n  gap: 10px;\r\n  transition: all .3s ease-in-out;\r\n}\r\n\r\n.header-logotype:hover {\r\n  scale: 1.03;\r\n}\r\n\r\n.brand-logo {\r\n  display: flex;\r\n  align-items: center;\r\n  font-size: 70px;\r\n  margin-bottom: 25px;\r\n  margin-top: 0;\r\n  line-height: 100%;\r\n}\r\n\r\n.text-for-logo {\r\n  font-size: 34px;\r\n  font-weight: 600;\r\n  margin: 0;\r\n}\r\n\r\n.header-price p {\r\n  margin: 0;\r\n  font-size: 26px;\r\n  font-weight: 600;\r\n}\r\n\r\n.cart-price {\r\n  margin: 0;\r\n  font-size: 26px;\r\n  font-weight: 600;\r\n}\r\n\r\n.header-basket {\r\n  position: relative;\r\n  z-index: 1;\r\n}\r\n\r\n.basket svg {\r\n  width: 60px;\r\n  height: 60px;\r\n  fill: #ff5a00;\r\n  transition: all .3s ease-in-out;\r\n}\r\n\r\n.basket svg:hover {\r\n  transform: scale(1.05);\r\n}\r\n\r\n.product-count {\r\n  position: absolute;\r\n  left: 45px;\r\n  top: 30px;\r\n  font-size: 20px;\r\n  text-align: center;\r\n  width: 35px;\r\n  z-index: 15;\r\n  border-radius: 50%;\r\n  border: 1px solid #ff5a00;\r\n  box-shadow: 0 0px 10px #ff5900;\r\n}\r\n\r\n.main-main {\r\n  grid-area: main;\r\n  margin: 0 1em 1em 1em;\r\n}\r\n\r\n.error-container {\r\n  margin-top: 9%;\r\n  display: flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n}\r\n\r\n.error-title,\r\n.error-subtitle {\r\n  color: #4b4b4b;\r\n}\r\n\r\n.to-the-store {\r\n  margin-top: 10px;\r\n  width: 200px;\r\n  height: 40px;\r\n  border-radius: 10px;\r\n  background-color: #fb9056;\r\n  border: 1px solid rgb(152, 152, 152);\r\n  transition: all .3s ease-in-out;\r\n}\r\n\r\n.to-the-store:hover {\r\n  box-shadow: 0 0px 20px #ff5900;\r\n  border: 1px solid rgb(97, 97, 97);\r\n}\r\n\r\n.button-back {\r\n  margin: 7px 25px;\r\n  font-size: 20px;\r\n  font-weight: 600;\r\n  color: black;\r\n  transition: all .3s ease-in-out;\r\n}\r\n\r\n.button-back:hover {\r\n  color: rgb(25, 48, 60);\r\n}\r\n\r\n.icon-error {\r\n  width: 550px;\r\n  max-height: 473px;\r\n  object-fit: contain;\r\n}\r\n\r\n.footer {\r\n  grid-area: footer;\r\n  display: flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n  box-shadow: 0 -8px 16px rgba(0,0,0,0.2);\r\n}\r\n\r\n.container.bottom {\r\n  display: flex;\r\n  width: 100%;\r\n  flex-direction: row;\r\n  justify-content: space-around;\r\n  padding: 0 0;\r\n}\r\n\r\n.copyrights {\r\n  margin: 0;\r\n  padding: 0;\r\n  color: #ff5a00;\r\n  font-size: 140%;\r\n  align-self: center;\r\n}\r\n\r\n.social-link img {\r\n  max-height: 40px;\r\n}\r\n\r\n.github-icon1,\r\n.github-icon2 {\r\n  height: 40px;\r\n}\r\n\r\n.social-link {\r\n  opacity: .8;\r\n  cursor: pointer;\r\n  transition: all .5s ease-in-out;\r\n  background-color: unset;\r\n}\r\n\r\n.social-link:hover {\r\n  transform: scale(1.1);\r\n  opacity: 1;\r\n}\r\n\r\n@media (max-width: 1500px) {\r\n  .copyrights {\r\n    font-size: 26px;\r\n  }\r\n}\r\n\r\n@media (max-width: 1300px) {\r\n  .error-container {\r\n    margin-top: 9%;\r\n    flex-direction: column;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n  }\r\n\r\n  .icon-error {\r\n    width: 100%;\r\n    max-height: 473px;\r\n    object-fit: contain;\r\n  }\r\n}\r\n\r\n@media (max-width: 1000px) {\r\n  .header-main {\r\n    padding-right: 5%;\r\n  }\r\n\r\n  .brand-logo {\r\n    font-size: 50px;\r\n    margin-bottom: 20px;\r\n  }\r\n\r\n  .text-for-logo {\r\n    font-size: 28px;\r\n  }\r\n\r\n  .header-price p {\r\n    font-size: 24px;\r\n  }\r\n\r\n  .cart-price {\r\n    font-size: 24px;\r\n  }\r\n\r\n  .basket svg {\r\n    width: 40px;\r\n    height: 40px;\r\n  }\r\n\r\n  .product-count {\r\n    left: 30px;\r\n    top: 20px;\r\n    font-size: 16px;\r\n    width: 30px;\r\n  }\r\n}\r\n\r\n@media (max-width: 800px) {\r\n  .text-for-logo {\r\n    font-size: 26px;\r\n  }\r\n\r\n  .copyrights {\r\n    font-size: 24px;\r\n  }\r\n}\r\n\r\n@media (max-width: 600px) {\r\n  .text-for-logo {\r\n    font-size: 24px;\r\n  }\r\n\r\n  .copyrights {\r\n    font-size: 22px;\r\n  }\r\n}\r\n\r\n@media (max-width: 500px) {\r\n  .header-logotype {\r\n    flex-direction: column;\r\n    gap: 10px;\r\n  }\r\n\r\n  .brand-logo {\r\n    font-size: 45px;\r\n    margin-bottom: -10px;\r\n  }\r\n\r\n  .text-for-logo {\r\n    font-size: 22px;\r\n  }\r\n\r\n  .header-price p {\r\n    font-size: 22px;\r\n  }\r\n\r\n  .cart-price {\r\n    font-size: 22px;\r\n  }\r\n\r\n  .basket svg {\r\n    width: 70px;\r\n    height: 45px;\r\n  }\r\n\r\n  .product-count {\r\n    left: 50px;\r\n    top: 15px;\r\n    font-size: 18px;\r\n    width: 35px;\r\n  }\r\n\r\n  .icon-error {\r\n    margin-top: 25%;\r\n  }\r\n\r\n  .error-title {\r\n    font-size: 1.5em;\r\n  }\r\n\r\n  .error-subtitle {\r\n    font-size: 1em;\r\n  }\r\n\r\n  .copyrights {\r\n    font-size: 20px;\r\n  }\r\n\r\n  .social-link img {\r\n    max-height: 32px;\r\n  }\r\n}\r\n\r\n@media (max-width: 450px) {\r\n  .main-main {\r\n    margin: 0 0.5em 1em 0.5em;\r\n  }\r\n}\r\n\r\n@media (max-width: 400px) {\r\n  .header-logotype {\r\n    flex-direction: column;\r\n    gap: 10px;\r\n  }\r\n\r\n  .brand-logo {\r\n    font-size: 45px;\r\n    margin-bottom: -10px;\r\n  }\r\n\r\n  .text-for-logo {\r\n    font-size: 16px;\r\n  }\r\n\r\n  .header-price p {\r\n    font-size: 18px;\r\n  }\r\n\r\n  .cart-price {\r\n    font-size: 18px;\r\n  }\r\n\r\n  .basket svg {\r\n    width: 70px;\r\n    height: 40px;\r\n  }\r\n\r\n  .product-count {\r\n    left: 50px;\r\n    top: 15px;\r\n    font-size: 15px;\r\n    width: 30px;\r\n  }\r\n\r\n  .error-container {\r\n    margin-top: 40%;\r\n  }\r\n\r\n  .copyrights {\r\n    font-size: 16px;\r\n  }\r\n\r\n  .social-link img {\r\n    max-height: 30px;\r\n  }\r\n}",""]);const i=o},645:r=>{r.exports=function(r){var n=[];return n.toString=function(){return this.map((function(n){var e=r(n);return n[2]?"@media ".concat(n[2]," {").concat(e,"}"):e})).join("")},n.i=function(r,e,t){"string"==typeof r&&(r=[[null,r,""]]);var o={};if(t)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var s=0;s<r.length;s++){var c=[].concat(r[s]);t&&o[c[0]]||(e&&(c[2]?c[2]="".concat(e," and ").concat(c[2]):c[2]=e),n.push(c))}},n}},379:(r,n,e)=>{var t,o=function(){var r={};return function(n){if(void 0===r[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(r){e=null}r[n]=e}return r[n]}}(),i=[];function a(r){for(var n=-1,e=0;e<i.length;e++)if(i[e].identifier===r){n=e;break}return n}function s(r,n){for(var e={},t=[],o=0;o<r.length;o++){var s=r[o],c=n.base?s[0]+n.base:s[0],p=e[c]||0,d="".concat(c," ").concat(p);e[c]=p+1;var l=a(d),f={css:s[1],media:s[2],sourceMap:s[3]};-1!==l?(i[l].references++,i[l].updater(f)):i.push({identifier:d,updater:x(f,n),references:1}),t.push(d)}return t}function c(r){var n=document.createElement("style"),t=r.attributes||{};if(void 0===t.nonce){var i=e.nc;i&&(t.nonce=i)}if(Object.keys(t).forEach((function(r){n.setAttribute(r,t[r])})),"function"==typeof r.insert)r.insert(n);else{var a=o(r.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(n)}return n}var p,d=(p=[],function(r,n){return p[r]=n,p.filter(Boolean).join("\n")});function l(r,n,e,t){var o=e?"":t.media?"@media ".concat(t.media," {").concat(t.css,"}"):t.css;if(r.styleSheet)r.styleSheet.cssText=d(n,o);else{var i=document.createTextNode(o),a=r.childNodes;a[n]&&r.removeChild(a[n]),a.length?r.insertBefore(i,a[n]):r.appendChild(i)}}function f(r,n,e){var t=e.css,o=e.media,i=e.sourceMap;if(o?r.setAttribute("media",o):r.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),r.styleSheet)r.styleSheet.cssText=t;else{for(;r.firstChild;)r.removeChild(r.firstChild);r.appendChild(document.createTextNode(t))}}var u=null,g=0;function x(r,n){var e,t,o;if(n.singleton){var i=g++;e=u||(u=c(n)),t=l.bind(null,e,i,!1),o=l.bind(null,e,i,!0)}else e=c(n),t=f.bind(null,e,n),o=function(){!function(r){if(null===r.parentNode)return!1;r.parentNode.removeChild(r)}(e)};return t(r),function(n){if(n){if(n.css===r.css&&n.media===r.media&&n.sourceMap===r.sourceMap)return;t(r=n)}else o()}}r.exports=function(r,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=(void 0===t&&(t=Boolean(window&&document&&document.all&&!window.atob)),t));var e=s(r=r||[],n);return function(r){if(r=r||[],"[object Array]"===Object.prototype.toString.call(r)){for(var t=0;t<e.length;t++){var o=a(e[t]);i[o].references--}for(var c=s(r,n),p=0;p<e.length;p++){var d=a(e[p]);0===i[d].references&&(i[d].updater(),i.splice(d,1))}e=c}}}}},n={};function e(t){var o=n[t];if(void 0!==o)return o.exports;var i=n[t]={id:t,exports:{}};return r[t](i,i.exports,e),i.exports}e.n=r=>{var n=r&&r.__esModule?()=>r.default:()=>r;return e.d(n,{a:n}),n},e.d=(r,n)=>{for(var t in n)e.o(n,t)&&!e.o(r,t)&&Object.defineProperty(r,t,{enumerable:!0,get:n[t]})},e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(r){if("object"==typeof window)return window}}(),e.o=(r,n)=>Object.prototype.hasOwnProperty.call(r,n),(()=>{var r;e.g.importScripts&&(r=e.g.location+"");var n=e.g.document;if(!r&&n&&(n.currentScript&&(r=n.currentScript.src),!r)){var t=n.getElementsByTagName("script");t.length&&(r=t[t.length-1].src)}if(!r)throw new Error("Automatic publicPath is not supported in this browser");r=r.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=r})(),e.nc=void 0,(()=>{var r=e(379),n=e.n(r),t=e(577);n()(t.Z,{insert:"head",singleton:!1}),t.Z.locals;const o=e.p+"./assets/b0bf6ac385986ba7d5bc.svg",i=e.p+"./assets/7c2b277031fc9aeb24c0.svg",a=e.p+"./assets/393316c6477f5fa07b26.svg",s=document.querySelector(".logo");s&&s.setAttribute("src",o);const c=document.querySelector(".icon-error");c&&c.setAttribute("src",a);const p=document.querySelector(".github-icon1"),d=document.querySelector(".github-icon2");p&&d&&(p.setAttribute("src",i),d.setAttribute("src",i))})()})();
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(6616)}])},5842:function(e,n,t){"use strict";t.d(n,{Z:function(){return v}});var r=t(5893),a=t(7294),c=t(1163),s=t(1664),i=t.n(s),u=t(1297),o=t.n(u),l=function(){let e=(0,c.useRouter)(),n=e.pathname;return(0,r.jsx)("nav",{className:o().nav,children:(0,r.jsxs)("ul",{className:o().navList,children:[(0,r.jsx)("li",{className:"/"===n?o().active:"",children:(0,r.jsx)(i(),{href:"/",children:"Home"})}),(0,r.jsx)("li",{className:n.startsWith("/sp50")?o().active:"",children:(0,r.jsx)(i(),{href:"/sp50",children:"Collection"})}),(0,r.jsx)("li",{className:"/about"===n?o().active:"",children:(0,r.jsx)(i(),{href:"/about",children:"About"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"https://instagram.com",children:"Instagram"})})]})})},d=t(3454),v=function(e){let{children:n}=e,[t,s]=(0,a.useState)({x:0,y:0}),[i,u]=(0,a.useState)({x:0,y:0});(0,c.useRouter)(),(0,a.useEffect)(()=>{let e=e=>{s({x:e.clientX-window.innerWidth/2,y:e.clientY-window.innerHeight/2})};return document.addEventListener("mousemove",e),()=>{document.removeEventListener("mousemove",e)}},[]),(0,a.useEffect)(()=>{let e=setInterval(()=>{u(e=>({x:e.x-.01*t.x,y:e.y-.01*t.y}))},10);return()=>{clearInterval(e)}},[t]);let o=d.env.PUBLIC_URL||"";return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"App",style:{backgroundImage:"url(".concat("".concat(o,"/background-image.jpg"),")"),backgroundPosition:"".concat(i.x,"px ").concat(i.y,"px"),backgroundSize:"cover"},children:[(0,r.jsx)(l,{}),n]})})}},6616:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return s}});var r=t(5893),a=t(5842);function c(){return(0,r.jsx)("div",{})}function s(){return(0,r.jsx)(a.Z,{children:(0,r.jsx)(c,{})})}},1297:function(e){e.exports={nav:"NavBar_nav__OBiyO",navList:"NavBar_navList__9_exa",active:"NavBar_active__tG_1I"}}},function(e){e.O(0,[396,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);
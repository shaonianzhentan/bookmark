var _e=Object.defineProperty,Me=Object.defineProperties;var Pe=Object.getOwnPropertyDescriptors;var U=Object.getOwnPropertySymbols;var te=Object.prototype.hasOwnProperty,ne=Object.prototype.propertyIsEnumerable;var ee=(n,e,a)=>e in n?_e(n,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):n[e]=a,M=(n,e)=>{for(var a in e||(e={}))te.call(e,a)&&ee(n,a,e[a]);if(U)for(var a of U(e))ne.call(e,a)&&ee(n,a,e[a]);return n},O=(n,e)=>Me(n,Pe(e));var I=(n,e)=>{var a={};for(var r in n)te.call(n,r)&&e.indexOf(r)<0&&(a[r]=n[r]);if(n!=null&&U)for(var r of U(n))e.indexOf(r)<0&&ne.call(n,r)&&(a[r]=n[r]);return a};import{c as T,j as t,g as pe,a as he,s as K,P as ge,_ as F,u as fe,b as Y,d as B,e as me,f as $,M as Le,r as Oe,h as j,i as Te,S as ze,A as Ie,k as ae,l as $e,R as p,m as ve,n as Re,o as v,F as J,L as He,p as N,E as re,I as W,C as Ue,q as se,t as Ve,v as Q,B as X,w as je,x as oe,y as We,z as Ke,D as q,G as qe,T as G,H as P,J as Ge,K as Ye,N as Ze,O as Je,Q as Qe,U as Xe,V as xe,W as et,X as Z,Y as ie,Z as tt,$ as le,a0 as nt,a1 as at}from"./index.d946e710.js";import{L as rt,f as st,a as ot,d as it,r as lt,b as ct,e as dt,n as ut,h as pt}from"./color.ac9119eb.js";var ht=T(t("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"AddOutlined"),gt=T(t("path",{d:"m19 18 2 1V3c0-1.1-.9-2-2-2H8.99C7.89 1 7 1.9 7 3h10c1.1 0 2 .9 2 2v13zM15 5H5c-1.1 0-2 .9-2 2v16l7-3 7 3V7c0-1.1-.9-2-2-2z"}),"Bookmarks"),ft=T(t("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4h-3.5z"}),"DeleteOutlineOutlined"),mt=T(t("path",{d:"m14.06 9.02.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"}),"EditOutlined"),vt=T(t("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHorizOutlined"),we=T(t("path",{d:"M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"}),"Settings");function xt(n){return pe("MuiCard",n)}he("MuiCard",["root"]);const wt=["className","raised"],bt=n=>{const{classes:e}=n;return me({root:["root"]},xt,e)},yt=K(ge,{name:"MuiCard",slot:"Root",overridesResolver:(n,e)=>e.root})(()=>({overflow:"hidden"})),Ct=F.exports.forwardRef(function(e,a){const r=fe({props:e,name:"MuiCard"}),{className:o,raised:l=!1}=r,s=Y(r,wt),g=B({},r,{raised:l}),x=bt(g);return t(yt,B({className:$(x.root,o),elevation:l?8:void 0,ref:a,ownerState:g},s))});var be=Ct;function kt(n){return pe("MuiDrawer",n)}he("MuiDrawer",["root","docked","paper","paperAnchorLeft","paperAnchorRight","paperAnchorTop","paperAnchorBottom","paperAnchorDockedLeft","paperAnchorDockedRight","paperAnchorDockedTop","paperAnchorDockedBottom","modal"]);const Nt=["BackdropProps"],St=["anchor","BackdropProps","children","className","elevation","hideBackdrop","ModalProps","onClose","open","PaperProps","SlideProps","TransitionComponent","transitionDuration","variant"],ye=(n,e)=>{const{ownerState:a}=n;return[e.root,(a.variant==="permanent"||a.variant==="persistent")&&e.docked,e.modal]},Et=n=>{const{classes:e,anchor:a,variant:r}=n,o={root:["root"],docked:[(r==="permanent"||r==="persistent")&&"docked"],modal:["modal"],paper:["paper",`paperAnchor${j(a)}`,r!=="temporary"&&`paperAnchorDocked${j(a)}`]};return me(o,kt,e)},Dt=K(Le,{name:"MuiDrawer",slot:"Root",overridesResolver:ye})(({theme:n})=>({zIndex:n.zIndex.drawer})),ce=K("div",{shouldForwardProp:Oe,name:"MuiDrawer",slot:"Docked",skipVariantsResolver:!1,overridesResolver:ye})({flex:"0 0 auto"}),Ft=K(ge,{name:"MuiDrawer",slot:"Paper",overridesResolver:(n,e)=>{const{ownerState:a}=n;return[e.paper,e[`paperAnchor${j(a.anchor)}`],a.variant!=="temporary"&&e[`paperAnchorDocked${j(a.anchor)}`]]}})(({theme:n,ownerState:e})=>B({overflowY:"auto",display:"flex",flexDirection:"column",height:"100%",flex:"1 0 auto",zIndex:n.zIndex.drawer,WebkitOverflowScrolling:"touch",position:"fixed",top:0,outline:0},e.anchor==="left"&&{left:0},e.anchor==="top"&&{top:0,left:0,right:0,height:"auto",maxHeight:"100%"},e.anchor==="right"&&{right:0},e.anchor==="bottom"&&{top:"auto",left:0,bottom:0,right:0,height:"auto",maxHeight:"100%"},e.anchor==="left"&&e.variant!=="temporary"&&{borderRight:`1px solid ${n.palette.divider}`},e.anchor==="top"&&e.variant!=="temporary"&&{borderBottom:`1px solid ${n.palette.divider}`},e.anchor==="right"&&e.variant!=="temporary"&&{borderLeft:`1px solid ${n.palette.divider}`},e.anchor==="bottom"&&e.variant!=="temporary"&&{borderTop:`1px solid ${n.palette.divider}`})),Ce={left:"right",right:"left",top:"down",bottom:"up"};function At(n){return["left","right"].indexOf(n)!==-1}function Bt(n,e){return n.direction==="rtl"&&At(e)?Ce[e]:e}const _t=F.exports.forwardRef(function(e,a){const r=fe({props:e,name:"MuiDrawer"}),o=Te(),l={enter:o.transitions.duration.enteringScreen,exit:o.transitions.duration.leavingScreen},{anchor:s="left",BackdropProps:g,children:x,className:h,elevation:S=16,hideBackdrop:k=!1,ModalProps:{BackdropProps:y}={},onClose:D,open:i=!1,PaperProps:w={},SlideProps:b,TransitionComponent:f=ze,transitionDuration:E=l,variant:d="temporary"}=r,c=Y(r.ModalProps,Nt),C=Y(r,St),m=F.exports.useRef(!1);F.exports.useEffect(()=>{m.current=!0},[]);const _=Bt(o,s),L=B({},r,{anchor:s,elevation:S,open:i,variant:d},C),A=Et(L),R=t(Ft,B({elevation:d==="temporary"?S:0,square:!0},w,{className:$(A.paper,w.className),ownerState:L,children:x}));if(d==="permanent")return t(ce,B({className:$(A.root,A.docked,h),ownerState:L,ref:a},C,{children:R}));const H=t(f,B({in:i,direction:Ce[_],timeout:E,appear:m.current},b,{children:R}));return d==="persistent"?t(ce,B({className:$(A.root,A.docked,h),ownerState:L,ref:a},C,{children:H})):t(Dt,B({BackdropProps:B({},g,y,{transitionDuration:E}),className:$(A.root,A.modal,h),open:i,ownerState:L,onClose:D,hideBackdrop:k,ref:a},C,c,{children:H}))});var Mt=_t,Pt={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"}}]},name:"loading",theme:"outlined"},Lt=Pt,ke=function(e,a){return F.exports.createElement(Ie,ae(ae({},e),{},{ref:a,icon:Lt}))};ke.displayName="LoadingOutlined";var Ot=F.exports.forwardRef(ke);const Tt=n=>$e.get("/v1/resource/baidu/sug",{params:{wd:n}});function zt(n,e=300,a=[]){const{current:r}=F.exports.useRef({fn:n,timer:void 0});return F.exports.useEffect(function(){r.fn=n},[n]),F.exports.useCallback(function(...l){r.timer&&clearTimeout(r.timer),r.timer=setTimeout(()=>{r.fn(...l)},e)},a)}const It=g=>{var x=g,{open:n,anchorEl:e,wd:a,code:r,onSelect:o,onKeySelect:l}=x,s=I(x,["open","anchorEl","wd","code","onSelect","onKeySelect"]);const[h,S]=p.useState([]),[k,y]=p.useState({}),[D,i]=p.useState(null),[w,b]=p.useState(!1),f=zt(function(){E()},300),E=()=>{if(!a){S([]);return}b(!0),Tt(a).then(d=>{let c=d.data.data;S(c.sugs),y(c.engine),i(null),b(!1)})};return p.useEffect(()=>{f()},[a]),p.useEffect(()=>{var C;const d=h.length;let c=D===null?-1:D;if(d>0&&r){r==="ArrowDown"&&c++,r==="ArrowUp"&&c--,c>=d-1&&(c=0),c<0&&(c=d-1);const m=(C=h[c])==null?void 0:C.content;m&&(l(m),i(c))}},[r]),t(ve,{open:n&&a.length>0,anchorEl:e,transition:!0,placement:"bottom",container:e,className:"z-10 top-auto left-auto",children:({TransitionProps:d})=>t(be,O(M({},d),{className:"mt-1",style:{width:`${e==null?void 0:e.clientWidth}px`},children:t(Re,{spinning:w,indicator:t(Ot,{spin:!0}),children:h.length?v(J,{children:[t(He,{disablePadding:!0,children:h.map((c,C)=>t(rt,{button:!0,className:N({"bg-gray-100":D===C}),onClick:()=>{i(C),o(c.content)},children:c.content},C))}),v("p",{className:"px-5 py-2 text-right",children:["\u6570\u636E\u6765\u6E90\uFF1A",k.name]})]}):t(re,{image:re.PRESENTED_IMAGE_SIMPLE})})}))})},$t=n=>{const{width:e=300,anchorEl:a,open:r=!1,onBtnClick:o,onEngineSelect:l,engine:s}=n,[g,x]=F.exports.useState([]),[h,S]=F.exports.useState(""),[k,y]=p.useState([]),D=()=>{Ve().then(i=>{var f,E;const w=O(M({},s.engine),{classifyId:(E=(f=s.engine)==null?void 0:f.classify)==null?void 0:E._id});let b=i.map(d=>d.children).flat().filter(d=>{var c;return d._id!==((c=s.engine)==null?void 0:c._id)}).slice(0,s.indexCount-1);s.sortType==="count"&&(b=b.sort((d,c)=>c.count-d.count)),y([w,...b]),x(i),i.length>0&&S(i[0]._id)})};return F.exports.useEffect(()=>{var i,w,b,f;(w=(i=s==null?void 0:s.engine)==null?void 0:i.classify)!=null&&w._id&&S((f=(b=s==null?void 0:s.engine)==null?void 0:b.classify)==null?void 0:f._id),D()},[s]),v("div",{className:"mb-1",children:[t(ve,{open:r,anchorEl:a,placement:"top",children:({TransitionProps:i})=>{var w,b;return t(be,O(M({},i),{style:{width:`${a==null?void 0:a.clientWidth}px`},className:"mb-1",children:v("div",{className:"p-2 flex gap-2 items-start",children:[t("div",{className:"max-h-20 overflow-y-auto pr-1",children:g.map(f=>t("div",{onClick:()=>{S(f._id)},className:N("px-1.5 py-0.5 cursor-pointer rounded text-sm",h===f._id?"bg-primary text-white":"bg-white"),children:f.name},f._id))}),t("div",{className:"flex gap-1 items-start justify-start flex-grow",children:(b=(w=g.filter(f=>f._id===h))==null?void 0:w[0])==null?void 0:b.children.map(f=>{var E;return t("div",{className:N("px-1.5 py-0.5 cursor-pointer rounded text-sm",((E=s==null?void 0:s.engine)==null?void 0:E._id)===f._id?"bg-primary text-white":"bg-white border"),onClick:()=>{l(f)},children:f.name})})}),t(W,{onClick:()=>{o(!1)},size:"small",children:t(Ue,{})})]})}))}}),v("div",{className:"w-full text-left mb-1 flex justify-start items-center overflow-x-auto",children:[k.map(i=>{var w;return t(se,{className:N("mx-1",i._id===((w=s==null?void 0:s.engine)==null?void 0:w._id)?"bg-primary text-white":"bg-gray-100"),size:"small",label:i.name,onClick:b=>l(i)},i._id)}),s.mode==="custom"&&t(se,{onClick:i=>{o(!r)},className:N("mx-1","bg-gray-100"),size:"small",label:t("div",{className:"text-sm flex gap-1 items-center",children:t(we,{className:"text-base"})})})]})]})},Rt=n=>{const l=n,{inputRef:e,handleBtnClick:a}=l,r=I(l,["inputRef","handleBtnClick"]),{t:o}=Q();return v("div",{ref:e,className:"flex justify-center items-center rounded-md shadow-xl overflow-hidden",children:[t("input",M({className:"py-2 px-4 border-none leading-4 sm:leading-7 outline-none flex-grow rounded-tr-none rounded-br-none placeholder-gray-400 focus:placeholder-gray-200 transition-all",type:"text"},r)),v(X,{className:"w-16 sm:w-24 rounded-tl-none flex gap-2 items-center justify-center whitespace-nowrap leading-4 sm:leading-7 text-center tracking-widest rounded-bl-none bg-primary text-white",size:"large",variant:"contained",disableElevation:!0,onClick:a,children:[t(je,{}),o("sou-suo")]})]})},Ht=S=>{var k=S,{onChange:n,onPressEnter:e,onBtnClick:a,onFocus:r,onBlur:o,onArrow:l,value:s,defaultValue:g,primaryText:x}=k,h=I(k,["onChange","onPressEnter","onBtnClick","onFocus","onBlur","onArrow","value","defaultValue","primaryText"]);Q();const[y,D]=p.useState(g||s||""),[i,w]=p.useState({}),[b,f]=p.useState(!1),[E,d]=p.useState(""),[c,C]=p.useState(null),[m,_]=p.useState(null),z=p.useRef(null),[L,A]=p.useState(!1),R=u=>{D(u.target.value),d(u.target.value),n&&n(u,u.target.value,i.engine)},H=u=>{r&&r(u)},Se=u=>{o&&o(u)},Ee=u=>{u.code==="Enter"&&(e&&e(y,i.engine),window.open(`${i.engine.href}${y}`),oe(i.engine._id)),(u.code==="ArrowDown"||u.code==="ArrowUp")&&(l&&l(u.code),_(u.code))},De=u=>{_(null)},Fe=()=>{a&&a(y,i.engine),window.open(`${i.engine.href}${y}`),oe(i.engine._id)},Ae=()=>{We().then(u=>{w(u)})},Be=u=>{Ke(u._id).then(qt=>{w(O(M({},i),{engine:u}))})};return F.exports.useEffect(()=>{Ae()},[]),v("div",{className:"search-input max-w-2xl w-4/5",onFocus:u=>{f(!0),A(!1),C(u.currentTarget)},onBlur:u=>{u.currentTarget.contains(u.relatedTarget)||f(!1)},children:[t($t,{anchorEl:z==null?void 0:z.current,open:L,onBtnClick:u=>{A(u)},onEngineSelect:u=>{Be(u),A(!1)},engine:i}),t(Rt,M({inputRef:z,type:"text",value:y,onChange:R,onFocus:H,onBlur:Se,onKeyDown:Ee,onKeyUp:De,handleBtnClick:Fe},h)),t(It,{open:b,wd:E,code:m,anchorEl:c,onKeySelect:u=>{D(u)},onSelect:u=>{a&&a(u,i.engine)}})]})},Ut=({open:n,type:e,value:a,onClose:r,onSubmit:o})=>{const{Item:l}=q,s=q.useForm(),{handleSubmit:g,reset:x}=s,h=k=>{e==="del"&&a&&(k=a),o(k)},S=()=>{r(),x()};return p.useEffect(()=>{x(a)},[a]),t(qe,{title:e==="add"?"\u6DFB\u52A0\u7F51\u5740":"\u7F16\u8F91\u7F51\u5740",open:n,onCancel:S,onOk:()=>{g(h,k=>{console.log(k)})()},children:v(q,{form:s,size:"small",children:[t(l,{name:"name",label:"\u540D\u79F0",rules:{required:{value:!0,message:"\u8BF7\u8F93\u5165\u540D\u79F0"}},children:t(G,{fullWidth:!0,variant:"outlined",placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0"})}),t(l,{name:"url",label:"\u7F51\u5740",rules:{required:{value:!0,message:"\u8BF7\u8F93\u5165\u7F51\u5740"},pattern:{value:/^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,message:"\u7F51\u5740\u683C\u5F0F\u4E0D\u6B63\u786E"}},children:t(G,{fullWidth:!0,variant:"outlined",placeholder:"\u8BF7\u8F93\u5165\u7F51\u5740"})}),t(l,{name:"iconUrl",label:"\u56FE\u6807",rules:{pattern:{value:/^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,message:"\u56FE\u6807\u7F51\u5740\u683C\u5F0F\u4E0D\u6B63\u786E"}},children:t(G,{fullWidth:!0,variant:"outlined",placeholder:"\u8BF7\u8F93\u5165\u56FE\u6807\u5730\u5740"})})]})})},de=({type:n="view",item:e,onClick:a,onAdd:r,onEdit:o,onRemove:l})=>{const[s,g]=p.useState(null),x=y=>{y.stopPropagation(),g(y.currentTarget)},h=y=>{y.stopPropagation(),g(null)},S=()=>{g(null),o&&e&&o(e)},k=()=>{g(null),l&&e&&l(e._id)};return v(J,{children:[v("div",{className:N("cursor-pointer bg-transparent rounded shadow-none relative w-28 h-20 transition-all hover:bg-rgba-gray-3",P`
            &:hover {
              .handle-container {
                opacity: 1 !important;
              }
            }
          `),onClick:a,children:[v("div",{className:N(["content-container transition-all box-border flex flex-col items-center w-full h-full px-3 py-2 rounded",n==="add"?"justify-start text-primary":"justify-end"]),children:[t(Ge,{className:N("bg-white rounded mx-auto",{"text-primary":n==="add"},P`
                img {
                  max-width: 24px;
                  height: 24px;
                }
              `),variant:"rounded",src:e!=null&&e.iconUrl?e==null?void 0:e.iconUrl:Ye(e==null?void 0:e.url),onClick:r||void 0,children:n==="add"&&t(ht,{})}),t("p",{className:"text-center flex justify-center mt-1 w-full text-var-main-10",children:t("a",{className:"overflow-hidden text-ellipsis",children:e==null?void 0:e.name})})]}),n==="view"&&t("span",{className:"handle-container w-6 h-6 flex justify-center absolute top-1 right-1 z-10 opacity-0 transition-all",children:t(W,{className:"rounded",size:"small","aria-controls":`site-${e==null?void 0:e.name}-menu`,"aria-haspopup":"true",onClick:x,children:t(vt,{className:"text-var-main-10"})})})]}),t(Ze,{id:`site-${e==null?void 0:e.name}-menu`,open:Boolean(s),anchorEl:s,onClose:h,config:[{label:"\u4FEE\u6539",onClick:S,icon:mt},{label:"\u5220\u9664",onClick:k,icon:ft}]})]})},Vt=n=>{const{enqueueSnackbar:e}=Je(),[a,r]=p.useState(!1),[o,l]=p.useState("add"),[s,g]=p.useState({}),[x,h]=p.useState(!1),[S,k]=p.useState(""),[y,D]=p.useState([]),i=async()=>{const m=await st();D(m)},w=m=>{ot(m._id),window.open(Xe(m.url)),i()},b=()=>{l("add"),r(!0)},f=m=>{l("edit"),g(m),r(!0)},E=m=>{k(m),h(!0)},d=async()=>{await it(S)?(h(!1),i(),e("\u5220\u9664\u6210\u529F",{variant:"info",action:()=>t(X,{style:{color:"#fff"},onClick:async()=>{await lt()&&(e("\u64A4\u9500\u6210\u529F",{variant:"success"}),i())},children:"\u64A4\u9500"})})):e("\u5220\u9664\u5931\u8D25",{variant:"warning"})},c=()=>{r(!1),i(),g({_id:"",name:"",url:"",count:0})},C=async m=>{o==="add"&&(await ct(m)?(e("\u6DFB\u52A0\u6210\u529F",{variant:"success"}),c()):e("\u4FDD\u5B58\u5931\u8D25",{variant:"warning"})),o==="edit"&&(await dt(s._id,m)?(e("\u4FEE\u6539\u6210\u529F",{variant:"success"}),c()):e("\u4FDD\u5B58\u5931\u8D25",{variant:"warning"}))};return p.useEffect(()=>{i()},[]),v(J,{children:[v("div",{className:"flex justify-center items-end gap-2 h-full py-12",children:[y.map(m=>t(de,{item:m,onClick:()=>w(m),onEdit:f,onRemove:E},m._id)),t(de,{type:"add",onAdd:b})]}),t(Ut,{open:a,type:o,value:s,onSubmit:C,onClose:c}),t(Qe,{title:"\u5220\u9664",type:"warning",content:"\u662F\u5426\u5220\u9664\u6B64\u7F51\u5740",open:x,onOk:d,onCancel:()=>h(!1)})]})},jt={THEME_LIGHT:"light",THEME_DARK:"dark",THEME_INVERSE:"inverse"},V=(n,e=jt.THEME_ON_BACKGROUND)=>{const a=document.getElementById("IndexPage");n&&a?a.classList.add(e):!n&&a&&a.classList.remove(e)},Wt=n=>{const x=n,{anchor:e="right",title:a,fixedTitle:r=!1,titleStyle:o,width:l="378px",children:s}=x,g=I(x,["anchor","title","fixedTitle","titleStyle","width","children"]);return t(Mt,O(M({className:P`
        .MuiPaper-root {
          background-color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
        }
      `,anchor:e},g),{children:v("div",{className:N("flex flex-col h-screen",P`
            width: ${l};
          `),children:[a&&t("div",{className:N("font-semibold text-lg p-3 shadow-sm",o),children:a}),t("div",{className:N("p-3 flex-grow",r&&"overflow-y-auto"),children:s})]})}))},ue=n=>{var r;const{dataSource:e}=n,a=t(et,{children:t("a",{className:N("p-1.5 shadow-lg rounded text-center flex items-center justify-center",P`
            --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
              0 1px 2px 0 ${pt((r=e.color)!=null?r:"#000",.7).rgba} !important;
            border-bottom: 1px solid ${e.color};
            &:hover {
              color: ${e.color};
            }
          `),href:e.url,target:"_blank",children:t("div",{className:"overflow-hidden whitespace-nowrap text-ellipsis",children:e.name})})});return e.intro?t(Z,{title:v("div",{className:P`
            max-width: 256px;
          `,children:[t("p",{children:e.name}),t("div",{children:e.intro})]}),children:a}):a},Ne=(n,e)=>{var r;const a=n.children&&n.children.filter(o=>{var l;return(l=n.subClassify)==null?void 0:l.map(s=>s.path).every(s=>!o.classify.includes(s))});return t("div",{className:N(!e&&"shadow p-2 mb-2 rounded"),children:v("div",{children:[(r=n.subClassify)==null?void 0:r.map((o,l)=>{var s;return v("div",{children:[t("div",{className:N("font-semibold mb-3"),children:o.name}),o.children&&o.children.length>0&&t("div",{className:"grid gap-2.5 grid-cols-3 mb-3",children:(s=o.children)==null?void 0:s.map((g,x)=>t(ue,{dataSource:g},x))}),Ne(o,n)]},l)}),a&&a.length>0&&(n==null?void 0:n.level)===1&&v("div",{className:P`
                margin-top: 16px;
              `,children:[t("div",{className:N("font-semibold mb-3"),children:"\u672A\u5206\u7C7B"}),t("div",{className:"grid gap-2.5 grid-cols-3 mb-3",children:a.map(o=>t(ue,{dataSource:o},o.id))})]})]})},n.path+e)},Kt=n=>{const e=xe();return t(Wt,O(M({ModalProps:{keepMounted:!0},fixedTitle:!0,titleStyle:P`
        padding-top: 4px !important;
        padding-bottom: 4px !important;
      `,title:v("div",{className:"flex justify-between items-center",children:[t("div",{className:"text-lg font-semibold",children:"\u5BFC\u822A"}),t(X,{onClick:()=>{e("/navigation/*")},children:"\u66F4\u591A"})]})},n),{children:ut.map((a,r)=>v("div",{children:[t("div",{className:"text-base font-bold mb-2",children:a.name}),a.intro&&t("div",{className:"mb-2",children:a.intro}),Ne(a)]},r))}))},Jt=n=>{const e=xe(),{t:a,i18n:r}=Q(),o=p.useRef(null),[l,s]=p.useState(),[g,x]=p.useState(!1),[h,S]=p.useState({type:"clock",show:!0}),[k,y]=p.useState({}),[D,i]=p.useState(!1),w=()=>{const d=localStorage.getItem("account");if(!d)return;const c=le(d,"logo");S(c)},b=()=>{var C,m;const d=((m=(C=h==null?void 0:h.config)==null?void 0:C.clock)==null?void 0:m.type)||"clock1",c=ie.find(_=>_.value===d);return t("div",{className:N("delay-75 transform duration-300",g?"scale-50":"scale-100"),children:p.createElement(c?c.component:ie[0].component)})},f=()=>{const d=localStorage.getItem("account");if(!d)return;const c=le(d,"navigation");y(c)},E=()=>{const d=nt(),c=d.background;if(d&&c)switch(c.type){case"random":V(!0,"inverse"),s(d.background.data);break;case"everyday":V(!0,"inverse"),at().then(C=>{s(C.data.data[0])});break;case"link":V(!0,"inverse"),s(d.background.data);break;case"color":V(!1);break}};return p.useEffect(()=>{E(),w(),f()},[]),v("div",{id:"IndexPage",className:"index-page flex flex-col h-screen bg-cover bg-center bg-secondary",style:{backgroundImage:l?`radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%), radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%), url('${l==null?void 0:l.url}')`:void 0},children:[v("div",{className:"index-navbar-box flex-grow max-h-12 text-right align-middle",children:[t(Z,{title:"\u7F51\u5740\u5BFC\u822A",children:t(W,{onClick:()=>{var c;switch((c=k.type)!=null?c:"page"){case"drawer":i(!0);break;case"page":default:e("/navigation/*");break}},children:t(gt,{className:N({"text-var-main-10":!!l})})})}),t(Z,{title:"\u8BBE\u7F6E",children:t(W,{onClick:()=>e("/setting"),children:t(we,{className:N({"text-var-main-10":!!l})})})})]}),t("div",{ref:o,className:N("index-logo-box items-center flex justify-center transition-all duration-300",g&&h.show?"grow-0":"flex-grow",h.show?"max-h-48 sm:max-h-72":"max-h-32"),style:{height:g&&o&&o.current?`${o.current.clientHeight*.5}px`:"100%"},children:h.show&&h.type==="clock"&&b()}),t("div",{className:"index-input-box flex-grow max-h-20 flex justify-center items-center",children:t(Ht,{placeholder:a("placeholder.qing-shu-ru-sou-suo-nei-rong")})}),t("div",{className:"index-content-box flex-grow",children:t(Vt,{})}),t("div",{className:"index-copyright-box flex-grow max-h-8 text-center leading-8",children:t(tt,{})}),t(Kt,{open:D,onClose:()=>i(!1)})]})};export{Jt as default};
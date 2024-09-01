"use strict";(self.webpackChunkproject_docs=self.webpackChunkproject_docs||[]).push([[8579],{5676:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>t,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>d});var i=s(4848),r=s(8453);const o={sidebar_position:2},t="\u5b89\u88c5\u4f7f\u7528",c={id:"PermissionCore/install",title:"\u5b89\u88c5\u4f7f\u7528",description:"\u7528\u6237",source:"@site/docs/PermissionCore/install.md",sourceDirName:"PermissionCore",slug:"/PermissionCore/install",permalink:"/projects-docs/docs/PermissionCore/install",draft:!1,unlisted:!1,editUrl:"https://github.com/engsr6982/projects-docs/tree/main/docs/PermissionCore/install.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"auto",previous:{title:"PermissionCore",permalink:"/projects-docs/docs/PermissionCore/"},next:{title:"\u547d\u4ee4\u8be6\u89e3",permalink:"/projects-docs/docs/PermissionCore/command"}},l={},d=[{value:"\u7528\u6237",id:"\u7528\u6237",level:2},{value:"\u5f00\u53d1\u8005",id:"\u5f00\u53d1\u8005",level:2}];function a(e){const n={a:"a",admonition:"admonition",br:"br",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"\u5b89\u88c5\u4f7f\u7528",children:"\u5b89\u88c5\u4f7f\u7528"}),"\n",(0,i.jsx)(n.h2,{id:"\u7528\u6237",children:"\u7528\u6237"}),"\n",(0,i.jsx)(n.p,{children:"\u4f7f\u7528 Lip \u4e00\u952e\u5b89\u88c5"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"lip install github.com/engsr6982/PermissionCore\n"})}),"\n",(0,i.jsxs)(n.p,{children:["\u5b89\u88c5\u63d2\u4ef6\u540e\u542f\u52a8\u670d\u52a1\u5668\uff0c\u63a7\u5236\u53f0\u8f93\u5165",(0,i.jsx)(n.code,{children:"? permc"}),"\u67e5\u770b\u547d\u4ee4\u5217\u8868"]}),"\n",(0,i.jsx)(n.h2,{id:"\u5f00\u53d1\u8005",children:"\u5f00\u53d1\u8005"}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["\u4ee5\u4e0b\u662f\u6309\u7167\u4f20\u7edf\u7684 submodule \u5f62\u5f0f\u4f7f\u7528 PermissionCore",(0,i.jsx)(n.br,{}),"\n","\u5982\u679c\u9700\u8981 xmake \u6765\u7ba1\u7406 PermissionCore\uff0c\u8bf7\u53c2\u8003\u6d4b\u8bd5\u4ed3\u5e93\u7684",(0,i.jsx)(n.a,{href:"https://github.com/engsr6982/PermissionCoreTest/blob/main/xmake.lua",children:"xmake.lua"}),"\nxmake\u7ba1\u7406\u5305\uff0c\u8bbe\u7f6e\u7248\u672c\u53ea\u9700\u8981\u4fee\u6539setversion\u5b57\u6bb5\uff0c\u586b\u5165\u5bf9\u5e94\u7248\u672c\u548cRelease\u63d0\u4f9b\u7684SDK\u7684sha256\u503c\u5373\u53ef"]})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Step1:"}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["\u4ece",(0,i.jsx)(n.code,{children:"Release"}),"\u4e0b\u8f7d",(0,i.jsx)(n.code,{children:"SDK"}),"\uff0c\u89e3\u538b\u5230\u4f60\u7684\u9879\u76ee\u4ed3\u5e93\u6839\u76ee\u5f55\u7684",(0,i.jsx)(n.code,{children:"SDK_PermissonCore"}),"\u4e0b"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-file",children:"project:\n\u251c\u2500SDK_PermissionCore\n\u2502    \u2502  include_all.h\n\u2502    \u2502\n\u2502    \u251c\u2500Lib\n\u2502    \u2502      PermissionCore.lib\n\u2502    \u2502\n\u2502    \u2514\u2500PermissionCore\n\u2502        \u251c\u2500PermissionCore\n\u2502        \u2502      PermissionCore.h\n\u2502        \u2502\n\u2502        \u2514\u2500Registers\n\u2502                Registers.h\n\u2502\n\u251c\u2500src\n...\u7701\u7565\u5176\u4ed6\u5185\u5bb9\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Step2:"}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["\u6253\u5f00",(0,i.jsx)(n.code,{children:"xmake.lua"}),"\uff0c\u5728",(0,i.jsx)(n.code,{children:"target"}),"\u540e\u9762\u52a0\u4e0a"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-lua",children:'target("Levilamina-Plugin-Template")\n    add_includedirs(\n        "SDK_PermissonCore", -- \u8ba9xmake\u8bc6\u522b\u5230\u5934\u6587\u4ef6\n        "src"\n    )\n    add_links(\n        "SDK_PermissonCore/Lib/PermissionCore" -- \u4e3a\u7f16\u8bd1\u94fe\u63a5\u5e93\n    )\n    -- \u7701\u7565\u5176\u4ed6\u5185\u5bb9\n'})})]})}function m(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>c});var i=s(6540);const r={},o=i.createContext(r);function t(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);
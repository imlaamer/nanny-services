import{u as l,b as s,s as f,c as p,d as u,e as g,f as m,r as o,a as x,g as N,j as n,C as d}from"./index-9652b6a9.js";import{u as h,D as j,N as v}from"./NanniesList-731b64b3.js";const D="_nannies_snkkp_1",E={nannies:D},k=()=>{const e=l(),a=h().pathname==="/favorites",i=s(f),c=s(p),r=s(u),t=s(g);return s(m),o.useEffect(()=>{e(x())},[e,a]),o.useEffect(()=>{t||e(N()).then(L=>{console.log("nannies get ")})},[e,r,t]),n.jsx("section",{className:E.nannies,children:n.jsxs(d,{className:"nanies-page-container",children:[n.jsx(j,{isFavoritesPage:a}),n.jsx(v,{nannies:c,isFavoritesPage:a,favorites:i})]})})};export{k as default};
import{u as r,b as i,r as l,a as v,s as x,j as n,C as d,I as h}from"./index-79806195.js";import{u as F,a as p,s as f,b as _,D as j,N as m}from"./NanniesList-8007a812.js";const g="_noFavsBox_1pfts_1",u="_noFavsContainer_1pfts_11",N="_noFavsText_1pfts_18",S="_favoritesSection_1pfts_25",e={noFavsBox:g,noFavsContainer:u,noFavsText:N,favoritesSection:S},T=()=>{const a=r(),o=F().pathname==="/favorites",c=i(p),s=i(f),t=i(_);return l.useEffect(()=>{a(v()),a(x())},[a,o]),n.jsx("section",{className:e.favoritesSection,children:n.jsxs(d,{className:"favorites-page-container",children:[n.jsx(j,{isFavoritesPage:o,favorites:s}),(s==null?void 0:s.length)!==0&&n.jsx(m,{nannies:c,isFavoritesPage:o,favorites:s,sortedFavorites:t}),!(s!=null&&s.length)===0&&(t==null?void 0:t.length)===0&&n.jsx("div",{style:{fontSize:22,textAlign:"center"},children:"We didn`t find anything"}),(s==null?void 0:s.length)===0&&n.jsx("div",{className:e.noFavsBox,children:n.jsxs("div",{className:e.noFavsContainer,children:[n.jsx("span",{className:e.noFavsText,children:"You don`t have any favorites yet"}),n.jsx(h,{id:"heart-red",height:"120",width:"120"})]})})]})})};export{T as default};
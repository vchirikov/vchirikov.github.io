import{u as l,e as d,k as u,c as e,Q as m,R as n,U as p,h as c,g as $,d as y,V as h,t as f}from"./chunk-4f12729c.js";import"./chunk-b9674078.js";function _(t){return t.replace(/\/*$/,"/")}const S=f('<script type="application/ld+json"><\/script>',2),D=t=>{const i=l(),{LL:r,locale:g}=d(),{urlPathname:s}=u(),a=`${i.servedUrl}${_(s)}`;return[e(m,{get children(){return`${t.title} | ${r().site_title()}`}}),e(n,{name:"description",get content(){return t.description??r().meta_description()}}),e(n,{name:"author",get content(){return r().author()}}),e(n,{property:"og:url",content:a}),e(n,{property:"og:title",get content(){return`${t.title}. ${t.description??r().meta_description()}`}}),e(n,{property:"og:description",get content(){return t.description??r().meta_description()}}),e(n,{property:"og:locale",get content(){return g()}}),e(n,{property:"og:site_name",get content(){return r().site_title()}}),e(c,{get when(){return t.canonical},get children(){return e(p,{rel:"canonical",get href(){return t.canonical}})}}),e(c,{get when(){return t.post},get fallback(){return e(n,{property:"og:type",content:"website"})},get children(){return[e(n,{property:"og:type",content:"article"}),e(n,{property:"og:image",get content(){return`${i.servedUrl}/${t.post.image}.og.png`}}),e(n,{name:"twitter:card",content:"summary_large_image"}),e(n,{property:"article:published_time",get content(){return new Date(t.post.date||new Date).toISOString()}}),e(n,{property:"article:modified_time",get content(){return new Date(t.post.modified_date||new Date).toISOString()}}),(()=>{const o=$(S);return y(()=>h(o,`
        {
          "description": ${JSON.stringify(t.description??r().meta_description())},
          "author": {
            "@type": "Person",
            "name": ${JSON.stringify(r().author())}
          },
          "@type": "BlogPosting",
          "url": "${a}",
          "publisher": {
            "@type": "Organization",
            "logo": {
              "@type": "ImageObject",
              "url": "${i.servedUrl}/${t.post.image}.og.png"
            },
            "name": ${JSON.stringify(r().author())}
          },
          "headline": ${JSON.stringify(`${t.title} | ${r().site_title()}`)},
          "image": ["${i.servedUrl}/${t.post.image}"],
          "datePublished": "${new Date(t.post.date||new Date).toISOString()}",
          "dateModified": "${new Date(t.post.modified_date||new Date).toISOString()}",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${a}"
          },
          "@context": "http://schema.org"
        }`)),o})()]}})]};export{D as P};

"use strict";(()=>{var e={};e.id=925,e.ids=[925],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},79:e=>{e.exports=import("openai")},249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},632:(e,t,n)=>{n.a(e,async(e,a)=>{try{n.r(t),n.d(t,{config:()=>l,default:()=>d,routeModule:()=>c});var s=n(802),i=n(153),r=n(249),o=n(321),u=e([o]);o=(u.then?(await u)():u)[0];let d=(0,r.l)(o,"default"),l=(0,r.l)(o,"config"),c=new s.PagesAPIRouteModule({definition:{kind:i.x.PAGES_API,page:"/api/ask",pathname:"/api/ask",bundlePath:"",filename:""},userland:o});a()}catch(e){a(e)}})},321:(e,t,n)=>{n.a(e,async(e,a)=>{try{n.r(t),n.d(t,{default:()=>r});var s=n(79),i=e([s]);let o=new(s=(i.then?(await i)():i)[0]).Configuration({apiKey:process.env.OPENAI_API_KEY}),u=new s.OpenAIApi(o);async function r(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});let{question:n}=e.body;if(!n||0===n.trim().length)return t.status(400).json({error:"Question is required"});try{let e=`
You are an assistant that decides if a communication should be an EMAIL or a MEETING.
Use these rules:
- If the message is short, simple, and doesn't need back-and-forth, choose EMAIL.
- If the message is complex, sensitive, or requires discussion, choose MEETING.
Then, generate a short explanation and a sample message to send, including subject line if email.

Message:
"""${n}"""
Answer in this format:

Decision: EMAIL or MEETING
Explanation: <short explanation>
Sample Subject: <subject line if email>
Sample Message:
<message body>
`,a=(await u.createCompletion({model:"text-davinci-003",prompt:e,max_tokens:300,temperature:.3})).data.choices[0].text.trim();t.status(200).json({answer:a})}catch(e){console.error(e),t.status(500).json({error:"OpenAI request failed"})}}a()}catch(e){a(e)}})},153:(e,t)=>{var n;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(n||(n={}))},802:(e,t,n)=>{e.exports=n(145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var n=t(t.s=632);module.exports=n})();
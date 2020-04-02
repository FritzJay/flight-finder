(this["webpackJsonpflight-finder"]=this["webpackJsonpflight-finder"]||[]).push([[0],{100:function(e,a,t){e.exports=t(113)},109:function(e,a,t){},113:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(25),c=t(11),i=t.n(c),o=(t(109),t(54)),u=t(165),s=t(176),m=t(177),d=t(173),g=t(114),p=t(188),h=t(178),f=t(185),E=t(175),b=t(115),v=t(179),y=t(34),S=t.n(y),O=t(45),T=t(26),j=t(174),C=t(192),F=t(82),w=t.n(F),N=t(17),x=t(180),k=t(84),_=t(19),I=t(184),D=t(181),L=t(164),R=function(e){var a=e.value,t=e.handleChange,n=e.label,l=r.a.useState([]),c=Object(T.a)(l,2),i=c[0],o=c[1],u=r.a.useState(!1),s=Object(T.a)(u,2),m=s[0],d=s[1],g=function(){var e=Object(O.a)(S.a.mark((function e(a){var t,n,r;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==a.target.value){e.next=2;break}return e.abrupt("return");case 2:return d(!0),e.next=5,fetch("".concat("https://fritzjay-flight-finder-api.herokuapp.com",'/airports?queryparams={"searchString":"').concat(a.target.value,'"}'));case 5:return t=e.sent,e.next=8,t.json();case 8:n=e.sent,r=[],n.forEach((function(e){var a=e.Display,t=e.nearbyAirports,n=e.LocID;null===t||void 0===t||t.forEach((function(e){var t=e.code,l=e.name;return r.push({code:t,name:l,locID:n,city:a})})),o([].concat(r)),d(!1)}));case 11:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return r.a.createElement(D.a,{id:n.toLowerCase().replace(" ","-"),getOptionSelected:function(e,a){return e.name===a.name},getOptionLabel:function(e){return"".concat(e.code.toLocaleUpperCase()," - ").concat(e.name)},freeSolo:!0,clearOnEscape:!0,value:a,onChange:function(e,a){t(a)},options:i,loading:m,groupBy:function(e){return e.city},renderInput:function(e){return r.a.createElement(I.a,Object.assign({},e,{label:n,required:!0,variant:"outlined",onChange:g,InputProps:Object(_.a)({},e.InputProps,{endAdornment:r.a.createElement(r.a.Fragment,null,m?r.a.createElement(L.a,{color:"inherit",size:20}):null,e.InputProps.endAdornment)})}))}})},A=t(187),B=t(166),P=t(167),M=t(168),W=t(169),q=t(170),z=t(191),G=t(171),H=t(172),U=t(183);function V(e,a,t){return a[t]<e[t]?-1:a[t]>e[t]?1:0}var J=[{id:"airline",numeric:!1,label:"Airline"},{id:"cabin",numeric:!1,label:"Cabin"},{id:"grade",numeric:!1,label:"Grade"},{id:"duration",numeric:!1,label:"Duration"},{id:"stops",numeric:!0,label:"Stops"},{id:"fare",numeric:!0,label:"Fare"}],Y=J.length,$=Object(u.a)((function(e){return Object(A.a)({visuallyHidden:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",top:20,width:1},selected:{backgroundColor:e.palette.primary.light,color:e.palette.primary.contrastText}})})),K=function(e){var a=e.data,t=e.loading,l=e.selectedFlight,c=e.handleSelectFlight,i=$(),o=Object(n.useState)("asc"),u=Object(T.a)(o,2),s=u[0],m=u[1],d=Object(n.useState)("fare"),g=Object(T.a)(d,2),p=g[0],h=g[1],f=Object(n.useState)(0),E=Object(T.a)(f,2),v=E[0],y=E[1],S=Object(n.useState)(10),O=Object(T.a)(S,2),j=O[0],C=O[1],F=0===a.length&&null!==l?[l]:a;return r.a.createElement(B.a,null,r.a.createElement(b.a,{variant:"h6",style:{margin:"2rem"}},"Available Flights"),r.a.createElement(P.a,{size:"small","aria-label":"available flights"},r.a.createElement(M.a,null,r.a.createElement(W.a,null,J.map((function(e){var a=e.id,t=e.label,n=e.numeric;return r.a.createElement(q.a,{key:a,align:n?"right":"left",sortDirection:p===a&&s},r.a.createElement(z.a,{active:p===a,direction:p===a?s:"asc",onClick:function(){return m(p===(e=a)&&"asc"===s?"desc":"asc"),void h(e);var e}},t,p===a?r.a.createElement("span",{className:i.visuallyHidden},"desc"===s?"sorted descending":"sorted ascending"):null))})))),r.a.createElement(G.a,null,0===F.length&&!t&&r.a.createElement(W.a,{tabIndex:-1},r.a.createElement(q.a,{colSpan:Y},"There are no flights available at this time.")),t?r.a.createElement(W.a,null,r.a.createElement(q.a,{colSpan:Y,style:{textAlign:"center"}},r.a.createElement(L.a,{size:36}))):function(e,a){var t=e.map((function(e,a){return[e,a]}));return t.sort((function(e,t){var n=a(e[0],t[0]);return 0!==n?n:e[1]-t[1]})),t.map((function(e){return e[0]}))}(F,function(e,a){return"desc"===e?function(e,t){return V(e,t,a)}:function(e,t){return-V(e,t,a)}}(s,p)).slice(v*j,v*j+j).map((function(e){return r.a.createElement(W.a,{hover:(null===l||void 0===l?void 0:l.id)!==e.id,className:(null===l||void 0===l?void 0:l.id)===e.id?i.selected:"",onClick:function(){return(null===l||void 0===l?void 0:l.id)===e.id?c(null):c(e)},tabIndex:-1,key:e.id},r.a.createElement(q.a,null,e.airline),r.a.createElement(q.a,{align:"left"},e.cabin),r.a.createElement(q.a,{align:"left"},e.grade),r.a.createElement(q.a,{align:"left"},"".concat(Math.floor(e.duration/60),"h ").concat(e.duration%60,"m")),r.a.createElement(q.a,{align:"right"},e.stops),r.a.createElement(q.a,{align:"right"},e.fare.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2})))}))),r.a.createElement(H.a,null,r.a.createElement(W.a,null,r.a.createElement(U.a,{colSpan:Y,count:F.length,rowsPerPage:j,page:v,onChangePage:function(e,a){return y(a)},onChangeRowsPerPage:function(e){C(parseInt(e.target.value,10)),y(0)}})))))},Q=function(){var e=Object(O.a)(S.a.mark((function e(a,t,n,r,l){var c,i,o;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://fritzjay-flight-finder-api.herokuapp.com"+"/flights?queryparams=".concat(X(a,t,n,r,l)));case 2:return c=e.sent,e.next=5,c.json();case 5:return i=e.sent,console.log(i),o=[],i.flights.forEach((function(e){var a=e.airlineName,t=e.flightGrade,n=e.duration,r=e.numStops;return e.fares.forEach((function(e){var l=e.totalFare,c=e.seatsBySegment,i=e.itineraryFlights;return o.push({id:i[0],airline:a,grade:t,duration:n,stops:r,fare:l,cabin:c.reduce((function(e,a){return"".concat(e,"/").concat(a.cabin)}),"").substring(1)})}))})),e.abrupt("return",o);case 10:case"end":return e.stop()}}),e)})));return function(a,t,n,r,l){return e.apply(this,arguments)}}(),X=function(e,a,t,n,r){var l=Z(e,a,t),c=ee(n,r);return"{".concat(l,",").concat(c,',"airlineView":"DL","legNum":1}')},Z=function(e,a,t){return'"legs":[{"date":"'.concat(t.toISOString().split("T")[0],'",')+'"fromLocId":"'.concat(e.locID,'","toLocId":"').concat(a.locID,'"}]')},ee=function(e,a){return'"filters":{"timeFilters":[{"departFromTime":"'.concat(e,'","departToTime":"').concat(a,'"}]}')},ae=Q,te={from:null,to:null,date:new Date(Date.now()),timeRange:[0,2400],selectedFlight:null},ne=function(e){return 0===e||2400===e?"12am":e>1200?"".concat(e/100%12,"pm"):"".concat(e/100,"am")},re=function(){var e=r.a.useState(!1),a=Object(T.a)(e,2),t=a[0],n=a[1],c=r.a.useState([]),i=Object(T.a)(c,2),o=i[0],u=i[1],s=function(){var e=Object(l.b)();return Object(l.c)((function(a){return{from:a.flights.from,to:a.flights.to,date:a.flights.date,timeRange:a.flights.timeRange,selectedFlight:a.flights.selectedFlight,handleToChange:function(a){return e(function(e){return{type:"SET_TO",payload:e}}(a))},handleFromChange:function(a){return e(function(e){return{type:"SET_FROM",payload:e}}(a))},handleDateChange:function(a){return e(function(e){return{type:"SET_DATE",payload:e}}(a))},handleTimeRangeChange:function(a){return e(function(e){return{type:"SET_TIME_RANGE",payload:e}}(a))},handleSelectFlight:function(a){return e(function(e){return{type:"SET_SELECTED_FLIGHT",payload:e}}(a))}}}))}(),m=s.from,d=s.to,g=s.date,p=s.timeRange,h=s.selectedFlight,f=s.handleToChange,v=s.handleFromChange,y=s.handleDateChange,F=s.handleTimeRangeChange,_=s.handleSelectFlight,I=r.a.useCallback(Object(O.a)(S.a.mark((function e(){return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==m&&null!==d&&null!==g){e.next=2;break}return e.abrupt("return");case 2:return n(!0),e.t0=u,e.next=6,ae(m,d,g,p[0],p[1]);case 6:e.t1=e.sent,(0,e.t0)(e.t1),n(!1);case 9:case"end":return e.stop()}}),e)}))),[m,d,g,p]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(j.a,{container:!0,spacing:3,justify:"space-evenly"},r.a.createElement(j.a,{item:!0,xs:12,sm:6},r.a.createElement(R,{value:m,handleChange:v,label:"Flying from"})),r.a.createElement(j.a,{item:!0,xs:12,sm:6},r.a.createElement(R,{value:d,handleChange:f,label:"Destination"})),r.a.createElement(N.a,{utils:k.a},r.a.createElement(j.a,{item:!0,xs:12},r.a.createElement(x.a,{required:!0,label:"Departing Date",inputVariant:"outlined",value:g,onChange:y,showTodayButton:!0,style:{width:"100%"}})),r.a.createElement(j.a,{item:!0,xs:8,container:!0,spacing:1,justify:"center",alignItems:"center"},r.a.createElement(j.a,{item:!0,xs:2},r.a.createElement(b.a,{variant:"h6",align:"center"},ne(p[0]))),r.a.createElement(j.a,{item:!0,xs:2,style:{textAlign:"center"}},r.a.createElement(w.a,{fontSize:"large"})),r.a.createElement(j.a,{item:!0,xs:2},r.a.createElement(b.a,{variant:"h6",align:"center"},ne(p[1]))),r.a.createElement(C.a,{value:p,onChange:function(e,a){return F(a)},step:100,min:0,max:2400,marks:[{value:0,label:"12am"},{value:2400,label:"12am"}],valueLabelDisplay:"auto","aria-labelledby":"range-slider",getAriaValueText:ne})),r.a.createElement(j.a,{item:!0,xs:12},r.a.createElement(E.a,{variant:"contained",color:"secondary",disabled:t,onClick:function(){return I()}},"Search"))),r.a.createElement(j.a,{item:!0,xs:12},(o.length>0||null!==h||t)&&r.a.createElement(K,{data:o,selectedFlight:h,handleSelectFlight:_,loading:t}))))},le={fName:null,lName:null,so:null},ce=function(){var e=function(){var e=Object(l.b)();return Object(l.c)((function(a){return{fName:a.information.fName,lName:a.information.lName,so:a.information.so,handleFirstNameChange:function(a){return e({type:"SET_FIRST_NAME",payload:""===a.target.value?null:a.target.value})},handleLastNameChange:function(a){return e({type:"SET_LAST_NAME",payload:""===a.target.value?null:a.target.value})},handleSOChange:function(a){return e({type:"SET_SO",payload:""===a.target.value?null:a.target.value})}}}))}(),a=e.fName,t=e.lName,n=e.so,c=e.handleFirstNameChange,i=e.handleLastNameChange,o=e.handleSOChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement(b.a,{variant:"h6",gutterBottom:!0},"Your Information"),r.a.createElement(j.a,{container:!0,spacing:3},r.a.createElement(j.a,{item:!0,xs:12,sm:6},r.a.createElement(I.a,{required:!0,id:"firstName",name:"firstName",label:"First name",fullWidth:!0,autoComplete:"fname",value:a||"",onChange:c})),r.a.createElement(j.a,{item:!0,xs:12,sm:6},r.a.createElement(I.a,{required:!0,id:"lastName",name:"lastName",label:"Last name",fullWidth:!0,autoComplete:"lname",value:t||"",onChange:i})),r.a.createElement(j.a,{item:!0,xs:12},r.a.createElement(I.a,{required:!0,id:"so",name:"so",label:"SO",fullWidth:!0,autoComplete:"so",value:n||"",onChange:o}))))},ie=function(e){return{type:"SET_STEP",payload:e}},oe={step:0},ue=Object(u.a)((function(e){return{appBar:{position:"relative"},layout:Object(o.a)({width:"auto",marginLeft:e.spacing(2),marginRight:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(2)),{width:800,marginLeft:"auto",marginRight:"auto"}),paper:Object(o.a)({marginTop:e.spacing(3),marginBottom:e.spacing(3),padding:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(3)),{marginTop:e.spacing(6),marginBottom:e.spacing(6),padding:e.spacing(3)}),stepper:{padding:e.spacing(3,0,5)},buttons:{display:"flex",justifyContent:"flex-end"},button:{marginTop:e.spacing(3),marginLeft:e.spacing(1)}}})),se=["Information","Flights","Lodging","Car Rentals"],me=function(){var e=ue(),a=function(){var e=Object(l.b)();return Object(l.c)((function(a){return{step:a.system.step,handleNext:function(){return e(ie(a.system.step+1))},handleBack:function(){return e(ie(a.system.step-1))}}}))}(),t=a.step,n=a.handleBack,c=a.handleNext;return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,null),r.a.createElement(m.a,{position:"absolute",color:"default",className:e.appBar},r.a.createElement(d.a,null,r.a.createElement(b.a,{variant:"h6",color:"inherit",noWrap:!0},"Flight Finder"))),r.a.createElement("main",{className:e.layout},r.a.createElement(g.a,{className:e.paper},r.a.createElement(b.a,{component:"h1",variant:"h4",align:"center"},"Book Flights"),r.a.createElement(p.a,{activeStep:t,className:e.stepper},se.map((function(e){return r.a.createElement(h.a,{key:e},r.a.createElement(f.a,null,e))}))),r.a.createElement(r.a.Fragment,null,t===se.length?r.a.createElement(r.a.Fragment,null,r.a.createElement(b.a,{variant:"h5",gutterBottom:!0},"Thank you for your order."),r.a.createElement(b.a,{variant:"subtitle1"},"Your order number is #2001539. We have emailed your order confirmation, and will send you an update when your order has shipped.")):r.a.createElement(r.a.Fragment,null,function(e){switch(e){case 0:return r.a.createElement(ce,null);case 1:return r.a.createElement(re,null);case 2:return r.a.createElement("div",null,"Lodging");case 3:return r.a.createElement("div",null,"Car Rentals");default:throw new Error("Unknown step")}}(t),r.a.createElement("div",{className:e.buttons},0!==t&&r.a.createElement(E.a,{onClick:n,className:e.button},"Back"),r.a.createElement(E.a,{variant:"contained",color:"primary",onClick:c,className:e.button},t===se.length-1?"Place order":"Next"))))),r.a.createElement(b.a,{variant:"body2",color:"textSecondary",align:"center"},"Powered By ",r.a.createElement(v.a,{color:"inherit",href:"https://www.certify.com/"},"Certify Travel"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var de=t(44),ge=t(83),pe=Object(de.combineReducers)({system:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:oe,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_STEP":return Object(_.a)({},e,{step:a.payload});default:return e}},flights:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:te,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_FROM":return Object(_.a)({},e,{from:a.payload});case"SET_TO":return Object(_.a)({},e,{to:a.payload});case"SET_DATE":return Object(_.a)({},e,{date:a.payload});case"SET_TIME_RANGE":return Object(_.a)({},e,{timeRange:a.payload});case"SET_SELECTED_FLIGHT":return Object(_.a)({},e,{selectedFlight:a.payload});default:return e}},information:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:le,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_FIRST_NAME":return Object(_.a)({},e,{fName:a.payload});case"SET_LAST_NAME":return Object(_.a)({},e,{lName:a.payload});case"SET_SO":return Object(_.a)({},e,{so:a.payload});default:return e}}}),he=Object(de.createStore)(pe,Object(ge.composeWithDevTools)());i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(l.a,{store:he},r.a.createElement(me,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[100,1,2]]]);
//# sourceMappingURL=main.4ab5a126.chunk.js.map
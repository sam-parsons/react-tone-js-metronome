(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(8),r=n.n(i),s=(n(14),n(1)),c=n(2),l=n(4),u=n(3),p=n(5),h=(n(16),function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("div",null))}}]),t}(o.a.Component)),m=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"num-beats-div"},o.a.createElement("select",{id:"num-beats-input",defaultValue:"4",onChange:function(){e.props.updateTimeSig()}},o.a.createElement("option",{value:"2"},"2"),o.a.createElement("option",{value:"3"},"3"),o.a.createElement("option",{value:"4"},"4"),o.a.createElement("option",{value:"5"},"5"),o.a.createElement("option",{value:"6"},"6"),o.a.createElement("option",{value:"7"},"7"),o.a.createElement("option",{value:"8"},"8"),o.a.createElement("option",{value:"9"},"9"),o.a.createElement("option",{value:"10"},"10"),o.a.createElement("option",{value:"11"},"11"),o.a.createElement("option",{value:"12"},"12"),o.a.createElement("option",{value:"13"},"13"),o.a.createElement("option",{value:"14"},"14"),o.a.createElement("option",{value:"15"},"15"),o.a.createElement("option",{value:"16"},"16"),o.a.createElement("option",{value:"17"},"17"),o.a.createElement("option",{value:"18"},"18"),o.a.createElement("option",{value:"20"},"20"),o.a.createElement("option",{value:"19"},"19")),o.a.createElement("div",{id:"num-beats-desc"},"# of beats"))}}]),t}(o.a.Component),d=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("button",{className:"top-btns",id:"record-btn",onClick:function(){return e.props.exportMeasure()}},"Export")}}]),t}(o.a.Component),v=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"subdivision-div"},o.a.createElement("select",{id:"subdivision-input",defaultValue:"2",onChange:function(){return e.props.updateTimeSig()}},o.a.createElement("option",{value:"1"},"2"),o.a.createElement("option",{value:"2"},"4"),o.a.createElement("option",{value:"3"},"8"),o.a.createElement("option",{value:"4"},"16"),o.a.createElement("option",{value:"5"},"32")),o.a.createElement("div",{id:"subdivision-desc"},"subdivision"))}}]),t}(o.a.Component),g=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{id:"play-stop-div"},o.a.createElement("button",{className:"top-btns",id:"play-stop-btn",onClick:function(){e.props.updateMetronome(),e.props.togglePlaying()}},this.props.playing?"Stop":"Play"))}}]),t}(o.a.Component),b=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{id:"tempo-div"},o.a.createElement("input",{id:"tempo-sld",type:"range",min:"30",max:"400",defaultValue:"120",onChange:function(){return e.props.updateBPM()}}),o.a.createElement("div",{id:"tempo-value"},o.a.createElement("div",{id:"tempo-value-header"},"Quarter notes per minute: ",this.props.bpm)))}}]),t}(o.a.Component),y=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"dimension"},o.a.createElement("div",{className:"time-signature"},o.a.createElement(m,{timeSig:this.props.timeSig,updateTimeSig:this.props.updateTimeSig,generateMetronome:this.props.generateMetronome}),o.a.createElement(v,{timeSig:this.props.timeSig,updateTimeSig:this.props.updateTimeSig})),o.a.createElement("div",{className:"play-export"},o.a.createElement(g,{togglePlaying:this.props.togglePlaying,playing:this.props.playing,updateMetronome:this.props.updateMetronome}),o.a.createElement(d,{exportMeasure:this.props.exportMeasure})),o.a.createElement(b,{updateBPM:this.props.updateBPM,bpm:this.props.bpm}))}}]),t}(o.a.Component),f=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"clear-btn-div"},o.a.createElement("button",{id:"clear-btn",className:"bottom-btns",onClick:function(){return e.props.clearSequence()}},"Clear"))}}]),t}(o.a.Component),S=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"loop-btn-div"},o.a.createElement("button",{id:"loop-btn",className:"bottom-btns",onClick:function(){return e.props.updateSeqLoop()}},this.props.loopStatus?"Turn Loop Off":"Turn Loop On"))}}]),t}(o.a.Component),q=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"play-pause-btn-div"},o.a.createElement("button",{id:"play-pause-btn",className:"bottom-btns",onClick:function(){0===e.props.sequenceContainer.length?console.log("nothing to play"):!0===e.props.seqIsPlaying?(console.log("stopping, not generating sequence"),e.props.playSequence()):e.props.generateSequence()}},this.props.seqIsPlaying?"Stop":"Play"))}}]),t}(o.a.Component),k=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"sequence-transport"},o.a.createElement(q,{generateSequence:this.props.generateSequence,seqIsPlaying:this.props.seqIsPlaying,sequenceContainer:this.props.sequenceContainer,playSequence:this.props.playSequence}),o.a.createElement(S,{loopStatus:this.props.loopStatus,updateSeqLoop:this.props.updateSeqLoop,seqIsPlaying:this.props.seqIsPlaying}),o.a.createElement(f,{clearSequence:this.props.clearSequence}))}}]),t}(o.a.Component),E=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"top-row"})}}]),t}(o.a.Component),C=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"bottom-row"},"Bottom Row")}}]),t}(o.a.Component),O=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"progress-bar"},"Progress Bar")}}]),t}(o.a.Component),j=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{id:"step-sequence"},o.a.createElement(E,{onChange:function(){return e.props.renderStepSequence()}}),o.a.createElement(C,{onChange:function(){return e.props.renderStepSequence()}}),o.a.createElement(O,null))}}]),t}(o.a.Component),T=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{id:"measure-container"},o.a.createElement("div",{id:"measure-box"}))}}]),t}(o.a.Component),M=n(6),x=n.n(M),w=new x.a.PolySynth(2,x.a.Synth).toMaster(),P=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={timeSig:[4,4],renderedNotes:[],metronomeContainer:[],metContainerSize:0,sequenceContainer:[],seqContainerSize:0,sequenceIndex:0,seqIsPlaying:!1,seqPartContainer:[],loopStatus:!1,notes:["C5","EB5"],tempDivisor:4,beatTicks:8,placement:0,playing:!1,bpm:120,visualizeIndex:0,eventCache:[]},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.generateMetronome(),this.generateStepSequence()}},{key:"computeTime",value:function(e){return console.log("index: "+e),console.log("compute time: "+"0:".concat(e/8)),"0:".concat(e/8)}},{key:"togglePlaying",value:function(){this.state.playing?(this.setState({playing:!1,seqIsPlaying:!1}),x.a.Transport.stop(),this.loopUpdate(!1),console.log("playing stopped")):(this.setState({playing:!0,seqIsPlaying:!1}),this.loopUpdate(!0),x.a.Transport.start("+0.0"),console.log("playing initiated"))}},{key:"loopUpdate",value:function(e){!0===e?(x.a.Transport.loopStart=0,x.a.Transport.loopEnd=this.calcMetLength(this.state.timeSig)/16,console.log("loopEnd:"+x.a.Transport.loopEnd),x.a.Transport.loop=!0):(x.a.Transport.loop=!1,x.a.Transport.loopEnd=0)}},{key:"updateBPM",value:function(){var e=document.querySelector("#tempo-sld").value;document.querySelector("#tempo-value-header").innerHTML="Quarter notes per minute: ".concat(e),this.setState({bpm:parseInt(e)}),x.a.Transport.bpm.value=parseInt(e)}},{key:"updateTimeSig",value:function(){var e=this,t=document.querySelector("#num-beats-input"),n=document.querySelector("#subdivision-input");document.querySelector("#subdivision-display");this.setState({timeSig:[parseInt(t.value),Math.pow(2,parseInt(n.value))]},function(){e.loopUpdate(!0),e.generateStepSequence(),e.updateMetronome()})}},{key:"updateMeasureSequence",value:function(){console.log("updating measure sequencing");var e=document.querySelector("#measure-box"),t=document.createElement("div");t.className="square",t.key="m"+this.state.seqContainerSize;var n=document.createElement("div");n.className="content",n.key="c"+this.state.seqContainerSize;var a=this.state.timeSig[0],o=this.state.timeSig[1],i=document.createElement("div");i.innerHTML=a,i.key="t"+this.state.seqContainerSize,i.className="top-number";var r=document.createElement("div");r.innerHTML=o,r.key="b"+this.state.seqContainerSize,r.className="bottom-number";var s=document.createElement("div");s.key="l"-this.state.seqContainerSize,s.className="line-divide",n.appendChild(i),n.appendChild(s),n.appendChild(r),t.appendChild(n),e.appendChild(t)}},{key:"clearMeasureSequence",value:function(){console.log("clearing measure sequencer");var e=document.querySelectorAll("#measure-box div.square");console.log("masterDiv: "+e.length);for(var t=0;t<e.length;t++)e[t].remove()}},{key:"exportMeasure",value:function(){var e=this;console.log("exporting measure");var t=this.state.timeSig,n=this.calcMetLength(t);console.log("metLength: "+n);var a=this.state.sequenceContainer;console.log("sequence container length: "+a.length);var o=this.state.seqContainerSize+1,i=this.generateSeqMatrix(),r=this.readCheckboxes(i);console.log(r),a.push([t[0],t[1],n,r]),this.setState({sequenceContainer:a,seqContainerSize:o},function(){e.updateMeasureSequence(),console.log("sequence size: "+o)})}},{key:"generateSeqMatrix",value:function(){var e=this.state.timeSig,t=[];if(console.log("timeSig: "+e[0]+" "+e[1]),16===e[1]||8===e[1]||32===e[1])for(var n=0;n<e[0];n++)n%2===0?t.push(1):t.push(0);else if(4===e[1]||2===e[1])for(var a=0;a<2*e[0];a++)a%2===0?t.push(1):t.push(0);return console.dir(t.length),t}},{key:"readCheckboxes",value:function(e){if(console.log("reading checkboxes"),e){var t=document.querySelectorAll(".top-row-btn"),n=document.querySelectorAll(".bottom-row-btn");console.log(t),console.log(n);for(var a=[],o=[],i=0;i<t.length;i++)t[i].checked&&n[i].checked?(a.push(1),o.push(1)):!t[i].checked&&n[i].checked?(a.push(0),o.push(1)):t[i].checked&&!n[i].checked?(a.push(1),o.push(0)):t[i].checked||n[i].checked||(a.push(0),o.push(0));return[a,o]}for(var r=document.querySelectorAll(".top-row-btn"),s=document.querySelectorAll(".bottom-row-btn"),c=(this.generateSeqMatrix(),[]),l=[],u=0;u<r.length;u++)r[u].checked&&s[u].checked?(c.push(1),l.push(1)):!r[u].checked&&s[u].checked?(c.push(0),l.push(1)):r[u].checked&&!s[u].checked?(c.push(1),l.push(0)):r[u].checked||s[u].checked||(c.push(0),l.push(0));return[c,l]}},{key:"generateSeqPart",value:function(){}},{key:"calcMetLength",value:function(e){var t=e[1];return 2===t?16*e[0]:4===t?8*e[0]:8===t?4*e[0]:16===t?2*e[0]:32===t?e[0]:void 0}},{key:"calcBeatTicks",value:function(e){return 2===e?16:4===e?8:8===e?4:16===e?2:32===e?1:void 0}},{key:"calcSeqLength",value:function(){console.log("calculating the length of the sequence");for(var e=this.state.sequenceContainer,t=0,n=0;n<e.length;n++)t+=e[n][2];return console.log("total: "+t),t}},{key:"generateMetronome",value:function(){console.log("generate metronome");var e=this.state.metronomeContainer;e.forEach(function(e){return e.removeAll()});var t=this.state.timeSig;console.log("timeSig: "+t);var n=[],a=this.state.notes,o=this.calcMetLength(t);console.log("met length: "+o);var i=this.calcBeatTicks(t[1]);console.log("beatTicks: "+i);for(var r=0;r<o;r++)0===r?n.push({note:a[1],time:"0:0",velocity:.1}):r%i===0&&n.push({note:a[0],time:"0:".concat(r/8),velocity:.1});var s=new x.a.Part(function(e,t){w.triggerAttackRelease(t.note,"32n",e,t.velocity)},n).start(0);e.push(s),this.setState({renderedNotes:n,metronomeContainer:e,metContainerSize:1,beatTicks:8})}},{key:"updateMetronome",value:function(){console.log("updating metronome");var e=this.state.metronomeContainer;e.forEach(function(e){return e.removeAll()});var t=this.state.sequenceContainer,n=this.state.seqPartContainer;n.forEach(function(e){return e.removeAll()});var a=this.state.timeSig,o=[],i=this.state.notes,r=this.calcMetLength(a);console.log("metLength: "+r);var s=this.calcBeatTicks(a[1]);console.log("beatTicks: "+s);var c=this.readCheckboxes();console.log("updated matrix"+c);for(var l=0;l<r;l++)a[1]<=4&&l%(s/2)===0?(1===c[0][l/(s/2)]&&o.push({note:i[1],time:"0:".concat(l/8),velocity:.1}),1===c[1][l/(s/2)]&&o.push({note:i[0],time:"0:".concat(l/8),velocity:.1})):l%s===0&&(1===c[0][l/s]&&o.push({note:i[1],time:"0:".concat(l/8),velocity:.1}),1===c[1][l/s]&&o.push({note:i[0],time:"0:".concat(l/8),velocity:.1}));var u=new x.a.Part(function(e,t){w.triggerAttackRelease(t.note,"32n",e,t.velocity)},o).start(0);e.push(u),this.setState({renderedNotes:o,metronomeContainer:e,metContainerSize:1,beatTicks:8,sequenceIndex:0,seqPartContainer:n,sequenceContainer:t,seqContainerSize:0})}},{key:"generateSequence",value:function(){var e,t=this;console.log("generate sequence");var n=this.state.sequenceContainer,a=this.state.seqPartContainer;a.forEach(function(e){return e.removeAll()});for(var o=0,i=0,r=0;r<n.length;r++)i+=n[r][2];console.log("total sequence length: "+i);var s=this.state.notes;console.log(n),console.log("sequence container length: "+n.length);var c=[],l=this.state.eventCache;0!==l.length&&l.forEach(function(e){return x.a.Transport.clear(e)});for(var u=0;u<n.length;u++){console.log(u),0===u&&(e=0);var p=this.calcBeatTicks(n[u][1]),h=n[u][2],m=o+h;console.log(n[u][3]);var d=this.repeatSchedule(e,i);for(l.push(d),e=o;e<m;e++)if(console.log(e),n[u][1]<=4&&(e-o)%(p/2)===0){var v=this.computeTime(e);1===n[u][3][0][(e-o)/(p/2)]?c.push({note:s[1],time:v,velocity:.1}):1===n[u][3][1][(e-o)/(p/2)]&&c.push({note:s[0],time:v,velocity:.1})}else if((e-o)%p===0){var g=this.computeTime(e);console.log("conditional: "+n[u][3][0][(e-o)/p]),console.log("index: "+(e-o)/p),1===n[u][3][0][(e-o)/p]?c.push({note:s[1],time:g,velocity:.1}):1===n[u][3][1][(e-o)/p]&&c.push({note:s[0],time:g,velocity:.1})}o+=h}var b=new x.a.Part(function(e,t){w.triggerAttackRelease(t.note,"32n",e,t.velocity)},c).start(0);a.push(b),this.setState({sequenceIndex:o,seqPartContainer:a,eventCache:l},function(){t.calcSeqLength(),t.playSequence()})}},{key:"playSequence",value:function(){if(this.state.seqIsPlaying)this.setState({seqIsPlaying:!1,playing:!1}),x.a.Transport.stop(),this.removeVisualizeClass(),console.log("sequence stopped");else{console.log("loopStart "+x.a.Transport.loopStart),console.log("loopEnd "+x.a.Transport.loopEnd),console.log("loop: "+x.a.Transport.loop),!1===this.state.loopStatus&&this.scheduleSeqTermination();var e=this.state.metronomeContainer;e.forEach(function(e){return e.removeAll()});this.setState({seqIsPlaying:!0,metronomeContainer:e,metContainerSize:0,playing:!1,visualizeIndex:0}),x.a.Transport.loopStart=0,x.a.Transport.stop(),x.a.Transport.start("+0.0"),console.log("sequence initiated")}}},{key:"clearSequence",value:function(){var e=this;console.log("clearing sequence");var t=[],n=this.state.seqPartContainer;n.forEach(function(e){return e.removeAll()}),n.forEach(function(e){return n.pop()}),console.log(t);x.a.Transport.stop(),this.setState({sequenceIndex:0,seqPartContainer:n,sequenceContainer:t},function(){e.clearMeasureSequence()})}},{key:"scheduleSeqTermination",value:function(){var e=this;console.log("scheduling sequence termination");var t=this.computeTime(this.calcSeqLength()+1);x.a.Transport.scheduleOnce(function(){e.playSequence(),e.setState({sequenceIndex:0,visualizeIndex:0,seqIsPlaying:!1,loopStatus:!1,playing:!1})},t)}},{key:"updateSeqLoop",value:function(){console.log("updating sequence loop settings"),!0===this.state.loopStatus?(x.a.Transport.loopEnd=0,x.a.Transport.loop=!1,this.setState({loopStatus:!1})):(x.a.Transport.loopEnd=this.computeTime(this.calcSeqLength()),x.a.Transport.loop=!0,console.log(x.a.Transport.loop),this.setState({loopStatus:!0,visualizeIndex:0}))}},{key:"repeatSchedule",value:function(e,t){return x.a.Transport.scheduleRepeat(this.visualizeNextSquare.bind(this),t,this.computeTime(e))}},{key:"visualizeNextSquare",value:function(){console.log("visualizing next square"),console.log(this.state.visualizeIndex);var e=this.state.seqContainerSize,t=this.state.visualizeIndex,n=document.querySelectorAll("#measure-box div.square");0===t?(n[0].classList.add("visualize"),n[e-1].classList.contains("visualize")&&n[e-1].classList.remove("visualize")):(n[t-1].classList.remove("visualize"),n[t].classList.add("visualize"));var a=t+1;a===e&&(a=0),this.setState({visualizeIndex:a})}},{key:"removeVisualizeClass",value:function(){console.log("removing visualize classes from squares"),document.querySelectorAll("#measure-box div.square").forEach(function(e){e.classList.contains("visualize")&&e.classList.remove("visualize")})}},{key:"updateTopRow",value:function(){console.log("updating top row");document.querySelector(".top-row"),this.state.timeSig;var e=this.generateSeqMatrix(),t=this.readCheckboxes(e);console.log(t)}},{key:"updateBottomRow",value:function(){console.log("updating bottom row");document.querySelector(".bottom-row"),this.state.timeSig,this.generateSeqMatrix()}},{key:"updateProgressBar",value:function(){console.log("updating progress bar");document.querySelector(".progress-bar"),this.state.timeSig}},{key:"generateStepSequence",value:function(){var e=this;console.log("updating top row");var t=document.querySelector(".top-row"),n=this.state.timeSig,a=this.generateSeqMatrix();if(console.log(a),n[1]>=8){t.innerHTML="";for(var o=0;o<n[0];o++){var i=document.createElement("div");i.key="td"+o,i.className="top-row-shell";var r=document.createElement("input");r.type="checkbox",r.key="a"+o,r.id="tr"+o,r.className="top-row-btn",r.checked=0===o,r.setAttribute("highlighted",!1),r.onclick=function(){e.updateTopRow(),e.updateMetronome()};var s=document.createElement("label");s.key="tk"+o,s.setAttribute("for","tr"+o);var c=document.createElement("div");c.key="th"+o,c.className="highlight",c.hidden=!1,s.appendChild(c),i.appendChild(r),i.appendChild(s),t.appendChild(i)}}else if(n[1]<=4){t.innerHTML="";for(var l=0;l<2*n[0];l++){var u=document.createElement("div");u.key="td"+l,u.className="top-row-shell";var p=document.createElement("input");p.type="checkbox",p.key="b"+l,p.id="tr"+l,p.className="top-row-btn",p.checked=1===a[0]&&0===l,p.setAttribute("highlighted",!1),p.onclick=function(){e.updateTopRow(),e.updateMetronome()};var h=document.createElement("label");h.key="tk"+l,h.setAttribute("for","tr"+l);var m=document.createElement("div");m.key="th"+l,m.className="highlight",m.hidden=!1,h.appendChild(m),u.appendChild(p),u.appendChild(h),t.appendChild(u)}}console.log("updating bottom row");var d=document.querySelector(".bottom-row");if(console.log(a),n[1]>=8){d.innerHTML="";for(var v=0;v<n[0];v++){var g=document.createElement("div");g.key="td"+v,g.className="bottom-row-shell";var b=document.createElement("input");b.type="checkbox",b.key="a"+v,b.id="br"+v,b.className="bottom-row-btn",b.checked=1===a[v]&&0!==v,b.onclick=function(){return e.updateBottomRow()};var y=document.createElement("label");y.key="bk"+v,y.setAttribute("for","br"+v);var f=document.createElement("div");f.key="th"+v,f.className="highlight",f.hidden=!1,y.appendChild(f),g.appendChild(b),g.appendChild(y),d.appendChild(g)}}else if(n[1]<=4){d.innerHTML="";for(var S=0;S<2*n[0];S++){var q=document.createElement("div");q.key="td"+S,q.className="bottom-row-shell";var k=document.createElement("input");k.type="checkbox",k.key="b"+S,k.id="br"+S,k.className="bottom-row-btn",k.checked=1===a[S]&&0!==S,k.onclick=function(){return e.updateBottomRow()};var E=document.createElement("label");E.key="bk"+S,E.setAttribute("for","br"+S);var C=document.createElement("div");C.key="th"+S,C.className="highlight",C.hidden=!1,E.appendChild(C),q.appendChild(k),q.appendChild(E),d.appendChild(q)}}console.log("updating progress bar");var O=document.querySelector(".progress-bar");if(n[1]>=8){O.innerHTML="";for(var j=0;j<n[0];j++){var T=document.createElement("input");T.type="checkbox",T.key="a"+j,T.id="id"+j,T.onclick=function(){return console.log("checkbox button clicked")},O.appendChild(T)}}else if(n[1]<=4){O.innerHTML="";for(var M=0;M<2*n[0];M++){var x=document.createElement("input");x.type="checkbox",x.key="b"+M,x.id="id"+M,x.onclick=function(){return console.log("checkbox button clicked")},O.appendChild(x)}}}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("span",{id:"info-span"},"Sam Parsons \xa92018"),o.a.createElement("div",{className:"title"},o.a.createElement("h3",null,"Multimeter Metronome")),o.a.createElement(h,null),o.a.createElement(y,{timeSig:this.state.timeSig,updateTimeSig:this.updateTimeSig.bind(this),exportMeasure:this.exportMeasure.bind(this),updateMetronome:this.updateMetronome.bind(this),togglePlaying:this.togglePlaying.bind(this),playing:this.state.playing,bpm:this.state.bpm,updateBPM:this.updateBPM.bind(this)}),o.a.createElement(j,{updateTopRow:this.updateTopRow.bind(this),generateStepSequence:this.generateStepSequence.bind(this)}),o.a.createElement("div",{className:"sequence-section"},o.a.createElement("h3",null,"Measure Sequencer")),o.a.createElement(k,{generateSequence:this.generateSequence.bind(this),seqIsPlaying:this.state.seqIsPlaying,loopStatus:this.state.loopStatus,clearSequence:this.clearSequence.bind(this),sequenceContainer:this.state.sequenceContainer,playSequence:this.playSequence.bind(this),updateSeqLoop:this.updateSeqLoop.bind(this)}),o.a.createElement(T,null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,n){e.exports=n(18)}},[[9,2,1]]]);
//# sourceMappingURL=main.7318c797.chunk.js.map
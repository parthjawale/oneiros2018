"use strict";!function(){var a=zmail.Core.Namespaces.create("dateParser"),b=zmText.get("dateParser"),c=function(a){this.par=a.par,this.config=a,this.event={},this.task={}},d={};d.task={},d.task.getHeader=function(a){var c=a,d=$('<li class = "stSel">'+b.dParser.newTask+"</li>");return d.off("click").on("click",function(){c.toggle("task")}),d},d.task.getContent=function(a){try{var b=new zmTask.Create({action:"addMTask","new":!0,tasks:{TITLE:a.title,DUEDATE:a.ts.getDateBy(zmail.userDateFormat),SUMMARY:""}});return b.taskEle}catch(c){return zmUtil.debugLog(c),""}},d.event={},d.event.getHeader=function(a){var c=a,d=$("<li>"+b.dParser.newCal+"</li>");return d.off("click").on("click",function(){c.toggle("event")}),d},d.event.getContent=function(a){try{return ZCL_mailDetViewEvePopup({action:"addMEvent",SUM:a.title,SD:a.ts.getDateBy("yyyyMMdd"),ST:a.ts.getTimeBy("HHmm"),view:"new"})}catch(b){return zmUtil.debugLog(b),""}},c.prototype.components=d,c.prototype.hide=function(){this.popref.hide()},c.prototype.toggle=function(a){var b=this.currApp;b!==a&&(this[b].header.removeClass("stSel"),this[a].header.addClass("stSel"),this[b].content.$el.removeClass("shw"),this[a].content.$el.addClass("shw"),this.currApp=a,this.popref.position())},c.prototype.construct=function(){var a=this;Object.keys(this.components).forEach(function(b){var c=a.components[b].getContent(a.config);c?(a[b].content=c,a[b].header=a.components[b].getHeader(a)):(a[b].content={$el:""},a[b].header="")});var b=$("<div/>"),c=$('<div class="zm_ddTab"><ul class="SCS_tab"></ul></div>');Object.keys(a.components).forEach(function(b){a[b].header&&c.find("ul").append(a[b].header)}),b.append(c),b.append(a.task.content.$el),b.append(a.event.content.$el),a.event.content.$el&&a.event.content.$el.removeClass("shw"),a.task.content.$el.hasClass("shw")||a.task.content.$el.addClass("shw"),a.currApp="task";var d={divId:"Dote",spanClass:"minwid",par:this.par,showArrow:!0,loadHTML:!0,htm:b.children(),onHide:function(){a.hide()}};a.popref=zmsuite.showMenu(d)};var e=function(a){var b,c=new Date,d=[];return a.forEach(function(a,e){b=a.MatchingDate[0],b=b.replace(/ /,"T"),b=new Date(b),b>c&&d.push(a)}),d},f=!1,g=function j(a,b,c){b=b||3;var d,e=a.childNodes,g="html,head,style,title,link,meta,script,object,iframe";for(d=0;d<e.length&&!f;d++){var h=e[d];if(1===h.nodeType&&(g+",").indexOf(h.nodeName.toLowerCase()+",")===-1&&j(h,b,c),h.nodeType===b){var i=c(h.data);if(i){var k=document.createElement("div"),l=document.createDocumentFragment();for(k.innerHTML=i;k.firstChild;)l.appendChild(k.firstChild);var m=h.parentNode;m.insertBefore(l,h),m.removeChild(h)}}}},h=function(a,b){try{var c=document.createElement("div");if(c.innerHTML=a,b=e(b),f=!1,!b.length)return!1;var d=function(a,b){var c='<span class = "zm_inLnk" data-value ="'+a+'">';return c=c+b+"</span>"},h=function(a){a=_zm.escapeTags(a);var c,e,g,h,i,j,k="",l=!1;for(e=0;e<b.length;e++)c=b[e].MatchingText,g=a.indexOf(c),g!==-1&&(l=!0,h=g+c.length,i=a.substring(0,h),j=d(b[e].MatchingDate[0],c),i=i.replace(c,j),k=k.concat(i),a=a.substring(h,a.length),b.splice(e,1),b.length||(f=!0),e-=1);return k=k.concat(a),l&&k||""};return g(c,3,h),c.innerHTML}catch(i){return zmUtil.debugLog(i),!1}},i=function(a){_zm._isPrivilegedUser()&&(a.ts instanceof Date||(a.ts=new Date(a.ts)),zmUtil.requireTaskModule("taskCreate").done(function(){var b=new c(a);b.construct()}))};a.loadQuickAdder=i,a.focusOnDate=h}();
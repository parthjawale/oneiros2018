"use strict";define([],function(){var a=zmail.Core.Namespaces,b=a.get("zmail.DataLayer"),c=b.DSModel;zNote.Models=zNote.Models||{};var d=function(a){function b(){return babelHelpers.classCallCheck(this,b),babelHelpers.possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return babelHelpers.inherits(b,a),babelHelpers.createClass(b,[{key:"save",value:function(a,b){var c=this,d=b||{},e=function(a){var b=zNote.getNoteDataInListFormat(a[0].data);$.publish("/note/add",[b]),$.publish("/note/addNote",[a[0].data]),d.cat=b.cat,d.namespaceId=b.namespaceId,$.publish("note/updateCount",[d]),d.callback&&d.callback(),d.sticky&&zNote.addAsStickyNote(b)};return a.catId?this.triggerAction("add",{param:a}).then(function(a){var b=a.opts,d=b.resp;e(d),zmail.isOfflineEnabled&&c.triggerAction("updateNote",{attrs:zNote.getNoteDataInListFormat(d[0].data),adapterId:"indexDB"})}):void znBox.getGenCat({gid:a.groupId}).done(function(){return a.catId=znBox.getGeneralCatId(a.groupId),this.triggerAction("add",{param:a}).then(function(a){var b=a.opts,d=b.resp;e(d),zmail.isOfflineEnabled&&c.triggerAction("updateNote",{attrs:zNote.getNoteDataInListFormat(d[0].data),adapterId:"indexDB"})})})}}]),b}(c);return zNote.Models.addNote=d,d}),define([],function(){zNote.Collections=zNote.Collections||{};var a=zmail.Core.Namespaces,b=a.get("zmail.DataLayer"),c=b.DSCollection,d=function(a){function b(){return babelHelpers.classCallCheck(this,b),babelHelpers.possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return babelHelpers.inherits(b,a),babelHelpers.createClass(b,[{key:"getBaseModelClass",value:function(){return zNote.Models.addNote}}]),b}(c);return zNote.Collections.addNote=d,d}),function(){zNote.Views=zNote.Views||{},zNote.Views.addNoteViewReact=function(b){function c(a,b){babelHelpers.classCallCheck(this,c);var d=babelHelpers.possibleConstructorReturn(this,(c.__proto__||Object.getPrototypeOf(c)).call(this,a,b));d.ispaste=!1,d.title=d.props.note.get("title")||zNote.unSavedData.title||"",d.desc=d.props.note.get("desc")||zNote.unSavedData.desc||"",d.showEditor=znBox.isRichTextOpen()&&!(d.props.streams||d.props.options&&d.props.options.quickAdd),d.props.options&&d.props.options.quickAdd&&(d.title="",d.desc=""),d.props.note.get("attEntObj")?d.attArray=d.props.note.get("attEntObj").slice():d.attArray=[];var e=Boolean(d.title.trim().length||d.desc.trim().length);return d.state={namespaceId:d.props.note.get("namespaceId"),starred:d.props.note.get("starred"),color:d.props.note.get("color"),catId:d.props.note.get("catId"),addparams:d.props.note.get("addparams"),attachpath:[],attachstore:[],attachname:[],virusfree:[],attEntObj:d.props.note.get("attEntObj")||[],adding:!1,stickyEnabled:e},d.handleSetDescription=d.handleSetDescription.bind(d),d.handleSetTitle=d.handleSetTitle.bind(d),d.handleSetHeight=d.handleSetHeight.bind(d),d.handleSaveSelection=d.handleSaveSelection.bind(d),d.handleQuickAddKeyDown=d.handleQuickAddKeyDown.bind(d),d.handleQuickAddClick=d.handleQuickAddClick.bind(d),d.handleSetMaxCharacter=d.handleSetMaxCharacter.bind(d),d.handleChangeBook=d.handleChangeBook.bind(d),d.handleChangeGroup=d.handleChangeGroup.bind(d),d.handleSetColor=d.handleSetColor.bind(d),d.handleCancel=d.handleCancel.bind(d),d.handleOnRemoveAttachment=d.handleOnRemoveAttachment.bind(d),d.triggerFileInputClickEvent=d.triggerFileInputClickEvent.bind(d),d.triggerAttachComponent=d.triggerAttachComponent.bind(d),d.removeMyAttachment=d.removeMyAttachment.bind(d),d.handlePaste=d.handlePaste.bind(d),d.handleKeyDown=d.handleKeyDown.bind(d),d.handleKeyPress=d.handleKeyPress.bind(d),d.handlePasteForTitle=d.handlePasteForTitle.bind(d),d.handleStickyNote=d.handleStickyNote.bind(d),d.save=d.save.bind(d),d}return babelHelpers.inherits(c,b),babelHelpers.createClass(c,[{key:"componentDidMount",value:function(){var a=this,b=this.props.options&&this.props.options.quickAdd;if(this.sticky=!1,this.setState({height:$(ReactDOM.findDOMNode(this.refs.content)).height()}),this.height=$(ReactDOM.findDOMNode(this.refs.content)).height(),this.showEditor){var c={id:this.editorId,editorType:"smartCompose",editorheight:"200px",defaultfontsize:"14px",setdefaultfontcolor:"#000000",defaultfontfamily:"Verdana,Arial",styRewriter:["DIV","SPAN","P","H3","STRONG","EM","INS","STRIKE"],microParaToolbar:!1,microInsertToolbar:!1,avoidMoreOption:!0,needEditorFocus:!0,removeStyleProps:["background-color","font-size","font-family","color"],generalToolbar:!1,content:this.content,notes:!0};this.editor=ZE.create(c);var d=Boolean(this.props.options&&"true"===this.props.options.disableShortcuts);this.editor.afterEditorLoad(function(){var b=$(a.editor.doc.body),c=$(a.editor.iframe);b.css("line-height","1.4em"),d||zmComponent.keybindings.listener.add(a.editor.doc),b.attr("data-enableshortcuts","true"),a.setHeight?(a.setHeight+=c.height(),c.css("height",a.setHeight),c.css("max-height",a.setHeight)):c.css("height","auto"),c[0].style.overflow="hidden",c[0].style.overflowY="auto",a.desc.trim().length&&a.editor.setContent(a.desc),b.on("mousedown",function(a){znBox.hideMenu()}),b.on("focus",function(b){a.handleSaveSelection(b)}),b.on("paste",function(b){a.handlePaste(b)}),b.on("click",function(b){a.handleSaveSelection(b)}),b.on("keyup",function(b){a.handleSetHeight(b)}),b.on("blur",function(b,c){a.handleSetDescription(b,c)}),b.on("keypress",function(b,c){a.handleKeyPress(b,c)}),ReactDOM.render(React.createElement(zNote.getEditorIcons,{editor:a.editor}),a.refs.editorBar)})}return b?($(ReactDOM.findDOMNode(this.refs.content)).css("min-height","50px"),this.props.note.on("change",function(b){void 0!==b.changed.color&&a.setState({color:b.changed.color})}),void(this.props.options.list&&zmComponent.tooltip({elm:this.refs.addIcon,text:zNote.notei18n.common.addNote,arrow:"top"}))):(setTimeout(function(){$(ReactDOM.findDOMNode(a.refs.content)).focus()},100),$(ReactDOM.findDOMNode(this.refs.content)).on("mousedown","a",function(a){a.stopPropagation(),$("#ngoto").remove();var b=a.target.getBoundingClientRect().left,c=a.target.getBoundingClientRect().top+(a.target.getBoundingClientRect().bottom-a.target.getBoundingClientRect().top),d={left:b+"px",top:c+"px",right:"auto",zIndex:"1001"},e=$(zNote.templates.linkEl({style:d,href:this.href}));$("body").append(e),$("#ngoto").on("mousedown",function(a){a.stopPropagation()}),$("#ngoto").on("click",function(){$("#ngoto").remove()}),$("#nlink").on("click",function(a){a.stopPropagation(),$("#ngoto").remove()})}),$(ReactDOM.findDOMNode(this.refs.content)).on("click","a",function(a){a.stopPropagation()}),this.setAttachmentConfig(),this.showToolTips(),void(this.debouncedAddNote=_.debounce(this.save,1e3,{leading:!0})))}},{key:"componentWillUnmount",value:function(){this.refs.editorBar&&ReactDOM.unmountComponentAtNode(this.refs.editorBar),zNote.checkAndRemoveFromDS(this.props.note,"addNote"),$(ReactDOM.findDOMNode(this.refs.content)).off("mousedown","a"),$(ReactDOM.findDOMNode(this.refs.content)).off("click","a")}},{key:"componentDidUpdate",value:function(){this.state.stickyEnabled===!1?zmComponent.tooltip({elm:this.refs.stickyNote,text:zNote.notei18n.info.makeStickyDisabled,arrow:"top"}):this.sticky===!0?zmComponent.tooltip({elm:this.refs.stickyNote,text:zNote.notei18n.note.removeSticky,arrow:"top"}):zmComponent.tooltip({elm:this.refs.stickyNote,text:zNote.notei18n.note.makeSticky,arrow:"top"})}},{key:"setContentHeight",value:function(a){var b;this.showEditor?this.setHeight=a.height:(b=ReactDOM.findDOMNode(this.refs.content),$(b).css("height",a.height),$(b).css("max-height",a.height),b.style.overflow="hidden",b.style.overflowY="auto")}},{key:"handleQuickAddKeyDown",value:function(a){13===a.keyCode&&(a.preventDefault(),this.desc=znBox.domParser(znBox.getContentEditableText($(ReactDOM.findDOMNode(this.refs.contentList)))),this.desc.trim().length&&this.quickAddList())}},{key:"handleQuickAddClick",value:function(){this.desc=znBox.domParser(znBox.getContentEditableText($(ReactDOM.findDOMNode(this.refs.contentList)))),this.desc.trim().length?this.quickAddList():$(ReactDOM.findDOMNode(this.refs.contentList)).focus()}},{key:"showToolTips",value:function(){this.state.stickyEnabled===!1?zmComponent.tooltip({elm:this.refs.stickyNote,text:zNote.notei18n.info.makeStickyDisabled,arrow:"top"}):this.sticky===!0?zmComponent.tooltip({elm:this.refs.stickyNote,text:zNote.notei18n.note.removeSticky,arrow:"top"}):zmComponent.tooltip({elm:this.refs.stickyNote,text:zNote.notei18n.note.makeSticky,arrow:"top"}),this.refs.insertImgIcon&&zmComponent.tooltip({elm:this.refs.insertImgIcon,text:zNote.notei18n.tooltips.insertImg,arrow:"top"}),this.refs.attachIcon&&zmComponent.tooltip({elm:this.refs.attachIcon,text:zNote.notei18n.tooltips.addAttach,arrow:"top"}),this.refs.palette&&zmComponent.tooltip({elm:this.refs.palette,text:zNote.notei18n.tooltips.changeColor,arrow:"top"}),this.refs.cgy&&zmComponent.tooltip({elm:this.refs.cgy,text:zNote.notei18n.tooltips.moveNote,arrow:"top"}),this.refs.group&&zmComponent.tooltip({elm:this.refs.group,text:zNote.notei18n.tooltips.changeGroup,arrow:"top"})}},{key:"handleSetTitle",value:function(){this.ispaste===!1&&($(ReactDOM.findDOMNode(this.refs.title)).text().trim().length?this.title=$(ReactDOM.findDOMNode(this.refs.title)).text().trim():($(ReactDOM.findDOMNode(this.refs.title)).text(""),this.title=""),this.forceUpdate())}},{key:"handleSetDescription",value:function(){if(this.ispaste===!1){var a=this.showEditor?this.editor.getContent():$(ReactDOM.findDOMNode(this.refs.content)).html();this.desc=a}}},{key:"setFavourite",value:function(){var a=!this.state.starred;this.setState({starred:a})}},{key:"clearValues",value:function(){this.title="",this.desc="",this.setState({color:_.random(0,3)}),this.forceUpdate()}},{key:"setBook",value:function(a){this.setState({catId:a})}},{key:"setGroup",value:function(a){this.setState({namespaceId:a}),this.setState({catId:znBox.getGeneralCatId(a)})}},{key:"handleChangeGroup",value:function(){var a,b=znBox.getGroupArray(),c=this,d={};d.parentDOM=ReactDOM.findDOMNode(this.refs.group),d.displayAs="popup",d.showCreate=!0,d.onSelect=function(b){c.setGroup(b),a.hide()},d.onHide=function(){$("#zm_dropDown").remove()},d.dataCallback=function(){return b},a=zmUtil.createFLComp("group",d),a.show()}},{key:"handleChangeBook",value:function(){var a,b=znBox.getCategoryArray(this.state.namespaceId),c=this,d={};d.parentDOM=ReactDOM.findDOMNode(this.refs.cgy),d.displayAs="popup",d.showCreate=!0,d.onSelect=function(b){c.setBook(b),a.hide()},d.onHide=function(){$("#zm_dropDown").remove()},d.onCreate=function(b){znBox.sendNewCatReq(b,{},c.state.namespaceId).done(function(b){c.setBook(b[1][0].catId),a.hide()})},d.dataCallback=function(){return b},a=zmUtil.createFLComp("category",d),a.show()}},{key:"handleSetColor",value:function(a){var b=this,c=this.props.options&&this.props.options.quickAdd;if(!c){var d=$('<li><div class="zn_clr"><div class="zn_clr1"></div><div class="zn_clr2"></div><div class="zn_clr3"></div><div class="zn_clr4"></div></div></li>');d.find("."+zNote.CONSTANTS.COLORCODE[this.state.color]).append("<i class=msi-tick></i>");var e={par:a.target,showArrow:!0,liDom:d,direction:"bottom",ulClass:"zn_clrSel",spanClass:"minwid"};zmsuite.showMenu(e),$(d[0]).find("div").children("div").off("click").on("click",function(){a.stopPropagation(),$("#zm_dropDown").remove(),b.setState({color:zNote.CONSTANTS.COLOR[this.className]})}),$(ReactDOM.findDOMNode(this.refs.notebox)).addClass("sel")}}},{key:"save",value:function(){var a=this,b=[];if(zNote.unSavedData.desc="",zNote.unSavedData.title="",this.handleSetTitle(),this.handleSetDescription(),this.state.virusfree.indexOf(!1)!==-1)return _zm.succErrMsg("e",zNote.notei18n.virusMsg.virusDetected),void a.setState({adding:!1});if(this.state.virusfree.indexOf("pending")!==-1)return _zm.succErrMsg("e",zNote.notei18n.virusMsg.virusDetected),void a.setState({adding:!1});var c={color:this.state.color,catId:this.state.catId,title:this.title,mode:"addNote",groupId:this.state.namespaceId,streamsView:"Notes",actionType:"addEntity",entityType:"2",attachstore:this.state.attachstore,attachname:this.state.attachpath},d={desc:this.desc,mode:"addNote",title:this.title,tagId:[],color:this.state.color,cat:this.state.catId,sticky:this.sticky,namespaceId:this.state.namespaceId};this.showEditor?c.richTextSummary=this.desc:c.desc=this.desc,this.state.attEntObj.length&&(_.each(this.state.attEntObj,function(a){b.push(zmAttachComponent.utility.filterMyAttachmentKey(a))}),c.attEntObj=JSON.stringify(b)),this.state.addparams&&(c=$.extend(c,this.state.addparams),d=$.extend(d,this.state.addparams));var e={allowEmpty:this.sticky};zNote.addNoteValidations(c,e)||(d.callback=this.props.addCallback,this.setState({adding:!0}),this.props.note.save(c,d).then(function(b){a.setState({adding:!1})},function(b){a.setState({adding:!1})}))}},{key:"quickAddList",value:function(){var a=this,b=$.Deferred(),c={richTextSummary:this.desc,color:this.state.color,catId:this.state.catId,title:this.title,mode:"addNote",groupId:this.state.namespaceId,streamsView:"Notes",actionType:"addEntity",entityType:"2"},d={desc:this.desc,mode:"addNote",title:this.title,tagId:[],color:this.state.color,cat:this.state.catId,sticky:this.sticky,namespaceId:this.state.namespaceId};return this.state.addparams&&(c=$.extend(c,this.state.addparams),d=$.extend(d,this.state.addparams)),!a.refs.contentList&&zNote.addNoteValidations(c)?b.reject():(this.props.note.save(c,d).then(function(c){$(ReactDOM.findDOMNode(a.refs.contentList)).text(""),b.resolve()}),b.promise())}},{key:"streamsAdd",value:function(a,b){var c=this,d=$.Deferred();this.handleSetTitle(),this.handleSetDescription();var e=znBox.getGeneralCatId(a.groupId||this.state.namespaceId);this.setState({catId:e});var f={richTextSummary:this.desc,color:this.state.color,catId:e,title:this.title,mode:"addNote",groupId:a.groupId||this.state.namespaceId,streamsView:"Notes",actionType:"addEntity",lockinvites:a.lockinvites,entityType:"2"},g={desc:this.desc,mode:"addNote",title:this.title,tagId:[],color:this.state.color,cat:e,namespaceId:a.groupId||this.state.namespaceId};return zNote.addNoteValidations(f)?d.resolve().promise():(g.callback=function(){c.clearValues(),b&&b()},this.props.note.save(f,g).then(function(){d.resolve()},function(){d.resolve()}),d.promise())}},{key:"handleCancel",value:function(){var a=this,b=function(){zNote.eventBus.trigger("removeMask",a)};this.checkDataAlert(b),this.props.cancelCallback&&this.props.cancelCallback()}},{key:"checkDataAlert",value:function(a){var b=a.bind(null,this),c={okButtonName:zNote.notei18n.save,cancelButtonName:zNote.notei18n.discard,$content:zNote.notei18n.confirmMsg.addNote},d=function(){zNote.unSavedData.desc="",zNote.unSavedData.title="",b()};ZE.getText(this.getNoteDetails().desc).trim().length?Dialog.confirm(void 0,this.save,d,c):d()}},{key:"handleUpdateVirus",value:function(a){for(var b=this.attArray.length,c=0;c<b;c++)this.attArray[c].fP===a.fp&&(this.attArray[c].virusFree=a.value);var d=this.state.attachpath.slice(),e=d.indexOf(a.fp),f=this.state.virusfree.slice();f[e]=a.value,this.setState({virusfree:f})}},{key:"handleOnRemoveAttachment",value:function(a,b){var c=_.filter(this.attArray,function(a){if(a.fP!==b.attachpath)return a});this.attArray=c;var d=this.state.attachpath.slice(),e=d.indexOf(b.attachpath);d.splice(e,1),this.setState({attachpath:d});var f=this.state.attachstore.slice();f.splice(e,1),this.setState({attachstore:f});var g=this.state.attachname.slice();g.splice(e,1),this.setState({attachname:g});var h=this.state.virusfree.slice();h.splice(e,1),this.setState({virusfree:h})}},{key:"triggerFileInputClickEvent",value:function(){var a=this;if(this.insertRefObj)this.insertRefObj.init();else{var b={componentId:"notes",attachFrom:["insertImage"]};this.showEditor?b.insertImage={type:".png,.jpg,.jpeg,.gif",maxSize:3145728,uploadAPI:"/zm/zeUploadImage.do",ignoreFileNameParam:!0,imgFileParamName:"img_file",requireParamToUpload:{mode:"composeSet",frm:"c",uploadMode:"drop",aId:zmail.accId},onUpload:function(b){a.setImage1(b)}}:b.insertImage={type:".png,.jpg,.jpeg,.gif",maxSize:3145728,uploadAPI:"/zm/attach.do?mode=temp",requireParamToUpload:{type:"f",accId:zmail.accId,tSize:0},onUpload:function(b){a.setImage(b)}},zmUtil.initAttachComponent(b,function(b){a.insertRefObj=b})}}},{key:"setAttachmentConfig",value:function(){var a=this;if(!this.attRefObj){var b={componentId:"notes",isNewImp:!0,attachFrom:["desktop","myAttachchment","zDocs","otherCloud"],currentAttachedSize:0,eleId:$(ReactDOM.findDOMNode(a.refs.attDiv)),autoLaunch:!1,renameSupport:!0,updateVirus:function(b){a.handleUpdateVirus(b)},onAddAttachment:function(b,c,d){if(c.remove(),"myAttachment"===d){var e=a.state.attEntObj.slice();e.push(b),a.attArray.push(b),a.setState({attEntObj:e})}else a.attArray.push(b),a.saveAttachment(b)},$dropCenter:$(ReactDOM.findDOMNode(this.refs.notebox))};zmUtil.initAttachComponent(b,function(b){a.attRefObj=b})}}},{key:"triggerAttachComponent",value:function(){this.attRefObj.init()}},{key:"removeMyAttachment",value:function(a){var b=this.state.attEntObj.slice(),c=_.filter(b,function(b){if(b.uniqueId!==a.uniqueId)return b}),d=_.filter(this.attArray,function(b){if(b.uniqueId!==a.uniqueId)return b});this.attArray=d,this.setState({attEntObj:c})}},{key:"setImage",value:function(a){var b=this.selection;$(ReactDOM.findDOMNode(this.refs.content)).trigger("focus",!0,!0);var c=zmail.conPath+"/FileDownload?mode=tmpview&entityType=1&accId="+zmail.accId+"&fpath="+a.fP+"&fstorename="+a.sN,d=znBox.restoreSelectionNew($(ReactDOM.findDOMNode(this.refs.content))[0],b);d||$(ReactDOM.findDOMNode(this.refs.content)).trigger("focus"),znBox.isIE?znBox.insertHtmlAtCaret("<img src="+c+"></img>"):document.execCommand("insertHTML",!1,"<img src="+c+"></img>")}},{key:"setImage1",value:function(a){var b="/mail/ImageSignature?fileName="+zmUtil.getDummyFilename(a.fileName)+"&accountId="+zmail.accId+"&storeName="+a.storeName+"&frm=c";this.editor.insertImage(b,{size:"bestfit"})}},{key:"onHeightChange",value:function(a,b){$(ReactDOM.findDOMNode(this.refs.content)).css("maxHeight",a),this.triggerOnHeightChange=b}},{key:"handleSetHeight",value:function(a){this.showEditor||(this.selection=znBox.saveSelectionNew(ReactDOM.findDOMNode(this.refs.content))),this.height!==$(ReactDOM.findDOMNode(this.refs.content)).height()&&(this.height=$(ReactDOM.findDOMNode(this.refs.content)).height(),this.triggerOnHeightChange&&this.triggerOnHeightChange())}},{key:"handleSaveSelection",value:function(a,b,c){c||this.showEditor||(this.selection=znBox.saveSelectionNew(ReactDOM.findDOMNode(this.refs.content)))}},{key:"saveAttachment",value:function(a){var b=this.state.attachpath.slice(),c=this.state.attachname.slice(),d=this.state.attachstore.slice(),e=this.state.virusfree.slice();c.push(a.name),b.push(a.fP),d.push(a.sN),e.push(a.virusFree),this.setState({attachname:c}),this.setState({attachpath:b}),this.setState({attachstore:d}),this.setState({virusfree:e})}},{key:"getNoteValues",value:function(){var a=_zm.unescapeTags(this.desc),b={title:this.title,desc:this.desc,textContent:a,catId:this.state.catId,groupId:this.state.namespaceId,color:this.state.color};return b}},{key:"getNoteDetails",value:function(){this.handleSetTitle(),this.handleSetDescription();var a=_zm.unescapeTags(this.desc),b={title:this.title,desc:this.desc,textContent:a,catId:this.state.catId,groupId:this.state.namespaceId,color:this.state.color};return b}},{key:"handlePaste",value:function(a){var b=this;this.ispaste=!0,znBox.handlePaste(a.target),setTimeout(function(){b.ispaste=!1,b.handleSetDescription(),b.handleKeyPress(a)},200)}},{key:"handleKeyDown",value:function(a){13===a.keyCode&&(a.preventDefault(),this.showEditor?this.editor.squireInstance.focus():ReactDOM.findDOMNode(this.refs.content).focus())}},{key:"handleKeyPress",value:function(a){!this.state.stickyEnabled&&zNote.checkForPrintableKeys(a)&&this.setState({stickyEnabled:!0})}},{key:"handleTitleFocused",value:function(){$(ReactDOM.findDOMNode(this.refs.title)).text()===znBox.CONTS.defaultTitle&&$(ReactDOM.findDOMNode(this.refs.title)).text("").attr("data-plhr",!1)}},{key:"handlePasteForTitle",value:function(a){var b=zNote.CONSTANTS.MAXCHARACTER.TITLE-ReactDOM.findDOMNode(this.refs.title).textContent.length;this.handleKeyPress(a),this.handleSetMaxCharacter(a)&&(this.ispaste=!0,znBox.handlePaste(a.target,void 0,b),this.ispaste=!1)}},{key:"handleSetMaxCharacter",value:function(a){var b=zNote.CONSTANTS.MAXCHARACTER.TITLE-ReactDOM.findDOMNode(this.refs.title).textContent.length;return this.handleKeyPress(a),!(b<=0)||(a.preventDefault(),_zm.succErrMsg("e",zNote.notei18n.titexceed),!1)}},{key:"handleStickyNote",value:function(){this.state.stickyEnabled&&(this.sticky=!0,this.save())}},{key:"render",value:function(){var b=this,c=!0,d="true",e={};e.display="none",e.position="absolute",e.top="13px";var f=zNote.notei18n.placeholder.title,g=zNote.notei18n.placeholder.writeSome,h=this.props.options&&this.props.options.quickAdd,i=this.props.options&&this.props.options.commentNote;(this.props.streams||h)&&(c=!1),h&&(d="false"),this.showEditor&&(this.editorId=(new Date).getTime());var j=h?"zn_note cursorPointer zn_quickAdd half "+zNote.CONSTANTS.COLORCODE[this.state.color]:"zn_note zn_popNote "+zNote.CONSTANTS.COLORCODE[this.state.color],k=znBox.getGroupName(this.state.namespaceId),l=zNote.getNamefrmCatObj(this.state.catId,this.state.namespaceId),m=this.state.stickyEnabled?"":"SC_disIco",n=this.sticky?m+" SC_mkStky active":m+" SC_mkStky",o=this.sticky?"msi-stiPNotes":"msi-stiNotes",p=this.desc.replace(/\n/g,"<br />");if(i)return e={},e.maxHeight="200px",e.overflowY="auto",j="zmCmntNote "+zNote.CONSTANTS.COLORCODE[this.state.color],React.createElement("div",{className:j,ref:"notebox"},React.createElement("div",{ref:"content",className:"zn_cont","data-plhr":g,"data-enableshortcuts":c,onPaste:this.handlePaste,onFocus:this.handleSaveSelection,onClick:this.handleSaveSelection,onKeyUp:this.handleSetHeight,onBlur:this.handleSetDescription,style:e,dangerouslySetInnerHTML:{__html:p},contentEditable:d}));if(h&&this.props.options.list){var q="zmImg SC_link "+zNote.CONSTANTS.COLORCODE[this.state.color];return React.createElement("div",{id:"quickAddNotes",className:"zmL SC_mlst zt_quickAdd","data-ty":"lt"},React.createElement("div",{className:"zmLst"},React.createElement("div",{className:"zmFlt"}),React.createElement("div",{className:"zmDtl"},React.createElement("div",{ref:"addIcon",className:q,onClick:this.handleQuickAddClick},React.createElement("i",{className:"msi-add"})),React.createElement("div",{className:"zmFrm",ref:"contentList",contentEditable:"true",placeholder:zNote.notei18n.addNote.quickAddPlaceholder,onPaste:this.handlePaste,onKeyDown:this.handleQuickAddKeyDown})),React.createElement("div",{className:"zmFrt"},React.createElement("span",{className:"js-loading loadRound",style:e}))))}return this.props.streams?React.createElement("div",{className:zNote.CONSTANTS.COLORCODE[this.state.color],ref:"notebox"},React.createElement("div",{className:"zn_tit","data-enableshortcuts":c,ref:"title",onPaste:b.handlePasteForTitle,onKeyPress:this.handleSetMaxCharacter,onKeyDown:this.handleKeyDown,onBlur:this.handleSetTitle,contentEditable:d,"data-plhr":f},this.title),React.createElement("div",{className:"zn_base"},React.createElement("div",null,React.createElement("div",{ref:"content",className:"zn_cont","data-plhr":g,"data-enableshortcuts":c,onPaste:this.handlePaste,onFocus:this.handleSaveSelection,onClick:this.handleSaveSelection,onKeyUp:this.handleSetHeight,onBlur:this.handleSetDescription,dangerouslySetInnerHTML:{__html:p},contentEditable:d}),React.createElement("div",{className:"znMore SC_dyn"},"Read More ...")))):h?React.createElement("div",{className:j,ref:"notebox",onClick:this.props.options.addCallback},React.createElement("div",{className:"zn_qAdd"},React.createElement("i",{className:"msi-add"}),React.createElement("span",null,zNote.notei18n.common.newNote)),React.createElement("div",{className:"zn_dd"},React.createElement("div",{className:"zn_date"})),React.createElement("div",null,React.createElement("div",{className:"zn_tit","data-enableshortcuts":c,ref:"title",contentEditable:"false","data-plhr":f},this.title),React.createElement("div",{className:"zn_base"},React.createElement("div",null,React.createElement("div",{ref:"content",className:"zn_cont","data-plhr":g,dangerouslySetInnerHTML:{__html:p},contentEditable:"false"}),React.createElement("div",{className:"znMore SC_dyn"},"Read More ...")))),React.createElement("div",{className:"zn_act zn_clear"},React.createElement("div",{className:"SCmb"},React.createElement("div",{className:"SC_flt"},React.createElement("ul",null,React.createElement("li",{ref:"palette",onClick:b.handleSetColor},React.createElement("b",null,React.createElement("div",{className:"SC_hd"}),React.createElement("span",null,React.createElement("i",{className:"msi-nclr"})))))))),React.createElement("div",{className:"zn_folder zn_clear"},React.createElement("div",{className:"zn_cgy"},React.createElement("font",{ref:"group",className:"zn_ngrp cursorPointer"},zNote.notei18n.note.selectGroup)))):React.createElement("div",{className:j,ref:"notebox"},React.createElement("div",{className:n,ref:"stickyNote",onClick:b.handleStickyNote},React.createElement("i",{className:o})),React.createElement("div",{className:"zn_dd"},React.createElement("div",{className:"zn_date"})),React.createElement("div",null,React.createElement("div",{className:"zn_tit","data-enableshortcuts":c,ref:"title",onPaste:b.handlePasteForTitle,onKeyPress:this.handleSetMaxCharacter,onKeyDown:this.handleKeyDown,onBlur:this.handleSetTitle,contentEditable:"true","data-plhr":f},this.title),React.createElement("div",{className:"zn_base",id:this.editorId},function(){return b.showEditor?null:React.createElement("div",{ref:"content",className:"zn_cont","data-plhr":g,"data-enableshortcuts":c,onPaste:b.handlePaste,onFocus:b.handleSaveSelection,onClick:b.handleSaveSelection,onKeyUp:b.handleSetHeight,onBlur:b.handleSetDescription,onKeyPress:b.handleKeyPress,dangerouslySetInnerHTML:{__html:p},contentEditable:"true"})}())),React.createElement("div",{className:"zn_act zn_clear"},React.createElement("div",{className:"SCmb"},React.createElement("div",{className:"SC_flt"},React.createElement("ul",null,React.createElement("li",{ref:"palette",onClick:b.handleSetColor},React.createElement("b",null,React.createElement("div",{className:"SC_hd"}),React.createElement("span",null,React.createElement("i",{className:"msi-nclr"})))),React.createElement("li",{ref:"insertImgIcon",onClick:b.triggerFileInputClickEvent},React.createElement("b",null,React.createElement("div",{className:"SC_hd"}),React.createElement("span",null,React.createElement("i",{className:"msi-image"})))),React.createElement("li",{ref:"attachIcon",onClick:b.triggerAttachComponent},React.createElement("b",null,React.createElement("div",{className:"SC_hd"}),React.createElement("span",null,React.createElement("i",{className:"msi-attachment"}))))),React.createElement("span",{ref:"editorBar"})))),React.createElement("div",{className:"zn_folder zn_clear"},React.createElement("div",{className:"zn_cgy"},React.createElement("font",{ref:"group",className:"zn_ngrp cursorPointer",onClick:b.handleChangeGroup},k),React.createElement("i",{className:"msi-rarrow"}),React.createElement("font",{ref:"cgy",className:"zn_nbook",onClick:b.handleChangeBook},l))),React.createElement(a,{ref:"attDiv",onRemoveAttachment:this.handleOnRemoveAttachment,onRemoveMyAttachment:this.removeMyAttachment,attachname:this.state.attachname,attachpath:this.state.attachpath,attachstore:this.state.attachstore,attEntObj:this.state.attEntObj,attArray:this.attArray}),function(){if(!b.props.noAddCancel&&!h){var a=b.state.adding?zNote.notei18n.adding:zNote.notei18n.add;return React.createElement("div",{className:"zn_clear",ref:"addCancel"},React.createElement("div",{className:"SC_PUbtm"},React.createElement("span",{onClick:b.debouncedAddNote},a),React.createElement("span",{"data-val":"Cancel",onClick:b.handleCancel},zNote.notei18n.cancel)))}}(),React.createElement("div",{className:"zn_clear zn_lbl SC_dyn"}))}}]),c}(React.Component);var a=function(a){function b(){return babelHelpers.classCallCheck(this,b),babelHelpers.possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return babelHelpers.inherits(b,a),babelHelpers.createClass(b,[{key:"getInitialState",value:function(){return{attachpath:[],attachstore:[],attachname:[]}}},{key:"deleteAttachment",value:function(a,b){a.stopPropagation();var c={aId:zmail.accId,sN:b.attachstore,fP:b.attachpath,mode:"d"},d={attachstore:b.attachstore,attachpath:b.attachpath},e={u:"/zm/attach.do",t:"POST",csr:"s",fn:this.props.onRemoveAttachment,p:c,ep:d};zmAjq.XHR(e)}},{key:"viewMyAttachment",value:function(a){var b={};b.startIndex=a,b.attObjList=this.props.attArray.slice(),b.hideAllOptions=!0,zmUtil.initAttSlideShow(b)}},{key:"render",value:function(){function a(a,h){e=zmUtil.fileTyp(a.name),d=zmUtil.getSrcForTempAtt({name:a.name,fP:a.fP,sN:a.sN}),"msi-attimg"===e[1]?(c=zmail.conPath+"/FileDownload?mode=tmpview&entityType=1&accId="+zmail.accId+"&fpath="+a.fP+"&fstorename="+a.sN,b=React.createElement("img",{src:c})):(f=e[1]+" zm-attIcn",b=React.createElement("i",{className:f}));var k="zmL zmAch";a.virusFree===!1&&(k+=" zmVirusFile"),a.virusFree===!1?g.push(React.createElement("div",{className:k,title:a.name,onClick:i(h)},React.createElement("div",{className:"zmLst"},React.createElement("div",{className:"zmDtl"},React.createElement("div",{className:"zmImg"},b),React.createElement("div",{className:"zmSze"},React.createElement("i",{className:"msi-fail msi-virus zmDoubleIcon"})),React.createElement("div",{className:"SC_icn",onClick:j({attachname:a.name,attachstore:a.sN,attachpath:a.fP,virusFree:a.virusFree})},React.createElement("i",{className:"msi-close"})))))):g.push(React.createElement("div",{className:k,title:a.name,onClick:i(h)},React.createElement("div",{className:"zmLst"},React.createElement("div",{className:"zmDtl"},React.createElement("div",{className:"zmImg"},b),React.createElement("div",{className:"SC_icn",onClick:j({attachname:a.name,attachstore:a.sN,attachpath:a.fP,virusFree:a.virusFree})},React.createElement("i",{className:"msi-close"}))))))}var b,c,d,e,f,g=[],h=this;if(!this.props.attArray.length)return React.createElement("div",{ref:"attach",className:"zn_clear zn_attach SC_dyn"},React.createElement("div",{className:"icn"},React.createElement("i",{className:"msi-attachpin"})));for(var i=function(a){return function(){h.viewMyAttachment(a)}},j=function(a){return function(b){h.deleteAttachment(b,a)}},k=function(a){return function(b){b.stopPropagation(),h.props.onRemoveMyAttachment(a)}},l=function(a,h){e=zmUtil.fileTyp(a.fn),d=a.thn,d?(c=d,b=React.createElement("img",{src:c})):(f=e[1]+" zm-attIcn",b=React.createElement("i",{className:f})),g.push(React.createElement("div",{className:"zmL zmAch",title:a.fn,onClick:i(h)},React.createElement("div",{className:"zmLst"},React.createElement("div",{className:"zmDtl"},React.createElement("div",{className:"zmImg"},b),React.createElement("div",{className:"SC_icn"},React.createElement("i",{className:"msi-close",onClick:k(a)}))))))},m=0;m<this.props.attArray.length;m++)this.props.attArray[m].Id?l(this.props.attArray[m],m):a(this.props.attArray[m],m);return React.createElement("div",{className:"zn_folder zn_clear zn_attach"},React.createElement("div",{className:"icn"},React.createElement("i",{className:"msi-attachpin"})),g)}}]),b}(React.Component)}();
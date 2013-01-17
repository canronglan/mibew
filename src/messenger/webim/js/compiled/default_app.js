/*
 This file is part of Mibew Messenger project.
 http://mibew.org
 Copyright (c) 2005-2011 Mibew Messenger Community
 License: http://mibew.org/license.php
*/
var Mibew={};(function(a,b){b.Marionette.TemplateCache.prototype.compileTemplate=function(a){return Handlebars.compile(a)};a.Models={};a.Collections={};a.Views={};a.Objects={};a.Objects.Models={};a.Objects.Collections={}})(Mibew,Backbone);
(function(e,a){a.registerHelper("apply",function(c,b){var f=c,e=/^[0-9A-z_]+$/;b=b.split(/\s*,\s*/);for(var d in b)if(b.hasOwnProperty(d)&&e.test(b[d])){if("function"!=typeof a.helpers[b[d]])throw Error("Unregistered helper '"+b[d]+"'!");f=a.helpers[b[d]](f).toString()}return new a.SafeString(f)});a.registerHelper("formatTime",function(c){var b=new Date(1E3*c);c=b.getHours().toString();var a=b.getMinutes().toString(),b=b.getSeconds().toString();return(10<c?c:"0"+c)+":"+(10<a?a:"0"+a)+":"+(10<b?b:
"0"+b)});a.registerHelper("urlReplace",function(c){return new a.SafeString(c.replace(/((?:https?|ftp):\/\/\S*)/g,'<a href="$1" target="_blank">$1</a>'))});a.registerHelper("nl2br",function(c){return new a.SafeString(c.replace(/\n/g,"<br/>"))});a.registerHelper("L10n",function(a){return e.Localization.get(a)||""})})(Mibew,Handlebars);
(function(b,d){b.Localization={};var c={};b.Localization.get=function(a){return!c.hasOwnProperty(a)?!1:c[a]};b.Localization.set=function(a){d.extend(c,a)}})(Mibew,_);
(function(b,f,g,c){b.Server=function(a){this.updateTimer=null;this.options=c.extend({url:"",requestsFrequency:2,reconnectPause:1,onTimeout:function(){},onTransportError:function(){},onCallError:function(){},onUpdateError:function(){},onResponseError:function(){}},a);this.callbacks={};this.callPeriodically=[];this.ajaxRequest=null;this.buffer=[];this.functions={};this.mibewAPI=new f(new this.options.interactionType)};b.Server.prototype.callFunctions=function(a,e,b){try{if(!(a instanceof Array))throw Error("The first arguments must be an array");
for(var d in a)a.hasOwnProperty(d)&&this.mibewAPI.checkFunction(a[d],!1);var c=this.generateToken();this.callbacks[c]=e;this.buffer.push({token:c,functions:a});b&&this.update()}catch(f){return this.options.onCallError(f),!1}return!0};b.Server.prototype.callFunctionsPeriodically=function(a,e){this.callPeriodically.push({functionsListBuilder:a,callbackFunction:e})};b.Server.prototype.generateToken=function(){var a;do a="wnd"+(new Date).getTime().toString()+Math.round(50*Math.random()).toString();while(a in
this.callbacks);return a};b.Server.prototype.processRequest=function(a){var e=new MibewAPIExecutionContext,b=this.mibewAPI.getResultFunction(a.functions,this.callbacks.hasOwnProperty(a.token));if(null===b)for(var d in a.functions)a.functions.hasOwnProperty(d)&&(this.processFunction(a.functions[d],e),this.buffer.push(this.mibewAPI.buildResult(e.getResults(),a.token)));else this.callbacks.hasOwnProperty(a.token)&&(this.callbacks[a.token](b.arguments),delete this.callbacks[a.token])};b.Server.prototype.processFunction=
function(a,e){if(this.functions.hasOwnProperty(a["function"])){var b=e.getArgumentsList(a),d={},f;for(f in this.functions[a["function"]])this.functions[a["function"]].hasOwnProperty(f)&&(d=c.extend(d,this.functions[a["function"]][f](b)));e.storeFunctionResults(a,d)}};b.Server.prototype.sendRequests=function(a){this.ajaxRequest=g.ajax({url:this.options.url,timeout:5E3,async:!0,cache:!1,type:"POST",dataType:"text",data:{data:this.mibewAPI.encodePackage(a)},success:c.bind(this.receiveResponse,this),
error:c.bind(this.onError,this)})};b.Server.prototype.runUpdater=function(){null==this.updateTimer&&this.update();this.updateTimer=setTimeout(c.bind(this.update,this),1E3*this.options.requestsFrequency)};b.Server.prototype.restartUpdater=function(){this.updateTimer&&clearTimeout(this.updateTimer);this.ajaxRequest&&this.ajaxRequest.abort();this.update();this.updateTimer=setTimeout(c.bind(this.update,this),1E3*this.options.reconnectPause)};b.Server.prototype.update=function(){this.updateTimer&&clearTimeout(this.updateTimer);
for(var a=0;a<this.callPeriodically.length;a++)this.callFunctions(this.callPeriodically[a].functionsListBuilder(),this.callPeriodically[a].callbackFunction);if(0==this.buffer.length)this.runUpdater();else try{this.sendRequests(this.buffer),this.buffer=[]}catch(b){this.options.onUpdateError(b)}};b.Server.prototype.receiveResponse=function(a){""==a&&this.runUpdater();try{var b=this.mibewAPI.decodePackage(a),c;for(c in b.requests)this.processRequest(b.requests[c])}catch(d){this.options.onResponseError(d)}finally{this.runUpdater()}};
b.Server.prototype.registerFunction=function(a,b){a in this.functions||(this.functions[a]=[]);this.functions[a].push(b)};b.Server.prototype.onError=function(a,b){if("abort"!=b)if(this.restartUpdater(),"timeout"==b)this.options.onTimeout();else if("error"==b)this.options.onTransportError()}})(Mibew,MibewAPI,$,_);
(function(b){b.Thread=function(a){this.threadId=a.threadId||0;this.token=a.token||0;this.lastId=a.lastId||0}})(Mibew);
(function(c){c.Utils={};c.Utils.toUpperCaseFirst=function(a){return"string"!=typeof a?!1:""===a?a:a.substring(0,1).toUpperCase()+a.substring(1)};c.Utils.toDashFormat=function(a){if("string"!=typeof a)return!1;a=a.match(/((?:[A-Z]?[a-z]+)|(?:[A-Z][a-z]*))/g);for(var b=0;b<a.length;b++)a[b]=a[b].toLowerCase();return a.join("-")}})(Mibew);
(function(a,b){a.Models.Base=b.Model.extend({getModelType:function(){return""}})})(Mibew,Backbone);
(function(a){a.Models.Control=a.Models.Base.extend({defaults:{title:"",weight:0}})})(Mibew);
(function(a,b){a.Models.Page=b.Model.extend()})(Mibew,Backbone);
(function(a,b){a.Models.Sound=b.Model.extend({play:function(a){this.set({file:a});this.trigger("sound:play",this)}})})(Mibew,Backbone);
(function(a,b){a.Models.User=b.Model.extend({defaults:{isAgent:!1,canPost:!0,typing:!1,name:"",canChangeName:!1,dafaultName:!0}})})(Mibew,Backbone);
(function(a,b){a.Collections.Controls=b.Collection.extend({comparator:function(a){return a.get("weight")}})})(Mibew,Backbone);
(function(d,b,e){d.Views.CollectionBase=b.Marionette.CollectionView.extend({itemView:b.Marionette.ItemView,buildItemView:function(a,b,c){c=e.extend({model:a},c);return(a=a.getModelType())&&d.Views[a]?new d.Views[a](c):new b(c)}})})(Mibew,Backbone,_);
(function(b,c,d){b.Views.Control=c.Marionette.ItemView.extend({template:d.templates.control,modelEvents:{change:"render"},events:{mouseover:"mouseOver",mouseleave:"mouseLeave"},attributes:function(){var a=[];a.push("control");this.className&&(a.push(this.className),this.className="");var b=this.getDashedControlType();b&&a.push(b);return{"class":a.join(" ")}},mouseOver:function(){var a=this.getDashedControlType();this.$el.addClass("active"+(a?"-"+a:""))},mouseLeave:function(){var a=this.getDashedControlType();
this.$el.removeClass("active"+(a?"-"+a:""))},getDashedControlType:function(){"undefined"==typeof this.dashedControlType&&(this.dashedControlType=b.Utils.toDashFormat(this.model.getModelType())||"");return this.dashedControlType}})})(Mibew,Backbone,Handlebars);
(function(a){a.Views.ControlsCollection=a.Views.CollectionBase.extend({itemView:a.Views.Control,className:"controls-collection"})})(Mibew);
(function(a,b,c){a.Views.Sound=b.Marionette.ItemView.extend({template:c.templates.sound,className:"sound-player",modelEvents:{"sound:play":"render"}})})(Mibew,Backbone,Handlebars);

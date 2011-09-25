
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());

/*!
 * JS Signals <http://millermedeiros.github.com/js-signals/>
 * Released under the MIT license <http://www.opensource.org/licenses/mit-license.php>
 * @author Miller Medeiros <http://millermedeiros.com/>
 * @version 0.6.3
 * @build 187 (07/11/2011 10:14 AM)
 */
(function(d){var b={VERSION:"0.6.3"};function c(i,h,f,g,e){this._listener=h;this._isOnce=f;this.context=g;this._signal=i;this._priority=e||0}c.prototype={active:true,params:null,execute:function(e){var g,f;if(this.active&&!!this._listener){f=this.params?this.params.concat(e):e;g=this._listener.apply(this.context,f);if(this._isOnce){this.detach()}}return g},detach:function(){return this.isBound()?this._signal.remove(this._listener):null},isBound:function(){return(!!this._signal&&!!this._listener)},getListener:function(){return this._listener},_destroy:function(){delete this._signal;delete this._listener;delete this.context},isOnce:function(){return this._isOnce},toString:function(){return"[SignalBinding isOnce: "+this._isOnce+", isBound: "+this.isBound()+", active: "+this.active+"]"}};function a(e,f){if(typeof e!=="function"){throw new Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}",f))}}b.Signal=function(){this._bindings=[]};b.Signal.prototype={_shouldPropagate:true,active:true,_registerListener:function(i,h,g,f){var e=this._indexOfListener(i),j;if(e!==-1){j=this._bindings[e];if(j.isOnce()!==h){throw new Error("You cannot add"+(h?"":"Once")+"() then add"+(!h?"":"Once")+"() the same listener without removing the relationship first.")}}else{j=new c(this,i,h,g,f);this._addBinding(j)}return j},_addBinding:function(e){var f=this._bindings.length;do{--f}while(this._bindings[f]&&e._priority<=this._bindings[f]._priority);this._bindings.splice(f+1,0,e)},_indexOfListener:function(e){var f=this._bindings.length;while(f--){if(this._bindings[f]._listener===e){return f}}return -1},add:function(g,f,e){a(g,"add");return this._registerListener(g,false,f,e)},addOnce:function(g,f,e){a(g,"addOnce");return this._registerListener(g,true,f,e)},remove:function(f){a(f,"remove");var e=this._indexOfListener(f);if(e!==-1){this._bindings[e]._destroy();this._bindings.splice(e,1)}return f},removeAll:function(){var e=this._bindings.length;while(e--){this._bindings[e]._destroy()}this._bindings.length=0},getNumListeners:function(){return this._bindings.length},halt:function(){this._shouldPropagate=false},dispatch:function(f){if(!this.active){return}var e=Array.prototype.slice.call(arguments),h=this._bindings.slice(),g=this._bindings.length;this._shouldPropagate=true;do{g--}while(h[g]&&this._shouldPropagate&&h[g].execute(e)!==false)},dispose:function(){this.removeAll();delete this._bindings},toString:function(){return"[Signal active: "+this.active+" numListeners: "+this.getNumListeners()+"]"}};d.signals=b}(window||this));

/*!
 * Hasher <http://github.com/millermedeiros/hasher>
 * @author Miller Medeiros
 * @version 1.0.0 (2011/08/03 10:49 PM)
 * Released under the MIT License
 */
var hasher=(function(i){var m=25,n=i.document,a=i.location,l=i.history,s=signals.Signal,d,r,k,A,c,y,p=/#(.*)$/,h=/(\?.*)|(\#.*)/,e=/^\#/,g=(!+"\v1"),w=("onhashchange" in i),b=g&&!w,o=(a.protocol==="file:");function q(C){if(!C){return""}var B=new RegExp("^\\"+d.prependHash+"|\\"+d.appendHash+"$","g");return C.replace(B,"")}function z(){var B=p.exec(d.getURL());return(B&&B[1])?decodeURIComponent(B[1]):""}function v(){return(c)?c.contentWindow.frameHash:null}function u(){c=n.createElement("iframe");c.src="about:blank";c.style.display="none";n.body.appendChild(c)}function f(){if(c&&r!==v()){var B=c.contentWindow.document;B.open();B.write("<html><head><title>"+n.title+'</title><script type="text/javascript">var frameHash="'+r+'";<\/script></head><body>&nbsp;</body></html>');B.close()}}function j(B){B=decodeURIComponent(B);if(r!==B){var C=r;r=B;if(b){f()}d.changed.dispatch(q(B),q(C))}}y=(b)?function(){var C=z(),B=v();if(B!==r&&B!==C){d.setHash(q(B))}else{if(C!==r){j(C)}}}:function(){var B=z();if(B!==r){j(B)}};function x(D,B,C){if(D.addEventListener){D.addEventListener(B,C,false)}else{if(D.attachEvent){D.attachEvent("on"+B,C)}}}function t(D,B,C){if(D.removeEventListener){D.removeEventListener(B,C,false)}else{if(D.detachEvent){D.detachEvent("on"+B,C)}}}d={VERSION:"1.0.0",appendHash:"",prependHash:"/",separator:"/",changed:new s(),stopped:new s(),initialized:new s(),init:function(){if(A){return}r=z();if(w){x(i,"hashchange",y)}else{if(b){if(!c){u()}f()}k=setInterval(y,m)}A=true;d.initialized.dispatch(q(r))},stop:function(){if(!A){return}if(w){t(i,"hashchange",y)}else{clearInterval(k);k=null}A=false;d.stopped.dispatch(q(r))},isActive:function(){return A},getURL:function(){return a.href},getBaseURL:function(){return d.getURL().replace(h,"")},setHash:function(B){var C=Array.prototype.slice.call(arguments);B=C.join(d.separator);B=B?d.prependHash+B.replace(e,"")+d.appendHash:B;if(B!==r){j(B);if(g&&o){B=B.replace(/\?/,"%3F")}a.hash="#"+encodeURI(B)}},getHash:function(){return q(r)},getHashAsArray:function(){return d.getHash().split(d.separator)},dispose:function(){d.stop();d.initialized.dispose();d.stopped.dispose();d.changed.dispose();c=d=i.hasher=null},toString:function(){return'[hasher version="'+d.VERSION+'" hash="'+d.getHash()+'"]'}};return d}(window));

/*

 Crossroads.js <http://millermedeiros.github.com/crossroads.js>
 Released under the MIT license
 Author: Miller Medeiros
 Version: 0.6.0 - Build: 77 (2011/08/31 11:12 PM)
*/
(function(h){h(["signals"],function(f){function h(a,b){for(var c=a.length;c--;)if(a[c]===b)return c;return-1}function j(a,b){return"[object "+a+"]"===Object.prototype.toString.call(b)}function m(a){return a===null?a:o.test(a)?a.toLowerCase()==="true":a===""||isNaN(a)?a:parseFloat(a)}function l(){this._routes=[];this.bypassed=new f.Signal;this.routed=new f.Signal}function n(a,b,c,d){var g=j("RegExp",a);this._router=d;this._pattern=a;this._paramsIds=g?null:i.getParamIds(this._pattern);this._optionalParamsIds=
g?null:i.getOptionalParamsIds(this._pattern);this._matchRegexp=g?a:i.compilePattern(a);this.matched=new f.Signal;b&&this.matched.add(b);this._priority=c||0}var k,i,o=/^(true|false)$/i;l.prototype={create:function(){return new l},shouldTypecast:!1,addRoute:function(a,b,c){a=new n(a,b,c,this);this._sortedInsert(a);return a},removeRoute:function(a){var b=h(this._routes,a);b>=0&&this._routes.splice(b,1);a._destroy()},removeAllRoutes:function(){for(var a=this.getNumRoutes();a--;)this._routes[a]._destroy();
this._routes.length=0},parse:function(a){var a=a||"",b=this._getMatchedRoute(a),c=b?b._getParamsArray(a):null;b?(c?b.matched.dispatch.apply(b.matched,c):b.matched.dispatch(),this.routed.dispatch(a,b,c)):this.bypassed.dispatch(a)},getNumRoutes:function(){return this._routes.length},_sortedInsert:function(a){var b=this._routes,c=b.length;do--c;while(b[c]&&a._priority<=b[c]._priority);b.splice(c+1,0,a)},_getMatchedRoute:function(a){for(var b=this._routes,c=b.length,d;d=b[--c];)if(d.match(a))return d;
return null},toString:function(){return"[crossroads numRoutes:"+this.getNumRoutes()+"]"}};k=new l;k.VERSION="0.6.0";n.prototype={rules:void 0,match:function(a){return this._matchRegexp.test(a)&&this._validateParams(a)},_validateParams:function(a){var b=this.rules,c=this._getParamValuesObject(a),d;for(d in b)if(b.hasOwnProperty(d)&&!this._isValidParam(a,d,c))return!1;return!0},_isValidParam:function(a,b,c){var d=this.rules[b],g=c[b],f;g==null&&this._optionalParamsIds&&h(this._optionalParamsIds,b)!==
-1?f=!0:j("RegExp",d)?f=d.test(g):j("Array",d)?f=h(d,g||"")!==-1:j("Function",d)&&(f=d(g,a,c));return f||!1},_getParamValuesObject:function(a){for(var b=this._router.shouldTypecast,c=i.getParamValues(a,this._matchRegexp,b),d={},g=c.length;g--;)d[g]=c[g],this._paramsIds&&(d[this._paramsIds[g]]=c[g]);d.request_=b?m(a):a;return d},_getParamsArray:function(a){var b=this._getParamValuesObject(a),c=this.rules?this.rules.normalize_:null;return j("Function",c)?c(a,b):i.getParamValues(a,this._matchRegexp,
this._router.shouldTypecast)},dispose:function(){this._router.removeRoute(this)},_destroy:function(){this.matched.dispose();this.matched=this._pattern=this._matchRegexp=null},toString:function(){return'[Route pattern:"'+this._pattern+'", numListeners:'+this.matched.getNumListeners()+"]"}};i=k.patternLexer=function(){var a=/[\\.+*?\^$\[\](){}\/'#]/g,b=/\/$/g,c=/([:}]|\w(?=\/))\/?(:)/g,d=/([:}])\/?(\{)/g,g=/\{([^}]+)\}/g,f=/:([^:]+):/g,h=/(?:\{|:)([^}:]+)(?:\}|:)/g,i=RegExp("___CR_REQ___","g"),j=RegExp("___CR_OPT___",
"g"),k=RegExp("___CR_OPT_SLASH___","g"),l=RegExp("___CR_REQ_SLASH___","g");return{getParamIds:function(a){for(var b=[],c;c=h.exec(a);)b.push(c[1]);return b},getOptionalParamsIds:function(a){for(var b=[],c;c=f.exec(a);)b.push(c[1]);return b},getParamValues:function(a,b,c){if(a=b.exec(a))if(a.shift(),c){c=a;a=c.length;for(b=[];a--;)b[a]=m(c[a]);a=b}return a},compilePattern:function(e){if(e=e||"")e=e.replace(b,""),e=e.replace(c,"$1___CR_OPT_SLASH___$2"),e=e.replace(d,"$1___CR_REQ_SLASH___$2"),e=e.replace(f,
"___CR_OPT___"),e=e.replace(g,"___CR_REQ___"),e=e.replace(a,"\\$&"),e=e.replace(k,"\\/?"),e=e.replace(l,"\\/"),e=e.replace(j,"([^\\/]+)?/?"),e=e.replace(i,"([^\\/]+)");return RegExp("^"+e+"/?$")}}}();return k})})(typeof require==="undefined"?function(h,f){this.crossroads=f(signals)}:typeof exports==="undefined"?function(h,f){define("crossroads",h,f)}:function(h,f){module.exports=f.apply(this,h.map(require))});

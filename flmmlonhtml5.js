"use strict";var FlMMLonHTML5=function(){function t(t){i||(i=document.createElement("div"),document.body.appendChild(i));var e=document.createElement("div");e.appendChild(document.createTextNode(t)),i.appendChild(e);var o=i.getElementsByTagName("div");o.length>10&&i.removeChild(i.firstChild)}function e(t){var e,o,i,s=arguments.length;for(e=1;s>e;e++)for(i in o=arguments[e])t[i]=o[i];return t}function o(t){t||(t="FlMMLonHTML5"===o.name?"flmmlworker-raw.js":"flmmlworker.js"),this.worker=new Worker(t),this.worker.addEventListener("message",this.onMessage.bind(this));var e=AudioContext||webkitAudioContext,i=this.audioCtx=new e;addEventListener("touchstart",this.onTouchStartBinded=this.onTouchStart.bind(this)),this.warnings="",this.totalTimeStr="00:00",this.bufferReady=!1,this.volume=100,this.events={},this.worker.postMessage({type:n,sampleRate:i.sampleRate}),this.setInfoInterval(125)}var i,s=8192,n=1,r=2,a=3,c=4,h=5,u=6,p=7,f=8,l=9,d=10,g=11,y=12,m=new Float32Array(s);return o.prototype.onMessage=function(o){var i=o.data,s=i.type;if(s)switch(s){case h:this.buffer=i.buffer,this.bufferReady=!0;break;case u:e(this,i.info),this.oncompilecomplete&&this.oncompilecomplete(),this.trigger("compilecomplete");break;case p:this.onbuffering&&this.onbuffering(i),this.trigger("buffering",i);break;case f:this.oncomplete&&this.oncomplete(),this.trigger("complete");break;case l:e(this,i.info),this.onsyncinfo&&this.onsyncinfo(),this.trigger("syncinfo");break;case d:this.playSound();break;case g:this.stopSound(i.isFlushBuf),this.worker.postMessage({type:g});break;case y:t(i.str)}},o.prototype.playSound=function(){if(!(this.gain||this.scrProc||this.oscDmy)){var t=this.audioCtx;this.gain=t.createGain(),this.gain.gain.value=this.volume/127,this.gain.connect(t.destination),this.scrProc=t.createScriptProcessor(s,1,2),this.onAudioProcessBinded=this.onAudioProcess.bind(this),this.scrProc.addEventListener("audioprocess",this.onAudioProcessBinded),this.scrProc.connect(this.gain),this.oscDmy=t.createOscillator(),this.oscDmy.connect(this.scrProc),this.oscDmy.start(0)}},o.prototype.stopSound=function(t){t&&(this.bufferReady=!1),(this.gain||this.scrProc||this.oscDmy)&&(this.scrProc.removeEventListener("audioprocess",this.onAudioProcessBinded),this.gain&&(this.gain.disconnect(),this.gain=null),this.scrProc&&(this.scrProc.disconnect(),this.scrProc=null),this.oscDmy&&(this.oscDmy.disconnect(),this.oscDmy=null))},o.prototype.onTouchStart=function(t){var e=this.audioCtx,o=e.createBufferSource();o.connect(e.destination),o.start(0),removeEventListener("touchstart",this.onTouchStartBinded)},o.prototype.onAudioProcess=function(t){var e=t.outputBuffer;this.bufferReady?(e.getChannelData(0).set(this.buffer[0]),e.getChannelData(1).set(this.buffer[1]),this.bufferReady=!1,this.worker.postMessage({type:h,retBuf:this.buffer},[this.buffer[0].buffer,this.buffer[1].buffer])):(e.getChannelData(0).set(m),e.getChannelData(1).set(m),this.worker.postMessage({type:h,retBuf:null}))},o.prototype.trigger=function(t,o){var i=this.events[t];if(i){var s={};e(s,o);for(var n=0,r=i.length;r>n;n++)i[n].call(this,s)}},o.prototype.play=function(t){this.worker.postMessage({type:r,mml:t})},o.prototype.stop=function(){this.worker.postMessage({type:a})},o.prototype.pause=function(){this.worker.postMessage({type:c})},o.prototype.setMasterVolume=function(t){this.volume=t,this.gain&&(this.gain.gain.value=this.volume/127)},o.prototype.isPlaying=function(){return this._isPlaying},o.prototype.isPaused=function(){return this._isPaused},o.prototype.getWarnings=function(){return this.warnings},o.prototype.getTotalMSec=function(){return 0|this.totalMSec},o.prototype.getTotalTimeStr=function(){return this.totalTimeStr},o.prototype.getNowMSec=function(){return 0|this.nowMSec},o.prototype.getNowTimeStr=function(){return this.nowTimeStr},o.prototype.getVoiceCount=function(){return this.voiceCount},o.prototype.getMetaTitle=function(){return this.metMetaTitle},o.prototype.getMetaComment=function(){return this.metMetaComment},o.prototype.getMetaArtist=function(){return this.metMetaArtist},o.prototype.getMetaCoding=function(){return this.metaCoding},o.prototype.setInfoInterval=function(t){this.worker.postMessage({type:l,interval:t})},o.prototype.syncInfo=function(){this.worker.postMessage({type:l,interval:null})},o.prototype.addEventListener=function(t,e){var o=this.events[t];o||(o=this.events[t]=[]);for(var i=o.length;i--;)if(o[i]===e)return!1;return o.push(e),!0},o.prototype.removeEventListener=function(t,e){var o=this.events[t];if(!o)return!1;for(var i=o.length;i--;)if(o[i]===e)return o.splice(i,1),!0;return!1},o.prototype.release=function(){this.worker.terminate()},o}();
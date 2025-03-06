"use strict";(self.webpackChunkgamut_repo=self.webpackChunkgamut_repo||[]).push([[8262,9465],{"./node_modules/@vidstack/react/prod/chunks/vidstack-BZcJ-w0X.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{YouTubeProvider:()=>YouTubeProvider});var _vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@vidstack/react/prod/chunks/vidstack-CNjv_Zem.js"),_vidstack_WyKbSRm0_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@vidstack/react/prod/chunks/vidstack-WyKbSRm0.js"),_vidstack_CcKOND9e_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@vidstack/react/prod/chunks/vidstack-CcKOND9e.js"),_vidstack_Zc3I7oOd_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@vidstack/react/prod/chunks/vidstack-Zc3I7oOd.js");__webpack_require__("./node_modules/react/index.js");const YouTubePlayerState_Ended=0,YouTubePlayerState_Playing=1,YouTubePlayerState_Paused=2,YouTubePlayerState_Buffering=3,YouTubePlayerState_Cued=5;class YouTubeProvider extends _vidstack_CcKOND9e_js__WEBPACK_IMPORTED_MODULE_1__.h{$$PROVIDER_TYPE="YOUTUBE";scope=(0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_2__.createScope)();#ctx;#videoId=(0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_2__.signal)("");#state=-1;#currentSrc=null;#seekingTimer=-1;#invalidPlay=!1;#promises=new Map;constructor(iframe,ctx){super(iframe),this.#ctx=ctx}language="en";color="red";cookies=!1;get currentSrc(){return this.#currentSrc}get type(){return"youtube"}get videoId(){return this.#videoId()}preconnect(){(0,_vidstack_WyKbSRm0_js__WEBPACK_IMPORTED_MODULE_3__.TB)(this.getOrigin())}setup(){super.setup(),(0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_2__.effect)(this.#watchVideoId.bind(this)),this.#ctx.notify("provider-setup",this)}destroy(){this.#reset();for(const promises of this.#promises.values())for(const{reject}of promises)reject("provider destroyed");this.#promises.clear()}async play(){return this.#remote("playVideo")}#playFail(message){this.#getPromise("playVideo")?.reject(message)}async pause(){return this.#remote("pauseVideo")}#pauseFail(message){this.#getPromise("pauseVideo")?.reject(message)}setMuted(muted){muted?this.#remote("mute"):this.#remote("unMute")}setCurrentTime(time){this.#remote("seekTo",time),this.#ctx.notify("seeking",time)}setVolume(volume){this.#remote("setVolume",100*volume)}setPlaybackRate(rate){this.#remote("setPlaybackRate",rate)}async loadSource(src){if(!(0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_2__.isString)(src.src))return this.#currentSrc=null,void this.#videoId.set("");const videoId=(0,_vidstack_Zc3I7oOd_js__WEBPACK_IMPORTED_MODULE_4__.resolveYouTubeVideoId)(src.src);this.#videoId.set(videoId??""),this.#currentSrc=src}getOrigin(){return this.cookies?"https://www.youtube.com":"https://www.youtube-nocookie.com"}#watchVideoId(){this.#reset();const videoId=this.#videoId();videoId?(this.src.set(`${this.getOrigin()}/embed/${videoId}`),this.#ctx.notify("load-start")):this.src.set("")}buildParams(){const{keyDisabled}=this.#ctx.$props,{muted,playsInline,nativeControls}=this.#ctx.$state,showControls=nativeControls();return{autoplay:0,cc_lang_pref:this.language,cc_load_policy:showControls?1:void 0,color:this.color,controls:showControls?1:0,disablekb:!showControls||keyDisabled()?1:0,enablejsapi:1,fs:1,hl:this.language,iv_load_policy:showControls?1:3,mute:muted()?1:0,playsinline:playsInline()?1:0}}#remote(command,arg){let promise=(0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_2__.deferredPromise)(),promises=this.#promises.get(command);return promises||this.#promises.set(command,promises=[]),promises.push(promise),this.postMessage({event:"command",func:command,args:arg?[arg]:void 0}),promise.promise}onLoad(){window.setTimeout((()=>this.postMessage({event:"listening"})),100)}#onReady(trigger){this.#ctx.notify("loaded-metadata"),this.#ctx.notify("loaded-data"),this.#ctx.delegate.ready(void 0,trigger)}#onPause(trigger){this.#getPromise("pauseVideo")?.resolve(),this.#ctx.notify("pause",void 0,trigger)}#onTimeUpdate(time,trigger){const{duration,realCurrentTime}=this.#ctx.$state,hasEnded=this.#state===YouTubePlayerState_Ended,boundTime=hasEnded?duration():time;this.#ctx.notify("time-change",boundTime,trigger),!hasEnded&&Math.abs(boundTime-realCurrentTime())>1&&this.#ctx.notify("seeking",boundTime,trigger)}#onProgress(buffered,seekable,trigger){const detail={buffered:new _vidstack_WyKbSRm0_js__WEBPACK_IMPORTED_MODULE_3__.zJ(0,buffered),seekable};this.#ctx.notify("progress",detail,trigger);const{seeking,realCurrentTime}=this.#ctx.$state;seeking()&&buffered>realCurrentTime()&&this.#onSeeked(trigger)}#onSeeked(trigger){const{paused,realCurrentTime}=this.#ctx.$state;window.clearTimeout(this.#seekingTimer),this.#seekingTimer=window.setTimeout((()=>{this.#ctx.notify("seeked",realCurrentTime(),trigger),this.#seekingTimer=-1}),paused()?100:0)}#onEnded(trigger){const{seeking}=this.#ctx.$state;seeking()&&this.#onSeeked(trigger),this.#ctx.notify("pause",void 0,trigger),this.#ctx.notify("end",void 0,trigger)}#onStateChange(state,trigger){const{paused,seeking}=this.#ctx.$state,isPlaying=state===YouTubePlayerState_Playing,isBuffering=state===YouTubePlayerState_Buffering,isPendingPlay=this.#isPending("playVideo"),isPlay=paused()&&(isBuffering||isPlaying);if(isBuffering&&this.#ctx.notify("waiting",void 0,trigger),seeking()&&isPlaying&&this.#onSeeked(trigger),this.#invalidPlay&&isPlaying)return this.pause(),this.#invalidPlay=!1,void this.setMuted(this.#ctx.$state.muted());if(!isPendingPlay&&isPlay)return this.#invalidPlay=!0,void this.setMuted(!0);switch(isPlay&&(this.#getPromise("playVideo")?.resolve(),this.#ctx.notify("play",void 0,trigger)),state){case YouTubePlayerState_Cued:this.#onReady(trigger);break;case YouTubePlayerState_Playing:this.#ctx.notify("playing",void 0,trigger);break;case YouTubePlayerState_Paused:this.#onPause(trigger);break;case YouTubePlayerState_Ended:this.#onEnded(trigger)}this.#state=state}onMessage({info},event){if(!info)return;const{title,intrinsicDuration,playbackRate}=this.#ctx.$state;if((0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_2__.isObject)(info.videoData)&&info.videoData.title!==title()&&this.#ctx.notify("title-change",info.videoData.title,event),(0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_2__.isNumber)(info.duration)&&info.duration!==intrinsicDuration()){if((0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_2__.isNumber)(info.videoLoadedFraction)){const buffered=info.progressState?.loaded??info.videoLoadedFraction*info.duration,seekable=new _vidstack_WyKbSRm0_js__WEBPACK_IMPORTED_MODULE_3__.zJ(0,info.duration);this.#onProgress(buffered,seekable,event)}this.#ctx.notify("duration-change",info.duration,event)}if((0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_2__.isNumber)(info.playbackRate)&&info.playbackRate!==playbackRate()&&this.#ctx.notify("rate-change",info.playbackRate,event),info.progressState){const{current,seekableStart,seekableEnd,loaded,duration}=info.progressState;this.#onTimeUpdate(current,event),this.#onProgress(loaded,new _vidstack_WyKbSRm0_js__WEBPACK_IMPORTED_MODULE_3__.zJ(seekableStart,seekableEnd),event),duration!==intrinsicDuration()&&this.#ctx.notify("duration-change",duration,event)}if((0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_2__.isNumber)(info.volume)&&(0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_2__.isBoolean)(info.muted)&&!this.#invalidPlay){const detail={muted:info.muted,volume:info.volume/100};this.#ctx.notify("volume-change",detail,event)}(0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_2__.isNumber)(info.playerState)&&info.playerState!==this.#state&&this.#onStateChange(info.playerState,event)}#reset(){this.#state=-1,this.#seekingTimer=-1,this.#invalidPlay=!1}#getPromise(command){return this.#promises.get(command)?.shift()}#isPending(command){return Boolean(this.#promises.get(command)?.length)}}},"./node_modules/@vidstack/react/prod/chunks/vidstack-CcKOND9e.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{h:()=>EmbedProvider});var _vidstack_WyKbSRm0_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@vidstack/react/prod/chunks/vidstack-WyKbSRm0.js"),_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@vidstack/react/prod/chunks/vidstack-CNjv_Zem.js");class EmbedProvider{#iframe;src=(0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_0__.signal)("");referrerPolicy=null;get iframe(){return this.#iframe}constructor(iframe){this.#iframe=iframe,iframe.setAttribute("frameBorder","0"),iframe.setAttribute("aria-hidden","true"),iframe.setAttribute("allow","autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; gyroscope"),null!==this.referrerPolicy&&iframe.setAttribute("referrerpolicy",this.referrerPolicy)}setup(){(0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_0__.listenEvent)(window,"message",this.#onWindowMessage.bind(this)),(0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_0__.listenEvent)(this.#iframe,"load",this.onLoad.bind(this)),(0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_0__.effect)(this.#watchSrc.bind(this))}#watchSrc(){const src=this.src();if(!src.length)return void this.#iframe.setAttribute("src","");const params=(0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_0__.peek)((()=>this.buildParams()));this.#iframe.setAttribute("src",(0,_vidstack_WyKbSRm0_js__WEBPACK_IMPORTED_MODULE_1__.xF)(src,params))}postMessage(message,target){_vidstack_WyKbSRm0_js__WEBPACK_IMPORTED_MODULE_1__.X3||this.#iframe.contentWindow?.postMessage(JSON.stringify(message),target??"*")}#onWindowMessage(event){const origin=this.getOrigin();if(!(null!==event.source&&event.source!==this.#iframe?.contentWindow||(0,_vidstack_CNjv_Zem_js__WEBPACK_IMPORTED_MODULE_0__.isString)(origin)&&origin!==event.origin)){try{const message=JSON.parse(event.data);return void(message&&this.onMessage(message,event))}catch(e){}event.data&&this.onMessage(event.data,event)}}}},"./node_modules/@vidstack/react/prod/chunks/vidstack-Zc3I7oOd.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{findYouTubePoster:()=>findYouTubePoster,resolveYouTubeVideoId:()=>resolveYouTubeVideoId});const videoIdRE=/(?:youtu\.be|youtube|youtube\.com|youtube-nocookie\.com)\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|)((?:\w|-){11})/,posterCache=new Map,pendingFetch=new Map;function resolveYouTubeVideoId(src){return src.match(videoIdRE)?.[1]}async function findYouTubePoster(videoId,abort){if(posterCache.has(videoId))return posterCache.get(videoId);if(pendingFetch.has(videoId))return pendingFetch.get(videoId);const pending=new Promise((async resolve=>{const sizes=["maxresdefault","sddefault","hqdefault"];for(const size of sizes)for(const webp of[!0,!1]){const url=resolveYouTubePosterURL(videoId,size,webp);if((await fetch(url,{mode:"no-cors",signal:abort.signal})).status<400)return posterCache.set(videoId,url),void resolve(url)}})).catch((()=>"")).finally((()=>pendingFetch.delete(videoId)));return pendingFetch.set(videoId,pending),pending}function resolveYouTubePosterURL(videoId,size,webp){return`https://i.ytimg.com/${webp?"vi_webp":"vi"}/${videoId}/${size}.${webp?"webp":"jpg"}`}}}]);
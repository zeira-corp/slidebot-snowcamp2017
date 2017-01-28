!function(){"use strict";function t(t){t.initialize()}angular.module("app",["ui.router","ui.bootstrap","ngStorage","ngCookies","uuid4","angularMoment","luegg.directives","ngCookies","tmh.dynamicLocale","pascalprecht.translate","cfp.hotkeys"]).run(t),t.$inject=["settingssHandler"]}(),function(){"use strict";function t(t,e){function n(){return e}function a(){return t.getApplication()}function i(e){t.useApplication(e)}var r={getAll:n,getCurrent:a,useApplication:i};return r}angular.module("app").factory("LuisApplicationService",t),t.$inject=["Luis","LUIS_APPLICATIONS"]}(),function(){"use strict";angular.module("app").constant("LUIS_APPLICATIONS",[{name:"Snowcamp 2017",appId:"496aaf6a-10e6-48fa-8b17-15658ddabde2",subscriptionKey:"ebc99ea1bfe8481d9c01f8145a553187"}])}(),function(){"use strict";function t(t){function e(){return t}var n={getAll:e};return n}angular.module("app").factory("LocaleService",t),t.$inject=["LOCALES"]}(),function(){"use strict";angular.module("app").constant("LOCALES",["de-DE","es-ES","en-GB","en-US","fr-FR","it-IT","zh-CN","zh-TW","ja-JP","en-IN","pt-BR","ko-KR","fr-CA","en-AU","zh-HK","ar-EG","fi-FI","vpt-PT","en-NZ","pl-PL","en-CA","ru-RU","da-DK","nl-NL","ca-ES","nb-NO","es-MX","sv-SE"])}(),function(){"use strict";angular.module("app").constant("LANGUAGES",["en","fr"])}(),function(){"use strict";function t(t,e,n,a){function i(){return n}function r(){var n=t.defer(),a=e.storage().get("NG_TRANSLATE_LANG_KEY");return n.resolve(a),n.promise}function o(t){var n=t.slice(0,2);n&&(e.use(n),a.set(n))}var s={getAll:i,getCurrent:r,changeLanguage:o};return s}angular.module("app").factory("LanguageService",t),t.$inject=["$q","$translate","LANGUAGES","tmhDynamicLocale"]}(),function(){"use strict";function t(t,e,n){function a(){e.startListening()}function i(){return e.isListening()}function r(){return e.stopListening().then(function(e){return t.$emit("bot::listened",e),e})}function o(t){return n.predict(t)}var s={startListening:a,isListening:i,stopListening:r,getIntent:o};return s}angular.module("app").factory("Bot",t),t.$inject=["$rootScope","Hears","Brain"]}(),function(){"use strict";function t(t,e,n,a){function i(){var i=t.$on("settings:saved",function(t,i){e.useLocale(i.stt.locale),n.changeLanguage(i.stt.locale),a.useApplication(i.nlu.application)});t.$on("$destroy",function(){angular.isDefined(i)&&null!==i&&i()})}return{initialize:i}}angular.module("app").factory("settingssHandler",t),t.$inject=["$rootScope","Hears","LanguageService","Luis"]}(),function(){"use strict";function t(t,e,n){function a(a){return n.indexOf(t.getObject(a))===-1&&(e.info('Resetting invalid cookie language "'+t.getObject(a)+'" to prefered language "en"'),t.putObject(a,"en")),t.getObject(a)}function i(e,n){t.putObject(e,n)}return{get:a,put:i}}angular.module("app").factory("translationStorageProvider",t),t.$inject=["$cookies","$log","LANGUAGES"]}(),function(){"use strict";function t(t,e){t.setDefaultApplication(e[0])}angular.module("app").config(t),t.$inject=["LuisProvider","LUIS_APPLICATIONS"]}(),function(){"use strict";function t(t,e){t.setKeyPrefix("goldorak-"),e.setKeyPrefix("goldorak-")}angular.module("app").config(t),t.$inject=["$localStorageProvider","$sessionStorageProvider"]}(),function(){"use strict";function t(t,e){t.setSpeechToText("BingSpeech"),t.setDefaultLocale("fr-FR"),e.setNaturalLanguageUnderstanding("Luis")}angular.module("app").config(t),t.$inject=["HearsProvider","BrainProvider"]}(),function(){"use strict";function t(t,e){t.setSubscriptionKey(e)}angular.module("app").config(t),t.$inject=["BingSpeechProvider","BING_SPEECH_SUBSCRIPTION_KEY"]}(),function(){"use strict";function t(t,e){t.useLoader("$translatePartialLoader",{urlTemplate:"i18n/{lang}/{part}.json"}),t.preferredLanguage("en"),t.useStorage("translationStorageProvider"),t.useSanitizeValueStrategy("escaped"),t.addInterpolation("$translateMessageFormatInterpolation"),e.localeLocationPattern("i18n/angular-locale_{{locale}}.js"),e.useCookieStorage(),e.storageKey("NG_TRANSLATE_LANG_KEY")}angular.module("app").config(t),t.$inject=["$translateProvider","tmhDynamicLocaleProvider"]}(),function(){"use strict";function t(t){t.state("settings",{parent:"app",url:"/settings",templateUrl:"app/settings/settings.html",controller:"SettingsController",controllerAs:"vm",resolve:{translatePartialLoader:["$translate","$translatePartialLoader",function(t,e){return e.addPart("settings"),e.addPart("global"),t.refresh()}],locales:["LocaleService",function(t){return t.getAll()}],luisApplications:["LuisApplicationService",function(t){return t.getAll()}]}})}angular.module("app").config(t),t.$inject=["$stateProvider"]}(),function(){"use strict";function t(t,e,n){function a(e){e=Object.assign({},o,e),t.settings=e,n.$emit("settings:saved",e)}function i(){return t.settings}var r={save:a,load:i},o={stt:{locale:"en-US"}},s=i();return s||a(o),r}angular.module("app").factory("Settings",t),t.$inject=["$localStorage","$log","$rootScope"]}(),function(){"use strict";function t(t,e,n,a,i){function r(){n.save(o.settings),e.go("home")}var o=this;o.save=r,o.settings=n.load(),o.locales=a,o.luisApplciations=i}angular.module("app").controller("SettingsController",t),t.$inject=["$log","$state","Settings","locales","luisApplications"]}(),function(){"use strict";function t(t,e,n){function a(){var t=e.defer();return n.navigator.getUserMedia({audio:!0},function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise}function i(){a().then(function(t){c=new RecordRTC(t,{type:"audio",numberOfAudioChannels:1}),c.startRecording(),u=!0})["catch"](function(e){t.error(e)})}function r(){var t=e.defer();return c.stopRecording(function(){u=!1,t.resolve(c.getBlob())}),t.promise}function o(){return u}var s={startRecording:i,stopRecording:r,isRecording:o};n.navigator.getUserMedia=n.navigator.getUserMedia||n.navigator.webkitGetUserMedia||n.navigator.mozGetUserMedia;var c,u=!1;return s}angular.module("app").factory("Microphone",t),t.$inject=["$log","$q","$window"]}(),function(){"use strict";function t(){function t(t,a,i){function r(t){l=t}function o(){return l}function s(e){i.$emit("luis:predict",{application:l,utterance:e});var a=n+l.appId+"/predict",r=[];return r.push(e),t.post(a,r,{headers:{"Ocp-Apim-Subscription-Key":l.subscriptionKey}}).then(function(t){return u(c(t))})}function c(t){if(t&&200===t.status)return t.data[0];throw new Error("Natural Language Understanding failed")}function u(t){var e={application:l,intent:t.IntentsResults[0].Name,entities:t.EntitiesResults};return i.$emit("luis:getIntent",e),e}var l,g={useApplication:r,getApplication:o,predict:s};if(l||!e)throw new Error("You must define at least one Luis application");return r(e),g}this.$get=t;var e,n="https://westus.api.cognitive.microsoft.com/luis/v1.0/prog/apps/";this.setLuisApiUrl=function(t){n=t},this.setDefaultApplication=function(t){e=t},t.$inject=["$http","$log","$rootScope"]}angular.module("app").provider("Luis",t),t.$inject=[]}(),function(){"use strict";function t(){function t(t,a,i,r){function o(t){g=t}function s(){return g}function c(){r.startRecording(),i.$emit("hears:onStartListening",{sst:e,locale:g})}function u(){return i.$emit("hears:onStopListening",{sst:e,locale:g}),r.stopRecording().then(l)}function l(t){return i.$emit("hears:onRecognize",{sst:e,locale:g,audio:t}),p.recognize(t,g)}var g,p,d={startListening:c,isListening:r.isRecording,stopListening:u,locale:s,useLocale:o};if(o(n),!e)throw new Error("You must define a SpeechToText engine");return a.debug("Speech To Text Engine: "+e),p=t.get(e),d}this.$get=t;var e,n="en-US";this.setSpeechToText=function(t){e=t},this.setDefaultLocale=function(t){n=t},t.$inject=["$injector","$log","$rootScope","Microphone"]}angular.module("app").provider("Hears",t),t.$inject=[]}(),function(){"use strict";function t(){function t(t,n,a){function i(t){return a.$emit("brain:onProcess",{nlu:e,text:t}),r.predict(t)}var r,o={predict:i};if(!e)throw new Error("You must define a NaturalLanguageUnderstanding engine");return n.debug("Natural Language Understanding Engine: "+e),r=t.get(e),o}this.$get=t;var e;this.setNaturalLanguageUnderstanding=function(t){e=t},t.$inject=["$injector","$log","$rootScope"]}angular.module("app").provider("Brain",t),t.$inject=[]}(),function(){"use strict";function t(){function t(t,i,r,o,s){function c(a,r){return t.debug("Recognizing audio with locale: "+r),g(e).then(function(t){return i.post(n+"/recognize",a,{params:{version:"3.0",requestid:s.generate(),appID:"D4D52672-91D7-4C74-8AD8-42B1D98141A5",format:"json",locale:r,"device.os":"0_0",scenarios:"ulm",instanceid:s.generate()},headers:{Authorization:"Bearer "+t,"Content-Type":"audio/wav; samplerate=44100"}})}).then(function(t){return l(u(t))})}function u(t){if(t)return t.data;throw new Error("Bing Speech recognition's reponse is empty")}function l(e){if("success"===e.header.status){var n=e.header.lexical;return t.debug("Here: "+n),n.charAt(0).toUpperCase()+n.slice(1)}throw new Error("Speech recognition failed")}function g(e){var n=o.defer(),s=r.authenticationToken,c=r.tokenExpirationDate;return s&&c>Date.now()?n.resolve(s):i.post(a,{},{headers:{"Ocp-Apim-Subscription-Key":e}}).then(function(t){s=t.data,p(s),n.resolve(s)})["catch"](function(a){t.error("Unable to authenticate the request with subscription key: "+e),n.reject(a)}),n.promise}function p(t){r.authenticationToken=t,r.tokenExpirationDate=Date.now()+54e4}var d={recognize:c};return d}this.$get=t;var e,n="https://speech.platform.bing.com",a="https://api.cognitive.microsoft.com/sts/v1.0/issueToken";this.setSubscriptionKey=function(t){e=t},t.$inject=["$log","$http","$localStorage","$q","uuid4"]}angular.module("app").provider("BingSpeech",t),t.$inject=[]}(),function(){"use strict";function t(t){t.state("home",{parent:"app",url:"/",templateUrl:"app/home/home.html",controller:"HomeController",controllerAs:"vm",resolve:{translatePartialLoader:["$translate","$translatePartialLoader",function(t,e){return e.addPart("home"),e.addPart("global"),t.refresh()}],locale:["Settings",function(t){var e=t.load();return e.stt.locale}],luisApplication:["Settings",function(t){var e=t.load();return e.nlu.application}]}})}angular.module("app").config(t),t.$inject=["$stateProvider"]}(),function(){"use strict";function t(t,e,n,a,i,r){function o(){g.messages.push({user:"goldorak",timestamp:(new Date).getTime(),content:"home.welcome"})}function s(){r.isListening()?r.stopListening().then(c)["catch"](u):r.startListening()}function c(t){g.messages.push({user:"me",timestamp:(new Date).getTime(),content:t}),r.getIntent(t).then(function(t){g.messages.push({user:"goldorak",timestamp:(new Date).getTime(),content:t.intent})})["catch"](function(t){g.messages.push({user:"goldorak",timestamp:(new Date).getTime(),content:t})})}function u(){g.messages.push({user:"goldorak",timestamp:(new Date).getTime(),content:"home.stt.failed"})}function l(){g.text&&c(g.text),g.text=""}var g=this;g.toggleRecording=s,g.isRecording=r.isListening,g.submit=l,g.messages=[],i.add({combo:"ctrl+space",description:a.instant("home.hotkey"),callback:g.toggleRecording}),o()}angular.module("app").controller("HomeController",t),t.$inject=["$rootScope","$scope","$log","$translate","hotkeys","Bot"]}(),angular.module("ngLocale",[],["$provide",function(t){var e={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};t.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],ERANAMES:["avant Jésus-Christ","après Jésus-Christ"],ERAS:["av. J.-C.","ap. J.-C."],FIRSTDAYOFWEEK:0,MONTH:["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],SHORTDAY:["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],SHORTMONTH:["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."],STANDALONEMONTH:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],WEEKENDRANGE:[5,6],fullDate:"EEEE d MMMM y",longDate:"d MMMM y",medium:"d MMM y HH:mm:ss",mediumDate:"d MMM y",mediumTime:"HH:mm:ss","short":"dd/MM/y HH:mm",shortDate:"dd/MM/y",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"€",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"fr",localeID:"fr",pluralCat:function(t,n){var a=0|t;return 0==a||1==a?e.ONE:e.OTHER}})}]),angular.module("ngLocale",[],["$provide",function(t){function e(t){t+="";var e=t.indexOf(".");return e==-1?0:t.length-e-1}function n(t,n){var a=n;void 0===a&&(a=Math.min(e(t),3));var i=Math.pow(10,a),r=(t*i|0)%i;return{v:a,f:r}}var a={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};t.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"],FIRSTDAYOFWEEK:6,MONTH:["January","February","March","April","May","June","July","August","September","October","November","December"],SHORTDAY:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],SHORTMONTH:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],STANDALONEMONTH:["January","February","March","April","May","June","July","August","September","October","November","December"],WEEKENDRANGE:[5,6],fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",medium:"MMM d, y h:mm:ss a",mediumDate:"MMM d, y",mediumTime:"h:mm:ss a","short":"M/d/yy h:mm a",shortDate:"M/d/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-¤",negSuf:"",posPre:"¤",posSuf:""}]},id:"en",localeID:"en",pluralCat:function(t,e){var i=0|t,r=n(t,e);return 1==i&&0==r.v?a.ONE:a.OTHER}})}]),function(){"use strict";function t(t,e){e.otherwise("/"),t.state("app",{"abstract":!0,template:'<ui-view class="fill"/>',resolve:{translatePartialLoader:["$translate","$translatePartialLoader",function(t,e){return e.addPart("global"),t.refresh()}]}})}angular.module("app").config(t),t.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("app").constant("BING_SPEECH_SUBSCRIPTION_KEY","8fb1a8c7b61a41d4838ddc60d84e6601").constant("LUIS_APP_ID","496aaf6a-10e6-48fa-8b17-15658ddabde2").constant("LUIS_SUBSCRIPTION_KEY","ebc99ea1bfe8481d9c01f8145a553187")}(),angular.module("app").run(["$templateCache",function(t){t.put("app/home/home.html",'<div class="fill">\n\t<div class="container content mt-3" scroll-glue>\n\t\t<div class="row mb-2" ng-repeat="message in vm.messages">\n\t\t\t<div class="col-3 col-sm-1">\n\t\t\t\t<img class="rounded img-fluid" ng-src="content/images/{{message.user}}.png">\n\t\t\t</div>\n\t\t\t<div class="col">\n\t\t\t\t<div class="card" ng-class="message.user == \'me\' ? \'card-outline-warning\' : \'card-outline-info\'">\n\t\t\t\t\t<div class="card-block">\n\t\t\t\t\t\t<span class="card-title"><strong class="capitalize">{{message.user}}</strong></span>\n\t\t\t\t\t\t<span class="card-subtitle"><small class="ml-1 text-muted">{{message.timestamp | amDateFormat: \'HH:mm\'}}</small></span>\n\t\t\t\t\t\t<p class="card-text" translate="{{message.content}}" translate-values="{{message.values}}"></p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class="container hidden-sm-down">\n\t\t<div class="row">\n\t\t\t<div class="col">\n\t\t\t\t<form ng-submit="vm.submit()">\n\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t<span class="input-group-btn">\n\t\t\t\t\t<button type="button" ng-click="vm.toggleRecording()" class="btn btn-lg" ng-class="vm.isRecording() ? \'btn-danger\' : \'btn-success\'">\n\t\t\t\t\t\t<i class="fa fa-2x" ng-class="vm.isRecording() ? \'fa-microphone-slash\' : \'fa-microphone\'" aria-hidden="true"></i>\n\t\t\t</button>\n\t\t\t\t</span>\n\t\t\t\t\t\t<input type="text" class="form-control" ng-model="vm.text" placeholder="{{ \'home.form.placeholder\' | translate }}">\n\t\t\t\t\t</div>\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class="hidden-sm-up fixed-bottom">\n\t\t<div class="row">\n\t\t\t<div class="col">\n\t\t\t\t<form ng-submit="vm.submit()">\n\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t<span class="input-group-btn">\n\t\t\t\t\t<button type="button" ng-click="vm.toggleRecording()" class="btn no-rounded" ng-class="vm.isRecording() ? \'btn-danger\' : \'btn-success\'">\n\t\t\t\t\t\t<i class="fa fa-2x" ng-class="vm.isRecording() ? \'fa-microphone-slash\' : \'fa-microphone\'" aria-hidden="true"></i>\n\t\t\t</button>\n\t\t\t\t</span>\n\t\t\t\t\t\t<input type="text" class="form-control no-rounded" ng-model="vm.text" placeholder="{{ \'home.form.placeholder\' | translate }}">\n\t\t\t\t\t</div>\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\n</div>\n'),t.put("app/settings/settings.html",'<div class="container mt-3">\n  <form>\n    <h4 translate="settings.stt.title">Speech Recognition</h4>\n    <div class="form-group row">\n      <label for="locale" class="col-sm-2 col-form-label" translate="settings.stt.locale">Locale</label>\n      <div class="col-sm-10">\n        <input type="text" class="form-control" id="locale" placeholder="en-US,fr-FR,.." ng-model="vm.settings.stt.locale" uib-typeahead="locale for locale in vm.locales | filter:$viewValue | limitTo:3">\n      </div>\n    </div>\n\n    <h4 translate="settings.nlu.title">Natural Language Understanding</h4>\n    <div class="form-group row">\n      <label for="application" class="col-sm-2 col-form-label" translate="settings.nlu.application">Application</label>\n      <div class="col-sm-10">\n        <select class="form-control" ng-model="vm.settings.nlu.application" ng-options="it.name for it in vm.luisApplciations track by it.appId"></select>\n      </div>\n    </div>\n\n\n    <div class="form-group row">\n      <div class="offset-sm-2 col-sm-10 text-right">\n        <button type="submit" class="btn btn-primary" ng-click="vm.save()"><i class="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;<span translate="settings.save">Save</span></button>\n      </div>\n    </div>\n  </form>\n</div>\n')}]);
//# sourceMappingURL=../maps/scripts/app-d58e46f084.js.map
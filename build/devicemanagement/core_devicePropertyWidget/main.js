/* core_devicePropertyWidget 9.3.0 2018-03-26T16:25:08+00:00 796b68a031b1+ (release/9.3.0) tip */
angular.module("c8y.parts.devicePropertyWidget",[]).config(["c8yComponentsProvider","gettext",function(e,t){"use strict";e.add({name:"Properties",description:t("Table of device properties, e.g. name, type or notes."),templateUrl:"core_devicePropertyWidget/views/main.html",configTemplateUrl:"core_devicePropertyWidget/views/config.html",options:{noNewWidgets:!0}})}]),angular.module("c8y.parts.devicePropertyWidget").controller("devicePropertyWidgetConfigCtrl",["$scope","c8yDevices","c8yBase",function(e,t,n){"use strict";function i(e){e&&t.detail(e.id).then(o)}function o(e){r(e.data),s()}function r(e){g.length=0,g.push([f]),a(e,g)}function c(e){return!!_.find(u,function(t){return t instanceof RegExp?t.test(e):t===e})}function a(e,t){_.forEach(e,function(i,o){if(c(o)||!_.isObjectLike(i)||_.isEmpty(e[o]))return!0;var r=n.humanizeFragment(o);i.parent={key:o,val:e.parent?e:void 0},t.push([{name:r,keyPath:d(e,o)}]),a(i,t[t.length-1])})}function d(e,t){return e&&e.parent?(t=e.parent.key+"."+t,d(e.parent.val,t)):t}function s(){var t=e.config.options||[];t.forEach(function(t){l(e.options,t)})}function l(e,t){_.map(e,function(e){_.isArray(e)?l(e,t):e.keyPath===t.keyPath&&_.assign(e,t)})}function p(){var t=_.flattenDeep(e.options);e.config.options=_.filter(t,function(e){return e.selected}),e.forms.componentForm.fieldsControl.$setValidity("fields_selected",e.config.options.length)}var f={name:"Basic",fields:["name","type","id"]},g=[],u=["assetParents","deviceParents","childAssets","childDevices","c8y_IsDevice","__children","c8y_ui","self","parent","c8y_DataPoint",/^c8y_Dashboard\!\d+/];e.options=g,e.updateFields=p,e.$watch("config.device",i)}]),angular.module("c8y.parts.devicePropertyWidget").controller("devicePropertyWidgetCtrl",["$scope","$routeParams","c8yDevices","c8yMoRealTimeDetails",function(e,t,n,i){"use strict";function o(t){e.device=t,d()}function r(){i.detail(c(),e).then(o)}function c(){var n=t.deviceId;return e.child.config&&e.child.config.device&&e.child.config.device.id&&(n=e.child.config.device.id),n}function a(e,t){return _.isUndefined(t.object)&&_.remove(e,function(e){return e===t}),e}function d(){var t=_.cloneDeep(e.child.config.options)||[];_.forEach(t,function(n){if(n.fields)n.object={},n.fields.map(function(t){n.object[t]=e.$eval("device."+t)});else try{n.object=e.$eval("device."+n.keyPath)}catch(e){}t=a(t,n)}),e.options=t,e.singleOption=1===t.length}e.$watch("child.config.device.id",r),e.$watch("child.config.options",d),e.$watch("device",d,!0),r()}]),angular.module("c8y.parts.devicePropertyWidget").directive("c8yFragmentCheckboxList",["$compile",function(e){"use strict";var t="<div ng-include=\"'core_devicePropertyWidget/views/fragmentRow.html'\"></div>",n="<div ng-include=\"'core_devicePropertyWidget/views/fragmentList.html'\"></div>";return{restrict:"E",scope:{fragment:"=?",updateFields:"&"},link:function(i,o){function r(){d=i.$new(),s(d,function(e){p.append(e)})}function c(){l(i,function(e){p.append(e)})}function a(e){e.editMode=!e.editMode}var d,s=e(t),l=e(n),p=o.parents(".fragmentRow").first();_.isArray(i.fragment)?(i.options=i.fragment,c()):r(),i.edit=a}}}]),function(){"use strict";angular.module("c8y.parts.devicePropertyWidget").factory("c8yMoRealTimeDetails",["$rootScope","c8yInventory","c8yRealtime",function(e,t,n){function i(e,i){function o(e,t){r(t)}function r(e){c?_.assign(c,e):c=e}var c,a=i.id,d="/managedobjects/"+e,s=n.realtimeActions().UPDATE;return n.addListener(a,d,s,o),n.start(a,d),t.detail(e).then(function(e){return r(e.data),c})}return{detail:i}}])}(),function(){"use strict";function e(e){var t;t='<div ng-controller="devicePropertyWidgetConfigCtrl">\n\n  <div class="form-group">\n    <label translate>Fragments</label>\n\n    <div ng-include="\'core_devicePropertyWidget/views/fragmentList.html\'">\n    </div>\n\n    <input type="hidden" name="fieldsControl" ng-model="fieldsControl">\n  </div>\n</div>\n',e.put("core_devicePropertyWidget/views/config.html",t),e.put("/apps/core/devicePropertyWidget/views/config.html",t),t='<ul class="checkbox fragmentRow" ng-repeat="opt in options|orderBy:\'name\'">\n  <c8y-fragment-checkbox-list fragment="opt" update-fields="updateFields()"></c8y-fragment-checkbox-list>\n</ul>\n',e.put("core_devicePropertyWidget/views/fragmentList.html",t),e.put("/apps/core/devicePropertyWidget/views/fragmentList.html",t),t='<div ng-show="!fragment.editMode">\n  <label>\n    <input type="checkbox" value="" ng-model="fragment.selected" ng-change="updateFields()"> {{fragment.name}}\n  </label>\n  <a href="" ng-click="edit(fragment)" class="btn btn-xs showOnHover">\n      <i c8y-icon="pencil"></i> <translate>Edit</translate>\n  </a>\n</div>\n<div ng-show="fragment.editMode">\n  <input type="text" ng-model="fragment.name">\n  <a href="" ng-click="edit(fragment); updateFields();" class="btn btn-xs showOnHover">\n      <i c8y-icon="check"></i> <translate>OK</translate>\n  </a>\n</div>\n',e.put("core_devicePropertyWidget/views/fragmentRow.html",t),e.put("/apps/core/devicePropertyWidget/views/fragmentRow.html",t),t='<div ng-controller="devicePropertyWidgetCtrl">\n  <table ng-repeat="option in options|orderBy:\'name\'" class="table table-condensed" ng-class="{\'no-border-top\': singleOption}">\n    <thead ng-if="!singleOption">\n      <tr>\n        <th colspan="2">{{option.name}}</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr ng-repeat="(field, val) in option.object track by field">\n        <th>{{field}}</th>\n        <td>{{val}}</td>\n      </tr>\n    </tbody>\n  </table>\n\n</div>\n',e.put("core_devicePropertyWidget/views/main.html",t),e.put("/apps/core/devicePropertyWidget/views/main.html",t)}angular.module("c8y.parts.devicePropertyWidget").run(["$templateCache",e])}();
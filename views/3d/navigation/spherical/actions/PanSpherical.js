// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.

define(["./ActionSpherical","../../mixins/PanMixin","../../../lib/glMatrix","../../../support/earthUtils","../../../support/mathUtils","../../../webgl-engine/lib/Util","../../ContinuousAction","../../NavigationConstants"],function(t,i,e,n,a,s,r,o){var h=e.vec2d,c=e.vec3d,u=e.vec4d,d=e.mat4d,P=c.create(),_=c.create(),l=c.create(),m=c.create(),g=c.create(),p=c.create(),C=d.create(),v=o.Pan.Mode,A=o.Pan.Direction,R=o.Pan.Vertical,S=o.Pan.Momentum,y=t.createSubclass([i],{declaredClass:"esri.views.3d.navigation.spherical.actions.PanSpherical",constructor:function(){this._panMode=0,this._lastPanActionPtr=0,this._lastPanActions=[],this._plane=u.create(),this._isMomentumPanning=!1,this.continuous=new r;for(var t=0;t<S.BUFFER_SIZE;t++)this._lastPanActions[t]={point:c.create(),pointScreen:h.create(),time:0}},begin:function(t,i){this.inherited(arguments),this.pickPointInScreen(t,this._navPickPoint)?this._navSphereRadius=c.length(this._navPickPoint):(this._navSphereRadius=c.length(this.targetCamera.center),this._navSphereRadius<.9*n.earthRadius&&(this._navSphereRadius=n.earthRadius),this.createPickRay(t,t,this.currentCamera.viewMatrix,P,_),c.subtract(_,this.currentCamera.eye),this.intersectManifold(this.currentCamera.eye,_,this._navSphereRadius-n.earthRadius,this._navPickPoint)||this.closestPointOnSphereSilhouette(this.currentCamera.eye,P,this._navSphereRadius,this._navPickPoint));var e=!1,a=this.renderCoordsHelper.getAltitude(this.currentCamera.eye);if(a<R.ELEVATION_THRESHOLD)if(this._navSphereRadius>c.length(this.currentCamera.eye))e=!0;else{c.normalize(c.subtract(this.targetCamera.eye,this._navPickPoint,l));var r=Math.abs(.5*Math.PI-Math.acos(c.dot(this._navPickPoint,l)/c.length(this._navPickPoint)));e=r<R.ANGLE_THRESHOLD}e?(this._panMode=v.VERTICAL,c.normalize(c.subtract(this.targetCamera.eye,this.targetCamera.center,l)),this.updatePlane(this._navPickPoint,l)):(this._panMode=v.HORIZONTAL,this._addToLastPanActions(void 0===i?s.performance.now():i,this._navPickPoint,t)),h.set(t,this._dragLastPoint),h.set(t,this._dragBeginPoint),this._mouseDownCamera.copyFrom(this.targetCamera)},update:function(t,i){if(this._panMode===v.HORIZONTAL){if(this._navSphereRadius<=0)return;this.createPickRay(t,this._dragBeginPoint,this._mouseDownCamera.viewMatrix,P,_),c.subtract(_,this._mouseDownCamera.eye),this.intersectManifold(this._mouseDownCamera.eye,_,this._navSphereRadius-n.earthRadius,this._targetOnSphere)||this.closestPointOnSphereSilhouette(this._mouseDownCamera.eye,P,this._navSphereRadius,this._targetOnSphere),this.rotateCameraWithPointsOnSphere(this._navPickPoint,this._targetOnSphere,this._mouseDownCamera,this.targetCamera,this._navSphereRadius),this._addToLastPanActions(void 0===i?s.performance.now():i,this._targetOnSphere,t)}else{if(this.createPickRay(this._dragLastPoint,this._dragBeginPoint,this.currentCamera.viewMatrix,P,_),c.subtract(_,P),!s.rayPlane(P,_,this._plane,m))return;if(this.createPickRay(t,this._dragBeginPoint,this.currentCamera.viewMatrix,P,_),c.subtract(_,P),!s.rayPlane(P,_,this._plane,g))return;c.subtract(g,m),c.subtract(this.targetCamera.eye,g),c.subtract(this.targetCamera.center,g),h.set(t,this._dragLastPoint)}this.constrainTargetEyeByElevationAndMoveLookAt(),h.set(t,this._dragLastPoint),this.fixTargetUpVector(),this.targetAndCurrentChanged(),this.inherited(arguments)},end:function(t,i){this._panMode===v.HORIZONTAL&&this._initiateMomentumPanning(t,i),this._navSphereRadius=0,this.inherited(arguments)},_initiateMomentumPanning:function(t,i){if(this._navSphereRadius<=0)return this.setPoiAuto(t,!0),!1;this.update(t,i);var e=this._lastPanActionPtr;do if(e=(e-1+S.BUFFER_SIZE)%S.BUFFER_SIZE,this._lastPanActions[this._lastPanActionPtr].time-this._lastPanActions[e].time>1e3*S.INPUT_FILTER)break;while(this._lastPanActionPtr!==e);e++,e%=S.BUFFER_SIZE,e===this._lastPanActionPtr&&(e=(this._lastPanActionPtr-1+S.BUFFER_SIZE)%S.BUFFER_SIZE);var n=.001*(this._lastPanActions[this._lastPanActionPtr].time-this._lastPanActions[e].time);if(n>0){var a=this._lastPanActions[e].pointScreen,s=this._lastPanActions[this._lastPanActionPtr].pointScreen,r=h.dist(a,s)/n;if(r>=S.MINIMUM_VELOCITY){var o=this.rotationFromPointsOnSphere(this._lastPanActions[e].point,this._lastPanActions[this._lastPanActionPtr].point,this._navSphereRadius,this.continuous.direction);this.continuous.velocity=o/n;var c=h.create(),u=h.create();this.normalizeCoordinate(this._lastPanActions[e].pointScreen,c),this.normalizeCoordinate(this._lastPanActions[this._lastPanActionPtr].pointScreen,u);var d=Math.min(h.dist(c,u)/n/S.DURATION_LONG_VEL,1);return this.continuous.timer=S.DURATION_SHORT+d*(S.DURATION_LONG-S.DURATION_SHORT),this._isMomentumPanning=!0,this.animationStarted(),!0}}return this.currentReachedTarget(),!1},beginContinuous:function(t){var i=0===this.continuous.status;if(i&&(this.navigation.begin(this),this.active=!0,this.emit("begin")),this.inherited(arguments),this.setCurrentToTarget(),i&&c.set3(0,0,0,this.continuous.direction),!(this.continuous.status&t)){if(this.continuous.status|=t,t&(A.LEFT|A.RIGHT|A.FORWARD|A.BACKWARD))this._computePanAxis(t,p),c.add(this.continuous.direction,p);else{var e=this.continuous.status&(A.UP|A.DOWN);e===A.UP?this.continuous.radiusChange=1:e===A.DOWN?this.continuous.radiusChange=-1:this.continuous.radiusChange=0}this.continuous.velocity=this._computePanVelocity()}this.continuous.timer=0},updateContinuous:function(t){if(this.continuous){if(!this.continuous.active)return void(this._isMomentumPanning&&(this._isMomentumPanning=!1,this.targetAndCurrentChanged(!0)));var i=this.continuous.step(t),e=c.dot(this.continuous.direction,this.continuous.direction)>.01,n=this.targetCamera;if(Math.abs(this.continuous.radiusChange)>0){var a=1+i*this.continuous.radiusChange,s=n.viewForward,r=c.normalize(n.center,_),o=c.dot(s,r);(o>-.999||this.continuous.radiusChange<0)&&c.scale(this.targetCamera.center,a),c.scale(this.targetCamera.eye,a),this.continuous.velocity=this._computePanVelocity(),e||(this.applyConstraints(this.targetCamera),this.constrainTargetEyeByElevationAndMoveLookAt(),this.fixTargetUpVector(),this.targetAndCurrentChanged())}e&&(d.identity(C),d.rotate(C,i,this.continuous.direction),d.multiplyVec3(C,this.targetCamera.eye),d.multiplyVec3(C,this.targetCamera.center),d.multiplyVec3(C,this.targetCamera.up),this.applyConstraints(this.targetCamera),this.constrainTargetEyeByElevationAndMoveLookAt(),this.fixTargetUpVector(),this.targetAndCurrentChanged()),this.emit("update")}},endContinuous:function(t){if(this.continuous.status&=~t,0===this.continuous.status)this.continuous.stop(),this.continuous.radiusChange=0,this.active=!1,this.emit("end"),this.navigation.end(this);else if(t&(A.LEFT|A.RIGHT|A.FORWARD|A.BACKWARD))this._computePanAxis(t,p),c.subtract(this.continuous.direction,p),c.length(this.continuous.direction)<.01&&c.set3(0,0,0,this.continuous.direction);else{var i=this.continuous.status&(A.UP|A.DOWN);i==A.UP?this.continuous.radiusChange=1:i==A.DOWN?this.continuous.radiusChange=-1:this.continuous.radiusChange=0}this.inherited(arguments)},_computePanAxis:function(t,i){c.subtract(this.targetCamera.center,this.targetCamera.eye,i),c.cross(i,this.targetCamera.up),(t===A.LEFT||t===A.RIGHT)&&(c.normalize(i),c.cross(i,this.targetCamera.center)),(t===A.RIGHT||t===A.FORWARD)&&c.negate(i),c.normalize(i)},_computePanVelocity:function(){var t=.5*Math.abs(c.length(this.targetCamera.eye)-n.earthRadius);return t=a.clamp(t,1,2*n.earthRadius),a.acos(1-t*t/(2*n.earthRadius*n.earthRadius))},_addToLastPanActions:function(t,i,e){this._lastPanActionPtr=(this._lastPanActionPtr+1)%5,this._lastPanActions[this._lastPanActionPtr].time=t,c.set(i,this._lastPanActions[this._lastPanActionPtr].point),h.set(e,this._lastPanActions[this._lastPanActionPtr].pointScreen)},updatePlane:function(t,i){u.set4(i[0],i[1],i[2],-c.dot(i,t),this._plane)}});return y});
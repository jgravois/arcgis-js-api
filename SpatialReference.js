// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/has","./kernel","./lang"],function(e,i,r,t,a,_){var n='PROJCS["WGS_1984_Web_Mercator_Auxiliary_Sphere",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator_Auxiliary_Sphere"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",${Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],PARAMETER["Auxiliary_Sphere_Type",0.0],UNIT["Meter",1.0]]',l=[-20037508.342788905,20037508.342788905],s=[-20037508.342787,20037508.342787],M=e(null,{declaredClass:"esri.SpatialReference",constructor:function(e){e&&(r.isObject(e)?r.mixin(this,e):r.isString(e)?this.wkt=e:this.wkid=e)},wkid:null,wkt:null,_info:{102113:{wkTemplate:'PROJCS["WGS_1984_Web_Mercator",GEOGCS["GCS_WGS_1984_Major_Auxiliary_Sphere",DATUM["D_WGS_1984_Major_Auxiliary_Sphere",SPHEROID["WGS_1984_Major_Auxiliary_Sphere",6378137.0,0.0]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",${Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],UNIT["Meter",1.0]]',valid:l,origin:s,dx:1e-5},102100:{wkTemplate:n,valid:l,origin:s,dx:1e-5},3785:{wkTemplate:'PROJCS["WGS_1984_Web_Mercator",GEOGCS["GCS_WGS_1984_Major_Auxiliary_Sphere",DATUM["D_WGS_1984_Major_Auxiliary_Sphere",SPHEROID["WGS_1984_Major_Auxiliary_Sphere",6378137.0,0.0]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",${Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],UNIT["Meter",1.0]]',valid:l,origin:s,dx:1e-5},3857:{wkTemplate:n,valid:l,origin:s,dx:1e-5},4326:{wkTemplate:'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",${Central_Meridian}],UNIT["Degree",0.0174532925199433]]',altTemplate:'PROJCS["WGS_1984_Plate_Carree",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Plate_Carree"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",${Central_Meridian}],UNIT["Degrees",111319.491]]',valid:[-180,180],origin:[-180,180],dx:1e-5}},_isWebMercator:function(){return-1!==i.indexOf([102113,102100,3857,3785],this.wkid)},_isWrappable:function(){return-1!==i.indexOf([102113,102100,3857,3785,4326],this.wkid)},_getInfo:function(){return this.wkid?this._info[this.wkid]:null},_canProject:function(e){var i=!1;return e&&(i=this.isWebMercator()&&4326===e.wkid||e.isWebMercator()&&4326===this.wkid),i},isWebMercator:function(){return this._isWebMercator()},equals:function(e){var i=!1;return e&&(this===e&&(i=!0),this.wkid||e.wkid?i=this.wkid===e.wkid||this.isWebMercator()&&e.isWebMercator()||this.wkid===e.latestWkid||e.wkid===this.latestWkid:this.wkt&&e.wkt&&(i=this.wkt.toUpperCase()===e.wkt.toUpperCase())),i},toJson:function(){var e=null,i=_.isDefined;return i(this.wkid)?e={wkid:this.wkid}:i(this.wkt)&&(e={wkt:this.wkt}),e&&i(this.latestWkid)&&(e.latestWkid=this.latestWkid),e}});return t("extend-esri")&&(a.SpatialReference=M),M});
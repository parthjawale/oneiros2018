"use strict";!function(){var a=zmail.Settings.Modules,b=a.create("Apps.Filter");$.subscribe("FILTER_SUGGESTION",function(b,c){var d=zmComponent.loadingBand({container:zmsuite.getCenter()[0].$el[0],notToSetInnerHTML:!0});zmAppLoader.load("zm-settings-app-filters-new").done(function(){var b=a["import"]("Apps.Filter.Views.Utils"),e=a["import"]("Apps.Filter.Models"),f=ZMStore.getInstance("IncomingFilterCollection");f.fetchFilters().then(function(){c&&b.showFilterPane(new e.Filter({attrs:c,collection:f}))}).then(function(){zmUtil.hideMenu(),d&&d()},function(){zmUtil.hideMenu(),d&&d()})})});var c={"true":"classifySenderInSmartFilter","false":"excludeSenderInSmartFilter",undefined:"excludeSenderInSmartFilter"};b.categoriseMail=function(a){return Backbone.ajax({url:zmail.conPath+"/filter.do",data:{accId:zmail.accId,mode:c[a.include],msgId:a.msgId,filType:a.filType}})},b.loadFilterModels=function(){return zmAppLoader.load("zm-settings-app-filters-models")},b.fetchFilters=function(){var a=$.Deferred();return b.loadFilterModels().then(function(){ZMStore.getInstance("IncomingFilterCollection").fetchFilters().then(function(b){a.resolve(b)},a.reject)}),a.promise()},b.fetchFilterNamesAndId=function(){var a=$.Deferred();return b.fetchFilters().then(function(b){a.resolve(zmail.Settings.Apps.Filter.Models.getFilterNamesAndId())},a.reject),a.promise()}}();
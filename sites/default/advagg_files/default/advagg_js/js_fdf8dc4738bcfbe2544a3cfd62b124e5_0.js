/* Source and licensing information for the line(s) below can be found at http://intranet.letsdoitromania.ro/misc/drupal.js. */
(function(){var jquery_init=jQuery.fn.init;jQuery.fn.init=function(selector,context,rootjQuery){if(selector&&typeof selector==='string'){var hash_position=selector.indexOf('#');if(hash_position>=0){var bracket_position=selector.indexOf('<');if(bracket_position>hash_position)throw'Syntax error, unrecognized expression: '+selector}};return jquery_init.call(this,selector,context,rootjQuery)};jQuery.fn.init.prototype=jquery_init.prototype})();var Drupal=Drupal||{settings:{},behaviors:{},themes:{},locale:{}};Drupal.jsEnabled=document.getElementsByTagName&&document.createElement&&document.createTextNode&&document.documentElement&&document.getElementById;Drupal.attachBehaviors=function(context){context=context||document;if(Drupal.jsEnabled)jQuery.each(Drupal.behaviors,function(){this(context)})};Drupal.checkPlain=function(str){str=String(str);var replace={'&':'&amp;','"':'&quot;','<':'&lt;','>':'&gt;'};for(var character in replace){var regex=new RegExp(character,'g');str=str.replace(regex,replace[character])};return str};Drupal.t=function(str,args){if(Drupal.locale.strings&&Drupal.locale.strings[str])str=Drupal.locale.strings[str];if(args)for(var key in args){switch(key.charAt(0)){case'@':args[key]=Drupal.checkPlain(args[key]);break;case'!':break;case'%':default:args[key]=Drupal.theme('placeholder',args[key]);break};str=str.replace(key,args[key])};return str};Drupal.formatPlural=function(count,singular,plural,args){var args=args||{};args['@count']=count;var index=Drupal.locale.pluralFormula?Drupal.locale.pluralFormula(args['@count']):((args['@count']==1)?0:1);if(index==0){return Drupal.t(singular,args)}else if(index==1){return Drupal.t(plural,args)}else{args['@count['+index+']']=args['@count'];delete args['@count'];return Drupal.t(plural.replace('@count','@count['+index+']'),args)}};Drupal.theme=function(func){for(var i=1,args=[];i<arguments.length;i++)args.push(arguments[i]);return(Drupal.theme[func]||Drupal.theme.prototype[func]).apply(this,args)};Drupal.parseJson=function(data){if((data.substring(0,1)!='{')&&(data.substring(0,1)!='['))return{status:0,data:data.length?data:Drupal.t('Unspecified error')};return eval('('+data+');')};Drupal.freezeHeight=function(){Drupal.unfreezeHeight();var div=document.createElement('div');$(div).css({position:'absolute',top:'0px',left:'0px',width:'1px',height:$('body').css('height')}).attr('id','freeze-height');$('body').append(div)};Drupal.unfreezeHeight=function(){$('#freeze-height').remove()};Drupal.encodeURIComponent=function(item,uri){uri=uri||location.href;item=encodeURIComponent(item).replace(/%2F/g,'/');return(uri.indexOf('?q=')!=-1)?item:item.replace(/%26/g,'%2526').replace(/%23/g,'%2523').replace(/\/\//g,'/%252F')};Drupal.getSelection=function(element){if(typeof(element.selectionStart)!='number'&&document.selection){var range1=document.selection.createRange(),range2=range1.duplicate();range2.moveToElementText(element);range2.setEndPoint('EndToEnd',range1);var start=range2.text.length-range1.text.length,end=start+range1.text.length;return{start:start,end:end}};return{start:element.selectionStart,end:element.selectionEnd}};Drupal.ahahError=function(xmlhttp,uri){if(xmlhttp.status==200){if(jQuery.trim($(xmlhttp.responseText).text())){var message=Drupal.t("An error occurred. \n@uri\n@text",{'@uri':uri,'@text':xmlhttp.responseText})}else var message=Drupal.t("An error occurred. \n@uri\n(no information available).",{'@uri':uri,'@text':xmlhttp.responseText})}else var message=Drupal.t("An HTTP error @status occurred. \n@uri",{'@uri':uri,'@status':xmlhttp.status});return message};if(Drupal.jsEnabled){$(document.documentElement).addClass('js');document.cookie='has_js=1; path=/';$(document).ready(function(){Drupal.attachBehaviors(this)})};Drupal.theme.prototype={placeholder:function(str){return'<em>'+Drupal.checkPlain(str)+'</em>'}};
/* Source and licensing information for the above line(s) can be found at http://intranet.letsdoitromania.ro/misc/drupal.js. */
/* Source and licensing information for the line(s) below can be found at http://intranet.letsdoitromania.ro/sites/all/modules/nice_menus/superfish/js/superfish.js. */
(function($){$.fn.superfish=function(op){var sf=$.fn.superfish,c=sf.c,$arrow=$(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),over=function(){var $$=$(this),menu=getMenu($$);clearTimeout(menu.sfTimer);$$.showSuperfishUl().siblings().hideSuperfishUl()},out=function(){var $$=$(this),menu=getMenu($$),o=sf.op;clearTimeout(menu.sfTimer);menu.sfTimer=setTimeout(function(){o.retainPath=($.inArray($$[0],o.$path)>-1);$$.hideSuperfishUl();if(o.$path.length&&$$.parents(['li.',o.hoverClass].join('')).length<1)over.call(o.$path)},o.delay)},getMenu=function($menu){var menu=$menu.parents(['ul.',c.menuClass,':first'].join(''))[0];sf.op=sf.o[menu.serial];return menu},addArrow=function($a){$a.addClass(c.anchorClass).append($arrow.clone())};return this.each(function(){var s=this.serial=sf.o.length,o=$.extend({},sf.defaults,op);o.$path=$('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){$(this).addClass([o.hoverClass,c.bcClass].join(' ')).filter('li:has(ul)').removeClass(o.pathClass)});sf.o[s]=sf.op=o;$('li:has(ul)',this)[($.fn.hoverIntent&&!o.disableHI)?'hoverIntent':'hover'](over,out).each(function(){if(o.autoArrows)addArrow($('>a:first-child',this))}).not('.'+c.bcClass).hideSuperfishUl();var $a=$('a',this);$a.each(function(i){var $li=$a.eq(i).parents('li');$a.eq(i).focus(function(){over.call($li)}).blur(function(){out.call($li)})});o.onInit.call(this)}).each(function(){var menuClasses=[c.menuClass];if(sf.op.dropShadows&&!($.browser.msie&&$.browser.version<7))menuClasses.push(c.shadowClass);$(this).addClass(menuClasses.join(' '))})};var sf=$.fn.superfish;sf.o=[];sf.op={};sf.IE7fix=function(){var o=sf.op;if($.browser.msie&&$.browser.version>6&&o.dropShadows&&o.animation.opacity!=undefined)this.toggleClass(sf.c.shadowClass+'-off')};sf.c={bcClass:'sf-breadcrumb',menuClass:'sf-js-enabled',anchorClass:'sf-with-ul',arrowClass:'sf-sub-indicator',shadowClass:'sf-shadow'};sf.defaults={hoverClass:'sfHover',pathClass:'overideThisToUse',pathLevels:1,delay:800,animation:{opacity:'show'},speed:'normal',autoArrows:true,dropShadows:true,disableHI:false,onInit:function(){},onBeforeShow:function(){},onShow:function(){},onHide:function(){}};$.fn.extend({hideSuperfishUl:function(){var o=sf.op,not=(o.retainPath===true)?o.$path:'';o.retainPath=false;var $ul=$(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass).find('>ul').hide().css('visibility','hidden');o.onHide.call($ul);return this},showSuperfishUl:function(){var o=sf.op,sh=sf.c.shadowClass+'-off',$ul=this.addClass(o.hoverClass).find('>ul:hidden').css('visibility','visible');sf.IE7fix.call($ul);o.onBeforeShow.call($ul);$ul.animate(o.animation,o.speed,function(){sf.IE7fix.call($ul);o.onShow.call($ul)});return this}})})(jQuery);
/* Source and licensing information for the above line(s) can be found at http://intranet.letsdoitromania.ro/sites/all/modules/nice_menus/superfish/js/superfish.js. */
/* Source and licensing information for the line(s) below can be found at http://intranet.letsdoitromania.ro/sites/all/modules/nice_menus/superfish/js/jquery.bgiframe.min.js. */
(function($){$.fn.bgIframe=$.fn.bgiframe=function(s){if($.browser.msie&&parseInt($.browser.version)<=6){s=$.extend({top:'auto',left:'auto',width:'auto',height:'auto',opacity:true,src:'javascript:false;'},s||{});var prop=function(n){return n&&n.constructor==Number?n+'px':n},html='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"style="display:block;position:absolute;z-index:-1;'+(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';"/>';return this.each(function(){if($('> iframe.bgiframe',this).length==0)this.insertBefore(document.createElement(html),this.firstChild)})};return this};if(!$.browser.version)$.browser.version=navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)[1]})(jQuery);
/* Source and licensing information for the above line(s) can be found at http://intranet.letsdoitromania.ro/sites/all/modules/nice_menus/superfish/js/jquery.bgiframe.min.js. */
/* Source and licensing information for the line(s) below can be found at http://intranet.letsdoitromania.ro/sites/all/modules/nice_menus/superfish/js/jquery.hoverIntent.minified.js. */
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY,track=function(ev){cX=ev.pageX;cY=ev.pageY},compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}},delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])},handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this)try{p=p.parentNode}catch(e){p=this};if(p==this)return false;var ev=jQuery.extend({},e),ob=this;if(ob.hoverIntent_t)ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1)ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1)ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}};return this.mouseover(handleHover).mouseout(handleHover)}})(jQuery);
/* Source and licensing information for the above line(s) can be found at http://intranet.letsdoitromania.ro/sites/all/modules/nice_menus/superfish/js/jquery.hoverIntent.minified.js. */
/* Source and licensing information for the line(s) below can be found at http://intranet.letsdoitromania.ro/sites/all/modules/nice_menus/nice_menus.js. */
(function($){$(document).ready(function(){$('ul.nice-menu').superfish({hoverClass:'over',autoArrows:false,dropShadows:false,delay:Drupal.settings.nice_menus_options.delay,speed:Drupal.settings.nice_menus_options.speed}).find('ul').bgIframe({opacity:false});$('ul.nice-menu ul').css('display','none')})})(jQuery);
/* Source and licensing information for the above line(s) can be found at http://intranet.letsdoitromania.ro/sites/all/modules/nice_menus/nice_menus.js. */
/* Source and licensing information for the line(s) below can be found at http://intranet.letsdoitromania.ro/sites/all/modules/spamspan/spamspan.compressed.js. */
Drupal.behaviors.spamspan=function(_1){$("span."+Drupal.settings.spamspan.m,_1).each(function(_2){var _3=($("span."+Drupal.settings.spamspan.u,this).text()+"@"+$("span."+Drupal.settings.spamspan.d,this).text()).replace(/\s+/g,"").replace(/\[dot\]/g,"."),_4=$("span."+Drupal.settings.spamspan.h,this).text().replace(/^ ?\((.*)\) ?$/,"$1"),_5=$.map(_4.split(/, /),function(n,i){return(n.replace(/: /,"="))}),_6=$("span."+Drupal.settings.spamspan.t,this).text().replace(/^ \((.*)\)$/,"$1"),_7="mailto:"+encodeURIComponent(_3),_8=_5.join("&");_7+=_8?("?"+_8):"";$(this).after($("<a></a>").attr("href",_7).html(_6?_6:_3).addClass("spamspan")).remove()})};
/* Source and licensing information for the above line(s) can be found at http://intranet.letsdoitromania.ro/sites/all/modules/spamspan/spamspan.compressed.js. */
/* Source and licensing information for the line(s) below can be found at http://intranet.letsdoitromania.ro/sites/all/modules/dashboard/dashboard.js. */
Drupal.behaviors.dashboard=function(context){$dashboard=$('#dashboard:not(.dashboard-processed)',context).addClass('dashboard-processed');if($dashboard.length>0){var dragTimeStamp;$columns=$dashboard.find('>div.column');$columns.sortable({items:'>div.widget',handle:'>h2',connectWith:$columns,placeholder:'dashboard-placeholder '+$('>div.widget',$columns).attr('class'),forcePlaceholderSize:true,distance:5,opacity:0.8,stop:function(event,ui){widgets=[];$columns.each(function(){widgets.push($(this).sortable('toArray').join(',').replace(/widget-/g,''))});jQuery.post(Drupal.settings.basePath+'dashboard/'+Drupal.settings.dashboardPage+'/reorder-widgets',{token:Drupal.settings.dashboardToken,column_0:widgets[0],column_1:widgets[1],column_2:widgets[2]});dragTimeStamp=event.timeStamp}}).find('>div.widget>h2>a').click(function(event){if((event.timeStamp-dragTimeStamp)<=20)return false})}};Drupal.behaviors.dashboardNavigation=function(context){$navigation=$('.nav-content-dashboard:not(.dashboard-processed)',context).addClass('dashboard-processed');if($navigation.length>0){$navigation.find('>ul>li').each(function(){$this=$(this);$this.attr('id',$this.attr('class').replace(/ .*/,''))});$dashboardActiveSpan=$navigation.find('>ul>li.active>span').hover(function(){$dashboardActiveSpan.addClass('hover')},function(){$dashboardActiveSpan.removeClass('hover')});$navigation.sortable({items:'>ul>li:not(.dashboard-link-add, .dashboard-profile)',containment:$navigation,axis:'x',distance:5,start:function(event,ui){ui.helper.find('>span.hover').removeClass('hover')},stop:function(event,ui){jQuery.post(Drupal.settings.basePath+'dashboard/'+Drupal.settings.dashboardPage+'/reorder-pages',{token:Drupal.settings.dashboardToken,pages:$navigation.sortable('toArray').join(',').replace(/dashboard-page-/g,'')});$navigation.find('>ul>li:not(.dashboard-link-add, .dashboard-profile)').each(function(){$this=$(this);path=$this.attr('class').replace(/.* dashboard-path-([^ ]*).*/,'$1');$this.find('>a').attr('href',Drupal.settings.basePath+'dashboard/'+path)});$navigation.find('>ul>li:first>a').attr('href',Drupal.settings.basePath+'dashboard')}});$navigation.find('>ul>li.dashboard-link-add>a').click(function(){$this=$(this).hide().parent().append(Drupal.settings.dashboardPageAddForm);$dashboardAddForm=$('#dashboard-page-add-form');$dashboardAddForm.find('#edit-title').keyup(function(event){if(event.which==27){dashboardRemoveAddPageForm()}else if($(this).attr('value')==''){$dashboardAddForm.find('#edit-submit').attr('disabled','disabled')}else $dashboardAddForm.find('#edit-submit').removeAttr('disabled')}).focus();Drupal.settings.dashboardBodyClickParent='#dashboard-page-add-form';Drupal.settings.dashboardBodyClickCallback=dashboardRemoveAddPageForm;$('body').bind('click',dashboardBodyClick);return false});$dashboardActiveSpan.find('>a.edit').click(function(){$dashboardActiveSpan.find('>a').hide().end().append(Drupal.settings.dashboardPageEditForm);$dashboardEditForm=$('#dashboard-page-edit-form').find('div.delete').hide().end();$dashboardEditForm.find('#edit-edit-title').attr('value',$dashboardActiveSpan.find('>a.edit').text());Drupal.attachBehaviors($dashboardEditForm);$dashboardEditFormSubmit=$dashboardEditForm.find('#edit-edit-submit').click(function(){$dashboardActiveSpan.find('>a.edit').html(Drupal.checkPlain($dashboardEditForm.find('#edit-edit-title').attr('value'))+'<span class="edit-icon"></span>');dashboardRemoveEditPageForm()});$dashboardEditForm.find('#edit-edit-title').keyup(function(event){if(event.which==27){dashboardRemoveEditPageForm()}else if($(this).attr('value')==''){$dashboardEditFormSubmit.attr('disabled','disabled')}else $dashboardEditFormSubmit.removeAttr('disabled')}).focus();Drupal.settings.dashboardBodyClickParent='#dashboard-page-edit-form';Drupal.settings.dashboardBodyClickCallback=dashboardRemoveEditPageForm;$('body').bind('click',dashboardBodyClick);return false});$dashboardActiveSpan.find('>a.delete').click(function(){$dashboardActiveSpan.find('>a').hide().end().append(Drupal.settings.dashboardPageEditForm);$dashboardEditForm=$('#dashboard-page-edit-form').find('div.edit').hide().end();$dashboardEditForm.find('#edit-delete').attr('value',Drupal.t('Yes, delete !title',{'!title':$dashboardActiveSpan.find('>a.edit').text()}));$dashboardEditForm.find('#edit-delete').click(function(){$(this).attr('value',Drupal.t('Deleting…'))});Drupal.settings.dashboardBodyClickParent='#dashboard-page-edit-form';Drupal.settings.dashboardBodyClickCallback=dashboardRemoveEditPageForm;$('body').bind('click',dashboardBodyClick);$dashboardEditForm.find('a.cancel').click(dashboardRemoveEditPageForm);return false})}};Drupal.behaviors.dashboardWidget=function(context){$("#dashboard>div.column>div.widget:not(.dashboard-processed)",context).addClass('dashboard-processed').each(function(){var $this=$(this);$('a.remove-widget',$this).data('widget',$this).click(function(){var $widget=$(this).data('widget').slideUp('fast');jQuery.post(Drupal.settings.basePath+'dashboard/'+Drupal.settings.dashboardPage+'/remove-widget',{token:Drupal.settings.dashboardToken,widget_id:$widget.attr('id').replace(/^widget-/,'')});return false})})};Drupal.behaviors.dashboardWidgetAdd=function(context){$('.dashboard-widget a.add-widget').click(function(){var type='user',widget_id_value=$(this).attr('id').replace(/^add-widget-/,''),link_element=this;$.post(Drupal.settings.basePath+'dashboard/'+type+'/add-widget',{token:Drupal.settings.dashboardToken,widget_id:widget_id_value},function(data,textStatus,XMLHttpRequest){$(link_element).replaceWith(data.label)},"json");return false})}
function dashboardBodyClick(event){if($(event.target).parents(Drupal.settings.dashboardBodyClickParent).length==0)Drupal.settings.dashboardBodyClickCallback()}
function dashboardRemoveAddPageForm(){$dashboardAddForm.remove();$navigation.find('>ul>li.dashboard-link-add>a').show();$('body').unbind('click',dashboardBodyClick)}
function dashboardRemoveEditPageForm(){$dashboardEditForm.remove();$dashboardActiveSpan.removeClass('hover').find('>a').show();$('body').unbind('click',dashboardBodyClick)}
function dashboardRemoveAddWidget(){$dashboardAdd.removeClass('selected').parent().find('>ul').remove()}
function dump(arr,level){var dumped_text="";if(!level)level=0;var level_padding="";for(var j=0;j<level+1;j++)level_padding+="    ";if(typeof arr=='object'){for(var item in arr){var value=arr[item];if(typeof value=='object'){dumped_text+=level_padding+"'"+item+"' ...\n";dumped_text+=dump(value,level+1)}else dumped_text+=level_padding+"'"+item+"' => \""+value+"\"\n"}}else dumped_text="===>"+arr+"<===("+typeof arr+")";return dumped_text};
/* Source and licensing information for the above line(s) can be found at http://intranet.letsdoitromania.ro/sites/all/modules/dashboard/dashboard.js. */
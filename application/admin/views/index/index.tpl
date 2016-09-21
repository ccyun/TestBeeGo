<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible"content="IE=edge,chrome=1"/>
        <!--<meta http-equiv="X-UA-Compatible" content="IE=7" />-->
        <meta name="renderer" content="webkit"/>
        <base href="/"/>
        <title>{$SETTING.SITE.NAME}（系统总控制中心）</title>
        <link href="static/sys/themes/default/style.css" rel="stylesheet" type="text/css" media="screen"/>
        <link href="static/sys/themes/css/core.css" rel="stylesheet" type="text/css" media="screen"/>
        <link href="static/sys/themes/css/print.css" rel="stylesheet" type="text/css" media="print"/>
        <link href="static/sys/uploadify/css/uploadify.css" rel="stylesheet" type="text/css" media="screen"/>
        <!--[if IE]>
         <link href="static/sys/themes/css/ieHack.css" rel="stylesheet" type="text/css" media="screen"/>
        <![endif]-->
        <!--[if lte IE 9]>
        <script src="static/sys/js/speedup.js" type="text/javascript"></script>
        <![endif]-->
        <script src="static/sys/js/jquery-1.7.2.min.js" type="text/javascript"></script>        
        <script src="static/sys/js/jquery.validate.min.js" type="text/javascript"></script>
        <script src="static/sys/js/dwz.min.js" type="text/javascript"></script>
        <script src="static/sys/js/dwz.regional.zh.js" type="text/javascript"></script>
        <!--
        <script src="static/sys/xheditor/xheditor-1.1.12-zh-cn.min.js" type="text/javascript"></script>
        -->
        <script src="static/sys/uploadify/scripts/jquery.uploadify.min.js" type="text/javascript"></script>
        <script src="static/ckeditor/ckeditor.js" type="text/javascript"></script>
        <script src="static/sys/sys.manage.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(function () {
                DWZ.init("static/sys/dwz.frag.xml", {
                    pageInfo: {pageNum: "pageNum", numPerPage: "numPerPage", orderField: "orderField", orderDirection: "orderDirection"}, //【可选】
                    debug: false, // 调试模式 【true|false】
                    callback: function () {
                        initEnv();
                        $("#themeList").theme({themeBase: "themes"}); // themeBase 相对于index页面的主题base路径
                        setTimeout(function () {
                            var url_info = parseURL(location.href);

                            if ($('#sidebar li a[rel=' + url_info.hash + ']').length == 1) {
                                $('#sidebar li a[rel=' + url_info.hash + ']').click();
                                $('#sidebar li a[rel=' + url_info.hash + ']').parents('div').addClass('selected');
                            }
                            $('#sidebar li a[rel=' + url_info.hash + ']').parents('.accordionContent').prev('.accordionHeader').click();
                        }, 100);
                    }
                });
            });
            function ajax_next(data) {
                if (data.callback != '') {
                    setTimeout(function () {
                        ajaxTodo(data.callback, ajax_next)
                    }, 500)
                }
                navTabAjaxDone(data);
            }
        </script>
        <style>
            .dialog .pageContent .pageFormContent .form_table th,.dialog .pageContent .pageFormContent .form_table td{line-height:30px}
            .dialog .pageContent .pageFormContent .form_table th{text-align:right; padding-right:5px}
            .dialog .pageContent .pageFormContent .form_table td input{margin:0 5px 0 0; vertical-align:middle}
            .dialog .pageContent .pageFormContent .form_table label{width:auto; padding-left:0; padding-right:10px}
            .table_auto_height .grid .gridTbody td div{height:auto;white-space:normal;}
            .tabsPage .tabsPageHeader li span {width: auto}
            .div_auto_height .grid .gridTbody td div {display: block;overflow: auto; height: auto; white-space: normal; line-height: 21px;}
            .div_auto_height .grid .gridTbody td div a{display:block; margin:2px 3px}

            .dialog .pageContent .pageFormContent .form_table td .watermark_position{width:140px;float:left}
            .dialog .pageContent .pageFormContent .form_table td .watermark_position label{margin:-1px 0 0 -1px; padding:0; border: 1px dotted #CCC;}
            .dialog .pageContent .pageFormContent .form_table td .watermark_position label:hover{background:#EEE;}
            .dialog .pageContent .pageFormContent .form_table td .watermark_position label input{margin:5px 15px; padding:0}
            .dialog .pageContent .pageFormContent .form_table td #watermark_preview{float:left;width:110px; height:71px; border:1px dotted #CCC}
            .dialog .pageContent .pageFormContent .form_table td #watermark_preview img{max-width:100%; max-height:100%}
            .dialog .pageContent .pageFormContent .form_table td .input_file{position: relative;display: inline-block;width: 100px;height: 30px;}
            .dialog .pageContent .pageFormContent #watermark_image{position: absolute;bottom: 0;right: 0;border-top: 1px solid #b8d0d6;width: 100%;height: 130px;overflow-x: hidden;overflow-y: scroll; background:#FFF}
            .dialog .pageContent .pageFormContent #watermark_image ul li{float:left; width:90px; height:60px; text-align:center; cursor:pointer}
            .dialog .pageContent .pageFormContent #watermark_image ul li:hover{background:#F3F3F3}
            .dialog .pageContent .pageFormContent #watermark_image ul li img{max-width:100%; max-height:100%}



            .dialog .pageContent .pageFormContent .call_code{vertical-align:top; width:50%}
            .dialog .pageContent .pageFormContent .call_code h3{line-height:30px}
            .dialog .pageContent .pageFormContent .call_code div{border:1px solid; border-color:#a2bac0 #b8d0d6 #b8d0d6 #a2bac0;line-height:20px; padding:5px; margin:5px 0; background:#F6F6F6}
            .dialog .pageContent .pageFormContent .call_code div:hover{background:#DDD; cursor:text}
            .dialog .pageContent .pageFormContent .call_code span{display:block; line-height:25px; color:#999}
            .dialog .pageContent .pageFormContent .preview{vertical-align:top; width:50%}
            .dialog .pageContent .pageFormContent .preview h3{line-height:30px; border-bottom:1px solid #CCC}
            .dialog .pageContent .pageFormContent .preview h3 label{float:right; font-size:12px; font-weight:normal;}
            .dialog .pageContent .pageFormContent .preview .data_preview{border:1px solid #CCC; margin:10px 0; padding:10px; background-color:#EFEFEF}
            .dialog .pageContent .pageFormContent .preview .data_preview .list-main li a{line-height:27px;; font-size:14px; color: #252525;}
            .dialog .pageContent .pageFormContent .preview .data_preview .list-main li a:hover{color:#F00}
            .dialog .pageContent .pageFormContent .preview .data_preview .list-main li.hx{font-weight:bold}
            span.log_level{line-height:  inherit; display: inline-block; margin: 0 2px;}
            span.EMERG{font-weight:bolder; color:#CC0000}
            span.ALERT{font-weight:bolder; color:#DD0000}
            span.CRIT{font-weight:bolder; color:#EE0000}
            span.ERR{font-weight:bolder; color:#FF0000}
            span.WARN{color:#FF3333}
            span.NOTIC{ color:#FF6666}
            span.INFO{color:#333333}
            span.DEBUG{color:#333333}
            span.SQL{color:#333333}
            span.ERROR{color: #33CC00}
            span.SUCCESS{color:#009900}
        </style>
    </head>
    <body scroll="no">
        <div id="layout">
            <div id="header">
                <div class="headerNav">
                    <a class="logo" href="{:U('/@www')}?no_cache=1" target="_blank">{$SETTING.SITE.NAME}</a>
                    <ul class="nav">
                        <li style="background:none"><a href="{:U('Base/update_cache/format/json')}" target="ajaxtodo" callback="ajax_next"  title="确定要更新数据缓存吗？">有数据异常情况时，请尝试更新缓存</a></li>
                        <li style="background:none"><a href="{:U('User/edit')}?sid={$user_info.user_id}" width="480" height="450" mask="true" rel="User_edit" target="dialog">{$user_info.user_name}【{:ids2name($user_info['group'],$role_id2name,'，')}】</a></li>
                        <li><a href="{:U('/Logout')}">退出</a></li>
                    </ul>
                </div>
            </div>
            <div id="leftside">
                <div id="sidebar_s">
                    <div class="collapse">
                        <div class="toggleCollapse"><div></div></div>
                    </div>
                </div>
                <div id="sidebar">
                    <div class="toggleCollapse"><h2>主菜单</h2><div>收缩</div></div>
                    <div class="accordion" fillSpace="sidebar">
                        <!--<if condition="
                            (in_array('Admin_Block_info_index',$user_info['permissions']['award']) eq true) OR 
                            (in_array('Admin_Content_index',$user_info['permissions']['award']) eq true) OR 
                            (in_array('Admin_Page_index',$user_info['permissions']['award']) eq true) OR 
                            (in_array('Admin_Category_index',$user_info['permissions']['award']) eq true)
                            ">-->
                        <div class="accordionHeader">
                            <h2><span>Folder</span>内容管理</h2>
                        </div>
                        <div class="accordionContent">
                            <ul class="tree treeFolder">
                                <!--<if condition="in_array('Admin_Block_info_index',$user_info['permissions']['award']) eq true">-->
                                <li><a href="{:U('Block/info_index')}" target="navtab" rel="Block_info_index">板块管理</a></li>
                                <!--</if>-->
                                <!--<if condition="in_array('Admin_Content_index',$user_info['permissions']['award']) eq true">-->
                                <li><a href="{:U('Content/index')}" target="navtab" rel="Content_index">内容管理</a></li>
                                <!--</if>-->
                                <!--<if condition="in_array('Admin_Page_index',$user_info['permissions']['award']) eq true">-->
                                <li><a href="{:U('Page/index')}" target="navtab" rel="Page_index">单页管理</a></li>
                                <!--</if>-->
                                <!--<if condition="in_array('Admin_Category_index',$user_info['permissions']['award']) eq true">-->
                                <li><a href="{:U('Category/index')}" target="navtab" rel="Category_index">栏目管理</a></li>
                                <!--</if>-->
                            </ul>
                        </div>
                        </if>


                        <!--<if condition="
                            (in_array('Admin_User_index',$user_info['permissions']['award']) eq true)
                            ">-->
                        <div class="accordionHeader">
                            <h2><span>Folder</span>用户管理</h2>
                        </div>
                        <div class="accordionContent">
                            <ul class="tree treeFolder">
                                <li><a href="{:U('User/index')}?is_administrator=false" target="navtab" rel="User_index">普通用户</a></li>
                                <li><a href="{:U('User/index')}?is_administrator=true" target="navtab" rel="User_index_administrator">管理员</a></li>
                                <!--<foreach name="role_data" key="k" item="v" >-->
                                <li><a href="{:U('User/index')}?group={$v['_id']}" target="navtab" rel="User_index_{$v['_id']}">{$v.role_name}（<if condition="$v.auth_type eq true">授予<else/>禁止</if>）</a></li>
                                <!--</foreach>-->
                            </ul>
                        </div>
                        <!--</if>-->

                        <!--<if condition="
                            (in_array('Admin_Templates_index',$user_info['permissions']['award']) eq true) OR 
                            (in_array('Admin_Block_index',$user_info['permissions']['award']) eq true)
                            ">-->
                        <div class="accordionHeader">
                            <h2><span>Folder</span>模板、版块管理</h2>
                        </div>
                        <div class="accordionContent">
                            <ul class="tree treeFolder expand">
                                <!--<li><a href="{:U('Templates/Theme')}" target="navtab" rel="User_index">主题方案</a></li>-->
                                <!--<if condition="
                                    (in_array('Admin_Block_index',$user_info['permissions']['award']) eq true)
                                    ">-->
                                <li><a href="{:U('Block/index')}" target="navtab" rel="Block_index">版块（碎片）管理</a></li>
                                <!--</if>-->
                                <!--<if condition="
                                    (in_array('Admin_Templates_index',$user_info['permissions']['award']) eq true)
                                    ">-->
                                <li><a href="{:U('Templates/index/dir/Index')}" target="navtab" rel="Templates_index_Index">首页模板</a></li>
                                <li><a href="{:U('Templates/index/dir/Public')}" target="navtab" rel="Templates_index_Public">公共模版</a></li>
                                <li><a >内容模板</a>
                                    <ul>
                                        <li><a href="{:U('Templates/index/dir/Cms')}" target="navtab" rel="Templates_index_Cms">模板管理</a></li>
                                        <li><a href="{:U('Templates/index/dir/Page')}" target="navtab" rel="Templates_index_Page">单页模板</a></li>
                                        <li><a href="{:U('Templates/index/dir/Tags')}" target="navtab" rel="Templates_index_Tags">标签模板</a></li>
                                    </ul>
                                </li>
                                </if>
                            </ul>
                        </div>
                        </if>

                        <!--<if condition="
                            (in_array('Admin_Setting_site',$user_info['permissions']['award']) eq true) OR 
                            (in_array('Admin_UploadSetting_index',$user_info['permissions']['award']) eq true) OR 
                            (in_array('Admin_Dict_index',$user_info['permissions']['award']) eq true) OR 
                            (in_array('Admin_Role_index',$user_info['permissions']['award']) eq true) OR 
                            (in_array('Admin_Menu_index',$user_info['permissions']['award']) eq true) OR 
                            (in_array('Admin_Permissions_index',$user_info['permissions']['award']) eq true) OR 
                            (in_array('Admin_Log_index',$user_info['permissions']['award']) eq true)                            
                            ">-->
                        <div class="accordionHeader">
                            <h2><span>Folder</span>系统设置</h2>
                        </div>
                        <div class="accordionContent">
                            <ul class="tree treeFolder expand">
                                <!--<if condition="in_array('Admin_Setting_site',$user_info['permissions']['award']) eq true">-->
                                <li><a href="{:U('Setting/site')}" width="460" height="450" mask="true" rel="Setting_site" target="dialog">网站设置</a></li>
                                <!--</if>-->
                                <!--<if condition="in_array('Admin_UploadSetting_index',$user_info['permissions']['award']) eq true">-->
                                <li><a href="{:U('UploadSetting/index')}" target="navtab" rel="UploadSetting_index">上传设置</a></li>
                                <!--</if>-->
                                <!--<if condition="in_array('Admin_Dict_index',$user_info['permissions']['award']) eq true">-->
                                <li><a href="{:U('Dict/index')}" target="navtab" rel="Dict_index">词库管理（敏感词）</a></li>
                                <!--</if>-->
                                <!--<if condition="in_array('Admin_Role_index',$user_info['permissions']['award']) eq true">-->
                                <li><a href="{:U('Role/index')}" target="navtab" rel="Role_index">角色（权限组）管理</a></li>
                                <!--</if>-->
                                <!--<if condition="in_array('Admin_App_index',$user_info['permissions']['award']) eq true">-->
                                <li><a href="{:U('App/index')}" target="navtab" rel="App_index">应用管理</a></li>
                                <!--</if>-->
                                <!--<if condition="in_array('Admin_Menu_index',$user_info['permissions']['award']) eq true">-->
                                <li><a href="{:U('Menu/index')}" target="navtab" rel="Menu_index">菜单管理</a></li>
                                <!--</if>-->
                                <!--<if condition="in_array('Admin_Permissions_index',$user_info['permissions']['award']) eq true">-->
                                <li><a href="{:U('Permissions/index')}" target="navtab" rel="Permissions_index">权限节点列表</a></li>
                                <!--</if>-->
                                <!--<if condition="in_array('Admin_Log_index',$user_info['permissions']['award']) eq true">-->
                                <li><a href="{:U('Log/index')}" target="navtab" rel="Log_index">系统日志</a></li>
                                <!--</if>-->
                            </ul>
                        </div>
                        </if>
                        <!--<if condition="
                            (in_array('Admin_Base_repair',$user_info['permissions']['award']) eq true) OR 
                            (in_array('Admin_Base_update_cache',$user_info['permissions']['award']) eq true)
                            ">-->
                        <div class="accordionHeader">
                            <h2><span>Folder</span>数据管理</h2>
                        </div>
                        <div class="accordionContent">
                            <ul class="tree treeFolder expand">
                                <!--<if condition="in_array('Admin_Base_repair',$user_info['permissions']['award']) eq true">-->
                                <li><a href="{:U('Base/repair/data_type/role_permissions/format/json')}" target="ajaxtodo" callback="ajax_next" title="确定要修复数据吗？"><span>修复角色数据</span></a></li>
                                <li><a href="{:U('Base/repair/data_type/user_permissions/format/json')}" target="ajaxtodo" callback="ajax_next" title="确定要修复数据吗？"><span>修复用户数据</span></a></li>
                                <li><a href="{:U('Base/repair/data_type/category/format/json')}" target="ajaxtodo" callback="ajax_next" title="确定要修复数据吗？"><span>修复栏目数据</span></a></li>
                                <!--</if>-->
                                <!--<if condition="in_array('Admin_Base_update_cache',$user_info['permissions']['award']) eq true">-->
                                <li><a href="{:U('Base/update_cache/clear/true/format/json')}" target="ajaxtodo" callback="ajax_next"  title="确定要清除（可能造成网站短暂异常）并更新数据缓存吗？">清除并更新缓存</a></li>
                                <!--</if>-->
                            </ul>
                        </div>
                        </if>

                        <!--<if condition="$Think.const.APP_DEBUG eq true">-->
                        <div class="accordionHeader">
                            <h2><span>Folder</span>模型管理（开发调试）</h2>
                        </div>
                        <div class="accordionContent">
                            <ul class="tree treeFolder expand">
                                <li><a href="{:U('Model/add')}" width="600" height="650" mask="true" target="dialog" rel="Model_add">添加模型</a></li>
                                <li><a>模型列表</a>                                        
                                    <ul>
                                        <!--<foreach name="model_lists" item="r" >-->
                                        <li><a>{$key}</a>
                                            <ul>
                                                <!--<foreach name="r" item="v" key="k">-->
                                                <li><a href="{:U('Model/config/'.$key.'/'.$v)}" target="navtab" rel="Model_config" title="模型配置【{$key}/{$v}】">{$v}</a></li>
                                                <!--</foreach>-->
                                            </ul>                                            
                                        </li>
                                        <!--</foreach>-->
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        </if>
                    </div>
                </div>
            </div>
            <div id="container">
                <div id="navTab" class="tabsPage">
                    <div class="tabsPageHeader">
                        <div class="tabsPageHeaderContent"><!-- 显示左右控制时添加 class="tabsPageHeaderMargin" -->
                            <ul class="navTab-tab">
                                <li tabid="main" class="main"><a href="javascript:;"><span><span class="home_icon">我的主页</span></span></a></li>
                            </ul>
                        </div>
                        <div class="tabsLeft">left</div><!-- 禁用只需要添加一个样式 class="tabsLeft tabsLeftDisabled" -->
                        <div class="tabsRight">right</div><!-- 禁用只需要添加一个样式 class="tabsRight tabsRightDisabled" -->
                        <div class="tabsMore">more</div>
                    </div>
                    <ul class="tabsMoreList">
                        <li><a href="javascript:;">我的主页</a></li>
                    </ul>
                    <div class="navTab-panel tabsPageContent layoutBox">
                        <div class="page unitBox">

                            <div class="accountInfo">
                                <div class="right">
                                </div>
                                <p><span>欢迎使用易家装管理系统 版本2.0</span></p>
                                <p>V2</p>
                            </div>
                            <div class="pageFormContent" style="padding:0">
                                <table style="width:100%">
                                    <tr>
                                        <td style="padding:5px;">
                                            <div style="border:1px solid #CCC">
                                                <textarea layoutH="72" style="width:100%; line-height:20px;  padding:0; border:none" readonly="readonly">
缓存列表，增加或者修改缓存之前请先修改debug中的缓存列表
缓存列表意外的命名将无法创建成功
{:var_export(C('CACHE_LISTS'))}
                                                </textarea>
                                                <div style="clear:both"></div>
                                            </div>
                                        </td>
                                        <td style="padding:5px">
                                            <div style="border:1px solid #CCC">
                                                <textarea layoutH="72" style="width:100%; height:100%; line-height:20px; padding:0; border:none" readonly="readonly">
错误代码列表
{:var_export(C('ERROR_CODE'))}
                                                </textarea>
                                                <div style="clear:both"></div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="footer">Copyright &copy; 2013 易家装开发团队（请使用IE8以上或chrome内核浏览器使用）</div>
    </body>
</html>
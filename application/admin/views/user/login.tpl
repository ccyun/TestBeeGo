<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>{$SETTING.SITE.TITLE}</title>
    <meta name="author" content="Guan<ccyun@live.cn>">
    <script src="/static/js/jquery-1.11.3.min.js"></script>
    <script src="/static/js/jquery.validate.min.js"></script>
    <script src="/static/js/jquery.form.js"></script>
    <script src="/static/js/common.js"></script>
    <script src="/static/js/encrypt.js"></script>
    <style>
        html {
            height: 100%;
        }
        
        body {
            background: url(/static/sys/themes/index_bg.jpg) no-repeat bottom center #FFF;
            height: 100%;
            margin: 0;
            padding: 0
        }
        
        .login {
            text-align: center;
            top: 35%;
            position: relative;
            margin: 0 auto
        }
        
        .login h2.message {
            font-size: 18px;
            font-family: 微软雅黑;
            color: #999;
            display: none
        }
        
        .login input {
            margin: 5px;
            font-size: 14px;
            font-family: arial, '微软雅黑', '黑体';
            float: left
        }
        
        .login .text {
            border: 1px solid #DDD;
            padding: 6px;
            width: 150px;
            height: 20px;
            overflow: hidden;
            outline: none;
        }
        
        .login .text:focus {
            border: 1px solid #39C;
        }
        
        .login .sub {
            border: 1px solid #39C;
            padding: 0 20px;
            background: #39C;
            color: #FFF;
            height: 34px;
            overflow: hidden;
        }
    </style>
</head>

<body>
    <div class="login">
        <div style="display: inline-block">
            <h2 class="message"></h2>
            <form method="post" enctype="multipart/form-data" action="{{urlfor " User.Login "}}" class="validate" target="ajax" callback="ajaxSubmit">
                <input type="text" name="user_name" placeholder="用户名" class="text required" onerror="false" />
                <input type="password" name="password" placeholder="密码" class="text required encrypt" onerror="false" />
                <input type="hidden" name="__formToken__" value="{{.__formToken__}}" />
                <span>{{.__xsrfdata__}}</span>
                <input type="submit" value="登录" class="sub" />
            </form>
            <div style="clear: both"></div>
        </div>
    </div>
    <script>
            function ajaxSubmit(data) {
                $('form').hide();
                $('h2.message').show();
                if (data.statusCode == 200) {
                    $('h2.message').text('登录成功，正在跳转……');
                    location.href = '{:U("/")}';
                } else {
                    $('h2.message').text(data.message);
                    setTimeout(function () {
                        $('h2.message').hide();
                        $('form').show();
                    }, 1000);
                }
            }
            $(function () {
                setTimeout(function () {
                    $('input[name=user_name]').focus();
                    $('input[name=user_name],input[name=password]').val('');
                }, 100)
            });
        </script>
</body>

</html>
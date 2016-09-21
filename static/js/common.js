/**
 *公共JS
 */
/*基础配置*/
var common_conf = {
    encrypt: '/admin/encrypt',
    token: 'input[name=__formToken__]',
}





$(function ($) {

    /*
     * 自动表单验证
     * form（表单） 
     *     属性（class="validate"）自动验证
     *     属性（target="ajax"）target除了支持常见的_blank  _self 等增加ajax方式
     *     属性（callback='doSubmit'）  ajax提交后的回调函数
     *     input 属性（ onerror="false"） false不显示错误信息，其他则为回调函数，回调函数不存在时按默认执行
     *     input 属性（class="encrypt"） encrypt 对数据内容进行加密处理
     */
    $.each($("form.validate"), function (i, r) {
        var _form = $(r);
        var _conf = {};
        _conf.errorElement = "span"; //错误提示标签改成span

        _conf.submitHandler = function (form) {
            var target = $(form).attr('target')
            var submit_status = $.watch();
            if (_form.find('input.encrypt').length > 0) {     //检测需要加密上传的数据
                if (target === 'ajax') {
                    var encrypt_data = {};
                }
                submit_status.promise();
                var encrypt_status = $.watch();
                $.each(_form.find('input.encrypt'), function (i, r) {
                    var field_name = $(r).attr('name');
                    var field_value = $(r).val();
                    encrypt_data[field_name] = field_value;
                    encrypt_status.promise();
                    $.ajax({url: common_conf.encrypt, type: 'post', data: {
                            data: $.encrypt(field_value), 
                            key: $.encrypt(field_name) + '_' + $(common_conf.token).val(), 
                        },
                        success: function (data) {console.log(data)
                            if (data.statusCode == 200) {
                                encrypt_status.resolve();
                                $(r).val(data.data);
                            }
                        }
                    });
                });
                encrypt_status.onsuccess(function () {
                    submit_status.resolve();
                });
            }
            //检测需要上传数据的字段
            //
            //
            //
            //其他代码
            submit_status.onsuccess(function () {    //执行提交
                if (target === 'ajax') {        //ajax方式提交
                    var callback = eval($(form).attr('callback')); //ajax提交回调函数
                    $(form).ajaxSubmit(function (data) {
                        if (typeof (data.statusCode) != 'undefined') {
                            if (data.statusCode == 200) {
                                $(form).resetForm();
                                callback(data);
                            } else if (data.statusCode == 300) {
                                $.each(encrypt_data, function (i, r) {
                                    $('[name=' + i + ']').val(r);
                                });
                                callback(data);
                            }
                        } else {
                            console.log(data);
                            console.log("返回值缺少参数，应该是：array('statusCode' => 200, 'message' => '登录成功', 'data' => $data)")
                        }
                    });
                } else {//普通方式提交
                    form.submit();
                }
            });

            return false;
        }

//错误信息处理
        _conf.errorPlacement = function (error, element) {
            var onerror = element.attr('onerror');
            if (typeof (onerror) != 'undefined') {
                try {
                    eval(onerror)(error, element);
                } catch (e) {
                    if (onerror != 'false') {
                        console.log('回调函数:' + onerror + ',不存在，以默认方式输出错误 ');
                        error.insertAfter(element);
                    }
                }
            } else {
                error.insertAfter(element);
            }
        }
//实例化校验对象
        _form.validate(_conf);
    });
});

/**
 * 后台管理系统js扩展类
 */
var sys = {
    model: {
        /**
         * 模型管理   
         * @type type
         */
        config: {
            /**
             * 如果设置了truetablename，则表前缀和表名失效
             * /Model/add.html
             * /Model/edit.html
             * @returns {undefined}
             */
            truetablename_unique: function () {
                if ($('#truetablename').val() != '') {
                    $('#tableprefix,#tablename').attr('disabled', 'disabled');
                    $('#tableprefix,#tablename').addClass('disabled');
                } else {
                    $('#tableprefix,#tablename').removeAttr('disabled');
                    $('#tableprefix,#tablename').removeClass('disabled');
                }
            }
        },
        /**
         * j检测模型唯一性
         * @param {type} obj
         * @returns {undefined}
         */
        model_unique: function (obj) {
            $('#model').attr('remote', model_check_url.model + $(obj).val());
        },
        /**
         * 检测字段唯一性
         * @param {type} obj
         * @returns {undefined}
         */
        field_unique: function (obj) {
            $('#field').attr('remote', model_check_url.field + $(obj).val());
        },
        /**
         * 自动初始化
         * @type type
         */
        auto: {
            /**
             * 全局控制
             * @param {type} obj
             * @returns {undefined}
             */
            form_event: function (obj) {
                var input_name = $(obj).attr('name');
                var input_val = $(obj).val();
                if (input_name == 'field_select') { //****************************************
                    this.field_reset(['field', 'padding_type', 'auto_value', 'auto_field']);
                    if (input_val != '' && input_val != ' ') {
                        $('#op_' + padding_type_id + ' li a[value=],#op_' + padding_type_id + ' li a[value=field],#op_' + padding_type_id + ' li a[value=function],#op_' + padding_type_id + ' li a[value=callback]').parent().show();
                        var text = "当前字段类型为 【 " + model_info.field_info[input_val].field_type + " 】<br>如果设置了子字段规则，父字段规则将<b style=\"color:red\">失效</b><br>仅允许使用：";
                        if (model_info.field_info[input_val].field_type == 'string') {
                            $('#op_' + padding_type_id + ' li a[value=empty],#op_' + padding_type_id + ' li a[value=string]').parent().show();
                            text += '空字符串、字符串、';
                        } else if (model_info.field_info[input_val].field_type == 'int') {
                            $('#op_' + padding_type_id + ' li a[value=int]').parent().show();
                            text += '整型、';
                        } else if (model_info.field_info[input_val].field_type == 'float') {
                            $('#op_' + padding_type_id + ' li a[value=float],#op_' + padding_type_id + ' li a[value=int]').parent().show();
                            text += '浮点型、整型、';
                        } else if (model_info.field_info[input_val].field_type == 'boolean') {
                            $('#op_' + padding_type_id + ' li a[value=boolean]').parent().show();
                            text += '布尔型、';
                        } else if (model_info.field_info[input_val].field_type == '_id') {
                            $('#op_' + padding_type_id + ' li a[value=string],#op_' + padding_type_id + ' li a[value=empty]').parent().show();
                            text += '空字符串、字符串、';
                        }
                        text += '其他字段、回调函数、回调方法处理填充';
                        $('#field_info').html(text);
                        this.check_unique(input_val, $('input[name=event]:checked').val());
                    }
                } else if (input_name == 'event') {   //****************************************
                    if ($('#field_select').val() != '' && $('input[name=event]:checked').val() != '') {
                        this.check_unique($('#field_select').val(), $('input[name=event]:checked').val());
                    }
                } else if (input_name == 'padding_type') { //****************************************
                    this.field_reset(['auto_value', 'auto_field']);
                    if (input_val == 'function' || input_val == 'callback') {
                        $('#ignore').show();
                        $('#ignore input').removeAttr('disabled');
                    } else if (input_val == 'field') {
                        var field = $('#field_select').val();
                        var field_fid = model_info.field_info[field]['field_fid'];
                        var field_type = model_info.field_info[field]['field_type'];
                        $('#op_' + auto_field_id + ' li').hide();
                        $('#op_' + auto_field_id + ' li a[value=]').parent().show();
                        $('#' + auto_field_id + ' select').val('');
                        $('#' + auto_field_id + ' a').text($('#op_' + auto_field_id + ' li a[value=]').text());
                        $.each(model_info.field_info, function (i, r) {
                            if (r.field_fid == field_fid && r.field_type == field_type && field != i) {
                                $('#op_' + auto_field_id + ' li a[value=\'' + i + '\']').parent().show();
                            }
                        });
                    }
                    $('#auto_' + input_val).show();
                    $('#auto_' + input_val + '  input').removeAttr('disabled');
                } else if (input_name == 'padding[function]' || input_name == 'padding[callback]') {
                    if (input_val != '' && input_val != ' ') {
                        $(obj).removeClass('error');
                        if (input_name == 'padding[function]') {
                            var url = model_check_url.function_exists + '?function=' + input_val;
                            var error = '该函数不存在';
                            var error_id = '#auto_function td span.error';
                        } else if (input_name == 'padding[callback]') {
                            var url = model_check_url.callback_exists + '?callback=' + input_val;
                            var error = '该模型方法不存在';
                            var error_id = '#auto_callback td span.error';
                        }
                        $(error_id).text('');
                        $.getJSON(url, function (data) {
                            if (data.statusCode == 300) {
                                $(obj).addClass('error')
                                $(error_id).text(error);
                                $(error_id).show();
                            }
                        });
                    }
                }
            },
            field_reset: function (obj) {
                $.each(obj, function (i, r) {
                    if (r == 'field') {
                        $('#field_info').text('');
                        $('#field_info').attr('title', '');
                    } else if (r == 'padding_type') {
                        $('#op_' + padding_type_id + ' li').hide();
                        $('#op_' + padding_type_id + ' li a[value=]').parent().show();
                        $('#' + padding_type_id + ' select').val('');
                        $('#' + padding_type_id + ' a').text($('#op_' + padding_type_id + ' li a[value=]').text());
                        $('#op_' + padding_type_id + ' li a').removeClass('selected');
                        $('#op_' + padding_type_id + ' li a[value=]').addClass('selected');
                    } else if (r == 'auto_field') {
                        $('#op_' + auto_field_id + ' li').hide();
                        $('#op_' + auto_field_id + ' li a[value=]').parent().show();
                        $('#' + auto_field_id + ' select').val('');
                        $('#' + auto_field_id + ' a').text($('#op_' + auto_field_id + ' li a[value=]').text());
                        $('#op_' + auto_field_id + ' li a').removeClass('selected');
                        $('#op_' + auto_field_id + ' li a[value=]').addClass('selected');
                    } else if (r == 'auto_value') {
                        $('#auto_value tr').hide();
                        $('#auto_value tr input,#auto_value tr select').attr('disabled', 'disabled');
                    }
                });
            },
            /**
             * 检测当前字段是否已经设置了处理规则
             * @returns {undefined}
             */
            check_unique: function (field, event) {
                $('#check_auto_unique_error').text('');
                $('input[name=field_fid]').val('');
                $('input[name=field]').val('');
                if (field != '') {
                    $.getJSON(model_check_url.auto_field_unique + '?field=' + field + '&event=' + event, function (data) {
                        if (data.statusCode == 300) {
                            $('#check_auto_unique_error').text(data.error);
                        } else {
                            if (model_info.field_info[field].field_fid != '') {
                                $('input[name=field_fid]').val(model_info.field_info[field].field_fid);
                            }
                            $('input[name=field]').val(model_info.field_info[field].field);
                        }
                    });
                }
            },
        },
        validate: {
            form_event: function (obj) {
                var input_name = $(obj).attr('name');
                var input_val = $(obj).val();
                if (input_name == 'field_select') {
                    this.field_reset(['params', 'rule', 'regulation', 'regex_select', 'confirm_select', 'params_info', 'ignore']);
                    this.check_unique(input_val, $('input[name=event]:checked').val());
                } else if (input_name == 'event') {
                    if ($('#field_select').val() != '') {
                        this.check_unique($('#field_select').val(), $('input[name=event]:checked').val());
                    }
                } else if (input_name == 'params') {
                    this.field_reset(['rule', 'regulation', 'regex_select', 'confirm_select', 'params_info', 'ignore']);
                    if (input_val != '' && input_val != 'unique') {
                        $('#regulation input[name=rule]').removeAttr('readonly');
                        $('#regulation input[name=rule]').removeAttr('disabled');
                        if (input_val == 'function' || input_val == 'callback') {
                            $("#ignore,#ignore input[name=ignore]").show();
                            $('#ignore input[name=ignore]').removeAttr('readonly');
                            $('#ignore input[name=ignore]').removeAttr('disabled');
                        } else if (input_val == 'regex' || input_val == 'confirm') {
                            $('#regulation input[name=rule]').attr('readonly', 'readonly');
                            if (input_val == 'regex') {
                                $('#regex_select').show();
                            } else if (input_val == 'confirm') {
                                $('#confirm_select').show();
                            }
                        }
                        $('#regulation,#regulation input[name=rule]').show();
                    } else {
                        this.field_reset(['rule', 'regulation', 'regex_select', 'confirm_select']);
                        $('#regex_select select[name=regex_select],#confirm_select select[name=confirm_field]').attr('disabled', 'disabled');
                    }
                    if (input_val != '') {
                        $('#params_info,#params_info span#' + input_val + '_info').show();
                    }
                } else if (input_name == 'rule') {
                    var params = $('#params select[name=params]').val();
                    var rule = input_val;
                    $(obj).removeClass('error');
                    $('#regulation span.error').text('');
                    if (params == 'function' || params == 'callback') {
                        if (params == 'function') {
                            var url = model_check_url.function_exists + '?function=' + input_val;
                            var error = '该函数不存在';
                        } else if (params == 'callback') {
                            var url = model_check_url.callback_exists + '?callback=' + input_val;
                            var error = '该模型方法不存在';
                        }
                        $.getJSON(url, function (data) {
                            if (data.statusCode == 300) {
                                $(obj).addClass('error')
                                $('#regulation span.error').text(error);
                            }
                        });
                    }

                } else if (input_name == 'regex_select' || input_name == 'confirm_field') {
                    $('#regulation input[name=rule]').attr('readonly', 'readonly');
                    $('#regulation input[name=rule]').val(input_val);
                }
            },
            /**
             * 表单字段初始化
             * @param {type} obj
             * @returns {undefined}
             */
            field_reset: function (obj) {
                $.each(obj, function (i, r) {
                    if (r == 'params') {
                        // $('#params').hide();
                        $('#params select[name=params]').val('');
                        $('#params select[name=params]').attr('disabled', 'disabled');
                        $('#' + params_id + ' a[name=params]').text($('#op_' + params_id + ' li a[value=]').text());
                        $('#op_' + params_id + ' li').hide();
                        $('#op_' + params_id + ' li a').removeClass('selected');
                        $('#op_' + params_id + ' li a[value=]').parent().show();
                    } else if (r == 'rule') {
                        $('#regulation input[name=rule]').hide();
                        $('#regulation input[name=rule]').val('');
                        $('#regulation input[name=rule]').removeClass('error');
                        $('#regulation input[name=rule]').attr({readonly: 'readonly', disabled: 'disabled'});
                        $('#regulation span.error').text('');
                    } else if (r == 'regulation') {
                        $('#regulation').hide();
                    } else if (r == 'regex_select') {
                        $('#regex_select').hide();
                        $('#regex_select select[name=regex_select]').val('');
                        $('#regex_select select[name=regex_select]').attr('disabled', 'disabled');
                        $('#' + regex_select_id + ' a[name=regex_select]').text($('#op_' + regex_select_id + ' li a[value=]').text());
                        $('#op_' + regex_select_id + ' li a').removeClass('selected');
                        $('#op_' + regex_select_id + ' li a[value=]').parent().show();
                    } else if (r == 'confirm_select') {
                        $('#confirm_select').hide();
                        $('#confirm_select select[name=confirm_field]').val('');
                        $('#confirm_select select[name=confirm_field]').attr('disabled', 'disabled');
                        $('#' + confirm_select_id + ' a[name=confirm_field]').text($('#op_' + confirm_select_id + ' li a[value=]').text());
                        $('#op_' + confirm_select_id + ' li a').removeClass('selected');
                        $('#op_' + confirm_select_id + ' li a[value=]').parent().show();
                    } else if (r == 'params_info') {
                        $('#params_info,#params_info span.info').hide();
                    } else if (r == 'ignore') {
                        $('#ignore').hide();
                        $('#ignore input[name=ignore]').val('');
                        $('#ignore input[name=ignore]').attr('disabled', 'disabled');
                    }
                });
            },
            /**
             * 检测当前字段是否设置了自动验证规则
             * @returns {undefined}
             */
            check_unique: function (field, event) {
                $('#check_validate_unique_error').text('');
                $('input[name=field_fid]').val('');
                $('input[name=field]').val('');
                $('#op_' + regex_select_id + ' li').hide();
                $('#op_' + confirm_select_id + ' li').hide();
                if (field != '') {
                    $.getJSON(model_check_url.validate_field_unique + '?field=' + field + '&event=' + event, function (data) {
                        if (data.statusCode == 300) {
                            $('#check_validate_unique_error').text(data.error);
                        } else {
                            if (model_info.field_info[field].field_fid != '') {
                                $('input[name=field_fid]').val(model_info.field_info[field].field_fid);
                            }
                            $('input[name=field]').val(model_info.field_info[field].field);
                            $('#params select[name=params]').removeAttr('disabled');
                            $('#op_' + params_id + ' li a[value=],#op_' + params_id + ' li a[value=function],#op_' + params_id + ' li a[value=callback]').parent().show();
                            if (model_info.field_info[field].field_type == 'string' || model_info.field_info[field].field_type == '_id') {
                                $('#op_' + params_id + ' li').show();
                                $('#op_' + regex_select_id + ' li').show();
                            } else if (model_info.field_info[field].field_type == 'int') {
                                $('#op_' + params_id + ' li a[value=regex],#op_' + params_id + ' li a[value=unique],#op_' + params_id + ' li a[value=confirm],#op_' + params_id + ' li a[value=equal],#op_' + params_id + ' li a[value=notequal],#op_' + params_id + ' li a[value=inn],#op_' + params_id + ' li a[value=notinn],#op_' + params_id + ' li a[value=length],#op_' + params_id + ' li a[value=betweenn],#op_' + params_id + ' li a[value=notbetweenn], #op_' + params_id + ' li a[value=expire]').parent().show();
                                $('#op_' + regex_select_id + ' li a[value=require],#op_' + regex_select_id + ' li a[value=number],#op_' + regex_select_id + ' li a[value=zip],#op_' + regex_select_id + ' li a[value=integer],#op_' + regex_select_id + ' li a[value=other]').parent().show();
                            } else if (model_info.field_info[field].field_type == 'float') {
                                $('#op_' + params_id + ' li a[value=regex],#op_' + params_id + ' li a[value=unique],#op_' + params_id + ' li a[value=confirm],#op_' + params_id + ' li a[value=equal],#op_' + params_id + ' li a[value=notequal],#op_' + params_id + ' li a[value=inn],#op_' + params_id + ' li a[value=notinn],#op_' + params_id + ' li a[value=length],#op_' + params_id + ' li a[value=betweenn],#op_' + params_id + ' li a[value=notbetweenn], #op_' + params_id + ' li a[value=expire]').parent().show();
                                $('#op_' + regex_select_id + ' li a[value=require],#op_' + regex_select_id + ' li a[value=number],#op_' + regex_select_id + ' li a[value=zip],#op_' + regex_select_id + ' li a[value=integer],#op_' + regex_select_id + ' li a[value=double],#op_' + regex_select_id + ' li a[value=other]').parent().show();
                            } else if (model_info.field_info[field].field_type == 'boolean') {
                                $('#op_' + params_id + ' li a[value=confirm],#op_' + params_id + ' li a[value=inn]').parent().show();
                            }
                            $.each(model_info.field_info, function (i, r) {
                                if (r.field_type == model_info.field_info[field].field_type && field != i) {
                                    $('#op_' + confirm_select_id + ' li a[value=\'' + i + '\']').parent().show();
                                }
                            });
                        }
                    });
                }
            },
        },
    },
    content: {
        edit: {
            form_event: function (obj) {
                var input_name = $(obj).attr('name');
                var input_val = $(obj).val();
                if (input_name == 'cat_id') {
                    this.change_category(input_val)
                } else if (input_name == 'title_style[color]') {
                    $('#' + title_color_id + ' a').css('color', input_val)
                    $('input[name=title]').css('color', '')
                    $('input[name=title]').css('color', input_val)
                } else if (input_name == 'title_style[font-weight]') {
                    $('input[name=title]').css('font-weight', '')
                    if ($(obj).attr('checked') == 'checked') {
                        $('input[name=title]').css('font-weight', input_val)
                    }
                } else if (input_name == 'title_style[font-style]') {
                    $('input[name=title]').css('font-style', '')
                    if ($(obj).attr('checked') == 'checked') {
                        $('input[name=title]').css('font-style', input_val)
                    }
                }
            },
            change_category: function (cat_id) {
                var content_model_id = $('#content_model_id').val();
                if (category_data[cat_id]['model_id'] != content_model_id) {
                    //加载数据模型扩展表单
                    $('#content_model_id').val(category_data[cat_id]['model_id']);
                    $('#content_data_model').ajaxUrl({url: model_template_url + category_data[cat_id]['model_id'] + "_edit", data: content_info, type: 'post'});
                }
                //过滤内容模版
                this.template(category_data[cat_id]['model_id'], category_data[cat_id]['template']['content']);
                //处理设置
                this.setting(category_data[cat_id]['setting']);
                //板块推荐
                $('#content_block_lists').html('');
                $('#content_block_lists').html(this.block(cat_id));
                //  console.log(this.block(cat_id));
            },
            block: function (cat_id) {
                var block_html = '';
                if (block_category[cat_id]) {
                    $.each(block_category[cat_id], function (i, r) {
                        block_html += '<div style="display: block; padding:5px 0;" title="' + r.description + '"><label>';
                        if (typeof (block_info[i]) === 'undefined') {
                            block_html += '<input type="checkbox" name="block_ids[]" value="' + i + '"/>' + r.block_name;
                            if (r.info_check == true) {
                                block_html += '【需要审核】';
                            }
                        } else {
                            block_html += '<input type="checkbox" name="block_ids[]" value="' + i + '" checked="checked" disabled="disabled"/><span style="color:#7F7F7F">' + r.block_name;
                            if (block_info[i] == false) {
                                block_html += '【待审核】';
                            }
                            block_html += '</span>';
                        }
                        block_html += '</label><div style="clear:both"></div></div>';
                    });
                }
                return block_html;
            },
            //筛选模板
            template: function (model_id, template_id) {
                $('#' + template_select_id + ' select').val('');
                $('#' + template_select_id + ' a').text($('#op_' + template_select_id + ' li a[value=]').text());
                $.each($('#' + template_select_id + ' select option'), function (i, r) {
                    var tpl_val = $(r).attr('value');
                    if (tpl_val != '') {
                        $(r).attr('disabled', 'disabled');
                        $('#op_' + template_select_id + ' li a[value=' + tpl_val + ']').parent().hide();
                        if (tpl_val.indexOf(model_id) == 0) {
                            $(r).removeAttr('disabled');
                            $('#op_' + template_select_id + ' li a[value=' + tpl_val + ']').parent().show();
                            if (tpl_val == template_id) {
                                $('#' + template_select_id + ' select').val(template_id);
                                $('#' + template_select_id + ' a').text($('#op_' + template_select_id + ' li a[value=' + tpl_val + ']').text());
                            }
                        }
                    }
                });
            },
            setting: function (setting) {
                $.each(setting, function (i, r) {
                    if (i == 'auto_thumb' || i == 'auto_save_image' || i == 'auto_description' || i == 'auto_keywords') {
                        $('#content_setting input[name=' + i + ']').attr('checked', r);
                    } else if (i == 'description_size') {
                        $('#description_size').text(r);
                        $('input[name=description_size]').val(r);
                    }
                });
            },
            title_color: function () {
                $('#op_' + title_color_id + ' li a').css({
                    color: function () {
                        color = $(this).attr('value');
                        if (color != '') {
                            return color;
                        }
                    }
                });
            }
        },
    },
    /**
     * 编辑器配置
     * @type type
     */
    editor: {
        config: {
            height: 250,
            filebrowserImageUploadUrl: '/Base/upload',
            extraPlugins: 'codemirror',
            codemirror: {
                showAutoCompleteButton: false,
                showCommentButton: false,
                showUncommentButton: false,
                showFormatButton: false,
                theme: 'monokai',
            },
            //startupMode: 'source',
            toolbarGroups: [
                {name: 'document', groups: ['mode', 'document', 'doctools']},
                {name: 'basicstyles', groups: ['basicstyles', 'cleanup', 'links']},
                {name: 'styles', groups: ['styles']},
                {name: 'colors', groups: ['colors']},
                {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
                {name: 'insert', groups: ['insert']},
                {name: 'tools', groups: ['tools']},
            ],
            //Source,
            removeButtons: 'Save,NewPage,Print,Templates,Cut,Copy,Paste,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Subscript,Superscript,BidiLtr,BidiRtl,Language,Anchor,Flash,HorizontalRule,Smiley,SpecialChar,Iframe,Styles,Font,FontSize,BGColor,About,JustifyRight,JustifyBlock',
            /*       pasteFilter: function(a,b,c){
             console.log(a);
             console.log(b);
             console.log(c);
             },*/
        },
    },
    //获取分词
    get_dict: function (url, content, callback) {
        if (content) {
            $("body").append('<div id="_dict" style="display: none;">' + content + '</div>');
            content = $('#_dict').text();
            $('#_dict').remove();
            $.post(url, {content: content, num: 10}, function (data) {
                var s = [];
                if (data.statusCode == 200) {
                    $.each(data.data, function (i, r) {
                        s[i] = r.word;
                    });
                    callback(s.join(','));
                }
            });
        }
    },
    //统计字数（中文）
    gbcount: function (str) {
        var lenE = str.length;
        var lenC = 0;
        var CJK = str.match(/[^\x00-\xff]/g);
        var enter = str.match(/\r\n/g);
        if (CJK != null)
            lenC += CJK.length;
        if (enter != null)
            lenC -= enter.length;
        return  Math.ceil((lenE + lenC) / 2);
    },
    //上传设置
    uploadsetting: {
        form_event: function (obj) {
            var input_name = $(obj).attr('name');
            var input_val = $(obj).val();
            if (input_name == 'filetype') {
                this.filetype = input_val;
                $('#filetype_data_model').ajaxUrl({url: filetype_model_template_url + input_val + "_edit", data: dir_info, type: 'post'});
            } else if (input_name == 'watermark') {
                if ($(obj).attr('checked') == 'checked') {
                    $('#watermark_image,#watermark_setting').show();
                    $('#watermark_setting input').removeAttr('disabled');
                } else {
                    $('#watermark_image,#watermark_setting').hide();
                    $('#watermark_setting input').attr('disabled', 'disabled');
                }
            }
        },
        select_watermark_file: function () {
            $('#watermark_image img').unbind();
            $('#watermark_image img').click(function () {
                var src = $(this).attr('src');
                $('input[name=imageurl]').val(src);
                $('div#watermark_preview').html('<img src="' + src + '">');
            });
        },
    },
    //版块设置
    block: {
        form_event: function (obj) {
            var input_name = $(obj).attr('name');
            var input_val = $(obj).val();
            if (input_name == 'block_type') {
                this.filetype = input_val;
                $('#block_data_model').ajaxUrl({url: block_type_template_url + input_val + "_edit", data: dir_info, type: 'post'});
            }
        },
    },
    blockdata: {
        form_event: function (obj) {
            var input_name = $(obj).attr('name');
            var input_val = $(obj).val();
            if (input_name == 'block_id') {
                this.block(input_val)
            } else if (input_name == 'category') {
                this.category(input_val)
            }
        },
        block: function (block_id) {
            $('#title_size,#description_size').text('0');
            $('#combox_content_cat_id a').text($('#op_combox_content_cat_id li a[value=]').text());
            $('#op_combox_content_cat_id li').show();
            if (block_id != '' && block_data['list'][block_id].block_type == 'list') {
                $('#title_size').text(block_data['list'][block_id].setting.title_size);
                $('#description_size').text(block_data['list'][block_id].setting.description_size);
                if (block_data['list'][block_id].setting.cat_ids.length > 0) {
                    $('#op_combox_content_cat_id li a[value!=]').parent('li').hide();
                    $.each($('#op_combox_content_cat_id li a[value!=]'), function (i, r) {
                        for (var i = 0; i < block_data['list'][block_id].setting.cat_ids.length; i++) {
                            if (block_data['list'][block_id].setting.cat_ids[i] == $(r).attr('value')) {
                                $(r).parent('li').show();
                            }
                        }
                    });
                }
            }

        },
        category: function (cat_id) {
            $("#cat_info_id").val(category_data[cat_id]._id);
            $("#cat_info_name").val(category_data[cat_id].cat_name);
            $("#cat_info_url").val(category_data[cat_id].url);
        },
    },
};


//flash图片上传成功后处理
var uploadifySuccess = function (req, res) {
    var return_data = JSON.parse(res);
    if (return_data.statusCode == 200) {
        this.queue.html('<span></span><img src="' + get_thumb_url(return_data.data, this.settings.width, this.settings.height, this.settings.thumb, true) + '" style="max-width:100%; max-height:100%;">')
        $('input[name=' + this.settings.file_post_name + ']').val(return_data.data);
        $(this.movieElement).siblings('div.uploadify-button').addClass('hidden');
        $(this.movieElement).siblings('div.uploadify-button').children('span.uploadify-button-text').text('重新上传');
    } else if (return_data.statusCode == 300) {
        alertMsg.error(return_data.message);
    }
}
var uploadifyQueueComplete = function (queueData) {
    if (queueData.uploadsErrored) {
        alertMsg.error('上传失败！');
    }
}

var reload_lists = function (json) {
    DWZ.ajaxDone(json);
    if (json[DWZ.keys.statusCode] == DWZ.statusCode.ok) {
        $("#pagerForm", navTab.getCurrentPanel()).submit();
        //$('#pagerForm').submit();
        if ("closeCurrent" == json.callbackType) {
            $.pdialog.closeCurrent();
        }
    }
}
//分析URL
var parseURL = function (url) {
    var a = document.createElement('a');
    a.href = url;
    var urlinfo = {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length, i = 0, s;
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue;
                }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
    try {
        urlinfo.file_name = urlinfo.file.match(/(.*)\./)[1];
        urlinfo.file_ext = urlinfo.file.match(/\.(.*)/)[1];
        urlinfo.path_dir = urlinfo.path.match('.*\/')[0];
    } catch (e) {
    }

    return urlinfo;
}
//获取缩略图URL
var get_thumb_url = function (url, width, height, thumb, no_cache) {
    var url_info = parseURL(url);
    if (typeof (width) == 'undefined') {
        width = 0;
    }
    if (typeof (height) == 'undefined') {
        height = 0;
    }
    if (typeof (no_cache) == 'undefined') {
        no_cache = false;
    }
    var newurl = url_info.path_dir + url_info.file_name + '_' + width + 'x' + height;
    if (thumb == true) {
        newurl += '@thumb';
    }
    newurl += '.' + url_info.file_ext;
    if (no_cache == true) {
        newurl += '?' + Math.random()
    }
    return newurl;
}






















































try {
    if (window.console && window.console.log) {
        console.log("请将简历发送至 %c 33303061@qq.com（ 邮件标题请以“姓名-应聘XX职位-来自console”命名）", "color:red");
    }
} catch (e) {
}

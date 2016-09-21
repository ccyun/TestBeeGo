package controllers

import (
	"html/template"
	"strings"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/utils"
)

//Base Admin项目基础控制器
type Base struct {
	beego.Controller
}

//Render 渲染模板
func (c *Base) Render() error {
	if c.TplName == "" {
		controllerName, actionName := c.GetControllerAndAction()
		c.TplName = strings.ToLower(controllerName) + "/" + strings.ToLower(actionName) + "." + c.TplExt
	}
	c.TplName = "admin/views/" + c.TplName
	return c.Controller.Render()
}

//Prepare 参数检测
func (c *Base) Prepare() {

	c.Controller.Prepare()
}

//FormToken 表单令牌
func (c *Base) FormToken() {
	token := string(utils.RandomCreateBytes(64))
	c.SetSession("__formToken__", token)
	c.Data["__formToken__"] = token
	c.Data["__xsrfdata__"] = template.HTML(c.XSRFFormHTML())
}

//success 处理成功后跳转
func (c *Base) success() {
	c.TplName = "public/dispatch_jump." + c.TplExt
	c.Render()
}

//error 错误跳转
func (c *Base) error(message, url string) {
	c.Data["jumpUrl"] = url
	c.Data["waitSecond"] = 3
	c.Data["error"] = message
	c.TplName = "public/dispatch_jump." + c.TplExt
	c.Render()
}

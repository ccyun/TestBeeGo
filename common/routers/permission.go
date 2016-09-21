package routers

import "github.com/astaxie/beego/context"

//CheckAdminLogin 登录检测
var CheckAdminLogin = func(ctx *context.Context) {
	url := "/admin/login"
	if userInfo := ctx.Input.Session("userInfo"); userInfo == nil {
		if ctx.Request.URL.Path != url {
			ctx.Redirect(302, url)
		}
	} else {
		if ctx.Request.URL.Path == url {
			ctx.Redirect(302, "/admin")
		}
	}
}

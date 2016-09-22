package routers

import (
	admin "github.com/ccyun/TestBeeGo/Application/Admin/controllers"

	"github.com/astaxie/beego"
)

func init() {
	//初始化过滤器
	InitFilter()
	//Home

	//Admin
	beego.Router("/admin", &admin.Index{}, "*:Index")
	beego.Router("/admin/login", &admin.User{}, "*:Login")
}

//InitFilter 初始化过滤器
func InitFilter() {
	beego.InsertFilter("/admin/*", beego.BeforeRouter, CheckAdminLogin)
}

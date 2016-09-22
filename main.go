package main

import (
	"github.com/ccyun/TestBeeGo/common/dao"
	_ "github.com/ccyun/TestBeeGo/common/routers"
	"github.com/ccyun/TestBeeGo/common/util"

	"github.com/astaxie/beego"
)

//  初始化main包
func init() {
	//重新载入配置
	beego.LoadAppConfig("ini", "common/conf/app.conf")
	//初始化一些包
	util.Uinit(dao.InitNeo4j)
	//设置其他
	beego.SetStaticPath("/", "static")
}

//入口
func main() {
	beego.Run()
}

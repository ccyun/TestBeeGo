package controllers

import "log"

//User 后台用户管理
type User struct {
	Base
}

//Login 后台登陆
func (c *User) Login() {
	if c.Ctx.Input.Method() == "POST" && c.IsAjax() == true {

		log.Println(c.Ctx.Input)

	} else if c.Ctx.Input.Method() == "GET" {
		c.FormToken()
		c.Render()
	}
}

//Encrypt 登录时密码加密处理
func (c *User) Encrypt() {
	log.Println(c.Ctx.Input)
}

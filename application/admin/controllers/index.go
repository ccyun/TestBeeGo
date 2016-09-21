package controllers

//Index 后台
type Index struct {
	Base
}

//Index 后台首页控制器
func (c *Index) Index() {

	c.Render()
}

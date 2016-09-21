package util

var initFunc []func()

//Uinit 初始化方法
func Uinit(initFunc ...func()) {

	for _, f := range initFunc {
		f()
	}
}

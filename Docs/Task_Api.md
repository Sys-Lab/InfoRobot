CreatTask:
//创建任务
传入参数：
	string TaskContent //任务内容
	int date //日期 0 今天 1 明天 2 即将
	int flag //是否完成  0 否 1 是
	function callback() //回调函数
回调函数：
	"code"：0 参数错误 1 成功
	"message": string //备注信息
	"id": 任务ID

RequireTaskList
//请求任务列表
传入参数:
	int date //日期 0 今天 1 明天 2 即将 3 已完成
回调函数：
	"code": 0 参数错误 1 成功

DeleteTask
//删除任务
传入参数：
	int id //任务ID
回调函数：
	"code": 0 参数错误 1 ID不存在 2 删除成功
	"message": string //备注信息
	


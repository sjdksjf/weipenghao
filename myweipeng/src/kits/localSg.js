// 负责操作localStorage的文件
/*
 *  获取数据：var Str  =localStorage.getItem(key);
 *  添加和追加数据： localStorage.setItem(key,value) ,value 是一个字符串
 *  移除数据 ： localStorage.removeItem(key);
 * */

// 1.0 定义常量key,将来操作的localStorage中的数据都以这个key来作为标识
export const KEY = 'goodsdata';
export var valueObj = {
	goodsid: 0,
	count: 0
};

//实现数据的增加
//value;格式： {goodsid: 87,count: 10}
export function setItem(value) {
	//获取json格式
	var jsonString = localStorage.getItem(KEY);
	jsonString = jsonString || '[]';
	var arr = JSON.parse(jsonString);
	//将value追加进入arr
	arr.push(value);
	//将arr转换成json字符串保存起来
	localStorage.setItem(KEY, JSON.stringify(arr));
}

//获取数据

export function getItem() {
	var jsonString = localStorage.getItem(KEY);
	jsonString = jsonString || '[]';

	return JSON.parse(jsonString);
}

//移除数据
export function remoteItem() {
	
}
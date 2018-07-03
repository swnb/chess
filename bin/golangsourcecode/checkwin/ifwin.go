package checkwin

//规定传入的参数的格式
//比如:
//一个json文件
//[arr,arrP,index,winCount]
//得到map[]结构

//arr表示数据点阵 []byte
//arrP 位置点阵 [][2]unit8 0-255
//pos 点击的位置坐标	[2]unit8 2-255
//index 点击的位置序号 unit16 0-2^16
//pos=arrP[index]
//winCount 输赢数目 unit16 0-2^16

//IfWin function checkout whether the keyboard win or not
func IfWin(arr []string, intArr [][2]int, index, winCount int) [][2]int {
	c := &channel{
		4,
		make(chan bool),
		make(chan [][2]int),
	}
	go colWin(arr, intArr, index, intArr[index], winCount, c)
	go rowWin(arr, intArr, index, intArr[index], winCount, c)
	go rcLeft(arr, intArr, index, intArr[index], winCount, c)
	go rcRight(arr, intArr, index, intArr[index], winCount, c)

	for i := 0; i < c.count; i++ {
		sign := <-c.signalChan
		if sign {
			winArr := <-c.winArrChan
			return winArr
		}
	}
	return nil
}

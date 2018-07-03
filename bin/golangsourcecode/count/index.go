package main

import (
	"checkwin"
	"encoding/json"
	"log"
	"math"
	"os"
)

func makeArrP(size int) [][2]int {
	arr := make([][2]int, size*size)
	var index int
	for i := 0; i < size; i++ {
		for j := 0; j < size; j++ {
			arr[index] = [2]int{i, j}
			index++
		}
	}
	return arr
}

type jsondata struct {
	Arr       []string `json:"arr"`
	WinCount  int      `json:"win_count"`
	CheckSize float64  `json:"check_size"`
	Index     int      `json:"index"`
}

func main() {
	data := jsondata{}
	dataInput := os.Args[1]
	err := json.Unmarshal([]byte(dataInput), &data)
	if err != nil {
		log.Fatal(err)
	}
	//整合数据
	index := data.Index
	winCount := data.WinCount
	checkSize := int(math.Sqrt(data.CheckSize))
	arr := data.Arr
	arrP := makeArrP(checkSize)

	winner := checkwin.IfWin(arr, arrP, index, winCount)

	if winner != nil {
		arrstring, err := json.Marshal(winner)
		if err != nil {
			os.Stderr.WriteString(err.Error())
		}
		os.Stdout.Write(arrstring)
	} else {
		os.Stderr.WriteString("false")
	}
}

# count-down

倒计时

## directive

### CountDownComponent

#### Selector: bc-count-down

| Name                                         | Description                              |
| :------------------------------------------- | :--------------------------------------- |
| @Input() target: Date                        | 未来的时间                               |
| @Input() format: (seconds: number) => string | 用来  格式化时间的函数                   |
| @Input() emitProcessEvent: boolean           | 是否需要 emit process 事件，默认 false   |
| @Output() process: EventEmitter<number>      | 每秒 emit 一次，当前的秒数               |
| @Output() stop: EventEmitter<number>         | 倒计时结束时,emit 一次，带有结束时的秒数 |
| readonly counting: boolean                   | 是否正在倒计时                           |
| readonly currentTimeStr: string              | 当前的时间字符串                         |

## dependency

- angular7

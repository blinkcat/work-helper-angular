# scroller

滚动，支持 mouse 和 touch 。属于基础组件。

## usage

```html
<bc-scroller> <your-content></your-content> </bc-scroller>
```

## directive

### ScrollerComponent

#### Selector: bc-scroller

| Name                                                               | Description                                                       |
| :----------------------------------------------------------------- | :---------------------------------------------------------------- |
| @Input() bouncing: boolean                                         | 是否可以超过边界 ，default true                                   |
| @Input() snapping: boolean                                         | 是否开启 snap 模式，default false。需要配合 snapWidth，snapHeight |
| @Input() animating： boolean                                       | 是否需要缓动效果，default true                                    |
| @Input() scrollingX: boolean                                       | 是否可以沿 x 轴滚动                                               |
| @Input() scrollingY:boolean                                        | 是否可以沿 y 轴滚动                                               |
| @Input() animationDuration: number                                 | 缓动时间，default 250ms                                           |
| @Input() snapWidth: number                                         | snap 模式时，单格的宽度                                           |
| @Input() snapHeight:number                                         | snap 模式时，单格的高度                                           |
| @Output() complete: EventEmitter                                   | 滚动完成时的事件                                                  |
| getPosition(): ScrollerMove\|undefined                             | 返回当前滚动位置                                                  |
| scrollTo(scrollX: number, scrollY: number, animating = false):void | 滚动到给定的 scrollX，scrollY                                     |

## interface

### ScrollerMove

| Name           | Description |
| :------------- | :---------- |
| scrollX:number | x 轴位置    |
| scrollY:number | y 轴位置    |

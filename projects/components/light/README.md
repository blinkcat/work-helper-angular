# light

类似于聚光灯效果。高亮某个元素，并配上提示文字。

## service

### LightService

| Name                                                              | Description      |
| :---------------------------------------------------------------- | :--------------- |
| open(focusElement: HTMLElement, config?: BcLightConfig): LightRef | 高亮一个元素     |
| close(): void                                                     | 关闭当前高亮效果 |

## class

### LightRef

| Name                                                          | Description    |
| :------------------------------------------------------------ | -------------- |
| next(focusElement: HTMLElement, config?: BcLightConfig): void | 高亮下一个元素 |
| close(): void                                                 | 关闭高亮效果   |
| backdropClick(): Observable<MouseEvent>                       | 点击背景时     |
| afterOpened(): Subject<void>                                  | 打开之后       |
| afterClosed(): Observable<void>                               | 关闭之后       |

## interface

### BcLightConfig

| Name                              | Description                            |
| :-------------------------------- | -------------------------------------- |
| padding?: number                  | 高亮时光圈和元素之间的 padding         |
| indicatorShape?: BcLightShape     | 高亮时光圈的形状                       |
| noContextAutoAdjust?: boolean     | 不要自动适配提示文字的位置，默认 false |
| contentText?: string              | 提示文本                               |
| dismissText?: string              | 关闭区域的文本（暂时无用）             |
| customTemplate?: TemplateRef<any> | 提示模板，传文字也可以传模板           |

### BcLightShape

'rect' | 'round' | 'roundedRect'

# flex

[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

## concept

> 采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。  
> ![flex concept](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)  
> 容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做 main start，结束位置叫做 main end；交叉轴的开始位置叫做 cross start，结束位置叫做 cross end。  
> 项目默认沿主轴排列。单个项目占据的主轴空间叫做 main size，占据的交叉轴空间叫做 cross size。

note: **当主轴宽度不够时，则项目设置的宽度无效**

## directive

### FlexComponent

#### Selector: bc-flex

| Name                                      | Description                                                                                    |
| :---------------------------------------- | :--------------------------------------------------------------------------------------------- |
| @Input() direction: BcFlexDirection       | 决定主轴的方向                                                                                 |
| @Input() wrap: BcFlexWrap                 | 默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap 属性定义，如果一条轴线排不下，如何换行 |
| @Input() justify: BcFlexJustify           | 属性定义了项目在主轴上的对齐方式                                                               |
| @Input() align: BcFlexAlign               | 属性定义项目在交叉轴上如何对齐                                                                 |
| @Input() alignContent: BcFlexAlignContent | 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用                             |

### FlexItemDirective

#### Selector: [bcFlexItem],[bc-flex-item]

#### exportAs: bcFlexItem

默认加上了样式 flex:1,保证所有 item 平均分宽度

## enum

```typescript
enum BcFlexDirection {
  row = 'row',
  'row-reverse' = 'row-reverse',
  column = 'column',
  'column-reverse' = 'column-reverse'
}
```

```typescript
enum BcFlexWrap {
  wrap = 'wrap',
  'wrap-reverse' = 'wrap-reverse',
  nowrap = 'nowrap'
}
```

```typescript
enum BcFlexJustify {
  start = 'start',
  end = 'end',
  center = 'center',
  between = 'between',
  around = 'around'
}
```

```typescript
enum BcFlexAlign {
  start = 'start',
  end = 'end',
  center = 'center',
  stretch = 'stretch',
  baseline = 'baseline'
}
```

```typescript
enum BcFlexAlignContent {
  start = 'start',
  end = 'end',
  center = 'center',
  stretch = 'stretch',
  between = 'between',
  around = 'around'
}
```

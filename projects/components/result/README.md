# result

常用的结果页面

## usage

```html
<bc-result></bc-result>
```

## directive

### ResultComponent

#### selector: bc-result

| Name                                                  | Description                 |
| :---------------------------------------------------- | :-------------------------- |
| @Input() icon: string \| TemplateRef<any>             | img url ，或是自定义的模板  |
| @Input() title: string \| TemplateRef<any>            | title 部分                  |
| @Input() description: string \| TemplateRef<any>      | description 部分            |
| @Input() extras: string \| TemplateRef<any>           | extras 部分                 |
| @Input() buttonText: string                           | button 文字                 |
| @Input() buttonColor: 'primary' \| 'accent' \| 'warn' | button 颜色                 |
| @Input() buttonDisabled: boolean                      | button disabled，默认 false |
| @Output() buttonClick: EventEmitter                   | button 点击事件             |

## dependency

- angular 7
- material button

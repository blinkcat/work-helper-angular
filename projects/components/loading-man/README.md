# loading-man

加载

## Directives

### LoadingManComponent

#### Selector: bc-loading-man

properties

| Name                                           | Description                            |
| :--------------------------------------------- | :------------------------------------- |
| @Input() isLoading: boolean                    | 是否在加载中，默认 false               |
| @Input() tip: string                           | loading indicator 下面的提示           |
| @Input() size: 'small' \| 'default' \| 'large' | 默认的 indicator 尺寸，默认 default    |
| @Input() delay: number                         | 延迟开始 loading 效果，默认 0，单位 ms |
| @Input() indicator: TemplateRef<any>           | 自定义的 indicator                     |

## Dependencies

- angular7
- @angular/material/progress-spinner

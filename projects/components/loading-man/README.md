# loading-man

[demo](https://stackblitz.com/edit/angular-loading-man?embed=1&file=src/app/app.component.html&view=preview)

## usage

```html
<cc-loading-man [size]="'small'"> </cc-loading-man>
<cc-loading-man> </cc-loading-man>
<cc-loading-man [size]="'large'"> </cc-loading-man>
```

包裹 component

```html
<cc-loading-man [isLoading]="loadingToggle.checked" [delay]="delay.value" [tip]="tip.value">
  <p>loading-man is so easy to use!</p>
</cc-loading-man>

<br />
<mat-slide-toggle #loadingToggle>isLoading</mat-slide-toggle>
<br />
<label>delay: <input matInput placeholder="delay time ms" value="0" #delay/></label> <br />
<label>tip: <input matInput placeholder="tips" value="" #tip/></label>
```

## Directives

### LoadingMan

#### Selector: cc-loading-man

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

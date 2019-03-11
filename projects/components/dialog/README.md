# dialog

提供常用的模板，简化 material 中 dialog 的使用

## alert

### service

#### BcDialogService

| alert                               |                                                                                             |
| :---------------------------------- | ------------------------------------------------------------------------------------------- |
| 打开一个 alert 弹框                 |
| **parameters**                      |
| title: StringOrTemplateRef \| null  | 字符串或者模板                                                                              |
| message:StringOrTemplateRef \| null | 字符串或者模板                                                                              |
| actions: BcButton[] \| null         |  弹框下方的按钮                                                                             |
| dialogConfig: MatDialogConfig       | [material dialog config](https://material.angular.io/components/dialog/api#MatDialogConfig) |
| **returns**                         |                                                                                             |
| MatDialogRef                        | [MatDialogRef](https://material.angular.io/components/dialog/api#MatDialogRef)              |

### BcButton(interface)

| name                   | description                                              |
| :--------------------- | -------------------------------------------------------- |
| text                   | 字符串或者模板                                           |
| focus?: boolean        | 按钮是否处于 focus 状态，默认 false                      |
| closeOnClick?: boolean | 点击按钮后就关闭弹框，默认 true                          |
| dialogResult?: any     | 通过下方按钮关闭弹框后的返回值，closeOnClick 必须是 true |
| onClick?: function     | 按钮点击时的回调                                         |
| color?: ThemePalette   | 按钮主题，"primary" \| "accent" \| "warn"                |

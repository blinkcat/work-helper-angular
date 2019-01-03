# dialog

## alert

### service

#### BcDialogService

##### methods

| alert                               |                                                                                             |
| :---------------------------------- | ------------------------------------------------------------------------------------------- |
| 打开一个 alert 弹框                 |
| **parameters**                      |
| title: StringOrTemplateRef \| null  | title，字符串或者模板                                                                       |
| message:StringOrTemplateRef \| null | message，字符串或者模板                                                                     |
| actions: ButtonData[] \| null       |  弹框下方的按钮                                                                             |
| dialogConfig: MatDialogConfig       | [material dialog config](https://material.angular.io/components/dialog/api#MatDialogConfig) |
| **returns**                         |                                                                                             |
| MatDialogRef                        | [detail](https://material.angular.io/components/dialog/api#MatDialogRef)                    |

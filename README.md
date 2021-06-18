# text-watermask

A watermask plugin for staic text or dynamic text!

# Example

[Demo Page]()

[More Example Code](https://github.com/jefferyE/text-watermask/tree/master/examples)

# Install

```
import Watermask from '@shaodong/text-watermask';

```

# Usage

```
new Watermask({
  text: '我是水印文字，哈哈~~~', // 必填
  mode: 'image', // 非必填，支持模式：['image', 'html']，默认为`image`，`image`模式使用canvas绘制，相比于`html`模式，清晰度稍微较差，高清模式请传入`html`
});

```

### Options

|  Key  | Type  |  Default  | Description  |
|  ----  | ----  |  ----  | ----  |
| text  | string | '我是水印文字 哈哈' | watermask fill text |
| mode  | string | 'image' | watermask type: ['image', 'html'] |
| wrapper  | HTMLElement | document.body | mount watermask in the container |
| space  | number | 5 | watermask space is used css padding |
| rotate  | number | -45 | watermask rotate deg |
| opacity  | number | 1 | text opacity |
| fontSize  | string | '16px' | text fontSize |
| fontFamily  | string | 'Microsoft YaHei' | text fontFamily |
| color  | string | '#DDDDDD' | text color |
| textAlign  | string | 'center' | text textAlign |
| verticalAlign  | string | 'center' | text verticalAlign |
| onSuccess  | function | - | render success callback |
| onError  | function | - | - |

# Author
[jefferyE](https://github.com/jefferyE)

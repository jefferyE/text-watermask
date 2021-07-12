# text-watermask

A watermask plugin for staic text or dynamic text!

# Example

[More Example Code](https://github.com/jefferyE/text-watermask/tree/master/examples)

## Mode: image
![image](/snapshots/image-watermask.png)

## Mode: html
![html](/snapshots/html-watermask.png)

# Install

```
import Watermask from '@shaodong/text-watermask';

```
# Usage

```
const watermask = new Watermask({
  text: '张三 6688', // 必填
  mode: 'image', // 非必填，支持模式：['image', 'html']，默认为`image`，`image`模式使用canvas绘制，相比于`html`模式，清晰度稍微较差，高清模式请传入`html`
});

console.log(watermask); // 实例属性请参考：Attributes

```
# Options

|  Key  | Type  |  Default  | Description  |
|  ----  | ----  |  ----  | ----  |
| text  | string | 'watermask' | 传入的水印文字 |
| mode  | string | 'image' | 水印的模式: `image` 及 `html`，建议使用 html 模式 |
| wrapper  | HTMLElement | document.body | 自动渲染时 DOM 元素，默认使用 document.body，如传入null，则不会自动挂载，可在 onSucess 回调中拿到最终的结果，即实例属性 data |
| space  | number | 5 | 水印文字间隔，会当做 padding 使用，如果想水印不太密集，可增加 space 值 |
| horizontalSpace  | number | - | 水印文字水平方向间隔，会当做 paddingLeft 和 paddingRight 使用，若不传，则使用 space 值 |
| verticalSpace  | number | - | 水印文字垂直方向间隔，会当做 paddingTop 和 paddingBottom 使用，若不传，则使用 space 值 |
| rotate  | number | -45 | 水印文字旋转角度 |
| opacity  | number | 1 | 水印文字透明度 |
| fontSize  | string | '16px' | 水印文字大小 |
| fontFamily  | string | 'Microsoft YaHei' | 水印文字字体 |
| color  | string | '#DDDDDD' | 水印文字颜色 |
| textAlign  | string | 'center' | 水印文字水平对齐类型 |
| verticalAlign  | string | 'center' | 水印文字垂直对齐类型 |
| onSuccess  | function | - | 成功回调，可拿到最终的结果，即实例属性 data |
| onError  | function | - | - |

# Attributes
|  Key  | Type  | Description  |
|  ----  | ----  | ----  |
| data  | string/HTMLElement | 最终渲染的结果，`html` 模式返回当前的 DOM 元素，`image` 模式则返回生产的 base64 URL，均会在options  onSuccess 回调中返回 |
| el  | HTMLElement | 当前水印文字的 DOM 元素，用于获取相关信息，如宽度、高度等，等同于 textWidth 和 textHeight |
| textWidth  | number | 当前水印文字的真实宽度，包括传入的 space 计算在内 |
| textHeight  | number | 当前水印文字的真实高度，包括传入的 space 计算在内 |
| renderWidth  | number | 当前水印文字的最终渲染宽度，即在页面中占据的宽度，旋转后，渲染宽度会比真实宽度大 |
| renderHeight  | number | 前水印文字的最终渲染高度，即在页面中占据的高度，旋转后，渲染高度会比真实高度大 |
| canvasWidth  | number | canvas 画布的宽度，会根据设备像素比 devicePixelRatio 自动适配，仅`image` 模式返回 |
| canvasHeight  | number | canvas 画布的高度，会根据设备像素比 devicePixelRatio 自动适配，仅`image` 模式返回 |
| cols  | number | 渲染的列数，根据屏幕宽度及 el 宽度自动计算，通过 el 来渲染，仅`html` 模式返回值，`image` 模式返回0 |
| rows  | number | 渲染的行数，根据屏幕高度及 el 高度自动计算，通过 el 来渲染，仅`html` 模式返回值，`image` 模式返回0 |
| settings  | Object | 传入的options值 |

# Author
[jefferyE](https://github.com/jefferyE)

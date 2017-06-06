# bnfer

[中文文档](./README_zh.md)   [document](./README.md)

Parse bnf expressions to a structured json.
- [安装](#%E5%AE%89%E8%A3%85)
- [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
  * [API 快速运行](#api-%E5%BF%AB%E9%80%9F%E8%BF%90%E8%A1%8C)
- [开发](#%E5%BC%80%E5%8F%91)
  * [文件结构](#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84)
  * [运行测试用例](#%E8%BF%90%E8%A1%8C%E6%B5%8B%E8%AF%95%E7%94%A8%E4%BE%8B)
- [许可证](#%E8%AE%B8%E5%8F%AF%E8%AF%81)

## 安装

`npm i bnfer --save` 或者 `npm i bnfer --save-dev`

全局安装, 使用 `npm i bnfer -g`



## 使用方法








### API 快速运行



```js
let bnfer = require('bnfer')
let {parse} = bnfer;
let grammer = parse('EXP := num | EXP + num | EXP - num');
console.log(JSON.stringify(grammer, null, 4));
```

```
输出

    {
        "startSymbol": "EXP",
        "T": [
            "num",
            "+",
            "-"
        ],
        "N": [
            "EXP"
        ],
        "productions": [
            [
                "EXP",
                [
                    "num"
                ]
            ],
            [
                "EXP",
                [
                    "EXP",
                    "+",
                    "num"
                ]
            ],
            [
                "EXP",
                [
                    "EXP",
                    "-",
                    "num"
                ]
            ]
        ]
    }

```


## 开发

### 文件结构

```
.    
│──LICENSE    
│──README.md    
│──index.js    
│──package.json    
│──src    
│   └──index.js    
└──test    
    │──index.js    
    └──math.js     
```


### 运行测试用例

`npm test`

## 许可证

MIT License

Copyright (c) 2017 chenjunyu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

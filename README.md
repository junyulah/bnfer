# bnfer

[中文文档](./README_zh.md)   [document](./README.md)

Parse bnf expressions to a structured json.
- [install](#install)
- [usage](#usage)
  * [API quick run](#api-quick-run)
- [develop](#develop)
  * [file structure](#file-structure)
  * [run tests](#run-tests)
- [license](#license)

## install

`npm i bnfer --save` or `npm i bnfer --save-dev`

Install on global, using `npm i bnfer -g`



## usage








### API quick run



```js
let bnfer = require('bnfer')
let {parse} = bnfer;
let grammer = parse('EXP := num | EXP + num | EXP - num');
console.log(JSON.stringify(grammer, null, 4));
```

```
output

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


## develop

### file structure

```
.    
│──LICENSE    
│──README.md    
│──README_zh.md    
│──TODO.md    
│──coverage    
│   │──coverage.json    
│   │──lcov-report    
│   │   │──base.css    
│   │   │──bnfer    
│   │   │   │──index.html    
│   │   │   │──index.js.html    
│   │   │   └──src    
│   │   │       │──index.html    
│   │   │       └──index.js.html    
│   │   │──index.html    
│   │   │──prettify.css    
│   │   │──prettify.js    
│   │   │──sort-arrow-sprite.png    
│   │   └──sorter.js    
│   └──lcov.info    
│──index.js    
│──package.json    
│──src    
│   └──index.js    
└──test    
    │──index.js    
    └──math.js     
```


### run tests

`npm test`

## license

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

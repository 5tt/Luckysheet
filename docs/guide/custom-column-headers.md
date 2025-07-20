# 自定义列标题使用指南

Luckysheet现在支持通过配置自定义列标题，将默认的A、B、C、D等字母替换为指定的名称。

## 使用方法

### 1. 数组格式配置

使用数组格式为前N列设置自定义标题：

```javascript
luckysheet.create({
    container: 'luckysheet',
    customColumnHeaders: ['编号', '姓名', '年龄', '性别', '部门', '职位', '工资', '入职日期']
});
```

### 2. 对象格式配置

使用对象格式可以灵活地为任意列设置自定义标题：

```javascript
luckysheet.create({
    container: 'luckysheet',
    customColumnHeaders: {
        0: '产品ID',
        1: '产品名称',
        2: '价格',
        3: '库存',
        4: '类别',
        5: '供应商',
        6: '描述',
        7: '创建日期'
    }
});
```

### 3. 混合使用

只设置部分列的标题，其余列保持默认字母：

```javascript
luckysheet.create({
    container: 'luckysheet',
    customColumnHeaders: {
        0: '自定义A',
        1: '自定义B',
        2: '自定义C'
        // 其余列将使用默认的D, E, F...
    }
});
```

## 配置参数说明

| 参数名 | 类型 | 描述 |
|--------|------|------|
| customColumnHeaders | array/object/null | 自定义列标题配置，可以是数组或对象格式 |

### 数组格式
- 类型: `string[]`
- 描述: 按顺序为列设置标题，数组索引对应列索引
- 示例: `['编号', '姓名', '年龄']`

### 对象格式
- 类型: `{[key: number]: string}`
- 描述: 使用键值对形式，键为列索引，值为自定义标题
- 示例: `{0: '编号', 1: '姓名', 2: '年龄'}`

## 注意事项

1. **兼容性**: 此功能完全兼容现有的API和公式系统
2. **性能**: 对性能影响极小，只在初始化时生效
3. **动态更新**: 目前不支持动态更新列标题，需要在创建时设置
4. **国际化**: 自定义标题不会自动翻译，需要手动设置多语言版本

## 示例代码

### 完整示例

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Luckysheet自定义列标题示例</title>
    <link rel='stylesheet' href='./dist/luckysheet.css' />
    <script src="./dist/luckysheet.umd.js"></script>
</head>
<body>
    <div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"></div>

    <script>
        luckysheet.create({
            container: 'luckysheet',
            showtoolbar: true,
            showinfobar: false,
            showsheetbar: false,
            customColumnHeaders: ['员工编号', '姓名', '部门', '职位', '工资', '入职日期', '电话', '邮箱']
        });
    </script>
</body>
</html>
```

## 与其他功能的兼容性

- **公式支持**: 公式中仍然使用A1表示法，不受自定义标题影响
- **API支持**: 所有现有API正常工作，列索引保持不变
- **导入导出**: 支持Excel导入导出，自定义标题会正常显示
- **打印**: 打印时也会显示自定义列标题

## 技术实现

此功能通过修改`chatatABC`函数实现，该函数负责将数字列索引转换为字母表示。当设置了`customColumnHeaders`配置时，函数会优先返回自定义标题。
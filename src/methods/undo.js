import Store from '../store';
import { getSheetIndex } from './get';

/**
 * 创建撤销记录的通用方法
 * @param {String} type 操作类型，如 "resize", "format", "edit" 等
 * @param {String} ctrlType 具体控制类型，如 "resizeR", "resizeC", "cellEdit" 等
 * @param {Function} operation 要执行的操作函数，接收参数并执行具体逻辑
 * @param {Object} params 传递给操作函数的参数
 * @param {Object} options 可选配置
 * @param {Number} options.sheetIndex 工作表索引，默认为当前工作表
 * @param {Boolean} options.saveImages 是否保存图片状态，默认为true
 * @returns {*} 返回操作函数的执行结果
 */
export function createUndoRecord(type, ctrlType, operation, params = {}, options = {}) {
    const {
        sheetIndex = Store.currentSheetIndex,
        saveImages = true
    } = options;

    // 1. 保存当前状态
    let currentConfig = $.extend(true, {}, Store.config);
    let currentData = $.extend(true, [], Store.flowdata);
    let currentImages = saveImages ? 
        $.extend(true, [], Store.luckysheetfile[getSheetIndex(sheetIndex)].images) : 
        null;

    // 2. 执行操作逻辑
    let result;
    try {
        result = operation(params);
    } catch (error) {
        console.error('Operation failed:', error);
        throw error;
    }

    // 3. 创建撤销记录
    if (Store.clearjfundo) {
        let undoObject = {
            type: type,
            ctrlType: ctrlType,
            sheetIndex: sheetIndex,
            config: currentConfig,        // 原始配置
            curconfig: $.extend(true, {}, Store.config), // 新配置
            data: currentData,           // 原始数据
            curdata: $.extend(true, [], Store.flowdata)  // 新数据
        };

        // 如果需要保存图片状态
        if (saveImages && currentImages) {
            undoObject.images = currentImages;
            undoObject.curImages = $.extend(true, [], Store.luckysheetfile[getSheetIndex(sheetIndex)].images);
        }

        Store.jfredo.push(undoObject);
        Store.jfundo.length = 0; // 清空重做栈
    }

    return result;
}

/**
 * 创建调整行高的撤销记录
 * @param {Function} resizeOperation 调整行高的具体操作函数
 * @param {Object} params 操作参数
 * @param {Object} options 可选配置
 * @returns {*} 返回操作函数的执行结果
 */
export function createResizeRowUndoRecord(resizeOperation, params = {}, options = {}) {
    return createUndoRecord("resize", "resizeR", resizeOperation, params, options);
}

/**
 * 创建调整列宽的撤销记录
 * @param {Function} resizeOperation 调整列宽的具体操作函数
 * @param {Object} params 操作参数
 * @param {Object} options 可选配置
 * @returns {*} 返回操作函数的执行结果
 */
export function createResizeColumnUndoRecord(resizeOperation, params = {}, options = {}) {
    return createUndoRecord("resize", "resizeC", resizeOperation, params, options);
}

/**
 * 创建单元格编辑的撤销记录
 * @param {Function} editOperation 编辑操作函数
 * @param {Object} params 操作参数
 * @param {Object} options 可选配置
 * @returns {*} 返回操作函数的执行结果
 */
export function createCellEditUndoRecord(editOperation, params = {}, options = {}) {
    return createUndoRecord("cellEdit", "cellEdit", editOperation, params, options);
}

/**
 * 创建格式化的撤销记录
 * @param {Function} formatOperation 格式化操作函数
 * @param {Object} params 操作参数
 * @param {Object} options 可选配置
 * @returns {*} 返回操作函数的执行结果
 */
export function createFormatUndoRecord(formatOperation, params = {}, options = {}) {
    return createUndoRecord("format", "format", formatOperation, params, options);
} 
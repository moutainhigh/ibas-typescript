﻿/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace sap {
    namespace extension {
        namespace f {
            /**
             * 卡片
             */
            class Card extends sap.f.Card {
                /**
                 * 设置属性值
                 * @param sPropertyName 属性名称
                 * @param oValue 值
                 * @param bSuppressInvalidate 立即
                 */
                protected setProperty(sPropertyName: string, oValue: any, bSuppressInvalidate?: boolean): this;
            }

            namespace cards {
                /** 工具条头 */
                class ToolbarHeader extends sap.f.cards.Header {
                    /** 设置工具条 */
                    setToolbar(value: sap.m.Toolbar): this;
                    /** 获取工具条 */
                    getToolbar(): sap.m.Toolbar;
                }
            }
        }
    }
}

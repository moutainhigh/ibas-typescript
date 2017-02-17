/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    ICriteria
} from "../../../ibas/bobas/index";
import { IBOListView } from "./BOApplications.d";
import { BOApplication } from "./BOApplication";


/**
 * 业务对象列表应用
 */
export abstract class BOListApplication<T extends IBOListView> extends BOApplication<T> {

    /** 注册视图，重载需要回掉此方法 */
    protected registerView(): void {
        this.view.destroyEvent = this.destroy;
        this.view.fetchDataEvent = this.fetchData;
    }
    /** 查询数据 */
    protected abstract fetchData(criteria: ICriteria): void;

}

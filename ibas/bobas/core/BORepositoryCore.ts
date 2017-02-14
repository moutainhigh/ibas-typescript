﻿/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

/// <reference path="./RepositoryCore.d.ts" />
import {
    object, IOperationResult, ICriteria
} from "../data/Data";
import { IBusinessObject } from "./BusinessObjectCore.d";
import { IBORemoteRepository, RemoteListener, IDataConverter } from "./RepositoryCore.d";
import { i18n } from "../i18n/I18N";

/**
 * 业务对象的远程仓库
 */
export abstract class BORemoteRepository implements IBORemoteRepository {

    /**
     * 访问口令
     */
    private _token: string;

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }
    /**
     * 远程服务地址
     */
    private _address: string;

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }

    /**
     * 查询数据
     * @param boName 业务对象名称
     * @param criteria 查询
     * @param callBack 完成后回调方法
     */
    fetch<P>(boName: string, criteria: ICriteria, callBack: Function): void {
        let method: string = "fetch" + boName;
        let listener: RemoteListener = {
            boName: boName,
            method: method,
            onCompleted(opRslt: IOperationResult<any>): void {
                if (!object.isNull(callBack)) {
                    callBack.call(callBack, opRslt);
                }
            }
        };
        let converter: IDataConverter = this.createDataConverter();
        if (object.isNull(converter)) {
            throw new Error(i18n.prop("msg_invalid_data_converter"));
        }
        this.callRemoteMethod(method, converter.convert(criteria), listener);
    }

    /**
     * 保存数据
     * @param boName 业务对象名称
     * @param bo 业务对象
     * @param callBack 完成后回调方法
     */
    save<P>(boName: string, bo: IBusinessObject, callBack: Function): void {
        let method: string = "save" + boName;
        let listener: RemoteListener = {
            boName: boName,
            method: method,
            onCompleted(opRslt: IOperationResult<any>): void {
                if (!object.isNull(callBack)) {
                    callBack.call(callBack, opRslt);
                }
            }
        };
        let converter: IDataConverter = this.createDataConverter();
        if (object.isNull(converter)) {
            throw new Error(i18n.prop("msg_invalid_data_converter"));
        }
        this.callRemoteMethod(method, converter.convert(bo), listener);
    }

    /**
     * 调用远程方法
     */
    abstract callRemoteMethod(method: string, data: any, listener: RemoteListener): void;
    /**
     * 创建数据转换者
     */
    protected abstract createDataConverter(): IDataConverter;
}

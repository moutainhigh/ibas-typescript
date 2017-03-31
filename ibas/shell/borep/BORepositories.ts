﻿/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "../../../ibas/index";
import { DataConverter4Shell, DataConverter4Offline } from "./DataConverters";
import * as bo from "./bo/Systems";


/**
 * 业务仓库-壳-远程
 */
export class BORepositoryShell extends ibas.BORepositoryApplication implements ibas.IBORepositorySystem {

    private converter: DataConverter4Shell;
    /**
     * 创建此模块的后端与前端数据的转换者
     */
    protected createDataConverter(): ibas.IDataConverter {
        if (ibas.object.isNull(this.converter)) {
            this.converter = new DataConverter4Shell();
        }
        return this.converter;
    }
	/**
	 * 用户登录
	 * @param listener 登录监听者
	 */
    connect(listener: ibas.ConnectCaller): void {
        throw new Error("unrealized method.");
    }

	/**
	 * 查询用户模块
	 * @param listener 用户检索监听者
	 */
    fetchUserModules(listener: ibas.UserMethodsCaller<ibas.IUserModule>): void {
        throw new Error("unrealized method.");
    }

	/**
	 * 查询用户角色权限
	 * @param listener 用户检索监听者
	 */
    fetchUserPrivileges(listener: ibas.UserMethodsCaller<ibas.IUserPrivilege>): void {
        throw new Error("unrealized method.");
    }

    /**
     * 查询用户查询
     * @param caller 监听者
     */
    fetchUserQueries(caller: ibas.UserQueriesCaller): void {
        throw new Error("unrealized method.");
    }

	/**
	 * 保存用户查询
	 * @param caller 监听者
	 */
    saveUserQuery(caller: ibas.SaveCaller<ibas.IUserQuery>): void {
        throw new Error("unrealized method.");
    }

	/**
	 * 业务对象信息查询
	 * @param caller 监听者
	 */
    fetchBOInfos(caller: ibas.BOInfoCaller): void {
        throw new Error("unrealized method.");
    }
}

/**
 * 业务仓库应用
 */
export class BORepositoryShellOffLine extends BORepositoryShell {

    /** 获取离线配置 */
    private fetchSettings(caller: ibas.MethodCaller): void {
        let index: number = document.location.href.toLowerCase().indexOf(".html");
        if (index > 0) {
            this.address = ibas.url.normalize(document.location.href.substring(0, document.location.href.lastIndexOf("/")));
        } else {
            this.address = ibas.url.normalize(document.location.href);
        }
        let method: string = "config.json";
        let remotecaller: ibas.MethodCaller = {
            onCompleted(settings: any): void {
                if (!ibas.object.isNull(caller.onCompleted)) {
                    let offlineSettings: any = null;
                    if (!ibas.object.isNull(settings) && !ibas.object.isNull(settings.offlineSettings)) {
                        offlineSettings = settings.offlineSettings;
                    }
                    caller.onCompleted.call(caller, offlineSettings);
                }
            }
        };
        this.callRemoteMethod(method, null, remotecaller);
    }
    private offlineConverter: DataConverter4Offline;
    /**
     * 创建此模块的后端与前端数据的转换者
     */
    protected createDataConverter(): ibas.IDataConverter {
        if (ibas.object.isNull(this.offlineConverter)) {
            this.offlineConverter = new DataConverter4Offline();
        }
        return this.offlineConverter;
    }

	/**
	 * 用户登录
	 * @param caller 登录者
	 */
    connect(caller: ibas.ConnectCaller): void {
        this.fetchSettings({
            onCompleted(settings: any): void {
                let opRslt = new ibas.OperationResult();
                opRslt.resultCode = -1;
                opRslt.message = ibas.i18n.prop("sys_shell_user_and_password_not_match");
                if (!ibas.object.isNull(settings)
                    && !ibas.object.isNull(settings.users)
                    && Array.isArray(settings.users)) {
                    for (let item of settings.users) {
                        if (item.user === caller.user
                            && item.password === caller.password) {
                            opRslt.resultCode = 0;
                            opRslt.message = "";
                            let user: bo.User = new bo.User();
                            user.code = item.user;
                            user.name = item.name;
                            opRslt.resultObjects.add(user);
                            break;
                        }
                    }
                }
                caller.onCompleted.call(ibas.object.isNull(caller.caller) ? caller : caller.caller, opRslt);
            }
        });
    }

	/**
	 * 查询用户模块
	 * @param caller 用户检索者
	 */
    fetchUserModules(caller: ibas.UserMethodsCaller<ibas.IUserModule>): void {
        this.fetchSettings({
            onCompleted(settings: any): void {
                let opRslt = new ibas.OperationResult();
                if (!ibas.object.isNull(settings)
                    && !ibas.object.isNull(settings.modules)
                    && Array.isArray(settings.modules)) {
                    for (let item of settings.modules) {
                        let module = new bo.UserModule();
                        module.id = item.id;
                        module.name = item.name;
                        module.category = item.category;
                        module.address = item.address;
                        opRslt.resultObjects.add(module);
                    }
                }
                caller.onCompleted.call(ibas.object.isNull(caller.caller) ? caller : caller.caller, opRslt);
            }
        });
    }

	/**
	 * 查询用户角色权限
	 * @param caller 用户检索者
	 */
    fetchUserPrivileges(caller: ibas.UserMethodsCaller<ibas.IUserPrivilege>): void {
        this.fetchSettings({
            onCompleted(settings: any): void {
                let opRslt = new ibas.OperationResult();
                if (!ibas.object.isNull(settings)
                    && !ibas.object.isNull(settings.privileges)
                    && Array.isArray(settings.privileges)) {
                    for (let item of settings.privileges) {
                        let privilege = new bo.UserPrivilege();
                        privilege.source = ibas.enums.valueOf(ibas.emPrivilegeSource, item.source);
                        privilege.target = item.target;
                        privilege.value = ibas.enums.valueOf(ibas.emAuthoriseType, item.value);
                        opRslt.resultObjects.add(privilege);
                    }
                }
                caller.onCompleted.call(ibas.object.isNull(caller.caller) ? caller : caller.caller, opRslt);
            }
        });
    }
    /**
     * 查询用户查询
     * @param caller 监听者
     */
    fetchUserQueries(caller: ibas.UserQueriesCaller): void {
        let opRslt = new ibas.OperationResult();
        caller.onCompleted.call(ibas.object.isNull(caller.caller) ? caller : caller.caller, opRslt);
    }
	/**
	 * 保存用户查询
	 * @param caller 监听者
	 */
    saveUserQuery(caller: ibas.SaveCaller<ibas.IUserQuery>): void {
        let opRslt = new ibas.OperationResult();
        caller.onCompleted.call(ibas.object.isNull(caller.caller) ? caller : caller.caller, opRslt);
    }
	/**
	 * 业务对象信息查询
	 * @param caller 监听者
	 */
    fetchBOInfos(caller: ibas.BOInfoCaller): void {
        let opRslt = new ibas.OperationResult();
        caller.onCompleted.call(ibas.object.isNull(caller.caller) ? caller : caller.caller, opRslt);
    }
}
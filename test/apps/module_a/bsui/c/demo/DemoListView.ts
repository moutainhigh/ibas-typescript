/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

/// <reference path="../../../../../../openui5/typings/index.d.ts" />
import {
    BOListView, i18n, emDocumentStatus
} from "../../../../../../ibas/bsbas/index";
import { IDemoListView } from "../../../bsapp/demo/index";

/**
 * 视图-demo
 */
export class DemoListView extends BOListView implements IDemoListView {

    /** 编辑数据，参数：目标数据 */
    editDataEvent: Function;
    /** 绘制视图 */
    darw(): any {
        let that = this;
        let form = new sap.ui.layout.form.SimpleForm("");
        form.setToolbar(new sap.m.Toolbar("", {
            content: [
                new sap.m.Button("", {
                    text: i18n.prop("sys_shell_ui_data_new"),
                    type: sap.m.ButtonType.Transparent,
                    icon: "sap-icon://create",
                    press: function (): void {
                        that.fireViewEvents(that.newDataEvent);
                    }
                }),
                new sap.m.Button("", {
                    text: i18n.prop("sys_shell_ui_data_view"),
                    type: sap.m.ButtonType.Transparent,
                    icon: "sap-icon://display",
                    press: function (): void {
                        that.fireViewEvents(that.viewDataEvent);
                    }
                }),
                new sap.m.Button("", {
                    text: i18n.prop("sys_shell_ui_data_edit"),
                    type: sap.m.ButtonType.Transparent,
                    icon: "sap-icon://edit",
                    press: function (): void {
                        that.fireViewEvents(that.editDataEvent);
                    }
                })
            ]
        }));
        this.table = new sap.m.Table("", {
            fixedLayout: true,
            growingScrollToLoad: true,
            columns: [
                new sap.m.Column({
                    header: new sap.m.Text("", {
                        text: i18n.prop("bo_salesorder_docentry")
                    })
                }),
                new sap.m.Column({
                    header: new sap.m.Text("", {
                        text: i18n.prop("bo_salesorder_customer")
                    })
                }),
                new sap.m.Column({
                    header: new sap.m.Text("", {
                        text: i18n.prop("bo_salesorder_documentstatus")
                    })
                }),
                new sap.m.Column({
                    header: new sap.m.Text("", {
                        text: i18n.prop("bo_salesorder_canceled")
                    })
                })
            ],
            items: {
                path: "/",
                template: new sap.m.ColumnListItem("", {
                    cells: [
                        new sap.m.Text("", {
                            text: "{docEntry}"
                        }),
                        new sap.m.Text("", {
                            text: "{customer}"
                        }),
                        new sap.m.Text("", {
                            text: "{documentStatus}"
                        }),
                        new sap.m.Text("", {
                            text: "{canceled}"
                        })
                    ]
                })
            }
        });
        form.addContent(this.table);
        this.id = form.getId();
        return form;
    }
    private table: sap.m.Table;
    /** 显示数据 */
    showData(datas: any): void {
        this.table.setModel(new sap.ui.model.json.JSONModel(datas));
    }

}
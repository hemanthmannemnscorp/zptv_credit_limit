sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/Dialog",
	"sap/m/DialogType",
	"sap/ui/core/ValueState",
	"sap/m/Button",
	"sap/m/ButtonType",
	"sap/m/Label",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/Text",
	"sap/m/HBox"
], function (Controller, History, Dialog, DialogType, ValueState, Button, ButtonType, Label, MessageBox, MessageToast, Text, HBox) {
	"use strict";

	return Controller.extend("com.pcard.zptv_credit_approval.controller.ApprovalDetail", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("ApprovalDetail").attachPatternMatched(this._onObjectMatched, this);

		},
		_onObjectMatched: function (oEvent) {
			var pernr = oEvent.getParameter("arguments").pernr;
			var card = oEvent.getParameter("arguments").card;
			if (card === "null") {
				card = "";
			}
			var oModel = this.getView().getModel("pcardListModel");
			var oDetailModel = this.getView().getModel("oDetailModel");
			oModel.read("/LimitRequestSet(Pernr='" + pernr + "',CardNo='" + card + "')", {
				success: function (oData) {
					oDetailModel.setData(oData);

				}
			})

		},
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("ApprovalHome", true);
			window.history.go(0);

		},
		onFilesSubmitReq: function () {

			var denyind = false;
			// var finalData = new Array([val]);
			var collectData = this.getView().getModel("oDetailModel").getData();
			this._oData = this.getView().getModel("oDetailModel").getData();
			if (collectData.CrStatus == false) {
				var AprcrNotes = collectData.AprCrnote;
				if (AprcrNotes == "") {
					denyind = true;
					if (!this.oErrorMessageDialog) {
						this.oErrorMessageDialog = new Dialog({
							type: DialogType.Message,
							title: "Error",
							state: ValueState.Error,
							content: new Text({
								text: "Please add Reason for Denial."
							}),
							beginButton: new Button({
								type: ButtonType.Emphasized,
								text: "OK",
								press: function () {
									this.oErrorMessageDialog.close();
								}.bind(this)
							})
						});
					}
					this.oErrorMessageDialog.open();
				}
			}

			if (collectData.TrStatus == false) {
				var AprTrNotes = collectData.AprTrnote;
				if (AprTrNotes == "") {
					denyind = true;
					if (!this.oErrorMessageDialog) {
						this.oErrorMessageDialog = new Dialog({
							type: DialogType.Message,
							title: "Error",
							state: ValueState.Error,
							content: new Text({
								text: "Please add Reason for Denial."
							}),
							beginButton: new Button({
								type: ButtonType.Emphasized,
								text: "OK",
								press: function () {
									this.oErrorMessageDialog.close();
								}.bind(this)
							})
						});
					}
					this.oErrorMessageDialog.open();
				}
			}

			///post data 
			if (denyind == false) {
				var oData = this._oData;
				var oPostJSONItem = [];

				if (oData.Pernr !== "") {

					var oDate = new Date();
					// var oTime = "PT" + oDate.getHours() + "H" + oDate.getMinutes() + "M" + oDate.getSeconds() + "S";
					var oPostJSONLocal = {
						"Pernr": oData.Pernr,
						"CardNo": oData.CardNo,
						"TrType": oData.TrType,
						"CrLimit": oData.CrLimit,
						"TrLimit": oData.TrLimit,
						"TrDate": oDate,
						"RepMgrId": oData.RepMgrId,
						"RepMgr": oData.RepMgr,
						"Nachn": oData.Nachn,
						"Vorna": oData.Vorna,
						"Addr1": oData.Addr1,
						"Addr2": oData.Addr2,
						"City": oData.City,
						"State": oData.State,
						"Zcode": oData.Zcode,
						"Country": oData.Country,
						"Wphone": oData.Wphone,
						"Email": oData.Email,
						"Appr": oData.Appr,
						"CrReason": oData.CrReason,
						"TrReason": oData.TrReason,
						"Maxcred": oData.Maxcred,
						"Maxtrans": oData.Maxtrans,
						"CrStatus": oData.CrStatus,
						"TrStatus": oData.TrStatus,
						"AprCrnote": oData.AprCrnote,
						"AprTrnote": oData.AprTrnote,
						"Rcode": oData.Rcode

					};
					oPostJSONItem.push(oPostJSONLocal);

					var oPostJSON = {
						"Pernr": "00106072",
						"CardNo": "7267289287628298",
						"TrType": "DAC",
						"CrLimit": "00250001",
						"TrLimit": "00002000",
						"TrDate": "/Date(1624579200000)/",
						"RepMgrId": "lxe01",
						"RepMgr": "",
						"Nachn": "Jordan",
						"Vorna": "Randy",
						"Addr1": "829 86TH PL S",
						"Addr2": "",
						"City": "BIRMINGHAM",
						"State": "AL",
						"Zcode": "352063549",
						"Country": "US",
						"Wphone": "2053056842",
						"Email": "",
						"Appr": "X",
						"CrReason": "sadfadsf",
						"TrReason": "",
						"Maxcred": "00005000",
						"Maxtrans": "00008000",
						"CrStatus": false,
						"TrStatus": false,
						"AprCrnote": "",
						"AprTrnote": "",
						"Rcode":"",
						"ReqToPostNav": oPostJSONItem

					};
					var oPostModel = this.getView().getModel("pcardListModel"); //pcardListModel pCardDetailModel
					var that = this;
					var oGlobalBusyDialog = new sap.m.BusyDialog();
					oGlobalBusyDialog.open();
					oPostModel.create("/LimitRequestSet", oPostJSON, {
						success: function (oData, oResponse) {
							oGlobalBusyDialog.close();
							MessageBox.success("Successfully Submitted", {
								onClose: function (sAction) {
									var oRouter1 = sap.ui.core.UIComponent.getRouterFor(that);
									oRouter1.navTo("ApprovalHome", true);
									window.history.go(0);
								}
							});
						},
						error: function (oData, oResponse) {
							oGlobalBusyDialog.close();
							MessageBox.error("Please try again later!!", {
								onClose: function (sAction) {
									var oRouterClose = sap.ui.core.UIComponent.getRouterFor(that);
									oRouterClose.navTo("ApprovalHome", true);
									window.history.go(0);
								}
							});
						}
					});
				} else {
					//code for message here 
					alert("No changes made");
				}

				//back to view1

			}
		},
		onFilesCancelReq: function () {
			var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter1.navTo("ApprovalHome", true);
			window.history.go(0);
		}

	});
});
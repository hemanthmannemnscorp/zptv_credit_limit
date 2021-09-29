sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.pcard.zptv_credit_approval.controller.ApprovalHome", {
		onInit: function () {
			this.oLoadTable();
		},
		oLoadTable:function(){
		
			var oTable = this.getView().byId("idFileApprovalTable");
			var oModel = this.getView().getModel("pcardListModel");
			// sap.ui.getCore().AppContext = new Object();
			// sap.ui.getCore().AppContext._saveArray=[];
			var oJSONModel = this.getView().getModel("oFileMainModelJSON");
			// oJSONModel.setProperty("/oFlag", true); 
			// var oSaveModdel = this.getView().getModel("saveArrayModel");
			// oSaveModdel.setData(sap.ui.getCore().AppContext._saveArray);
			oModel.read("/LimitRequestSet", {
				success: function (oData) {
					var data = oData.results;
					oJSONModel.setData(data);
					oTable.setModel(oJSONModel);
				}
			})
			
		},
		onNextPress: function (oEvent) {

			var oItem = oEvent.getSource();
			var sPath = oItem.getBindingContext().getPath();
			var oTable = this.getView().byId("idFileApprovalTable");
			var modelData = oTable.getModel();
			var data = modelData.getProperty(sPath);
			// var oModelDetail = this.getView().getModel("pCardDetailModel");
			// oModelDetail.setData(data);
			var oPernr = data.Pernr;
			var oCardNo = data.CardNo;
			if(oCardNo === ""){
				oCardNo = "null";
			}
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("ApprovalDetail", {
				pernr: oPernr,
				card: oCardNo
			});

		}
		
	});
});
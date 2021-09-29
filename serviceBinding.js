function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZPTV_PCARD_LIMIT_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}
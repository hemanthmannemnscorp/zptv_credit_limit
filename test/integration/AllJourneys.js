/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"com/pcard/zptv_credit_approval/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"com/pcard/zptv_credit_approval/test/integration/pages/ApprovalHome",
	"com/pcard/zptv_credit_approval/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "com.pcard.zptv_credit_approval.view.",
		autoWait: true
	});
});
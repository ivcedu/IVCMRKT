// print/graphic parameters ////////////////////////////////////////////////
var objPre_Print_Param = (function() {
    var PrtDateNeeded = "";
    var ckbPrtAd = false;
    var ckbPrtBrochure = false;
    var ckbPrtBanner = false;
    var ckbPrtFlyer = false;
    var ckbPrtCertificate = false;
    var ckbPrtPostcard = false;
    var ckbPrtPoster = false;
    var ckbPrtProgram = false;
    var ckbPrtOther = false;
    var ckbPrtWebGraphic = false;
    var PrintAdd_Size = "";
    var PrintBrochureQty = "";
    var PrintBannerQty = "";
    var PrintFlyerQty = "";
    var PrintCertificateQty = "";
    var PrintPostcardSize = "";
    var PrintPostcardQty = "";
    var PrintPoster_ckb_11_17 = false;
    var PrintPoster_Qty_11_17 = "";
    var PrintPoster_ckb_22_28 = false;
    var PrintPoster_Qty_22_28 = "";
    var PrintPoster_ckb_other = false;
    var PrintPoster_Qty_other = "";
    var PrintPoster_Size_other = "";
    var PrintProgramQty = "";
    var PrintOtherDescrip = "";
    var PrintWebGraphic_web_graphic = "";
    var PrintWebGraphic_Dimension = "";
    
    //////////////////////////////////////////////////////////////////////////////////////////
    return {
        // getter
        get_PrtDateNeeded: function() {
            return PrtDateNeeded;
        },
        get_ckbPrtAd: function() {
            return ckbPrtAd;
        },
        get_ckbPrtBrochure: function() {
            return ckbPrtBrochure;
        },
        get_ckbPrtBanner: function() {
            return ckbPrtBanner;
        },
        get_ckbPrtFlyer: function() {
            return ckbPrtFlyer;
        },
        get_ckbPrtCertificate: function() {
            return ckbPrtCertificate;
        },
        get_ckbPrtPostcard: function() {
            return ckbPrtPostcard;
        },
        get_ckbPrtPoster: function() {
            return ckbPrtPoster;
        },
        get_ckbPrtProgram: function() {
            return ckbPrtProgram;
        },
        get_ckbPrtOther: function() {
            return ckbPrtOther;
        },
        get_ckbPrtWebGraphic: function() {
            return ckbPrtWebGraphic;
        },
        get_PrintAdd_Size: function() {
            return PrintAdd_Size;
        },
        get_PrintBrochureQty: function() {
            return PrintBrochureQty;
        },
        get_PrintBannerQty: function() {
            return PrintBannerQty;
        },
        get_PrintFlyerQty: function() {
            return PrintFlyerQty;
        },
        get_PrintCertificateQty: function() {
            return PrintCertificateQty;
        },
        get_PrintPostcardSize: function() {
            return PrintPostcardSize;
        },
        get_PrintPostcardQty: function() {
            return PrintPostcardQty;
        },
        get_PrintPoster_ckb_11_17: function() {
            return PrintPoster_ckb_11_17;
        },
        get_PrintPoster_Qty_11_17: function() {
            return PrintPoster_Qty_11_17;
        },
        get_PrintPoster_ckb_22_28: function() {
            return PrintPoster_ckb_22_28;
        },
        get_PrintPoster_Qty_22_28: function() {
            return PrintPoster_Qty_22_28;
        },
        get_PrintPoster_ckb_other: function() {
            return PrintPoster_ckb_other;
        },
        get_PrintPoster_Qty_other: function() {
            return PrintPoster_Qty_other;
        },
        get_PrintPoster_Size_other: function() {
            return PrintPoster_Size_other;
        },
        get_PrintProgramQty: function() {
            return PrintProgramQty;
        },
        get_PrintOtherDescrip: function() {
            return PrintOtherDescrip;
        },
        get_PrintWebGraphic_web_graphic: function() {
            return PrintWebGraphic_web_graphic;
        },
        get_PrintWebGraphic_Dimension: function() {
            return PrintWebGraphic_Dimension;
        },
        // setter
        set_PrtDateNeeded: function(value) {
            return PrtDateNeeded = value;
        },
        set_ckbPrtAd: function(value) {
            return ckbPrtAd = value;
        },
        set_ckbPrtBrochure: function(value) {
            return ckbPrtBrochure = value;
        },
        set_ckbPrtBanner: function(value) {
            return ckbPrtBanner = value;
        },
        set_ckbPrtFlyer: function(value) {
            return ckbPrtFlyer = value;
        },
        set_ckbPrtCertificate: function(value) {
            return ckbPrtCertificate = value;
        },
        set_ckbPrtPostcard: function(value) {
            return ckbPrtPostcard = value;
        },
        set_ckbPrtPoster: function(value) {
            return ckbPrtPoster = value;
        },
        set_ckbPrtProgram: function(value) {
            return ckbPrtProgram = value;
        },
        set_ckbPrtOther: function(value) {
            return ckbPrtOther = value;
        },
        set_ckbPrtWebGraphic: function(value) {
            return ckbPrtWebGraphic = value;
        },
        set_PrintAdd_Size: function(value) {
            return PrintAdd_Size = value;
        },
        set_PrintBrochureQty: function(value) {
            return PrintBrochureQty = value;
        },
        set_PrintBannerQty: function(value) {
            return PrintBannerQty = value;
        },
        set_PrintFlyerQty: function(value) {
            return PrintFlyerQty = value;
        },
        set_PrintCertificateQty: function(value) {
            return PrintCertificateQty = value;
        },
        set_PrintPostcardSize: function(value) {
            return PrintPostcardSize = value;
        },
        set_PrintPostcardQty: function(value) {
            return PrintPostcardQty = value;
        },
        set_PrintPoster_ckb_11_17: function(value) {
            return PrintPoster_ckb_11_17 = value;
        },
        set_PrintPoster_Qty_11_17: function(value) {
            return PrintPoster_Qty_11_17 = value;
        },
        set_PrintPoster_ckb_22_28: function(value) {
            return PrintPoster_ckb_22_28 = value;
        },
        set_PrintPoster_Qty_22_28: function(value) {
            return PrintPoster_Qty_22_28 = value;
        },
        set_PrintPoster_ckb_other: function(value) {
            return PrintPoster_ckb_other = value;
        },
        set_PrintPoster_Qty_other: function(value) {
            return PrintPoster_Qty_other = value;
        },
        set_PrintPoster_Size_other: function(value) {
            return PrintPoster_Size_other = value;
        },
        set_PrintProgramQty: function(value) {
            return PrintProgramQty = value;
        },
        set_PrintOtherDescrip: function(value) {
            return PrintOtherDescrip = value;
        },
        set_PrintWebGraphic_web_graphic: function(value) {
            return PrintWebGraphic_web_graphic = value;
        },
        set_PrintWebGraphic_Dimension: function(value) {
            return PrintWebGraphic_Dimension = value;
        },
        resetParams: function() {
            PrtDateNeeded = "";
            ckbPrtAd = false;
            ckbPrtBrochure = false;
            ckbPrtBanner = false;
            ckbPrtFlyer = false;
            ckbPrtCertificate = false;
            ckbPrtPostcard = false;
            ckbPrtPoster = false;
            ckbPrtProgram = false;
            ckbPrtOther = false;
            ckbPrtWebGraphic = false;
            PrintAdd_Size = "";
            PrintBrochureQty = "";
            PrintBannerQty = "";
            PrintFlyerQty = "";
            PrintCertificateQty = "";
            PrintPostcardSize = "";
            PrintPostcardQty = "";
            PrintPoster_ckb_11_17 = false;
            PrintPoster_Qty_11_17 = "";
            PrintPoster_ckb_22_28 = false;
            PrintPoster_Qty_22_28 = "";
            PrintPoster_ckb_other = false;
            PrintPoster_Qty_other = "";
            PrintPoster_Size_other = "";
            PrintProgramQty = "";
            PrintOtherDescrip = "";
            PrintWebGraphic_web_graphic = "";
            PrintWebGraphic_Dimension = "";
            return true;
        }
    };
})(objPre_Print_Param);

// photography parameters //////////////////////////////////////////////////
var objPre_Photo_Param = (function() {
    var EventDate = "";
    var EventTime = "";
    var Location = "";
    var EstimateTime = "";
    
    //////////////////////////////////////////////////////////////////////////////////////////
    return {
        // getter
        get_EventDate: function() {
            return EventDate;
        },
        get_EventTime: function() {
            return EventTime;
        },
        get_Location: function() {
            return Location;
        },
        get_EstimateTime: function() {
            return EstimateTime;
        },
        // setter
        set_EventDate: function(value) {
            return EventDate = value;
        },
        set_EventTime: function(value) {
            return EventTime = value;
        },
        set_Location: function(value) {
            return Location = value;
        },
        set_EstimateTime: function(value) {
            return EstimateTime = value;
        },
        resetParams: function() {
            EventDate = "";
            EventTime = "";
            Location = "";
            EstimateTime = "";
        }
    };
})(objPre_Photo_Param);

// social media parameters /////////////////////////////////////////////////
var objPre_Media_Param = (function() {
    var MdaDueDate = "";
    var ckbMdaCollegewideEmail = false;
    var ckbMdaSherpaEmail = false;
    var ckbMdaMonitor = false;
    var ckbMdaSocialMedia = false;
    var ckbMdaCollegeEntrance = false;
    var MediaCollege_Email = "";
    var MediaSherpa_Email = "";
    var MediaMonitor_StartDate = "";
    var MediaMonitor_EndDate = "";
    var MediaPost_PostDate = "";
    var MediaEntrance_StartDate = "";
    var MediaEntrance_EndDate = "";
    
    //////////////////////////////////////////////////////////////////////////////////////////
    return {
        // getter
        get_MdaDueDate: function() {
            return MdaDueDate;
        },
        get_ckbMdaCollegewideEmail: function() {
            return ckbMdaCollegewideEmail;
        },
        get_ckbMdaSherpaEmail: function() {
            return ckbMdaSherpaEmail;
        },
        get_ckbMdaMonitor: function() {
            return ckbMdaMonitor;
        },
        get_ckbMdaSocialMedia: function() {
            return ckbMdaSocialMedia;
        },
        get_ckbMdaCollegeEntrance: function() {
            return ckbMdaCollegeEntrance;
        },
        get_MediaCollege_Email: function() {
            return MediaCollege_Email;
        },
        get_MediaSherpa_Email: function() {
            return MediaSherpa_Email;
        },
        get_MediaMonitor_StartDate: function() {
            return MediaMonitor_StartDate;
        },
        get_MediaMonitor_EndDate: function() {
            return MediaMonitor_EndDate;
        },
        get_MediaPost_PostDate: function() {
            return MediaPost_PostDate;
        },
        get_MediaEntrance_StartDate: function() {
            return MediaEntrance_StartDate;
        },
        get_MediaEntrance_EndDate: function() {
            return MediaEntrance_EndDate;
        },
        // setter
        set_MdaDueDate: function(value) {
            return MdaDueDate = value;
        },
        set_ckbMdaCollegewideEmail: function(value) {
            return ckbMdaCollegewideEmail = value;
        },
        set_ckbMdaSherpaEmail: function(value) {
            return ckbMdaSherpaEmail = value;
        },
        set_ckbMdaMonitor: function(value) {
            return ckbMdaMonitor = value;
        },
        set_ckbMdaSocialMedia: function(value) {
            return ckbMdaSocialMedia = value;
        },
        set_ckbMdaCollegeEntrance: function(value) {
            return ckbMdaCollegeEntrance = value;
        },
        set_MediaCollege_Email: function(value) {
            return MediaCollege_Email = value;
        },
        set_MediaSherpa_Email: function(value) {
            return MediaSherpa_Email = value;
        },
        set_MediaMonitor_StartDate: function(value) {
            return MediaMonitor_StartDate = value;
        },
        set_MediaMonitor_EndDate: function(value) {
            return MediaMonitor_EndDate = value;
        },
        set_MediaPost_PostDate: function(value) {
            return MediaPost_PostDate = value;
        },
        set_MediaEntrance_StartDate: function(value) {
            return MediaEntrance_StartDate = value;
        },
        set_MediaEntrance_EndDate: function(value) {
            return MediaEntrance_EndDate = value;
        },
        resetParams: function() {
            MdaDueDate = "";
            ckbMdaCollegewideEmail = false;
            ckbMdaSherpaEmail = false;
            ckbMdaMonitor = false;
            ckbMdaSocialMedia = false;
            ckbMdaCollegeEntrance = false;
            MediaCollege_Email = "";
            MediaSherpa_Email = "";
            MediaMonitor_StartDate = "";
            MediaMonitor_EndDate = "";
            MediaPost_PostDate = "";
            MediaEntrance_StartDate = "";
            MediaEntrance_EndDate = "";
        }
    };
})(objPre_Media_Param);

// web parameters //////////////////////////////////////////////////////////
var objPre_Web_Param = (function() {
    var WebDateNeeded = "";
    var ckbWebCreateNew = false;
    var ckbWebUpdateExisting = false;
    var ckbWebUpdateUrl = "";
    var ckbWebAddPage = false;
    var ckbWebAddUrl = "";
    var ckbWebRequestWebsite = false;
    var ckbWebReportProblem = false;
    
    //////////////////////////////////////////////////////////////////////////////////////////
    return {
        // getter
        get_WebDateNeeded: function() {
            return WebDateNeeded;
        },
        get_ckbWebCreateNew: function() {
            return ckbWebCreateNew;
        },
        get_ckbWebUpdateExisting: function() {
            return ckbWebUpdateExisting;
        },
        get_ckbWebUpdateUrl: function() {
            return ckbWebUpdateUrl;
        },
        get_ckbWebAddPage: function() {
            return ckbWebAddPage;
        },
        get_ckbWebAddUrl: function() {
            return ckbWebAddUrl;
        },
        get_ckbWebRequestWebsite: function() {
            return ckbWebRequestWebsite;
        },
        get_ckbWebReportProblem: function() {
            return ckbWebReportProblem;
        },
        // setter
        set_WebDateNeeded: function(value) {
            return WebDateNeeded = value;
        },
        set_ckbWebCreateNew: function(value) {
            return ckbWebCreateNew = value;
        },
        set_ckbWebUpdateExisting: function(value) {
            return ckbWebUpdateExisting = value;
        },
        set_ckbWebUpdateUrl: function(value) {
            return ckbWebUpdateUrl = value;
        },
        set_ckbWebAddPage: function(value) {
            return ckbWebAddPage = value;
        },
        set_ckbWebAddUrl: function(value) {
            return ckbWebAddUrl = value;
        },
        set_ckbWebRequestWebsite: function(value) {
            return ckbWebRequestWebsite = value;
        },
        set_ckbWebReportProblem: function(value) {
            return ckbWebReportProblem = value;
        },
        resetParams: function() {
            WebDateNeeded = "";
            ckbWebCreateNew = false;
            ckbWebUpdateExisting = false;
            ckbWebUpdateUrl = "";
            ckbWebAddPage = false;
            ckbWebAddUrl = "";
            ckbWebRequestWebsite = false;
            ckbWebReportProblem = false;
        }
    };
})(objPre_Web_Param);

// video parameters ////////////////////////////////////////////////////////
var objPre_Video_Param = (function() {
    var VdoDueDate = "";
    var ckbVdoFilmingRequest = false;
    var ckbVdoOther = false;
    var VideoFilming_EventDate = "";
    var VideoFilming_EventTime = "";
    var VideoFilming_Location = "";
    var VideoFilming_Purpose = "";
    var VideoFilming_EstimateTime = "";
    var VideoOther_Other = "";
    
    //////////////////////////////////////////////////////////////////////////////////////////
    return {
        // getter
        get_VdoDueDate: function() {
            return VdoDueDate;
        },
        get_ckbVdoFilmingRequest: function() {
            return ckbVdoFilmingRequest;
        },
        get_ckbVdoOther: function() {
            return ckbVdoOther;
        },
        get_VideoFilming_EventDate: function() {
            return VideoFilming_EventDate;
        },
        get_VideoFilming_EventTime: function() {
            return VideoFilming_EventTime;
        },
        get_VideoFilming_Location: function() {
            return VideoFilming_Location;
        },
        get_VideoFilming_Purpose: function() {
            return VideoFilming_Purpose;
        },
        get_VideoFilming_EstimateTime: function() {
            return VideoFilming_EstimateTime;
        },
        get_VideoOther_Other: function() {
            return VideoOther_Other;
        },
        // setter
        set_VdoDueDate: function(value) {
            return VdoDueDate = value;
        },
        set_ckbVdoFilmingRequest: function(value) {
            return ckbVdoFilmingRequest = value;
        },
        set_ckbVdoOther: function(value) {
            return ckbVdoOther = value;
        },
        set_VideoFilming_EventDate: function(value) {
            return VideoFilming_EventDate = value;
        },
        set_VideoFilming_EventTime: function(value) {
            return VideoFilming_EventTime = value;
        },
        set_VideoFilming_Location: function(value) {
            return VideoFilming_Location = value;
        },
        set_VideoFilming_Purpose: function(value) {
            return VideoFilming_Purpose = value;
        },
        set_VideoFilming_EstimateTime: function(value) {
            return VideoFilming_EstimateTime = value;
        },
        set_VideoOther_Other: function(value) {
            return VideoOther_Other = value;
        },
        resetParams: function() {
            VdoDueDate = "";
            ckbVdoFilmingRequest = false;
            ckbVdoOther = false;
            VideoFilming_EventDate = "";
            VideoFilming_EventTime = "";
            VideoFilming_Location = "";
            VideoFilming_Purpose = "";
            VideoFilming_EstimateTime = "";
            VideoOther_Other = "";
        }
    };
})(objPre_Video_Param);

// editorial parameters ////////////////////////////////////////////////////
var objPre_Editorial_Param = (function() {
    var EdtDueDate = "";
    var ckbEdtCopywriting = false;
    var ckbEdtProofreading = false;
    var EdtCWDateNeeded = "";
    var EdtPRDateNeeded = "";
    
    //////////////////////////////////////////////////////////////////////////////////////////
    return {
        // getter
        get_EdtDueDate: function() {
            return EdtDueDate;
        },
        get_ckbEdtCopywriting: function() {
            return ckbEdtCopywriting;
        },
        get_ckbEdtProofreading: function() {
            return ckbEdtProofreading;
        },
        get_EdtCWDateNeeded: function() {
            return EdtCWDateNeeded;
        },
        get_EdtPRDateNeeded: function() {
            return EdtPRDateNeeded;
        },
        // setter
        set_EdtDueDate: function(value) {
            return EdtDueDate = value;
        },
        set_ckbEdtCopywriting: function(value) {
            return ckbEdtCopywriting = value;
        },
        set_ckbEdtProofreading: function(value) {
            return ckbEdtProofreading = value;
        },
        set_EdtCWDateNeeded: function(value) {
            return EdtCWDateNeeded = value;
        },
        set_EdtPRDateNeeded: function(value) {
            return EdtPRDateNeeded = value;
        },
        resetParams: function() {
            EdtDueDate = "";
            ckbEdtCopywriting = false;
            ckbEdtProofreading = false;
            EdtCWDateNeeded = "";
            EdtPRDateNeeded = "";
        }
    };
})(objPre_Editorial_Param);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// change all data fields functions 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getCheckBoxChange(preCheckBox, newCheckBox, checkBoxComments) {   
    if (preCheckBox !== newCheckBox) {
        if (newCheckBox) {
            return checkBoxComments + " has been checked\n";
        }

        return checkBoxComments + " has been unchecked and deleted all sub section(s)\n";
    }
    
    return "";
}

function getDataValueChange(preValue, newValue, fieldComments) {    
    if (preValue !== newValue) {
        var strDataLog = fieldComments + "\n";
        strDataLog += "Previous value: " + preValue + "\n";
        strDataLog += "New value: " + newValue + "\n";
        return strDataLog;
    }
    
    return "";
}

function getAttachmentChange(fileName, fieldComments) {    
    var strAttachmentLog = fieldComments + "\n";
    strAttachmentLog += "File Name: " + fileName;
    
    return strAttachmentLog;
}
/*
 * usage
 * 
 * 
   $(document).ready(function () {
      var csvuploadalert = validation.typeCheck({
                    id: 'csvupload',
                    type:['.xlsx','.xls'],
                    msg: " Select xmls to upload"
                });
                if (csvuploadalert) {
                    alert(csvuploadalert);
                    return false;
                }
        $("#theform").submit(function (event) {
            event.preventDefault();
            var orgName = validation.name({
                id: 'orgName',
                msg: 'Org  Name should be a valid name ( Allowed alphanumaric including space)'
            });
            if (orgName) {
                alert(orgName);
                return false;
            }
            var orgInchargeName = validation.emptyCheck({
                id: 'orgInchargeName',
                msg: 'Org Incharge should be a valid name ( Allowed alphanumaric including space)'
            });
            if (orgInchargeName) {
                alert(orgInchargeName);
                return false;
            }
            var orgInchargeMobile = validation.mobile({
                id: 'orgInchargeMobile'
            });
            if (orgInchargeMobile) {
                alert(orgInchargeMobile);
                return false;
            }
            var orgInchargeEmail = validation.email({
                id: 'orgInchargeEmail',
                value:"pawan@yahoo.com"
            });
            if (orgInchargeEmail) {
                alert(orgInchargeEmail);
                return false;
            }
            var orgInchargePhone = validation.teleorMob({
                id: 'orgInchargePhone'
            });
            if (orgInchargePhone) {
                alert(orgInchargePhone);
                return false;
            }
             var orgAddressLine1 = validation.emptyCheck({
                id: 'orgAddressLine1',
                msg: 'AddressLine1 not be Empty'
            });
            if (orgAddressLine1) {
                alert(orgAddressLine1);
                return false;
            }
            
            var city  = validation.emptyCheck({
                id: 'city',
                msg: 'city  not be Empty'
            });
            if (city){
                alert(city );
                return false;
            }
            var state  = validation.emptyCheck({
                id: 'state',
                msg: 'city  not be Empty'
            });
            if (state){
                alert(state);
                return false;
            }
            
           var country  = validation.emptyCheck({
                id: 'country',
                msg: 'country  not be Empty'
            });
            if (country){
                alert(country);
                return false;
            }
            
            var postalCode  = validation.postalcode({
                id: 'postalCode'
            });
            if (postalCode){
                alert(postalCode);
                return false;
            }
            
           var orgWebsite  = validation.website({
                id: 'orgWebsite',
                empty:true
            });
            if (orgWebsite){
                alert(orgWebsite);
                return false;
            }
             var fax  = validation.fax({
                id: 'fax',
                empty:true
            });
            if (fax){
                alert(fax);
                return false;
            }
            
            var serialObject = $(this).serializeArray();
            $.ajax({
                type: "post",
                url: baseUrl + "org/ajax_insertorg.php",
                data: serialObject,
                success: function (msg) {
                    // alert(msg);
                    var obj = $.parseJSON(msg);
                    alert(obj.msg);
                    if (obj.status == true) {
                        window.location.href = "" + baseUrl + "org";
                    }
                }, error: function (xhr, ajaxOptions, thrownError) {
                    //alert(thrownError);
                }
            });
        });
    });
 *    other functions:-
 *    DateTime24hour,emptyCheck, email,name,alphanumeric,twitterUsername
 *    mobile telephone  teleorMobHyphene,teleorMob,floatNumber,digit,alphabet
 *    typeCheck,imageCheck
 *    postalcode
 *    ^[a-zA-Z]{0,20}+[a-zA-Z\s\']{0,20}+$
 */

var validation = (function () {
    var validation = {
        obj_arg_type: ['id', 'class'],
        emailExp: /^[a-zA-Z]+[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-z.]{2,5}$/,
        websiteExp:/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        nameExp: /^([A-Za-z_]{1,}[A-Za-z0-9\s\.\&\_]{0,})+$/,
        usernameExp: /(^([A-Za-z])([A-Za-z\'\s]){0,40})+$/, 
        alphanumericExp: /^([0-9a-zA-Z])+$/,
        indianMobExp: /^(\d{10})+$/,
        indianTeleExp: /(\d{8,12})/,
        indianTeleorMobExpWithHyphene: /^(\d{10}|[0-9]\d{2,4}-\d{6,8})+$/,
        indianTeleorMobExpWithotHyphene: /^(\d{8,12})+$/,
        floatorNumber: /^\-?([0-9]+(\.[0-9]+)?|Infinity)$/, //.82,23.23,0.333,-3.233,344322  invalid=.8889
        DigitExp: /^(\d)+$/,
        AlphabetExp: /^([a-zA-Z])+$/,
        emptyExp: /^([\s])+$/,
        faxExp:/^[0-9]{6,}$/,
        postalcodeExp:/^\d{6}$/,
        passwordExp: /^([0-9a-zA-Z\@\#\$\%\.\&\-\_]){6,}$/,
        DateTime24hourExp: /^(([0-1][0-9]|[2][0-4]):+[0-6][0-9]:+[0-6][0-9])$/,
        hourExp: /^([0-1][0-9]|[2][0-4])$/,
        minuteExp: /^([0-6][0-9])$/,
        twitterExp:  /^([A-Za-z0-9_])+$/,
        hex_colorExp:  /^\#+[0-9a-zA-Z]{6}$/,
        empty_default_alert: "This field should not be empty",
        password_default_alert: "Password should be greater than 5 characters (Allowed characters 0-9,a-z,A-Z,@#$%_.&-)",
        email_default_alert: "Please Enter a valid email-id",
        name_default_alert: "Name should contain [0-9 OR a-z OR A-Z OR space OR & OR- OR . OR _] and start with alphabate or _",
        username_default_alert: "Name  contains [ a-z OR A-Z OR space OR  ' ] and starting with alphabate max 40 chars.",
        alphanumeric_default_alert: "Please Enter a valid alphanumeric characters",
        mobile_default_alert: "Mobile no should be 10 Digit Number",
        telephone_default_alert: "Telephone no should be a valid digit between 8-12(with extention)",
        mobWithHyphene_default_alert: "Contact no should be a valid no ex 023-332342 or 8147152268.",
        mobWithotHyphene_default_alert: "Contact no should be a valid min-8 digit max-12 digits.",
        floatorNumber_default_alert: "It is a invalid float no.",
        digit_default_alert: "It is a invalid digit.",
        alphabet_default_alert: "It is a invalid alphabet.",
        DateTime24hour_default_alert: "Your have to feed 24 hours date format  between 00:00:00 and 24:60:60",
        hour_default_alert: "Your have to feed 24 hours date format",
        minute_default_alert: "Your have to feed 01 to 60 minute",
        TimeDifference_default_alert: " End Time should be greater than Start time.",
        type_default_alert: "Your selected file is not in right formate for example  csv,xls ",
        image_default_alert: "Your selected file is not in right formate for example jpg,png,jpeg,gif ",
        fax_default_alert: "Fax No must have minimum 6 numeric characters",
        postalcode_default_alert: "postal code  must have 6 digit number",
        website_default_alert: "It should be a valid web url of either http or  https",
        twitter_default_alert: "Twitter user id allowed characters [A-Z or a-z or 0-9 or _]",
       hex_color_default_alert:"In Valid  Hex color code  required [ # , 0-9 a-z A-Z ] "

    };
    validation.error = function (errortype) {
        switch (errortype) {
            case 'object':
                alert("Validate Library Error: type=object :msg= Require a object argument: EX- validation.email({ id:'email' });");
                break;
            case 'obj_arg_type':
                alert("Validate Library Error: type=obj_arg_type :msg= Require a valid key of object: EX- 'id','msg' ");
                break;
            case 'id_class':
                alert("Validate Library Error: type=id_class :msg= Require a valid class or id: EX- emailid or emailclass");
                break;
            default:
                alert("Validate Library Error: type=default :msg= somthing wrong in library : EX- ?");
        }
    }
    /*
     * function called by inner function
     */
    var default_alert;
    validation.generic = function (obj, email_default_alert) {
        obj_arg_type = validation.obj_arg_type;
        if (obj.msg) {
            default_alert = obj.msg;
        } else {
            default_alert = email_default_alert;
        }
        if (typeof obj != 'object') {
            validation.error('object');
        }
    }
 validation.isset = function (data) {
            if (data != "") {
                if ((data != undefined) && (data != 'undefined') && (data != null) && (data != 'NaN')) {
                    return true;
                } else {
                    return  false;
                }
            } else {
                return  false;
            }
  }
  
   validation.hexcolor = function (obj) {
      // alert("0")
       validation.generic(obj, validation.hex_color_default_alert);
     //  alert("1")
       if (typeof obj.id !== 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
            //alert(inputEmail);
            if(obj.empty==true){
             if(inputValue!=''){
                 if (!validation.hex_colorExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
                }
               } 
            }else{
              if (!validation.hex_colorExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
                }
           }
        } 

    }
   /*
    * 
    * @param {type} str
    * @returns strings with non html tags
    */
       validation.strip_tags=function(str) {
           str = str.toString();
           return str.replace( /<.*?>/g, '' );
       }
 
    validation.TimeDifference = function (obj) {
        validation.generic(obj, validation.TimeDifference_default_alert);
        if ((typeof obj.id1 !== 'undefined') && (typeof obj.id2 !== 'undefined')) {
            var windowStartTime = $.trim($("#" + obj.id1).val());
            var windowCloseTime = $.trim($("#" + obj.id2).val());
            var StartTime = windowStartTime.split(':')
            var CloseTime = windowCloseTime.split(':')
            var StartTimeHour, StartTimeMinute, StartTimeSeconds, CloseTimeHour, CloseTimeMinute, CloseTimeSeconds, startTotalTime, closeTotalTime, timeInterval;

            StartTimeHour = (StartTime[0].indexOf('0') == 0) ? parseInt(StartTime[0].substring(1, 2)) : parseInt(StartTime[0]);
            StartTimeMinute = StartTime[1];
            StartTimeSeconds = StartTime[2];
            CloseTimeHour = (CloseTime[0].indexOf('0') == 0) ? parseInt(CloseTime[0].substring(1, 2)) : parseInt(CloseTime[0]);
            CloseTimeMinute = CloseTime[1];
            CloseTimeSeconds = CloseTime[2];
            startTotalTime = (StartTimeHour * 3600) + (StartTimeMinute * 60) + StartTimeSeconds;
            closeTotalTime = (CloseTimeHour * 3600) + (CloseTimeMinute * 60) + CloseTimeSeconds;
            timeInterval = closeTotalTime - startTotalTime;
            if ((timeInterval.toString() == 'NaN') || (timeInterval <= 0)) {
                $("#" + obj.id2).focus();
                $("#" + obj.id1).focus();
                return default_alert;
            }
        } /*else if (typeof obj.class !== 'undefined') {
            //        var inputValue=$.trim($("."+obj.class).val());
            //        //alert(inputEmail);
            //        if(!validation.DateTime24hourExp.test(inputValue)){
            //               $("."+obj.class).focus();
            //                return default_alert; 
            //        }
        } else {
            validation.error('id_class');
        } */

    }

    validation.DateTime24hour = function (obj) {
        validation.generic(obj, validation.DateTime24hour_default_alert);

        if (typeof obj.id !== 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
            //alert(inputEmail);
            if (!validation.DateTime24hourExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
            }
        } /*else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
            if (!validation.DateTime24hourExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
            }
        } else {
            validation.error('id_class');
        } */

    }
    
      validation.hour = function (obj) {
        validation.generic(obj, validation.hour_default_alert);
        if (typeof obj.id !== 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
            //alert(inputEmail);
            if (!validation.hourExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
            }
        }/* else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
            if (!validation.hourExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
            }
        } else {
            validation.error('id_class');
        } */
    }
    
      validation.minute = function (obj) {
        validation.generic(obj, validation.minute_default_alert);
        if (typeof obj.id !== 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
            //alert(inputEmail);
            if (!validation.minuteExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
            }
        }/* else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
            if (!validation.minuteExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
            }
        } else {
            validation.error('id_class');
        } */
    }

   


    validation.emptyCheck = function (obj) {
        validation.generic(obj, validation.empty_default_alert);

        if (typeof obj.id !== 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());

            if (inputValue == '') {
                $("#" + obj.id).focus();
                return default_alert;
            }
        } /*else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
            if (inputValue == '') {
                $("." + obj.class).focus();
                return default_alert;
            }
        } else {
            validation.error('id_class');
        } */

    }
    
     validation.twitterUsername = function (obj) {
        validation.generic(obj, validation.twitter_default_alert);
        if (typeof obj.id !== 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
            //alert(inputEmail);
            if(obj.empty==true){
             if(inputValue!=''){
                 if (!validation.twitterExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
                }
               } 
            }else{
              if (!validation.twitterExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
                }
           }
        }/* else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
             if(obj.empty==true){
             if(inputValue!=''){
                if (!validation.twitterExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
                }
               } 
            }else{
             if (!validation.twitterExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
            }
           }
        } else {
            validation.error('id_class');
        } */
    } 
    validation.email = function (obj) {
      // alert("0")
       validation.generic(obj, validation.email_default_alert);
     //  alert("1")
       if (typeof obj.id !== 'undefined') {
            if (typeof obj.value !== 'undefined') {
              var inputValue = $.trim(obj.value);       
            }else{
               var inputValue = $.trim($("#" + obj.id).val());    
            }
         
            //alert(inputEmail);
            if(obj.empty==true){
             if(inputValue!=''){
                 if (!validation.emailExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
                }
               } 
            }else{
              if (!validation.emailExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
                }
           }
        } /*else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
             if(obj.empty==true){
             if(inputValue!=''){
                if (!validation.emailExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
                }
               } 
            }else{
             if (!validation.emailExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
            }
           }
        } else {
            validation.error('id_class');
        } */

    }

  validation.website = function (obj) {
        validation.generic(obj, validation.website_default_alert);

        if (typeof obj.id !== 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
            //alert(inputEmail);
            if(obj.empty==true){
             if(inputValue!=''){
                 if (!validation.websiteExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
                }
               } 
            }else{
              if (!validation.websiteExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
                }
           }
        } /*else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
             if(obj.empty==true){
             if(inputValue!=''){
                if (!validation.websiteExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
                }
               } 
            }else{
             if (!validation.websiteExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
            }
           }
        } else {
            validation.error('id_class');
        } */

    }
    validation.fax = function (obj) {
        validation.generic(obj, validation.fax_default_alert);

        if (typeof obj.id !== 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
            //alert(inputEmail);
             if(obj.empty==true){
             if(inputValue!=''){
                 if (!validation.faxExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
                 }
               } 
            }else{
             if (!validation.faxExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
            }
           }
           
        } /*else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
             if(obj.empty==true){
             if(inputValue!=''){
                 if (!validation.faxExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
                 }
               } 
            }else{
              if (!validation.faxExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
               }
           }
        } else {
            validation.error('id_class');
        } */

    }
    
    
     validation.postalcode = function (obj) {
        validation.generic(obj, validation.postalcode_default_alert);

        if (typeof obj.id !== 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
            //alert(inputEmail);
             if(obj.empty==true){
             if(inputValue!=''){
                 if (!validation.postalcodeExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
                 }
               } 
            }else{
             if (!validation.postalcodeExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
            }
           }
           
        } /*else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
             if(obj.empty==true){
             if(inputValue!=''){
                 if (!validation.postalcodeExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
                 }
               } 
            }else{
              if (!validation.postalcodeExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
               }
           }
        } else {
            validation.error('id_class');
        } */

    }
    validation.name = function (obj) {
        validation.generic(obj, validation.name_default_alert);
        if (obj.id != 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
            
             if(obj.empty==true){
             if(inputValue!=''){
               if (!validation.nameExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
                }
               } 
            }else{
             if (!validation.nameExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
              }
           }

        } /* else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
            if(obj.empty==true){
             if(inputValue!=''){
               if (!validation.nameExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
               }
               } 
            }else{
             if (!validation.nameExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
              }
           }
        } else {
            validation.error('id_class');
        } */
    }
    
      validation.username= function (obj) {
         validation.generic(obj, validation.username_default_alert);
        if (obj.id != 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
            
             if(obj.empty==true){
             if(inputValue!=''){
               if (!validation.usernameExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
                }
               } 
            }else{
             if (!validation.usernameExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
              }
           }

        } 
    }
    validation.alphanumeric = function (obj) {
        validation.generic(obj, validation.alphanumeric_default_alert);
        if (obj.id != 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
            
             if(obj.empty==true){
             if(inputValue!=''){
              if (!validation.alphanumericExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
               }
               } 
            }else{
            if (!validation.alphanumericExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
            }
           }

        } /* else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
            
             if(obj.empty==true){
             if(inputValue!=''){
             if (!validation.alphanumericExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
                  }
               } 
            }else{
              if (!validation.alphanumericExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
            }
           }
        } else {
            validation.error('id_class');
        } */
    }

    validation.mobile = function (obj) {
        validation.generic(obj, validation.mobile_default_alert);
        if (obj.id != 'undefined') {
           // validation.isset()
            var inputValue = $.trim($("#" + obj.id).val());
          
             if(obj.empty==true){
             if(inputValue!=''){
              if (!validation.indianMobExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
                 }
               } 
            }else{
                if (!validation.indianMobExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
               }
           }

        } /*else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
             if(obj.empty==true){
             if(inputValue!=''){
             if (!validation.indianMobExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
                }
               } 
            }else{
               if (!validation.indianMobExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
               }
           }
            
        } else {
            validation.error('id_class');
        } */
    }

    validation.telephone = function (obj) {
        validation.generic(obj, validation.telephone_default_alert);
        if (obj.id != 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
           
             if(obj.empty==true){
             if(inputValue!=''){
              if (!validation.indianTeleExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
               }
               } 
            }else{
               if (!validation.indianTeleExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
            }
           }

        } /*else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
           
               if(obj.empty==true){
             if(inputValue!=''){
              if (!validation.indianTeleExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
              }
               } 
            }else{
                if (!validation.indianTeleExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
                }
           }
        } else {
            validation.error('id_class');
        } */
    }

    validation.teleorMobHyphene = function (obj) {
        validation.generic(obj, validation.mobWithHyphene_default_alert);
        if (obj.id != 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
            
              if(obj.empty==true){
             if(inputValue!=''){
              if (!validation.indianTeleorMobExpWithHyphene.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
              }
               } 
            }else{
              if (!validation.indianTeleorMobExpWithHyphene.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
              }
           }

        } /* else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
           
             if(obj.empty==true){
             if(inputValue!=''){
               if (!validation.indianTeleorMobExpWithHyphene.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
                  }
               } 
            }else{
               if (!validation.indianTeleorMobExpWithHyphene.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
                 }
           }
        } else {
            validation.error('id_class');
        } */
    }


    validation.teleorMob = function (obj) {
        validation.generic(obj, validation.mobWithotHyphene_default_alert);
        if (obj.id != 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
           
              if(obj.empty==true){
             if(inputValue!=''){
              // if (!validation.indianTeleorMobExpWithHyphene.test(inputValue)) {
                 if (!validation.indianTeleorMobExpWithotHyphene.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
                 }
               } 
            }else{
               if (!validation.indianTeleorMobExpWithotHyphene.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
                 }
           }

        }/* else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
            
             if(obj.empty==true){
             if(inputValue!=''){
               //if (!validation.indianTeleorMobExpWithHyphene.test(inputValue)) {
                if (!validation.indianTeleorMobExpWithotHyphene.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
                  }
               } 
            }else{
              if (!validation.indianTeleorMobExpWithotHyphene.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
              }
           }
        } else {
            validation.error('id_class');
        } */
    }

    validation.floatNumber = function (obj) {
        validation.generic(obj, validation.floatorNumber_default_alert);
        if (obj.id != 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
           
            if(obj.empty==true){
             if(inputValue!=''){
              // if (!validation.indianTeleorMobExpWithHyphene.test(inputValue)) {
                if (!validation.floatorNumber.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
                  }
               } 
            }else{
              if (!validation.floatorNumber.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
            }
           }
        }/* else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
           
             if(obj.empty==true){
             if(inputValue!=''){
               if (!validation.floatorNumber.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
                 }
               } 
            }else{
              if (!validation.floatorNumber.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
                }
           }
        } else {
            validation.error('id_class');
        } */
    }

    validation.digit = function (obj) {
        validation.generic(obj, validation.digit_default_alert);
        if (obj.id != 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
          
             if(obj.empty==true){
             if(inputValue!=''){
                if (!validation.DigitExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
                 }
               } 
            }else{
                if (!validation.DigitExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
            }
           }

        } /*else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
            
              if(obj.empty==true){
             if(inputValue!=''){
                if (!validation.DigitExp.test(inputValue)) {
                  $("." + obj.class).focus();
                  return default_alert;
                }
               } 
            }else{
                if (!validation.DigitExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
                }
           }
        } else {
            validation.error('id_class');
        } */
    }

    validation.alphabet = function (obj) {
        validation.generic(obj, validation.alphabet_default_alert);
        if (obj.id != 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
            
             if(obj.empty==true){
             if(inputValue!=''){
                if (!validation.AlphabetExp.test(inputValue)) {
                $("#" + obj.id).focus();
                   return default_alert;
                 }
               } 
            }else{
                if (!validation.AlphabetExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
               }
           }
        }/* else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            //alert(inputEmail);
          
             if(obj.empty==true){
             if(inputValue!=''){
                if (!validation.AlphabetExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
                }
               } 
            }else{
                 if (!validation.AlphabetExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
                }
           }
        } else {
            validation.error('id_class');
        } */
    }

    validation.password = function (obj) {
        validation.generic(obj, validation.password_default_alert);
        if (obj.id != 'undefined') {
            var inputValue = $("#" + obj.id).val();
            if (!validation.passwordExp.test(inputValue)) {
                $("#" + obj.id).focus();
                return default_alert;
            }
        } /*else if (typeof obj.class !== 'undefined') {
            var inputValue = $("." + obj.class).val();
            //alert(inputEmail);
            if (!validation.passwordExp.test(inputValue)) {
                $("." + obj.class).focus();
                return default_alert;
            }
        } else {
            validation.error('id_class');
        } */
    }
     validation.typeCheck = function (obj) {
        validation.generic(obj, validation.type_default_alert);
        if (typeof obj.id !== 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
            var extention = inputValue.substr(inputValue.lastIndexOf('.'));
            if(obj.type){
                var typeArray = obj.type;  //['.'+obj.type]
            }else{
                 return "type should a array of extention";
            }
            if ((typeArray.indexOf(extention) < 0) || (inputValue == '')) {
                $("#" + obj.id).focus();
                return default_alert;
            }
        }/* else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("." + obj.class).val());
            var extention = inputValue.substr(inputValue.lastIndexOf('.'));
              if(obj.type){
                var typeArray = obj.type;  //['.'+obj.type]
            }else{
                 return "type should a array of extention";
            }
            if ((typeArray.indexOf(extention) < 0) || (inputValue == '')) {
                $("." + obj.id).focus();
                return default_alert;
            }
        } else {
            validation.error('id_class');
        } */

    }
    
    
    validation.imageCheck = function (obj) {
        
        validation.generic(obj, validation.image_default_alert);
        if (typeof obj.id !== 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
            var extention = inputValue.substr(inputValue.lastIndexOf('.'));
            var typeArray = [".jpg",".png",".jpeg",".gif"];
            if ((typeArray.indexOf(extention) < 0) || (inputValue == '')) {
                $("#" + obj.id).focus();
                return default_alert;
            }
        } /*else if (typeof obj.class !== 'undefined') {
            var inputValue = $.trim($("#" + obj.id).val());
            var extention = inputValue.substr(inputValue.lastIndexOf('.'));
            var typeArray = [".jpg",".png",".jpeg",".gif"];
            if ((typeArray.indexOf(extention) < 0) || (inputValue == '')) {
                $("." + obj.id).focus();
                return default_alert;
            }
        } else {
            validation.error('id_class');
        } */

    }
    
    
     //regulerExpression 
    validation.regulerExpression = function (obj) {
       // console.log(this.isset(obj.regExp));
        if(!this.isset(obj.msg)){
            return "Pass msg key is missing .";
        }
        this.customExp=new RegExp(obj.regExp,"g");
        
        var inputValue= this.isset(obj.id)?$.trim($("#" + obj.id).val()):"";
        inputValue= this.isset(obj.value)?$.trim(obj.value):""; 
   
        if (!this.customExp.test(inputValue)) {
           return  obj.msg;
        } 
    } 
    return validation;
})();    

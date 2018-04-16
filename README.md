# javascript_library
javascript validation library 
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

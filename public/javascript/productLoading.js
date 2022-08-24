var productDetails = [];
var productDetailsTemplate;



var loadProductsToPage = () => {
    $.ajax({
        url: '/get/details/product',
        method: 'GET',
        data: {},
        dataType: 'JSON',
        success: (data) => {
            console.log(data);
            productDetails = data.productDetailsList;
            getProductTemplate();
        }
    });    
}

var getProductTemplate = () => {
    $.ajax({
        url: 'templates/singleProductTemplate.htm',
        method: 'GET',
        success: (template) => {
            console.log(template);
            productDetailsTemplate = Handlebars.compile(template);
            showProductDetails();
        }
    })
}

var showProductDetails  =  () => {
    console.log("productDetails");
    console.log(productDetails);
    for (var i = 0 ; i < productDetails.length; i++) {
        $("#productDetailsBlock").append(productDetailsTemplate(productDetails[i]));
    }
}

var logoutUser = () => {
    $.ajax({
        url: '/logout/session',
        method: 'POST',
        dataType: 'JSON',
        success: (response) => {
            loadTemplate('login');
        }
    })
}


var showMenu = () => {
    $(".cart").slideToggle() ;
}
var hideMenu = () => {
    $(".cart").hide() ;
}


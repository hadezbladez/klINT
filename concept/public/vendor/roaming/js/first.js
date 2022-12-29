const tkn = localStorage.getItem("roamingToken");//<< for easeness of use
const rmNm = localStorage.getItem("roamingNama");

let content = {
    mainStart : function(){//starter_cekSession
        $.ajax({//cek identity
            //the thing that stopping the jwt change
            url: "/auth-data", type: "POST",
            headers: {token: tkn }, data:{a:'cekSession'},
            success:function(R){content.tree1.okSess(R); },
            error: function (error){content.tree1.errSess(error);}
        });
    },
    tree1 : {
        okSess : function(R){
            localStorage.setItem('roamingToken',R.data.tkn);//set new token
            if (window.location.pathname=='/login') {window.location.href = "/";}//if on login
        
            //option path
            if(pktw(R.data.tkn).r == "2807"){
                //ajaxLoad('/setting-page-load',{a:"_options"},tkn,(S)=>{$('.cdg-suo-ban').empty().html(S);})
            }
            else{$('.cdg-suo-reban').remove();}
            if(pktw(R.data.tkn).r == '1' ){$('.cdg-admo-reban').remove(); }
            
            $('#namaUser').html(rmNm);//naming
            $('#logout').on('click', function () {//logging out
                localStorage.removeItem("roamingToken");
                localStorage.removeItem("roamingNama");
                deleteAllCookies();//delete all cookies should be
                window.location.href = "/login"
            });
        },
        errSess : function(error){
            setTimeout(function () {
                localStorage.removeItem("roamingToken");
                localStorage.removeItem("roamingNama");
                if (window.location.pathname!='/login') {window.location.href = "/login";}
            },0);
        }
    },
    deprecated : {
        //used function || this guy can only be used on front-end || might be usefull for logging
        //DELETED CONTENT
        pktw : function(nkt){
            const b64Url = nkt.split('.')[1];
            const b64 = b64Url.replace(/-/g, '+').replace(/_/g, '/');
            let jakePaulers = decodeURIComponent(atob(b64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        
            return JSON.parse(jakePaulers);
        },
        deleteAllCookies : function() {
            var cookies = document.cookie.split(";");
        
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        }
    },
}

content.mainStart();

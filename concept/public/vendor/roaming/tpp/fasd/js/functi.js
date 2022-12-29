
function clickyClicky(){
    //1st time
    $.ajax({
        url: '/html/dasboard.html',
        success: function(result){
            $('.content-area').empty().append(result);
        }
    });



    $('#dashboard-content-tab').click(function(){
        $.ajax({
            url: '/html/dasboard.html',
            success: function(result){
                $('.content-area').empty().append(result);
            }
        });
    });
    $('#provisiong-content-tab').click(function(){
        $.ajax({
            url: '/html/provisioning.html',
            success: function(result){
                $('.content-area').empty().append(result);
            }
        });
    });
    $('#masnet-content-tab').click(function(){
        $.ajax({
            url: '/html/masNet_main.html',
            success: function(result){
                $('.content-area').empty().append(result);
                $('#check-imsi').click(function(){
                    $.ajax({
                        url: '/html/masNet_netProf.html',
                        success: function(result){
                            $('.content-area').empty().append(result);
                        }
                    });
                });
                $('#tabListNetwork').DataTable();
                
                //editation
                
                var context = $('#tabListNetwork_wrapper').html();
                
                var entries = $('#tabListNetwork_length').html();
                var search = $('#tabListNetwork_filter').html();
                var table = $('#tabListNetwork').html();
                var info = $('#tabListNetwork_info').html();
                var paginate = $('#tabListNetwork_paginate').html();

                var doubleMind = divisionation_(
                    divisionation_(info, 'col-md-6') + divisionation_(entries, 'col-md-6 float-right'), 'row');

                $('#tabListNetwork_wrapper').empty();
                $('#tabListNetwork_wrapper').append(
                    divisionation_(search,'tabListNetwork_filter') +
                    tablenation_(table) + 
                    divisionation_(paginate, 'tabListNetwork_paginate') + '<br>' +
                    doubleMind
                );

                $('#check-imsi').click(function(){
                    $.ajax({
                        url: '/html/masNet_netProf.html',
                        success: function(result){
                            $('.content-area').empty().append(result);
                        }
                    });
                });
                

            }
        });
    });



}

function tablenation_(content){
    return '<table id="tabListNetwork" class="table table-striped table-condensed table-sm" cellspacing="0" width="100%">' + content + "</table>";
}

function divisionation_(content, addclass){
    var open = "<div class='"+addclass+"'>"
    return open + content + "</div>";
}

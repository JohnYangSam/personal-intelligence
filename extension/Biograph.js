var mouseX = 0;
var mouseY = 0;
var popupWidth = 400;
var popupCache = new Object();
var debugMode = false;

function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}

$(document).ready(function()
{
    if(window.Event)
        window.captureEvents(Event.MOUSEMOVE | Event.DBLCLICK | Event.MOUSEUP);

    document.onmousemove = function(e)
    {
        mouseX = (window.Event) ? e.pageX : event.clientX + document.body.scrollLeft;
        mouseY = (window.Event) ? e.pageY : event.clientY + document.body.scrollTop;
        $('#biograph-popup').fadeOut();
    };

    document.onmouseup = function(e)
    {
        var text = getSelectedText();
        
        if(text.length > 0){
            //insert query here

            showTextData("Not found",text);
            /*
            $.getJSON("https://api.angel.co/1/search?query="+text+"&type=Startup", function(response){
                if(response.length > 0) {
                 $.getJSON("https://api.angel.co/1/startups/"+response[0].id, function(res){ 
                    if(res.product_desc != "undefined" && res.product_desc != null){
                        showAngelData(res);
                    }
                    else {
                        $.getJSON("http://api.crunchbase.com/v/1/company/"+text+".js?api_key=ed9vfgjwhkugexmum2xwvjd3", function(data){
                            if(data.description.length > 0){
                                showCBdata(data);
                            }
                            else {
                                showTextData("Not found",text);
                            }
                        });
                    }
                 });
                }
                else {
                    $.getJSON("http://api.crunchbase.com/v/1/company/"+text+".js?api_key=ed9vfgjwhkugexmum2xwvjd3", function(data){
                        if(data.description.length > 0){
                            showCBdata(data);
                        }
                        else {
                            showTextData("Not found",text);
                        }
                    });
                }
               });
*/
        }
    }
    var hiddenData = 
        '    <div id="biograph-popup" style="width:' + popupWidth + 'px;">' + 
        '        <div id="biograph-popup-title" style="font-weight:bold;"><br/>' +
        '        </div>' +
        '        <div id="biograph-popup-body">' +
        '        </div>' +
        '    </div>';
        
    $('body').append(hiddenData);
    $(this).css('border-bottom', '1px dotted #6E9DBF');

});


function showCBdata(crunchbase)
{
    var popupHeader = '';
    var debugFooter = '';
    
    popupHeader = crunchbase.name;

    
    $('#biograph-popup').css('left', (mouseX - popupWidth / 2) + 'px');
    $('#biograph-popup').css('top',  (mouseY + 24) + 'px');
    $('#biograph-popup-title').html(popupHeader);
    $('#biograph-popup-body').html(crunchbase.description + debugFooter);
    $('#biograph-popup').fadeIn();
}

function showAngelData(ang)
{
    var popupHeader = '';
    var debugFooter = '';
    
    popupHeader = ang.name;
    
    $('#biograph-popup').css('left', (mouseX - popupWidth / 2) + 'px');
    $('#biograph-popup').css('top',  (mouseY + 24) + 'px');
    $('#biograph-popup-title').html(popupHeader);
    $('#biograph-popup-body').html(ang.product_desc + debugFooter);
    $('#biograph-popup').fadeIn();
}

function showTextData(txt, name)
{
    var popupHeader = '';
    var debugFooter = '';
    
    popupHeader = name;

    if(debugMode)
    {
        // debugFooter += '<br />DEBUG:';
        // debugFooter += '<br /><b>OriginalUrl</b>: '         + definitionData.OriginalUrl;
        // debugFooter += '<br /><b>FormattedSearchTerm</b>: ' + definitionData.FormattedSearchTerm;
        // debugFooter += '<br /><b>LinkTitle</b>: '           + definitionData.LinkTitle;
    }
    
    $('#biograph-popup').css('left', (mouseX - popupWidth / 2) + 'px');
    $('#biograph-popup').css('top',  (mouseY + 24) + 'px');
    $('#biograph-popup-title').html(popupHeader);
    $('#biograph-popup-body').html(txt + debugFooter);
    $('#biograph-popup').fadeIn();
}
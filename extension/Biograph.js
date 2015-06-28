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

    //only scrape the data if you're at linkedin
    if (window.location.host === "www.linkedin.com"){
        scrapeData(document.documentElement.innerHTML);
    }

    console.log('inside document ready');

    document.onmousemove = function(e)
    {
        mouseX = (window.Event) ? e.pageX : event.clientX + document.body.scrollLeft;
        mouseY = (window.Event) ? e.pageY : event.clientY + document.body.scrollTop;
    };

    document.onmouseup = function(e)
    {
         var text = getSelectedText();
         console.log(text);
         $.get('https://personal-intelligence.herokuapp.com/api/people?name=test%20name', function(data) {
            console.log(data);

            var object = {
                "name" : data["name"],
                "summary" : data["summary"],
                "location" : data["location"],
                "imageLink" : "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAJsAAAAJGI2M2NjMzk5LWU1OGEtNDZkYS1iNjZjLTk3NGU2YmI4ZTM0NQ.jpg",
                "headline" : data["positions"][0]
            };
            showTextData(object);
        })
    }

    var hiddenData = 
        '    <div id="biograph-popup" style="width:' + popupWidth + 'px;">' + 
        '        <div id="biograph-popup-title" style="font-weight:bold;"><br/>' +
        '        </div>' +
        '        <div id="biograph-popup-body">' +
        '        </div>' +
        '    </div>';
        
    $('body').append(hiddenData);

    $('#biograph-popup-body').click(function()
    {
        $('#biograph-popup').fadeOut();
    });

    $(this).css('border-bottom', '1px dotted #6E9DBF');

});

function scrapeData(html)
{
    console.log("inside scrap data");
    var nameTwice = $(html).find("#name-container").find("span").text();
    var length = nameTwice.length;
    var name = nameTwice.substring(0,length/2);
    
    var headline = $(html).find("#headline-container").find(".title").text();
    var location = $(html).find("#location-container").find("a")[0].innerHTML;
    var fieldOfStudy = $(html).find("#location-container").find("a")[1].innerHTML;
    var summary = $(html).find("#summary-item").find(".description").text();
    var imageLink = $(html).find(".profile-picture").find("img").prop("src");

    console.log(headline);
    console.log(name);
    console.log(location, fieldOfStudy);
    console.log(summary);
    console.log(imageLink);
}

function showTextData(object)
{
    var header = object.name;
    var $photo = $('<img>').attr('src', object.imageLink).attr('width', '25%').attr('height','25%').attr('text-align', 'center');
    console.log('photo', $photo);

    if(debugMode)
    {
        // debugFooter += '<br />DEBUG:';
        // debugFooter += '<br /><b>OriginalUrl</b>: '         + definitionData.OriginalUrl;
        // debugFooter += '<br /><b>FormattedSearchTerm</b>: ' + definitionData.FormattedSearchTerm;
        // debugFooter += '<br /><b>LinkTitle</b>: '           + definitionData.LinkTitle;
    }
    
    $('#biograph-popup').css('left', (mouseX - popupWidth / 2) + 'px');
    $('#biograph-popup').css('top',  (mouseY + 24) + 'px');

    //$name = $('h2').text()

    $('#biograph-popup-title').text(header);
    $('#biograph-popup-body').html(object.summary);
    $('#biograph-popup-body').append($photo);
    $('#biograph-popup').fadeIn();
}
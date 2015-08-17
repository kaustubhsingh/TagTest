

async = require("async");


function generate_report(landing_pages, keywords, res)
{
    var request = require('request');
 
    // console.log("xxxx" + landing_pages);   
    landing_pages = landing_pages.replace( /\n/g, " " ).split(" ");
    // console.log("xxxx" + landing_pages);
    // console.log(landing_pages.length)
 
    var report = new Array(landing_pages.length), count = 0;
    
        
    var download = function(count){
        
        request(landing_pages[count],
                function (error, response, body) {
                    //Check for error
                    if(error){
                        res.render('pages/report', { landingpages: error, keywords: error} );
                        return console.log('Error:', error);
                    }
                
                    //Check for right status code
                    if(response.statusCode !== 200){
                        return console.log('Invalid Status Code Returned:', response.statusCode);
                    }
                
                    //console.log(body);
                    
                    count++;
                    if (body.indexOf(keywords) > -1) {
                        report[count] = (landing_pages[count] + " : Tag found\n"); console.log( " Tag found\n");
                    }
                    else
                    {
                        report[count] = (landing_pages[count] + " : Tag not found\n"); console.log(report[count]);
                    }
                    
                    console.log(count);
                    if (count < landing_pages.length){
                        console.log("case a")
                        download(count); 
                    }
                    else
                    {
                        console.log("case b");
                        res.render('pages/report', { landingpages: report, keywords: " "} );   
                    }
          
                    
                  });
        
    }       

    download(0);    

}
exports.report = generate_report;


async = require("async");


function generate_report(landing_pages, keywords, res)
{
    var request = require('request');
 
    // console.log("xxxx" + landing_pages);   
    landing_pages = landing_pages.replace( /\n/g, " " ).split(" ");
    // console.log("xxxx" + landing_pages);
    // console.log(landing_pages.length)
 
    var report = new Array(landing_pages.length), count = 0; 
    
    console.log(landing_pages.length);
    console.log(report.length);
     
    var download = function(count){
        
        request(landing_pages[count],
                function (error, response, body) {
                    //Check for error
                    if(error){
                        res.render('pages/report', { landingpages: error, keywords: error} );
                        console.log('Error:', error);
                        report[count] = "Couldn't download the page. Try manual inspection.";
                        count++;
                        continue;
                    }
                
                    //Check for right status code
                    if(response.statusCode !== 200){
                        return console.log('Invalid Status Code Returned:', response.statusCode);
                    }
                
                    //console.log(body);
                    
                    
                    if (body.indexOf(keywords) > -1) {
                        report[count] = "Yes";
                    }
                    else
                    {
                        report[count] = "No";
                    }
                    
                    count++;
                    console.log(count);
                    if (count < landing_pages.length){
                        console.log("case a")
                        download(count); 
                    }
                    else
                    {
                        console.log("case b");
                        res.render('pages/report', { landingpages: landing_pages, report: report} );   
                    }
          
                    
                  });
        
    }       

    download(0);    

}
exports.report = generate_report;
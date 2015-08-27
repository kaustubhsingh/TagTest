
function generate_report(landing_pages, keywords, res)
{
    var request = require('request');
   
    landing_pages = landing_pages.replace( /\n/g, " " ).split(" ");
 
    var report = new Array(landing_pages.length), count = 0, downloadCount = 0; 
    
    // console.log(landing_pages.length);
    // console.log(report.length);
     
    var download = function(count){
        
        request(landing_pages[count],
                function (error, response, body) {
        
                    ++downloadCount;
                    
                    if(error || (response.statusCode !== 200)){
                      
                        // console.log('Error:', error);
                        report[count] = "Couldn't download the page.";
                    }
                    else{                    
                        
                        if (body.indexOf(keywords) > -1) {
                            report[count] = "Yes";
                        }
                        else
                        {
                            report[count] = "No";
                        }
                    }
                       
                    if (downloadCount == landing_pages.length)
                    {
                        res.render('pages/report', { landingpages: landing_pages, report: report} );   
                    }
                    
                  });
        
    }       

    for (var i = 0; i < landing_pages.length; ++i)
    {
        download(i); 
    }
      
        
}
exports.report = generate_report;
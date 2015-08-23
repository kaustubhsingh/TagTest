
function generate_report(landing_pages, keywords, res)
{
    var request = require('request');
   
    landing_pages = landing_pages.replace( /\n/g, " " ).split(" ");
 
    var report = new Array(landing_pages.length), count = 0; 
    
    console.log(landing_pages.length);
    console.log(report.length);
     
    var download = function(count){
        
        request(landing_pages[count],
                function (error, response, body) {
                   
                    if(error || (response.statusCode !== 200)){
                        // res.render('pages/report', { landingpages: error, keywords: error} );
                        console.log('Error:', error);
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
                
                    // console.log(count); console.log(landing_pages[count]);
                    count++;                  
                    
                    if (count < landing_pages.length){                       
                        download(count, 1); 
                    }
                    else
                    {
                        res.render('pages/report', { landingpages: landing_pages, report: report} );   
                    }
      
                    
                  });
        
    }       

    download(0);    

}
exports.report = generate_report;
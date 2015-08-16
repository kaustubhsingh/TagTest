



function generate_report(landing_pages, keywords, res)
{
    var request = require('request');
    
    request(landing_pages, function (error, response, body) {
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
                                
                                var report = "";
                                if (body.indexOf(keywords) > -1) {
                                    report = landing_pages + " : Tag found";
                                }
                                else
                                {
                                    report = landing_pages + " : Tag not found"; 
                                }
                                
                                res.render('pages/report', { landingpages: report, keywords: " "} );
                              });
    
}
exports.report = generate_report;
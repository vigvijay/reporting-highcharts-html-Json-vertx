$(document).ready(function() {
 
    //Stops the submit request
    $("#ajaxRequestForm").submit(function(e){
           e.preventDefault();
    });
    $.getScript("http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js", function(){
 	});
    $.getScript("http://code.highcharts.com/highcharts.js", function(){
  	});
    
    //checks for the button click event
    $("#sendRequestButton").click(function(e){
    		var processed_json = new Array(); 
    		var processed_json2 = new Array();
    		var processed_json3 = new Array();
    		var campaignID = $("#cmpgId").val();
    		var startDate = $("#datepicker1").val();
    		var endDate = $("#datepicker2").val();
    		
    		function parseDate(str) {
    		    var mdy = str.split('/')
    		    
    		    return new Date(mdy[2], mdy[0], mdy[1]);
    		}
    		var isDayLimited = false;
    		function daydiff(first, second) {
    		    return (second-first)/(1000*60*60*24);
    		}
    		var dayDiff = (daydiff(parseDate($('#datepicker1').val()), parseDate($('#datepicker2').val())));
    		if( parseInt(dayDiff) >= 0 && parseInt(dayDiff) <= 10)
    		{
        		isDayLimited = true;
    			
    		}
    		
    		{
    			var startDateArray = startDate.split('/');
    			var endDateArray = endDate.split('/');
     		    startDate = startDateArray[2] + "-" + startDateArray[0] +  "-" + startDateArray[1];
        		endDate = endDateArray[2] + "-" + endDateArray[0] +  "-" + endDateArray[1];	
    		}
    		// to change the timestamp from date format to 13 digit number format
//    		else if($('#dropDownId').val() == "sspReports")
//    		{
//    			startDate = (new Date(startDate).getTime());
//        		endDate = (new Date(endDate).getTime());	
//    		}
    		
            //make the AJAX request, dataType is set to json
            //meaning we are expecting JSON data in response from the server
            $.ajax({
                type: "POST",
                url: "ServerServlet",
                data: {campaignID: campaignID , startDateString: startDate, endDateString: endDate,  isDayLimited: isDayLimited, reportName: $('#dropDownId').val()},
                dataType: "json",
                
                //if received a response from the server
                success: function( data, textStatus, jqXHR) {
                     if(data.success){
                    	 var jsonData = JSON.parse(data.jsonString);
                    	 var category = new Array();
                    	 var seg_id = data.segment_id;
                    	 var goal_id = data.goal_id;
                    	 var xAxis = "", xAxis2 = "",xAxis3 = "";
                    	 var yAxis = "",yAxis2 = "",yAxis3 = "";
                    	 //alert(new Date(newDate).getTime());
                    	 //alert( (d.getMonth()+1) +  '/' + d.getDate() + '/' + d.getFullYear());
                    	if(seg_id == null)
                    	{
                    		for (i = 0; i < jsonData.length; i++){
                    			var input = jsonData[i].date;
                    			var text = input.replace('-', '/');
                    			var d= new Date(Date.parse(text));
                         		var dateStr = (d.getMonth()+1) +  '/' + d.getDate() + '/' + d.getFullYear();
                         		if(goal_id >= 0)
                         		{
                         			 processed_json.push([dateStr, jsonData[i].views]);
                         		}
                         		else
                         		{
                         			processed_json.push([dateStr, jsonData[i].ssp_cost]);
                         		}
                                category.push(dateStr);
                                
                            }
                    		if(goal_id >= 0)
                     		{
                    			yAxis = "Views"
                    			title1 = "Conversion Goal Details";
                     		}
                     		else
                     		{
                     			yAxis = "SSP Cost";
                     			title1 = "Daily SSP Cost Details";
                     		}
                    		xAxis  = "Timestamp";
                    		$('#ajaxResponse2').hide();
                    		$('#ajaxResponse3').hide();
                    	}
                    	else
                    	{
                    		for (i = 0; i < jsonData.length; i++)
                    		{
                    			var totalStringFrag = "total-" + seg_id;
                    			var imprStringFrag = "impressions-" + seg_id;
                    			var bidsStringFrag = "bids-" + seg_id;
                         		//var d = new Date(jsonData[i].date).se.toUTCString();
                    			var input = jsonData[i].date;
                    			var text = input.replace('-', '/');
                    			var d= new Date(Date.parse(text));
                         		var dateStr = (d.getMonth()+1) +  '/' + d.getDate() + '/' + d.getFullYear();
                                processed_json.push([dateStr, (jsonData[i][totalStringFrag] >=0 ) ? jsonData[i][totalStringFrag] : 0]);
                                processed_json2.push([dateStr, (jsonData[i][imprStringFrag] >=0 ) ? jsonData[i][imprStringFrag] : 0]);
                                processed_json3.push([dateStr, (jsonData[i][bidsStringFrag] >=0 ) ? jsonData[i][bidsStringFrag] : 0]);
                                
                                category.push(dateStr);
                            }
                    		//console.log(processed_json2);
                    		xAxis1  = xAxis2 = xAxis3 = "Timestamp";
                    		yAxis1 = "Total Views";
                    		yAxis2 = "Impressions";
                    		yAxis3 = "Bids";
                    		title1 = "Total Page Views Count"
                    		$('#ajaxResponse2').show();
                    		$('#ajaxResponse3').show();
                    	}
                     	processed_json.reverse();
                     	processed_json2.reverse();
                     	processed_json3.reverse();
                     	category.reverse();
                     // draw chart
                	    $('#ajaxResponse').highcharts({
                	    chart: {
                	        type: "line"
                	    },
                	    title: {
                	        text: title1
                	    },
                	    xAxis: {
                	        allowDecimals: false,
                	        categories: category,
                	        title: {
                	            text: xAxis
                	        }
                	    },
                	    yAxis: {
                	        title: {
                	            text: yAxis
                	        }
                	    },
                	    series: [{
                	        data: processed_json
                	    }]
                	}); 
                	    $('#ajaxResponse2').highcharts({
                    	    chart: {
                    	        type: "line"
                    	    },
                    	    title: {
                    	        text: "Impresssions Count"
                    	    },
                    	    xAxis: {
                    	        allowDecimals: false,
                    	        categories: category,
                    	        title: {
                    	            text: xAxis2
                    	        }
                    	    },
                    	    yAxis: {
                    	        title: {
                    	            text: yAxis2
                    	        }
                    	    },
                    	    series: [{
                    	        data: processed_json2
                    	    }]
                    	}); 
                	    $('#ajaxResponse3').highcharts({
                    	    chart: {
                    	        type: "line"
                    	    },
                    	    title: {
                    	        text: "Bids"
                    	    },
                    	    xAxis: {
                    	        allowDecimals: false,
                    	        categories: category,
                    	        title: {
                    	            text: xAxis3
                    	        }
                    	    },
                    	    yAxis: {
                    	        title: {
                    	            text: yAxis3
                    	        }
                    	    },
                    	    series: [{
                    	        data: processed_json3
                    	    }]
                    	}); 
                     }
                     //display error message
                     else {
                         $("#ajaxResponse").html("<div><b>No response</b></div>");
                         $('#ajaxResponse2').hide();
                 		$('#ajaxResponse3').hide();
                     }
                },
                
                //If there was no resonse from the server
                error: function(jqXHR, textStatus, errorThrown){
                     //console.log("Something really bad happened " + textStatus);
                      $("#ajaxResponse").html( "failure" + jqXHR.responseText);
                      
                },
                
                //capture the request before it was sent to server
                beforeSend: function(jqXHR, settings){
                    //adding some Dummy data to the request
                    settings.data += "&dummyData=whatever";
                    //disable the button until we get the response
                    $('#sendRequestButton').attr("disabled", true);
                },
                
                complete: function(jqXHR, textStatus){
                    //enable the button 
                    $('#sendRequestButton').attr("disabled", false);
                }
      
            });        
    });
 
});
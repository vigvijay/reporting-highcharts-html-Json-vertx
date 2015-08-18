$(document).ready(
	function(){
	$('select[id="dropDownId"]').change(function(){
        var sel = $(this).val();
        if(sel == "sspReports")
        {
        	$("label[for = cmpgId]").text("SSP ID: ");
        	$( "#cmpgId" ).attr("placeholder", "Enter SSP ID");
        }
        if(sel == "retargetingReports")
        {
        	$("label[for = cmpgId]").text("Segment ID: ");
        	$( "#cmpgId" ).attr("placeholder", "Enter Segment ID");
        }
        if(sel == "convGoalReports")
        {
        	$("label[for = cmpgId]").text("Goal ID: ");
        	$( "#cmpgId" ).attr("placeholder", "Enter Goal ID");
        }
	});
	$(function() {
		$( "#datepicker1" ).datepicker({
//			onSelect: function(selected,evnt) {
//				$( "#datepicker2" ).datepicker()({minDate:  new Date(2015, 10 - 1, 25)});
//		    }
		});
		$( "#datepicker2" ).datepicker();
		minDate: new Date(1999, 10, 25)
	});
	$("#cmpgId").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});

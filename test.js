var questions;

$(function(){
	$("#start").click( function() {
		console.log("ggg");
		$("#mainTabs li:eq(1) a").tab('show');
		init();
	});
});


function init(){
	try {	
		questions = JSON.parse( $("#qs").val() );
	}
	catch( e ) {
		$("#main").html("пусто");
		return false;
	};
	if ( questions==undefined || !questions.length){
		$("#main").html("пусто");
		return false;
	}
	$("#main").empty();		
	$.each(  questions, function( key, value ) {
		var q = $("<div class='form-group' id=q"+key+"><label>"+ value.question +"</label></div></div>");
		var btnStr = "btn" + key ;
		$.each( value.answers , function( akey, avalue ){
			var str = "qa"+key;
			var lbl  = $("<div class = 'radio'><label></label></div>");
			var answ = $("<input type=radio class='answ' idx='"+ akey +"' id=" + str + " name=" + str + " value='" + avalue + "'>" + avalue + "</input>");
			$( answ ).click( function() {
				console.log( ">>>>" );
				$("#"+btnStr).removeClass("disabled");
				$("#"+btnStr).removeClass("disableClick");
				$("#"+btnStr).prop("disabled", false);
			} );
			$( answ ) . appendTo( lbl );
			$( lbl ) . appendTo( q ); 
		});
		var nextButton = $( "<button class='btn disabled disableClick' id=" + btnStr + " disabled>Далее</button>" );
 		$( nextButton ) . click (	function() { 
			proceed( this );
		});
		$(nextButton).appendTo( q );
		$(q).hide();
		$(q).appendTo("#main");
		console.log( key );
		console.log( value );
	});
	$("#q0").show();
}

function proceed(e){
//	console.log(e);
	var btnIdx = parseInt( $( e ).attr("id").replace("btn", "") );
	console.log( "Btn " + btnIdx );
	answIdx = parseInt ( $('input[name=qa'+ btnIdx +']:checked').attr('idx') );
	questions[btnIdx]["selected"] = answIdx;
	console.log( questions.length );
	if ( btnIdx < questions.length - 1 ){
		
		var nextBtnIdx = btnIdx+1;
		console.log( "Next " + nextBtnIdx );

		$("#q"+btnIdx).hide();
		$("#q"+nextBtnIdx).show();
	} 
	else{
		resume();
	}
} 

function resume(){
	$("#main").empty();
	console.log( questions );
	ok = 1;
	$.each( questions , function( k, v ){
		if ( v.correctAnswer == v.selected ) {}
		else {
			ok = 0;
			var divrow = $("<div class='row'><div class='col-sm-3'>" + v.question + "</div></div>");
			$(divrow).appendTo( "#main" );
			$.each ( v.answers, function( ak, av ) {
				var arow = $("<div class='row'><div class='col-sm-3'>" + av + "</div></div>");
				if ( ak == v.correctAnswer ){
					$(arow).addClass( "bg-success" );
				}
				if ( ak == v.selected && ( v.selected != v.correctAnswer ) ){
					$(arow).addClass( "bg-danger" );
				}
				$(arow).appendTo( "#main" );
			})
		}
	} );
	if ( ok == 1 ){
		$("#main").html("Отлично");
	}
}
/*---------------------------------------------------------------------------------

	Project Name: Any.do
	Project Description: A Todo list App
	File Name: action.js
	Author: Bala
----------------------------------------------------------------------------------*/
$(document).ready(function(){
	var docount = 3;
	var donecount = 1;
	updateCount();

	setFocus();
	$('#list').sortable();


	$("form").submit(function(event){
		event.preventDefault();

		var newitem = $.trim($("#newItem").val());
		if(newitem ==''){
			setFocus();
		}else{
			addItem(newitem);
		}
	});

	/*Update DO, DONE, TOTAL count*/
	function updateCount(){
		$('#do').text(docount);
		$('#done').text(donecount);
		$('#total').text(docount+donecount);
	}

	/*Clear and set focus to the inputbox*/
	function setFocus(){
		$('#newItem').val('');
		document.getElementById("newItem").focus();
	}

	$('#list').on('click','li.listitem',checkoff);
	$('#list').on('click','div.delete',deleteItem);


	/*Add item to the list and increases the count*/
	function addItem(item){
		setFocus();
		$('<li class="listitem"><span class="item">'+item+'</span><div class="delete"></div></li>').hide().prependTo("#list").slideDown('slow');
		console.log("You have added an new item: "+item);
		docount++;
		updateCount();
	}

	/*--Check OFF function--*/
	function checkoff(){
		
		console.log("checking...");
		if ($(this).hasClass("checked")) {
			$(this).slideUp('slow',function(){
				$(this).prependTo('#list').slideDown('slow');
			});
			docount++;
			donecount--;
			updateCount();
		}else{
			$(this).slideUp('slow',function(){
				$(this).appendTo('#list').slideDown('slow');
			});
			donecount++;
			docount--;
			updateCount();
		}
		$(this).toggleClass("checked");
	}

	/*Delete Function*/
	function deleteItem(){
		console.log("deleting...");
		if($(this).parent().hasClass("checked")){
			donecount--;
			updateCount();
			$(this).parent().slideUp('slow',function(){
				$(this).remove();
			});
			console.debug($(this).parent());
			return false;
		}else{
			docount--;
			updateCount();
			$(this).parent().slideUp('slow',function(){
				$(this).remove();
			});
			console.debug($(this).parent());
			return false;
		}
	}
});


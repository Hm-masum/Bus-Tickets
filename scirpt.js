let clickCount=0;

const allSeats=document.getElementsByClassName("seat");

for(const seat of allSeats){
	seat.addEventListener("click",function(){
		const name=event.target.parentNode.childNodes[0].innerText;

        if(name!=undefined){
			const selectedTicket=document.getElementById("add-seat-list");

            //For disable 
            event.target.setAttribute('disabled',false)
			clickCount++;

            const count= getConvertedValue("selectedTicketNumber");
			if(count==4){
				alert("You don't buy more than 4 tickets");
				return;
			}

			// Button work
			if(count==3){
				let promoApplyButtonHolder = document.getElementById('promoApplyButton');
				promoApplyButtonHolder.classList.remove('btn-disabled');
				
				const promCodeField = document.getElementById('coupon-code');					
					promCodeField.disabled = false;
			}

			event.target.parentNode.style.backgroundColor="#2fd815";

			// upadate seat
            const numOfSeats= getConvertedValue("selectedTicketNumber");
            document.getElementById("selectedTicketNumber").innerText=numOfSeats+1;

            const leftOfSeats= getConvertedValue("total-seats");
            document.getElementById("total-seats").innerText=leftOfSeats-1;

			// Add details
		    const div=document.createElement("div");
		    div.classList.add("selected-ticket")
		    const p1=document.createElement("p")
		    const p2=document.createElement("p")
		    const p3=document.createElement("p")
		    p1.innerText=name;
		    p2.innerText="ECONOMY";
		    p3.innerText="550";

		    div.appendChild(p1)
		    div.appendChild(p2)
		    div.appendChild(p3)

		    selectedTicket.appendChild(div)
		    updateTotalValue(550)
		    updateGrandTotal()
		}
	})
}

// Grand total
function updateGrandTotal(value){

	const totalCost=getConvertedValue("initial-total");

	if(value==undefined){
	    document.getElementById("grand-total").innerText=totalCost;
	}
	else{
		const couponCode=document.getElementById("coupon-code").value;
		if(couponCode==="NEW15"){
			const discounted=totalCost*0.15;
			document.getElementById("grand-total").innerText=totalCost-discounted;

			let couponError = document.getElementsByClassName('coupon-error');
			couponError[0].classList.remove('hidden');	

			let CouponSuccess = document.getElementsByClassName('coupon-success');		
			CouponSuccess[0].classList.remove('hidden');
		    document.getElementById('promo-block').classList.add('hidden');
		}
		else if(couponCode==="Couple20"){
			const discounted=totalCost*0.2;
			document.getElementById("grand-total").innerText=totalCost-discounted;

			let couponError = document.getElementsByClassName('coupon-error');
			couponError[0].classList.remove('hidden');

			let CouponSuccess = document.getElementsByClassName('coupon-success');		
			CouponSuccess[0].classList.remove('hidden');
		    document.getElementById('promo-block').classList.add('hidden');
		}
		else {
			let couponError = document.getElementsByClassName('coupon-error');
			couponError[0].classList.remove('hidden');		
		}
	}
}

// final button work
let phoneNum = document.getElementById('number-field');
phoneNum.addEventListener('keyup',function(event){
	let phoneNumValue = phoneNum.value;
	if(clickCount!=0 && phoneNumValue!=""){
		let final_button = document.getElementById('final_button');
		final_button.classList.remove('btn-disabled');
	}
	else{
		let final_button = document.getElementById('final_button');
		final_button.classList.add('btn-disabled');
	}
})

// Update total Cost
function updateTotalValue(value){
	const totalCost=getConvertedValue("initial-total");
	const sum=totalCost+value;
	document.getElementById("initial-total").innerText=sum;
}

// get element by id
function getConvertedValue(id){
	const val=document.getElementById(id).innerText;
	const convertedValue=parseInt(val);
	return convertedValue;
}

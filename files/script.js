shibURL = "https://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true"
foodURL = "https://www.themealdb.com/api/json/v1/1/random.php"
drinkURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php"

const sideButton = document.getElementById("sidebutton");
const buyButton = document.getElementById("buybutton");
var popup = document.getElementById("myPopup");
var spent = document.getElementById("spent");
var closeButton = document.getElementsByClassName("close")[0];
var genButtons = document.getElementsByClassName("gen-button");
var items = document.getElementsByClassName("deal-list-item");
const featuredList = document.getElementById("featured-flex");
const dealList = document.getElementById("deal-flex");
const midList = document.getElementById("mid-flex");
const sideList = document.getElementById("side-flex");
const dogNames = ["Charlie","Max","Cooper","Milo","Buddy","Teddy","Rocky","Bear","Leo","Duke","Luna","Bella","Daisy","Lucy","Lily","Lola","Zoe","Sadie","Stella","Bailey","Doge"]


//Listeners
sideButton.addEventListener("click",swapNav)
buyButton.addEventListener("click",buyAll)
closeButton.addEventListener("click",function(){
	popup.style.display = "none"
})


for (var i = 0; i < genButtons.length; i++) {
    genButtons[i].addEventListener('click',populate);
}
for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click',buyItem);
}

//Functs
function randomRange(min,max) {
  return Math.random() * (max - min) + min;
}

function swapNav() {
	
	if (sidebutton.textContent === ">"){
		
		sidebutton.textContent = "<";
		document.getElementById("mySidebar").style.width = "350px";
		sidebutton.style.left = "350px";
		
	}else{
		sidebutton.textContent = ">";
		document.getElementById("mySidebar").style.width = "0";
		sidebutton.style.left = "0px";
	}
}

function buyAll(){
	var sum = 0;
	for (var i = 1; i < sideList.childNodes.length; i++) {
		num = sideList.childNodes[i].childNodes[1].childNodes[1].textContent.slice(1)
		sum += parseFloat(num)
	}	
	sideList.innerHTML =''
	popup.style.display = "block"
	spent.textContent = "YOU SPENT $"+sum.toFixed(2).toString()
}

function addListing(nameV,imageV,priceV,descV,destination){
	
	var listing = document.createElement("div");
	var content = document.createElement("ul");
	var name = document.createElement("h3");
	var tier = document.createElement("li");
	var image = document.createElement("img");
	var price = document.createElement("li");
	var desc = document.createElement("li");

	if (destination===featuredList) {
		tier.textContent = "FEATURED";
	}else if (destination===dealList) {
		tier.textContent = "GREAT"
	}else if (destination===midList) {
		tier.textContent = "OKAY"
	}else {
		tier.textContent = "Untiered"
	}
	
	name.textContent = nameV
	image.src = imageV
	image.style.width = "280px"
	image.style.height = "200px"
	price.textContent = priceV
	desc.textContent = descV
	
	content.style.padding = "10px"
	
	content.appendChild(image);
	content.appendChild(price);
	content.appendChild(tier);
	content.appendChild(desc);

	listing.appendChild(name);
	listing.appendChild(content);
	listing.setAttribute("class","deal-list-item")
	
	listing.addEventListener('click',buyItem);
	
	destination.appendChild(listing);
	
}

function buyItem(){
	this.removeEventListener('click',buyItem)
	this.addEventListener('click',returnItem)
	sideList.appendChild(this)
}

function returnItem(){
	this.removeEventListener('click',returnItem)
	this.addEventListener('click',buyItem)
	if (this.childNodes[1].childNodes[2].textContent === "FEATURED"){
		featuredList.appendChild(this)
	}else if (this.childNodes[1].childNodes[2].textContent === "GREAT") {
		dealList.appendChild(this)
	}else if (this.childNodes[1].childNodes[2].textContent === "OKAY") {
		midList.appendChild(this)
	}
}

async function getShib(){
	let response =await fetch(shibURL)
	let data = await response.json()
	var name = dogNames[Math.round(randomRange(0,21))]
	out = [name,data[0]]
	return out
}

async function getFood(){
	let response = await fetch(foodURL);
	let data = await response.json();
	out = [data['meals'][0]['strMeal'],data['meals'][0]['strMealThumb']]
	return out;
}

async function getDrink(){
	let response = await fetch(drinkURL);
	let data = await response.json();
	out = [data['drinks'][0]['strDrink'],data['drinks'][0]['strDrinkThumb']]
	return out;
}

async function populate(){
	var f = Math.round(randomRange(1,6))
	var d = Math.round(randomRange(6,9))
	var g = Math.round(randomRange(6,12))
	
	var category = this.textContent
	var name = category
	
	//refresh
	featuredList.innerHTML =''
	dealList.innerHTML =''
	midList.innerHTML =''
	
	for (let i = 0; i < f; i++) {
		if (category === "Food") {
			var dat = await getFood()
		}else if (category === "Drink"){
			var dat = await getDrink()
		}else if (category === "Shiba"){
			var dat = await getShib()
		}else {
			var roll = Math.round(randomRange(1,3))
			if (roll === 1) {
				var dat = await getFood()
				var name = "Food"
			}else if (roll === 2){
				var dat = await getDrink()
				var name = "Drink"
			}else {
				var dat = await getShib()
				var name = "Shiba"
			}
		}
		var price = "$".concat(randomRange(20,1000).toFixed(2).toString())
		var desc = "This " + name.toLowerCase() + " is available for a limited time only!";	
		addListing(dat[0],dat[1],price,desc,featuredList)
	} 
	for (let i = 0; i < d; i++) {
		if (category === "Food") {
			var dat = await getFood()
		}else if (category === "Drink"){
			var dat = await getDrink()
		}else if (category === "Shiba"){
			var dat = await getShib()
		}else {
			var roll = Math.round(randomRange(1,3))
			if (roll === 1) {
				var dat = await getFood()
				var name = "Food"
			}else if (roll === 2){
				var dat = await getDrink()
				var name = "Drink"
			}else {
				var dat = await getShib()
				var name = "Shiba"
			}
		}
		var price = "$".concat(randomRange(5,500).toFixed(2).toString())
		var desc = "This " + name.toLowerCase() + " is absolutely worth your money.";
		addListing(dat[0],dat[1],price,desc,dealList)
	} 
	for (let i = 0; i < g; i++) {
		if (category === "Food") {
			var dat = await getFood()
		}else if (category === "Drink"){
			var dat = await getDrink()
		}else if (category === "Shiba"){
			var dat = await getShib()
		}else {
			var roll = Math.round(randomRange(1,3))
			if (roll === 1) {
				var dat = await getFood()
				var name = "Food"
			}else if (roll === 2){
				var dat = await getDrink()
				var name = "Drink"
			}else {
				var dat = await getShib()
				var name = "Shiba"
			}
		}
		var price = "$".concat(randomRange(1,100).toFixed(2).toString())
		var desc = "You should buy this " + name.toLowerCase() + " anyway.";
		addListing(dat[0],dat[1],price,desc,midList)
	} 	
}

//Initialization
populate()


/*
addListing("name","img","price","desc",featuredList)

addListing("name","img","price","desc",dealList)

addListing("name","img","price","desc",midList)
*/
//populate()
/*
featured-flex, deal-flex
		IN <ul>
			<div class="deal-list-item">
				<h3>PRODUCTNAME</h3>
				<ul>
					<li>IMAGE</li>
					<li>PRICE</li>
					<li>MID</li>
					<li>DESCRIPTION</li>
				</ul>
			</div>
*/
//    <link href="https://fonts.googleapis.com/css2?family=Pathway+Extreme:opsz@8..144&display=swap" rel="stylesheet">

//DOM Elements
const washEl = document.querySelector("#wash-el")
const mowEl = document.querySelector("#mow-el")
const weedsEl = document.querySelector("#weeds-el")
const totalServiceTracker = document.querySelector("#service-el")
const totalCostTracker = document.querySelector("#cost-el")
const invoiceEl = document.querySelector("#invoice-el")
const notificationEl = document.querySelector(".notification")
// Array of Service Names
let servicesList = []
// Array of Service Costs
let costOfServices = []
// Array to push service HTML into
let addServices = []
let totalcost = 0

//Buttons which insert the name and cost of service to function
washEl.addEventListener("click", function(){
    calculateTotals("Wash Car", 10)
})

mowEl.addEventListener("click", function(){
    calculateTotals("Mow Lawn", 20)
})

weedsEl.addEventListener("click", function(){
    calculateTotals("Pull Weeds", 30)
})
//Reset Button
invoiceEl.addEventListener("click", function(){
    reset()
})


//function that checks if the service has/hasn't been added
function calculateTotals(name, cost){
    //if yes a message stating the service has already been added is displayed
    if (servicesList.includes(name)){
        notificationEl.innerHTML = `<p class="redmessage">${name} has already been added</p>`
    } else {
        //if no the cost and name of service are pushed into respective arrays 
        servicesList.push(name)
        costOfServices.push(cost)
        notificationEl.innerHTML = `<p class="greenmessage">${name} has successfully been added</p>`
        addServices.push(`<h3>${name}</h3><button class="remove-btn" onclick="removeService('${name}', ${cost})">Remove</button><h4>$${cost}</h4>`)
        renderService()
        addTotalCosts(cost)
    }

}


// Adds a service to the list
function renderService(){
    totalServiceTracker.innerHTML = ""
    for (let i = 0; i < addServices.length; i++){
        totalServiceTracker.innerHTML += `${addServices[i]}`
    }   
}

//Pushes cost to page
function calculateTotalPrice(){
    totalCostTracker.innerHTML = "$" + totalcost
}
// Adds to total cost
function addTotalCosts(cost){
    totalcost += cost
    calculateTotalPrice()
}
// Subtracts from total cost
function subtractCost(cost){
    totalcost -= cost
    calculateTotalPrice()
}

//Removes service from list
function removeService(name, cost){
    let index = servicesList.indexOf(name)
    servicesList.splice(index, 1)
    costOfServices.splice(index, 1)
    addServices.splice(index, 1)
    renderService()
    subtractCost(cost)
    notificationEl.innerHTML = `<p class="orangemessage">${name} has been successfully removed</p>`
}


//Resets the whole invoice generator
function reset(){
    servicesList = []
    costOfServices = []
    addServices = []
    totalcost = 0
    renderService()
    calculateTotalPrice()
    notificationEl.innerHTML = ""
}
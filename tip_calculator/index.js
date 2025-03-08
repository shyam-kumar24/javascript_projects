
const billInput = document.querySelector('.bill-input')

const discountPercentageSpan = document.querySelector('.discount-percentage-span')
const discountPercentageInput = document.querySelector('.discount-percentage')

const tipsPercentageSpan = document.querySelector('.tips-percentage-span')
const tipsPercentageInput = document.querySelector('.tips-percentage')

const noOfCustomerSpan = document.querySelector('.no-of-customer-span')
const noOfCustomerInput = document.querySelector('.no-of-customer')

const generateButton = document.querySelector('button')

const totalTipPaid = document.querySelector('.total-tip-paid')
const totalAmountToPay = document.querySelector('.total-amount-to-pay')
const eachCustomerToPay = document.querySelector('.each-customer-to-pay')


discountPercentageSpan.textContent = discountPercentageInput.value
tipsPercentageSpan.textContent = tipsPercentageInput.value
noOfCustomerSpan.textContent = noOfCustomerInput.value


generateButton.addEventListener('click', () => {

    if(billInput.value === ''){
        alert('please enter a valid bill amount!')
        return 
    }

    const billAmountAfterDiscountPercentage = billInput.value - (discountPercentageInput.value*billInput.value)/100
    const getTipAmount = billAmountAfterDiscountPercentage*(tipsPercentageInput.value/100)
    const totalBill = billAmountAfterDiscountPercentage + getTipAmount
    const eachCustomerToPayAmount = (totalBill / noOfCustomerInput.value).toFixed(2)

    totalTipPaid.textContent = getTipAmount
    totalAmountToPay.textContent = totalBill
    eachCustomerToPay.textContent = eachCustomerToPayAmount

    tipsPercentageSpan.textContent = tipsPercentageInput.value
    discountPercentageSpan.textContent = discountPercentageInput.value
    noOfCustomerSpan.textContent = noOfCustomerInput.value
})

discountPercentageInput.addEventListener('input', (e) => {
    discountPercentageSpan.textContent = e.target.value
})
tipsPercentageInput.addEventListener('input', (e) => {
    tipsPercentageSpan.textContent = e.target.value
})
noOfCustomerInput.addEventListener('input', (e) => {
    noOfCustomerSpan.textContent = e.target.value
})
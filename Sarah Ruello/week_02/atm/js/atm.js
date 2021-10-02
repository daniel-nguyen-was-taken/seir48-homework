// * Keep track of the checking and savings balances somewhere
let checkingBalance = 0;
let savingsBalance = 0;
let checkingAmount = Number($("#checking-amount").val());
let savingsAmount = Number($("#savings-amount").val());

// * Add functionality so that a user can deposit money into one of the bank accounts.
// * Make sure you are updating the display and manipulating the HTML of the page
// so a user can see the change.

$("#checking-deposit").click(function () {
  let checkingAmount = Number($("#checking-amount").val());
  checkingBalance += checkingAmount;
  $("#checking-balance").html("$" + checkingBalance);
  // console.log(checkingAmount + " " + checkingBalance);
  console.log($(".balance").html());
});

$("#savings-deposit").on("click", function () {
  let savingsAmount = Number($("#savings-amount").val());
  savingsBalance += savingsAmount;
  $("#savings-balance").html("$" + savingsBalance);
});

// * Add functionality so that a user can withdraw money from one of the bank accounts.
// * Make sure you are updating the display and manipulating the HTML of the page
// so a user can see the change.
// * Make sure the balance in an account can't go negative. If a user tries to
// withdraw more money than exists in the account, ignore the transaction.
// * What happens when the user wants to withdraw more money from the checking
// account than is in the account? These accounts have overdraft protection, so if
// a withdrawal can be covered by the balances in both accounts, take the checking
// balance down to $0 and take the rest of the withdrawal from the savings account.
// If the withdrawal amount is more than the combined account balance, ignore it.
// * Make sure there is overdraft protection going both ways.

$("#checking-withdraw").click(function () {
  let checkingAmount = Number($("#checking-amount").val());
  console.log(checkingAmount + " " + checkingBalance);

  if (checkingAmount > checkingBalance + savingsBalance) {
    $("#checking-balance").html("$" + checkingBalance);
    console.log("not enough funds");
  } else if (
    checkingAmount >= checkingBalance &&
    checkingAmount <= savingsBalance + checkingBalance
  ) {
    let emptyOutChecking = checkingAmount - checkingBalance;
    savingsBalance -= emptyOutChecking;
    checkingBalance = 0;

    $("#checking-balance").html("$" + checkingBalance);
    $("#savings-balance").html("$" + savingsBalance);
  } else {
    checkingBalance -= checkingAmount;
    $("#checking-balance").html("$" + checkingBalance);
  }
});

$("#savings-withdraw").on("click", function () {
  let savingsAmount = Number($("#savings-amount").val());

  if (savingsAmount > savingsBalance + checkingBalance) {
    $("#savings-balance").html("$" + savingsBalance);
    console.log("not enough funds");
  } else if (
    savingsAmount >= savingsBalance &&
    savingsAmount <= checkingBalance + savingsBalance
  ) {
    let emptyOutSavings = savingsAmount - savingsBalance;
    checkingBalance -= emptyOutSavings;
    savingsBalance = 0;

    $("#checking-balance").html("$" + checkingBalance);
    $("#savings-balance").html("$" + savingsBalance);
  } else {
    savingsBalance -= savingsAmount;
    $("#savings-balance").html("$" + savingsBalance);
  }
});

// * When the balance of the bank account is $0 the background of that bank account
// should be red. It should be gray when there is money in the account.

// $(function () {
//   $('.balance:contains("$0")').each(function () {
//     $(this).parent().addClass("zero"); // matched td add NewClass
//   });
// });

// * Are there ways to refactor your code to make it DRYer?

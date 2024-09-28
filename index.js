// let balance = 500.00;
class Account {
  constructor(username) {
    this.username = username;
    this.trasactions = [];
  }
  get balance() {
    let balance = 0;
    for (const transaction of this.trasactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.trasactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if(!this.isAllowed()) return false;//transaction fails
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed(){
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed(){
    if(this.account.balance >= this.amount) return true;
  }
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

t0 = new Deposit(120.0, myAccount);
t0.commit();
console.log('Transaction allowed?', t0.commit());
console.log('balance:', myAccount.balance);

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction allowed?', t1.commit());
console.log('balance:', myAccount.balance);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction allowed?', t2.commit());
console.log('balance:', myAccount.balance);

t3 = new Withdrawal(120.0, myAccount);
t3.commit();
console.log('Transaction allowed?', t3.commit());
console.log('balance:', myAccount.balance);

const companyCheckBoxes = document.querySelectorAll("input[name=stockCheckbox]");
const numberSelected = document.getElementById("numberSelected");
const totalPrice = document.getElementById("totalPrice");
const averagePrice = document.getElementById("averagePrice");
const highestPrice = document.getElementById("highestPrice");
const generateCompaniesHashTable = function() {
  // make hash table for companies data, esier for search company infomation(in O(n) time)
  let companiesHashTable = {};
  data.forEach(function(company) {
    companiesHashTable[`${company.name}`] =
    {"price": company.price, "marketCap": company.marketCap}
  })
  return companiesHashTable;
}
const companies = generateCompaniesHashTable();
const updateMax = function() {
  // only needs to check the checked checkbox for highest price
  let checked = document.querySelectorAll("input[name=stockCheckbox]:checked");
  let highest;
  let mostValueCompany;
  for (let i = 0; i < checked.length; i++) {
    let company = checked[i].id;
    let price = companies[company].price;
    if (highest === undefined || price > highest){
      highest = price;
      mostValueCompany = company;
    }
  }
  return mostValueCompany;
}
const updateTable = function() {
  let number = 0, total = 0, average = 0;
  let highestCompany;
  for (let i = 0; i < companyCheckBoxes.length; i++){
    let company = companyCheckBoxes[i].id;
    let price = companies[company].price;

    companyCheckBoxes[i].addEventListener('change', function() {
      if (this.checked) {
        number++;
        total += price;
        highestCompany = updateMax();
      } else {
        number--;
        total -= price;
        highestCompany = updateMax();
      }
      average = total <= 0 ? 0 : parseFloat(Math.round((total / number) * 100) / 100).toFixed(2);
      highestCompany = highestCompany === undefined ? "Select any company" : highestCompany;

      numberSelected.innerHTML = number;
      totalPrice.innerHTML = `$ ${total}`;
      averagePrice.innerHTML = `$ ${average}`;
      highestPrice.innerHTML = highestCompany;
    })
  }
}

updateTable();

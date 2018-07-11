function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

let apple = JSON.parse(httpGet("https://api.iextrading.com/1.0/stock/aapl/quote"));
let facebook = JSON.parse(httpGet("https://api.iextrading.com/1.0/stock/fb/quote"));
let tesla = JSON.parse(httpGet("https://api.iextrading.com/1.0/stock/tsla/quote"));
let google = JSON.parse(httpGet("https://api.iextrading.com/1.0/stock/GOOGL/quote"));
let microsoft = JSON.parse(httpGet("https://api.iextrading.com/1.0/stock/msft/quote"));
let ibm = JSON.parse(httpGet("https://api.iextrading.com/1.0/stock/ibm/quote"));
let oracle = JSON.parse(httpGet("https://api.iextrading.com/1.0/stock/ORCL/quote"));
let amazon = JSON.parse(httpGet("https://api.iextrading.com/1.0/stock/AMZN/quote"));

const topCompanies = [apple, facebook, tesla, google, microsoft, ibm, oracle, amazon];

const data = [];

for (let company of topCompanies) {
  let cur = {"name": "", "price": 0, "marketCap": 0};
  cur["name"] = company.companyName;
  // console.log(company["companyName"]);
  cur["price"] = company.latestPrice;
  cur["marketCap"] = Math.floor(company.marketCap / 1000000000);
  data.push(cur);
  // console.log(cur);
};
// console.log(data1[0].name);
// const data = [
// {"name": "Apple", "price": 191, "marketCap": 942},
// {"name": "Google", "price": 1130, "marketCap": 791},
// {"name": "Facebook", "price": 189, "marketCap": 556},
// {"name": "Microsoft", "price": 101, "marketCap": 793},
// {"name": "Oracle", "price": 48, "marketCap": 196},
// {"name": "Tesla", "price": 317, "marketCap": 54},
// {"name": "IBM", "price": 146, "marketCap": 133},
// {"name": "Amazon", "price": 1683, "marketCap": 820}
// ];
const bar = document.getElementById("bar");
const generateCompanyBarChart = function(){
  // sort the data in marketCap descending order
  data.sort(function(a,b) {
    return b.marketCap - a.marketCap;
  })
// for each company, create an list element
  data.forEach(function(company) {
    let marketBar = document.createElement("div");
    let name = document.createElement("span");
    let nameAndBar = document.createElement("div");
    let checkbox = document.createElement('input');
    let companyInfo = document.createElement('li');
    let priceInfo = document.createElement('div');
    let price = document.createElement('span');
    let marketCap = document.createElement('span');

    price.innerHTML = `Price: $${parseFloat(Math.round(company.price * 100) / 100).toFixed(2)}`;

    marketCap.innerHTML = `Market Cap: $${company.marketCap} Billion`

    priceInfo.classList.add("priceInfo");
    priceInfo.appendChild(price);
    priceInfo.appendChild(marketCap);

    marketBar.id = company.name + "Bar";
    marketBar.classList.add("marketBar");
    marketBar.style.width = `${(company.marketCap / 10) * 0.8}%`;
    marketBar.appendChild(priceInfo);

    name.classList.add("companyName");
    name.innerHTML = company.name + "-";

    nameAndBar.classList.add("nameAndBar")
    nameAndBar.appendChild(name);
    nameAndBar.appendChild(marketBar);

    checkbox.type = "checkbox";
    checkbox.name = "stockCheckbox";
    checkbox.id = company.name;

    companyInfo.classList.add("companyInfo");
    companyInfo.appendChild(checkbox);
    companyInfo.appendChild(nameAndBar);

    bar.appendChild(companyInfo);
  })
}

generateCompanyBarChart();

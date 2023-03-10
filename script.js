import datas from "./data.json" assert {type: 'json'};
// console.log(`js ${datas.data}`);
// datas.data.forEach(element => {
//     console.log(`js ${element.Ratio}`);
// });
/*
const marketingShare_old = [
    { Ranking: 1, Company: "台積電", Country: "台灣", Ratio: "53.1" },
    { Ranking: 2, Company: "三星電子", Country: "韓國", Ratio: "17.3" },
    { Ranking: 3, Company: "聯電", Country: "台灣", Ratio: "7.2" },
    { Ranking: 4, Company: "格羅方德", Country: "美國", Ratio: "6.1" },
    { Ranking: 5, Company: "中芯國際", Country: "中國", Ratio: "5.3" },
    { Ranking: 6, Company: "華虹半導體", Country: "中國", Ratio: "2.6" },
    { Ranking: 7, Company: "力積電", Country: "台灣", Ratio: "1.8" },
    { Ranking: 8, Company: "世界先進", Country: "台灣", Ratio: "1.4" },
    { Ranking: 9, Company: "高塔半導體", Country: "以色列", Ratio: "1.4" },
    { Ranking: 10, Company: "東部高科", Country: "南韓", Ratio: "1" }
];
*/

// const marketingShare = {
//     version: "v1.0",
//     publish:"2021/12/31",
//     report:"2021年全球晶圓代工市佔率",
//     titles: ["排名", "公司名稱", "國別", "市佔率"],
//     data: [
//             { Ranking: 1, Company: "台積電", Country: "台灣", Ratio: "53.1" },
//             { Ranking: 2, Company: "三星電子", Country: "韓國", Ratio: "17.3" },
//             { Ranking: 3, Company: "聯電", Country: "台灣", Ratio: "7.2" },
//             { Ranking: 4, Company: "格羅方德", Country: "美國", Ratio: "6.1" },
//             { Ranking: 5, Company: "中芯國際", Country: "中國", Ratio: "5.3" },
//             { Ranking: 6, Company: "華虹半導體", Country: "中國", Ratio: "2.6" },
//             { Ranking: 7, Company: "力積電", Country: "台灣", Ratio: "1.8" },
//             { Ranking: 8, Company: "世界先進", Country: "台灣", Ratio: "1.4" },
//             { Ranking: 9, Company: "高塔半導體", Country: "以色列", Ratio: "1.4" },
//             { Ranking: 10, Company: "東部高科", Country: "南韓", Ratio: "1" }
//         ]
// };

let companies = [], data = [];  
let container;
let table, thead, tbody;
let GlobalCountry2dArray = [];
window.onload = function () {
    drawPieChart(companies, data);
    CreateTable();
}

//第一個參數為公司陣列, 第二個參數為資料陣列
function drawPieChart(companyArray, dataArray) {
    //drawPieChart
    // marketingShare.data.forEach(corp => {
    //     companies.push(corp.Company);
    //     data.push(corp.Ratio);
    // });
    datas.data.forEach(element => {
        companies.push(element.Company);
        data.push(element.Ratio);
    });

    //Pie Chart圓餅圖
    let ctxPie = document.getElementById("mkShare");
    var pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: companyArray,
            datasets: [{
                data: dataArray,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255,75,50)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(255, 138, 64)',
                    'rgb(142, 65, 64)',
                    'rgb(59, 72, 64)'
                ]
            }],
        },
        options: {
            responsive: true,
            title: {
                display: true,
                fontSize: 26,
                text: '2021年全球晶圓代工市佔率%'
            },
            tooltips: {
                mode: 'point',
                intersect: true,
            },
            legend: {
                position: 'bottom',
                labels: {
                    fontColor: 'black',
                }
            }
        }
    });
}

function CreateTable(){
    // create table
        
    container = document.getElementById('container');
    table = document.createElement('table');
    table.setAttribute("class", "table table-bordered table-striped table-dark");
    thead = document.createElement('thead');
    tbody = document.createElement('tbody');

    CreateThead(datas.titles);

    //Object-->2D Array

    // marketingShare.data.forEach(Company=>{
    //     let values = Object.values(Company);
    //     GlobalCountry2dArray.push(values);
    // });
    datas.data.forEach(element => {
        let values = Object.values(element);
        GlobalCountry2dArray.push(values);
    });

    CreateTbody(GlobalCountry2dArray);
}

function CreateThead(titleArray){
        //(1)
    let theadTR = document.createElement("tr");
    //(2)建立th,設定資料,th加入tr
    titleArray.forEach((title, index)=>{
        let th = document.createElement("th");
        th.innerText = title;
        theadTR.append(th);
    });

    thead.append(theadTR);
    table.append(thead);
    container.append(table);
}

function CreateTbody(globalCountry){
    globalCountry.forEach(country => { 
        let tr = document.createElement("tr");
        //(2)建立td,設定資料,td加入tr
        //['台灣', 41, 1, 12]
        country.forEach(columndata => {
            let td = document.createElement("td");
            td.innerText = columndata;

            tr.append(td);
        });
        tbody.append(tr);
    });

    table.append(tbody);
}
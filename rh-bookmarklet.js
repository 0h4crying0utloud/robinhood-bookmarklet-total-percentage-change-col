javascript:(function() {
    function getNumberVal(str) {
        return Number(str.replace(/[^0-9\.-]+/g,""));
    }
    let stockTableContainer = document.querySelector('._35i1NVinE8wTOLz3sUynSw');
    let rowContainer = stockTableContainer.querySelector('header + div');
    let rowsNS = stockTableContainer.querySelectorAll('div > a > div > div > div');
    let headerEl = stockTableContainer.querySelector('header');
    let totalReturnCell, totalReturnVal, aveCost, numShares, totalReturnColor, rowsArr;

    let headerColHTML = headerEl.children[6].outerHTML;
    headerEl.innerHTML = `${headerEl.innerHTML} ${headerColHTML}`;
    headerEl.children[7].querySelector('span > span > span').innerText = 'Percent Change';

    rowsNS.forEach((rowEl) => {
        totalReturnCell = rowEl.children[5];
        totalReturnVal = getNumberVal(rowEl.children[5].innerText);
        totalReturnColor = window.getComputedStyle(totalReturnCell.querySelector("svg")).fill;
        aveCost = getNumberVal(rowEl.children[4].innerText);
        numShares = getNumberVal(rowEl.children[2].innerText);
        percentChange = ((totalReturnVal / (aveCost * numShares)) * 100).toFixed(1);

        rowEl.innerHTML = `${rowEl.innerHTML} ${totalReturnCell.outerHTML}`;
        totalReturnTextCell = rowEl.children[7].querySelector('span > span > span');
        totalReturnTextCell.innerHTML = `<span style=\"color:${totalReturnColor}\">(${percentChange}%)</span>`;
    });

    rowsNS = stockTableContainer.querySelectorAll('div > a > div > div > div');
    rowsArr = Array.from(rowsNS);
    rowsArr.sort((rowA, rowB) => {
        let percentChangeA = getNumberVal(rowA.children[7].innerText);
        let isGainA = window.getComputedStyle(rowA.children[7].querySelector('span > span > span > span')).color === "rgb(0, 200, 5)";
        percentChangeA = (isGainA) ? percentChangeA : (percentChangeA * -1);

        let percentChangeB = getNumberVal(rowB.children[7].innerText);
        let isGainB = window.getComputedStyle(rowB.children[7].querySelector('span > span > span > span')).color === "rgb(0, 200, 5)";
        percentChangeB = (isGainB) ? percentChangeB : (percentChangeB * -1);

        let returnVal = 0;
        if (percentChangeA < percentChangeB) {
            returnVal = 1;
        }
        if (percentChangeA > percentChangeB) {
            returnVal = -1;
        }
        return returnVal;
    });
      
    let newRowsHTML = rowsArr.reduce((acc, curr) => {
        return acc + curr.outerHTML
    }, '');

    rowContainer.innerHTML = newRowsHTML;

})();

const createEntries = () => {
  console.log("createEntries");

  let btn_element = document.getElementById("entry_btn");
  let people_count_element = document.getElementById("people");
  let total_count_element = document.getElementById("total");

  let people_count = 0;
  let total_count = 0;

  console.log(entries_div);
  if (people_count_element != null && total_count_element != null) {
    people_count = people_count_element.value;
    total_count = total_count_element.value;

    console.log("people_count: " + people_count);
    console.log("total count: " + total_count);

    for (let i = 0; i < people_count; i++) {
      let entry = document.createElement("input");
      let entry_label = document.createElement("label");

      entry_label.innerHTML = "Entry " + (i + 1);
      entries_div.appendChild(entry_label);

      entry.type = "text";
      entry.id = "entry_" + i;
      entry.placeholder = "Enter name";

      let entry_amt = document.createElement("input");
      entry_amt.className = "entry_amt";
      entry_amt.type = "text";
      entry_amt.id = "entry_amt_" + i;
      entry_amt.placeholder = "Enter amount";

      entry.className = "entry";
      entries_div.appendChild(entry);
      entries_div.appendChild(entry_amt);
    }
  }
};

const calculate = () => {
  console.log("calculating");
  let submit_div = document.getElementById("submit_div");

  //get all the entries
  let entries = document.getElementsByClassName("entry");
  let entry_amts = document.getElementsByClassName("entry_amt");
  let total_count_element = document.getElementById("total");
  let total_amt = 0;
  //--------------------//

  let total_count = total_count_element.value;
  let total = 0;

  //create a new div to display the results
  let results_div = document.createElement("div");
  results_div.id = "results_div";
  submit_div.appendChild(results_div);

  //calculate the total

  // create result div
  let result_heading = document.createElement("div");
  result_heading.innerHTML = "Results";
  results_div.className = "result_heading";
  results_div.appendChild(result_heading);

  // logic to calculate the total

  // logic to calculate the total per person

  let dataList = getListOfAmoutsAndNames();

  let h1 = [];
  let h2 = [];

  console.log("total", total, "total_count", total_count);
  let amt_per_person = total_count / dataList.length;

  console.log(amt_per_person);

  console.log(dataList);

  for (let i = 0; i < dataList.length; i++) {
    let nameDiv = document.createElement("div");
    nameDiv.innerHTML =
      dataList[i].name.toUpperCase() + " Paid: " + dataList[i].amount;
    results_div.appendChild(nameDiv);
  }

  for (let i = 0; i < dataList.length; i++) {
    if (parseFloat(dataList[i].amount) > parseFloat(amt_per_person)) {
      dataList[i].amount =
        parseFloat(dataList[i].amount) - parseFloat(amt_per_person);

      h1.push(dataList[i]);
    } else {
      dataList[i].amount =
        parseFloat(dataList[i].amount) - parseFloat(amt_per_person);

      h2.push(dataList[i]);
    }
  }

  //sort h1 in reverse order on basis of amount

  h1.sort(function (a, b) {
    return parseFloat(b.amount) - parseFloat(a.amount);
  });

  //sort h2 in reverse order on basis of amount

  h2.sort(function (a, b) {
    return parseFloat(a.amount) - parseFloat(b.amount);
  });

  // h1.reverse();
  // h2.reverse();

  console.log("h1", h1);
  console.log("h2", h2);

  // 

  for (let index1 = 0; index1 < h1.length; index1++) {
    while (h1[index1].amount > 0) {
      for (let index2 = 0; index2 < h2.length; index2++) {
        if (Math.abs(h2[index2].amount) > Math.abs(h1[index1].amount)) {
          h2[index2].amount += h1[index1].amount;

          console.log(
            h2[index2].name,
            " Pays",
            Math.abs(h1[index1].amount),
            " to ",
            h1[index1].name
          );

          h1[index1].amount = 0;

        } else {
          h1[index1].amount += h2[index2].amount;


          console.log(
            h2[index2].name,
            " Pays",
            Math.abs(h2[index2].amount),
            "to",

            h1[index1].name
          );
          h2[index2].amount = 0;
        }

        if (h1[index1].amount == 0) {
          break;
        }
      }
    }
  }

  // console.log("h1 :: ", h1);
  // console.log("h2 :: ", h2);

  /* ------------------------
    
    1. Traverse in datalist as shown aboove
    2. create h1 and h2 
for index1 in h1:
while(h1[index1]   > 0) {


    for index2=0 in h2 :
        // case 1- when h2's index val is greater than h1's index val
        if abs(h2[index2]) > abs(h1[index1]) :
            h2[index2]  += h1[index1] 
            h1[index1] = 0
        // case 2- when h2's index val is smaller than h1's index val
        else:
            h1[index1] += h2[index2]
            h2[index2] = 0 
        // either h1's val is consumed fully..and loop breaks 
        // or loop won't break and move to next highest element to reduce
        // remaining h1's val 
        if(h1[index1] == 0 )
            break; 
]
    -------------------------*/
};

getListOfAmoutsAndNames = () => {
  // id for entry name = entry_0, entry_1, entry_2, entry_3, entry_4
  // id for entry amt = entry_amt_0, entry_amt_1, entry_amt_2, entry_amt_3, entry_amt_4

  let entries = document.getElementsByClassName("entry");
  let entry_amts = document.getElementsByClassName("entry_amt");
  let total_count_element = document.getElementById("people");
  let total_amt = 0;

  //--------------------//

  let dataList = [];

  let total_count = total_count_element.value;
  let total = 0;
  for (let index = 0; index < total_count; index++) {
    let entry = document.getElementById("entry_" + index);
    let entry_amt = document.getElementById("entry_amt_" + index);

    total += entry_amts.value;

    dataList.push({
      name: entry.value,
      amount: entry_amt.value,
    });
  }

  return dataList;
};

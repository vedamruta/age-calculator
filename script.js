// inputs
const year_input = document.getElementById('year');
const month_input = document.getElementById('month');
const day_input = document.getElementById('day');
// outputs
const years_output = document.getElementById('years');
const months_output = document.getElementById('months');
const days_output = document.getElementById('days');

// error display fields
const year_error = document.querySelector('.year_error');
const month_error = document.querySelector('.month_error');
const day_error = document.querySelector('.day_error');

// variable for checking whether year is leap or not.
let leap = false;
// purple button for displaying result.
const button = document.querySelector('.purple');

function showError(errortype) {
  switch(errortype) {
    case 'invalid day': day_error.innerHTML = 'Must be a valid day';
                        break;
    case 'invalid month': month_error.innerHTML = 'Must be a valid month';
                          break;
    case 'invalid year': year_error.innerHTML = 'Must be in the past';
                          break;
    case 'empty day': day_error.innerHTML = 'This field is required';
                          break;
    case 'empty month': month_error.innerHTML = 'This field is required';
                          break;
    case 'empty year': year_error.innerHTML = 'This field is required';
  }
}


// 
year_input.addEventListener("input", (event) => {
  year_error.innerHTML = "";
  const val = year_input.value;
  // const regex = /\d+/;
  // if(val.match(regex)) val = parseInt(year_input);
//   if (val.match(regex)) val = parseInt(val);

  
  if(val <= 2023) {
    if((val%4==0 && val%100!=0) || (val%400==0)) {
      leap = true;
    }
    else {
      leap = false;
    }
    return;
  }
  else {
    showError('invalid year');
  }
});

month_input.addEventListener("input", (event) => {
  month_error.innerHTML = "";
  const val = month_input.value;
  if((val >= 1) && (val <= 12)) {
    return;
  }
  else if(val == "") showError('empty month');
  else showError('invalid month');
  
});

day_input.addEventListener("input", (event) => {
  day_error.innerHTML = "";
  const val = day_input.value;
  const regex = /4|6|9|11/;
  if(val >= 1 && val <= 31) {
    if(month_input.value == "") {
      showError('empty month');
    }
    else if(month_input.value.match(regex)) {
      if(val == 31) showError('invalid day'); 
    }
    else if(month_input.value == "2") {
      if(leap == true) {
        if((val >= 1) && (val <= 29)) {
          return;
        }
        else {
          showError('invalid day');
        }
      }
      else if(leap == false) {
        if((val >= 1) && (val <= 28)) {
          return;
        }
        else {
          showError('invalid day');
        }
      }
    }
  }
  else showError('invalid day');
});

function calculate_result() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    console.log(currentDate);
    console.log(day);
    console.log(month);
    console.log(year);

    let year_diff = Math.abs(year - year_input.value);
    let month_diff = Math.abs(month - month_input.value);
    let day_diff = Math.abs(day - day_input.value);
    
    years_output.textContent = year_diff;
    months_output.textContent = month_diff;
    days_output.textContent = day_diff;
}

button.addEventListener('click', calculate_result);
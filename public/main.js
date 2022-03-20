const url = "http://localhost:3000/";
const submitButton = document.querySelector("#submit");
const inputName = document.querySelector("#name");
const inputAge = document.querySelector("#age");
const typeSelect = document.querySelector("#typeSelect");
const result = document.querySelector("#result");
const ageChange = document.querySelector("#ageChange");
const ageChangeContainer = document.querySelector("#ageChangeContainer");
const inputTypes = document.querySelectorAll("input");
const data = { name: inputName, age: inputAge ,ageChange:ageChange};
let type="add";

function getData(addr) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", addr, true);
    xhr.responseType = "json";
    xhr.onload = function () {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
}


function postData(addr, data) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("post", addr, true);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8")
    xhr.onload = function () {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send(data);
  });
}


typeSelect.addEventListener("click", () => {
  for (let i = 0; i < inputTypes.length; i++) {
    if (inputTypes[i].checked) {
      type = inputTypes[i].value;
      if (type === "find") {
        inputAge.disabled = true;
        ageChangeContainer.hidden = true;
      }else if(type ==="update"){
        inputAge.disabled = false;
        ageChangeContainer.hidden = false;
        
      }else{
        ageChangeContainer.hidden = true;
        inputAge.disabled = false;
      }
      break;
    }
  }
});

submitButton.addEventListener("click", async () => {
    data.age = inputAge.value;
    data.name = inputName.value;
    data.ageChange = ageChange.value;
    result.innerHTML = ""
  switch (type) {
    case "add":
      await postData(url + "add", JSON.stringify(data)).then(response=>result.innerHTML = response);
      break;
    case "delete":
      await postData(url + "delete", JSON.stringify(data)).then(response=>result.innerHTML = response);
      break;
    case "update":
      await postData(url + "update", JSON.stringify(data)).then(response=>result.innerHTML = response);
      break;
    case "find":
      await getData(url + `find?name=${data.name}`).then(response=>response.forEach((element,index) => {
        result.innerHTML +="name : " +response[index].name+"   age : "+response[index].age+"<br>"
      }));
      break;
  }
});





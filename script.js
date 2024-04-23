let resultbox = document.querySelector(".result_container");
let search_btn = document.querySelector(".search_img");
search_btn.addEventListener("click", () => {
  let heading = document.querySelector(".heading");
  heading.style.display = "block";
  let input = document.querySelector("input");
  input_value = input.value.trim();
  if (!input_value == "") {
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input_value}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.meals) {
          resultbox.innerHTML = "";
          data.meals.forEach((meal) => {
            let box = document.createElement("div");
            box.classList.add("box");
            resultbox.appendChild(box);
            let image = document.createElement("img");
            image.setAttribute("src", `${meal.strMealThumb}`);
            box.appendChild(image);
            let dis = document.createElement("h2");
            dis.textContent = `${meal.strMeal}`;
            box.appendChild(dis);
            let button = document.createElement("button");
            button.addEventListener("click", () => {
              let recipe_description = document.querySelector(
                ".recipe_description"
              );
              let recipe_des = document.querySelector(".recipe_des");
              let link = document.querySelector(".link");
              let url2 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${button.id}`;
              let close = document.querySelector(".close");
              let overlay = document.querySelector(".overlay");
              fetch(url2)
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  return response.json();
                })
                .then((data) => {
                  recipe_description.textContent =
                    data.meals[0].strInstructions;
                  link.setAttribute("href", `${data.meals[0].strYoutube}`);
                  link.setAttribute("target", "_blank");
                  overlay.style.display = "block";
                  recipe_des.style.display = "block";
                  document.body.style.overflow = "hidden";
                  close.addEventListener("click", () => {
                    recipe_des.style.display = "none";
                    overlay.style.display = "none";
                    document.body.style.overflow = "auto";
                  });
                })
                .catch((error) => {
                  console.log("joo aa aviyu bhai", error);
                });
            });
            button.setAttribute("id", `${meal.idMeal}`);
            button.textContent = "Get Recipe";
            box.appendChild(button);
          });
        } else {
          resultbox.innerHTML = `<h2>Please enter valid Ingredient</h2>`;
        }
      })
      .catch((error) => {
        document.body.innerHTML = `<h1>Please check your internet connection</h1>`;
      });
  } else {
    alert("Enter Ingridients in the search area");
  }
});

let inputbox = document.getElementById("text");
let arr = [];
let url3 = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
fetch(url3)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    data.meals.forEach((element) => {
      arr.push(element.strIngredient);
    });
  })
  .catch((error) => {
    console.log("joo aa aviyu bhai", error);
  });
let arr2 = [];
inputbox.addEventListener("keyup", () => {
  let ul = document.querySelector("ul");
  let count = 0;
  ul.style.display = "block";
  ul.innerHTML = "";
  let input = inputbox.value;
  if (input.length > 0) {
    arr2 = arr.filter((keyword) => {
      return keyword.toLowerCase().includes(input.toLowerCase());
    });
    arr2.forEach((all) => {
      if (count < 10) {
        let licre = document.createElement("li");
        licre.textContent = all;
        ul.appendChild(licre);
      }
      count++;
    });
    let li = document.querySelectorAll("li");
    console.log(li);
    li.forEach((ele) => {
      ele.addEventListener("click", () => {
        inputbox.value = ele.textContent;
        ul.style.display = "none";
      });
    });
  }
});
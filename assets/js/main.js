const loadMeals = (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals.slice(0, 6)))
}

const displayMeals = meals => {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';
    meals.forEach(meal => {
        console.log(meal);
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col-lg-6');
        mealDiv.innerHTML = `
        <div class="food__single__blk">
            <div class="food__img__blk">
                <img src="${meal.strMealThumb}" alt="">
            </div>
            <div class="food__single__content">
                <h4>${meal.strMeal}</h4>
                <p>There are many variations of passages of available, but the majority have suffered
                </p>
                <a href="#" onclick="loadMealDetails(${meal.idMeal})" data-bs-toggle="modal" data-bs-target="#mealDetails">View Details</a>
            </div>
        </div>
        `;
        mealContainer.appendChild(mealDiv);
    });
}

const loadMealDetails = idMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal => {
    document.getElementById('mealDetailsLabel').innerText = meal.strMeal;
    const mealModalDetails = document.getElementById('meal-modal-body');
    mealModalDetails.innerHTML = `
    <img src="${meal.strMealThumb}" alt="">
    <p>${meal.strInstructions}</p>
    `;
}

const searchMeals = () => {
    const searchText = document.getElementById('search-field').value;
    loadMeals(searchText);
}

loadMeals('fish')
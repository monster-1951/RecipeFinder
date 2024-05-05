import React, { useState, useEffect } from "react";

const RecipeList = ({ data }) => {
  const [Hits, setHits] = useState(data ? data : []);

  useEffect(() => {
    setHits(data ? data : []);
  }, [data]);

  //   console.log(Hits[1].recipe.ingredients[1].measure);

  return (
    <div className="flex justify-evenly flex-wrap space-x-6 space-y-6">
        {!Hits.length && <h2 className="my-10 card">Enter any dish name above to find its recipe</h2>}
      {Hits.map((item, index) => {
        return (
          <div key={index} className="card ">
            <img
              src={item.recipe.image}
              alt="not found"
              className="card-img-top w-20 h-30"
            />
            <div className="card-body">
              <p className="card-title text-xl">
                <span className="font-bold underline underline-offset-4">
                  {item.recipe?.label}
                </span><br />
                {"Cuisine Type : " + item.recipe.cuisineType}
                <br />
                {"Meal Type : " + item.recipe.mealType}
              </p>
              <div className="card-header text-start text-xl underline underline-offset-2 font-bold">
                Ingredients :
              </div>
              <ul className="list-group list-group-flush">
                {item.recipe.ingredients.map((e, i) => {
                  return (
                    <React.Fragment>
                      <li className="list-group-item text-start">
                        {e.food.charAt(0).toUpperCase()+ e.food.slice(1) +
                          " : " +
                          (e.quantity).toPrecision(2) +
                          " " +
                          (e.measure != "<unit>" ? e.measure : "") +
                          " {" +
                          (e.weight / 1000).toPrecision(2) +
                          " kg}"}
                      </li>
                    </React.Fragment>
                  );
                })}
              </ul>
              <br /><form action={item.recipe.url} target="_blank">
              <button type="submit" className="btn btn-primary">Know The Full Recipe</button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeList;
// Hits[0]?.recipe?.label

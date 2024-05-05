import { useState,useEffect ,useRef} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import RecipeList from "./Components/RecipeList";


function App() {
  const [item, setitem] = useState("");
  const [recipes, setrecipes] = useState("")
  const inpt = useRef();
  const handleChange = (e) => {
    setitem(e.target.value);
  }

  
  const API_KEY ='3d90d11e18beb046d075e089975c6c8b'
  const API_ID = 'e088e614'
  
  const url = `https://api.edamam.com/search?q=${item}&app_id=${API_ID}&app_key=${API_KEY}`

  const getRecipies = async () => {
    console.log("Loading");
    await fetch(url)
    .then(res => res.json())
    .then(data=> {
      setrecipes(data.hits);
      console.log((recipes));
      // console.log(recipes[0].recipe.image)
    })
    .catch(() => {
      console.error("Couldn't find the recipies");
    })
  }
  
  const handleClick = async () => {
    // e.preventDefault()
    console.log("Clicked");
    await getRecipies();
  }  


  const keyDownHandler = (e) => {
    if (e.key == 'Enter') {
      handleClick();
    }
  }
  

  useEffect(() => {
    inpt.current.addEventListener('keydown',keyDownHandler);
  }, [handleClick])
  


  return (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control border-b-8"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          value={item}
          onChange={handleChange}
          placeholder="Enter the Dish Name"
          ref={inpt}
        />
        <span className="input-group-text" id="inputGroup-sizing-default">
        <button type="button" className="btn btn-primary" onClick={handleClick}>Search</button>
        </span>
      </div>
      <RecipeList data={recipes}></RecipeList>
    </>
  );
}

export default App;

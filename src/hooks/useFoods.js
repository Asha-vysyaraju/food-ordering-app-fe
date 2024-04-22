import React, { createContext, useContext, useEffect, useState ,useReducer} from 'react';
import { getAll, getAllCategories } from '../services/foodService';

const ProductContext = createContext(null);
const FOOD_KEY = 'foods';
const foods=[]
  

// const initialState={foods:[],categories: []};
// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FOODS_LOADED':
//       return { ...state, foods: action.payload };
//     case 'CATEGORIES_LOADED':
//       return { ...state, categories: action.payload };
//     default:
//       return state;
//   }
// };

export default function FoodsProvider({ children }) {
   
  const [foodItems, setFoodItems] = useState(foods);

  // const [state, dispatch] = useReducer(reducer, initialState);
  //   const { foods,categories } = state;

    

      useEffect(()=>{
        // getAllCategories().then(categories => dispatch({ type: 'CATEGORIES_LOADED', payload: categories }));
        
        // const loadedFoods =  getAll();
        // loadedFoods.then(foods=>dispatch({type:'FOODS_LOADED',payload:foods}))
             loadFoods()
      },[])
      
 
     
     


    const loadFoods=async ()=>{
    const loadedfoods = await getAll();
    console.log("FoodsAdmin page",loadedfoods)
    // localStorage.setItem(
    //   'foods',
    //   JSON.stringify({
    //     foods: loadedfoods,
        
    //   })
    // );
    setFoodItems(loadedfoods);
  }

  // function getFoodsFromLocalStorage() {
  //   const storedCart = localStorage.getItem('foods');
  //   return storedCart ? JSON.parse(storedCart) : EMPTY_FOODS;
  // }
  return (
    <ProductContext.Provider
      // value={{   state, dispatch  }}
      value={{   foods:foodItems  }}
    >
      {children}
    </ProductContext.Provider>
  );
}
export const useFoods = () => useContext(ProductContext);
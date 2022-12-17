import React from "react";
import { Route } from 'react-router-dom';
import Card from "./components/Card";
import axios from 'axios';
import Header from "./components/Header.js";
import Drawer from "./components/Drawer.js";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [favorites, setFavorites] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  React.useEffect(() => {
   
    // ****запрос с помощью fetch****
    // fetch("https://63884f3cd94a7e504097b2e2.mockapi.io/items")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {setItems(json)});

   // ***запрос с помощью axios***
      axios.get("https://63884f3cd94a7e504097b2e2.mockapi.io/items")
      .then (res => {setItems(res.data)});   //получение списка товаров
      axios.get("https://63884f3cd94a7e504097b2e2.mockapi.io/cart")
      .then (res => {setCartItems(res.data)}); //получение списка товаров в корзине
  
    }, []);
  // удалить товар из корзины
    const onRemoveItem = (id)=> {
      axios.delete(`https://63884f3cd94a7e504097b2e2.mockapi.io/cart/${id}`)
      setCartItems((prev) => prev.filter(item => item.id !== id));
      console.log(setCartItems)
     
    }

 // функция добавить в корзину товар
  const onAddedToCart = (obj) => {
    axios.post("https://63884f3cd94a7e504097b2e2.mockapi.io/cart", obj)
    setCartItems((prev) => [...cartItems, obj]);
  };
  //добавить в избранное
  const onAddToFavorite = (obj) => {
    axios.post("https://63884f3cd94a7e504097b2e2.mockapi.io/favorites", obj)
    setFavorites((prev) => [...favorites, obj]);
  }
   // функция поиска по товарам
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  
  };
  // функция очистить input поиска
  const onClearSearchInput = () =>{
    setSearchValue('')
  
  }

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove = {onRemoveItem}/>
      )}

      <Header onClickCart={() => setCartOpened(true)} />
     
          



      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"`: "Все кроссовки"}</h1>
          <div className="search-block d-flex ">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && <img onClick = {onClearSearchInput} className="clear cu-p" src="/img/btn-remove.svg" alt="Clear"/>}
            <input onChange={onChangeSearchInput} value = {searchValue} width={250} height={45} placeholder="Поиск..."/>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.filter((item) => item.title.toLowerCase()
          .includes(searchValue))
          .map((item, title) => (
            <Card
              key={item.title}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={(obj) =>  onAddToFavorite(obj)}
              onPlus={(obj) => onAddedToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

import { Link } from 'react-router-dom';
function Header(props) {
  return (
    <header className="d-flex justify-between align-center">
      <div className="d-flex align-center">
        <img width={40} height={40} src="/img/logo.png" />
        <div>
          <h3 className="text-uppercase">React Sneackers</h3>
          <p className="opacity-5">Мгазин лучших кроссовок</p>
        </div>
      </div>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg" alt="корзина" />
          <span>1205 руб.</span>{" "}
        </li>
        <li className="mr-20 cu-p">
        <img width={20} height={20} src="/img/heart.svg" alt="закладки" />
            
            </li>
        <li>
          <img width={20} height={20} src="/img/user.svg"  alt="пользователь"/>
        </li>
      </ul>
    </header>
  );
}
export default Header;

import logoImg from '../../commiteable.png';
import './Header.scss';

const Header = () => {
  return (
    <header className='header'>
      <section className='header-section'>
        <span>By robertmedinasb</span>
      </section>
      <section className='header-section'>
        <h1>Make it easy, make it commiteable...</h1>
      </section>
      <div className='header-logo'>
        <img className='logo-image' alt='Commiteable' src={logoImg} />
      </div>
    </header>
  );
};

export default Header;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ua: {
    translation: {
      nav: {
        home: 'Головна',
        furniture: 'Меблі',
        electronics: 'Електроніка',
        about: 'Про нас',
        contact: 'Контакти',
        search: 'Пошук...',
        cart: 'Кошик',
        wishlist: 'Обране',
        compare: 'Порівняння',
        profile: 'Профіль',
      },
      hero: {
        title: 'Преміальні меблі та електроніка',
        subtitle: 'Відкрийте для себе ексклюзивну колекцію дизайнерських меблів та високотехнологічних гаджетів',
        cta: 'Переглянути колекцію',
        explore3d: 'Дослідити 3D',
      },
      categories: {
        title: 'Категорії',
        furniture: 'Меблі',
        electronics: 'Електроніка',
      },
      products: {
        featured: 'Рекомендовані товари',
        new: 'Новинки',
        addToCart: 'Додати в кошик',
        addToWishlist: 'Додати в обране',
        compare: 'Порівняти',
        quickView: 'Швидкий перегляд',
        viewDetails: 'Детальніше',
        inStock: 'В наявності',
        outOfStock: 'Немає в наявності',
        specifications: 'Характеристики',
        description: 'Опис',
        reviews: 'Відгуки',
      },
      cart: {
        title: 'Кошик',
        empty: 'Ваш кошик порожній',
        subtotal: 'Підсумок',
        shipping: 'Доставка',
        total: 'Всього',
        checkout: 'Оформити замовлення',
        continueShopping: 'Продовжити покупки',
        remove: 'Видалити',
      },
      wishlist: {
        title: 'Обране',
        empty: 'Список обраного порожній',
        moveToCart: 'Додати в кошик',
      },
      compare: {
        title: 'Порівняння товарів',
        empty: 'Немає товарів для порівняння',
        addProducts: 'Додайте товари для порівняння',
      },
      profile: {
        title: 'Профіль',
        orders: 'Мої замовлення',
        settings: 'Налаштування',
        logout: 'Вийти',
      },
      footer: {
        description: 'Преміальний інтернет-магазин дизайнерських меблів та електроніки',
        quickLinks: 'Швидкі посилання',
        customerService: 'Обслуговування',
        followUs: 'Слідкуйте за нами',
        newsletter: 'Підписатися на розсилку',
        emailPlaceholder: 'Ваш email',
        subscribe: 'Підписатися',
      },
      common: {
        currency: '₴',
        from: 'від',
        free: 'Безкоштовно',
        loading: 'Завантаження...',
        error: 'Помилка',
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        furniture: 'Furniture',
        electronics: 'Electronics',
        about: 'About',
        contact: 'Contact',
        search: 'Search...',
        cart: 'Cart',
        wishlist: 'Wishlist',
        compare: 'Compare',
        profile: 'Profile',
      },
      hero: {
        title: 'Premium Furniture & Electronics',
        subtitle: 'Discover our exclusive collection of designer furniture and cutting-edge gadgets',
        cta: 'View Collection',
        explore3d: 'Explore 3D',
      },
      categories: {
        title: 'Categories',
        furniture: 'Furniture',
        electronics: 'Electronics',
      },
      products: {
        featured: 'Featured Products',
        new: 'New Arrivals',
        addToCart: 'Add to Cart',
        addToWishlist: 'Add to Wishlist',
        compare: 'Compare',
        quickView: 'Quick View',
        viewDetails: 'View Details',
        inStock: 'In Stock',
        outOfStock: 'Out of Stock',
        specifications: 'Specifications',
        description: 'Description',
        reviews: 'Reviews',
      },
      cart: {
        title: 'Shopping Cart',
        empty: 'Your cart is empty',
        subtotal: 'Subtotal',
        shipping: 'Shipping',
        total: 'Total',
        checkout: 'Checkout',
        continueShopping: 'Continue Shopping',
        remove: 'Remove',
      },
      wishlist: {
        title: 'Wishlist',
        empty: 'Your wishlist is empty',
        moveToCart: 'Add to Cart',
      },
      compare: {
        title: 'Compare Products',
        empty: 'No products to compare',
        addProducts: 'Add products to compare',
      },
      profile: {
        title: 'Profile',
        orders: 'My Orders',
        settings: 'Settings',
        logout: 'Logout',
      },
      footer: {
        description: 'Premium online store for designer furniture and electronics',
        quickLinks: 'Quick Links',
        customerService: 'Customer Service',
        followUs: 'Follow Us',
        newsletter: 'Newsletter',
        emailPlaceholder: 'Your email',
        subscribe: 'Subscribe',
      },
      common: {
        currency: '$',
        from: 'from',
        free: 'Free',
        loading: 'Loading...',
        error: 'Error',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ua',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
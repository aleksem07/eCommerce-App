import "bootstrap/scss/bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.scss";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/thumbs";
import "swiper/scss/effect-coverflow";

import AppComponent from "@Components/app/app";

new AppComponent();
document.addEventListener("DOMContentLoaded", () => {
  alert(
    //TODO: удалить ивент лисенер
    // eslint-disable-next-line max-len
    `Привет! Мы немного не успели доделать страницу профиля и хотели бы вас попросить проверить нашу работу завтра. Заранее спасибо!`
  );
});

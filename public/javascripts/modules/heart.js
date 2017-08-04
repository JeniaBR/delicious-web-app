import axios from 'axios';
import { $ } from './bling';

function ajaxHeart(e) {
  e.preventDefault();
  axios
    .post(this.action)
    .then(res => {
      // this.heart --> this refers to the form that we listening, if we have other tags inside form with name property we can get him by this.[property name]
      const isHearted = this.heart.classList.toggle('heart__button--hearted'); 
      $('.heart-count').textContent = res.data.hearts.length;
      if (isHearted) {
        this.heart.classList.add('heart__button--float');
        setTimeout(()=>{
          this.heart.classList.remove('heart__button--float');
        }, 2500);
      }
    })
    .catch(console.error);
};

export default ajaxHeart;
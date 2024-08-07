export function togglePwd(el,state,setState){
  let elem = document.querySelector(el);
  elem.getAttribute('type') === 'password' ? elem.setAttribute('type', 'text') : elem.setAttribute('type', 'password');
  setState(!state);
}

export const api_base_url = "http://localhost:3000";

export function toggleClass(el){
  let elem = document.querySelector(el);
  elem.classList.toggle('active');
};

export function removeClass(el,className){
  let elem = document.querySelector(el);
  elem.classList.remove(className);
};

export function addClass(el,className){
  let elem = document.querySelector(el);
  elem.classList.add(className);
};

export function toggleHiddenClass(el){
  let elem = document.querySelector(el);
  elem.classList.toggle('hidden');
}
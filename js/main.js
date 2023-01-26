import navigations from "../data/navigations.js"

const basketStarterEl = document.querySelector('.basket_starter')
const basketEl = basketStarterEl.querySelector('.basket')
const searchStarter = document.querySelector('.search_starter')
const headerEl = document.querySelector('header')
const headerLiEl = [...document.querySelectorAll('.head-li')]
const searchSectionEl = document.querySelector('.search-section')
const searchLinkEl = document.querySelector('.search-link')
const searchCloseEl = document.querySelector('.search-end')
const htmlEl = document.querySelector('html')
const inputEl = document.querySelector('input')
const titleEl = document.querySelector('.title')

//Basket Dropdown Event
////click 이벤트는 부모요소로 전달된다 즉(basketStarterEl을 클릭하면 부모로 가다가 결국에는 body로 window로 가지 전달되므로 )
////stopPropagation()을 작성하여 그 요소에서만 click되도록 설정해줘야 한다.
const showBasket = () => {basketEl.classList.add('show')}
const hideBasket = () => {basketEl.classList.remove('show')}

basketStarterEl.addEventListener('click', (event) => {
  event.stopPropagation()
  if(basketEl.classList.contains('show')){
    hideBasket()
  }else{
    showBasket()
  }
})

basketEl.addEventListener('click', (event) => {
  event.stopPropagation()
})

window.addEventListener('click', () => {
  if(basketEl.classList.contains('show')){
    hideBasket()
  }

  if(headerEl.classList.contains('search')){
    headerEl.classList.remove('search')
    searchSectionEl.classList.remove('search')
    searchLinkEl.classList.remove('search')
    htmlEl.classList.remove('fixed')
    inputEl.value = ''

    headerLiEl.forEach(function(headerLiEl){
      headerLiEl.classList.remove('search')
    })
  }
})

//서치 영역

searchStarter.addEventListener('click',(event) => {
  event.stopPropagation()
  if(headerEl.classList.contains('search')){
    headerEl.classList.remove('search')
    searchSectionEl.classList.remove('search')
    searchLinkEl.classList.remove('search')
    htmlEl.classList.remove('fixed')
    inputEl.classList.remove('show')
    
    headerLiEl.forEach(function(headerLiEl){
      headerLiEl.classList.remove('search')
    })
    
  }else{
    headerEl.classList.add('search')
    searchSectionEl.classList.add('search')
    searchLinkEl.classList.add('search')
    htmlEl.classList.add('fixed')
    inputEl.classList.add('show')
    setTimeout(function(){
      inputEl.focus()
    },500)

    headerLiEl.reverse().forEach(function(el, index){
      el.classList.add('search')
      el.style.transitionDelay = (index * .3) / headerLiEl.length + 's'
    })
  }
})

searchLinkEl.addEventListener('click',(event) => {
  event.stopPropagation()
})

headerEl.addEventListener('click',(event) => {
  event.stopPropagation()
})

searchCloseEl.addEventListener('click', () => {
  if(headerEl.classList.contains('search')){
    headerEl.classList.remove('search')
    searchSectionEl.classList.remove('search')
    searchLinkEl.classList.remove('search')
    inputEl.classList.remove('show')

    headerLiEl.forEach(function(headerLiEl){
      headerLiEl.classList.remove('search')
    })
  }
})


window.addEventListener('scroll',function(){
  if(scrollY > 40){
    headerEl.classList.add('scroll')
    titleEl.classList.add('scroll')
  }else{
    headerEl.classList.remove('scroll')
    titleEl.classList.remove('scroll')
  }
})

// observe되면 show 클래스 추가 함수
const io = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(!entry.isIntersecting){
      return
    }
    entry.target.classList.add('show')
  })
})

const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function(el){
  io.observe(el)
})


// video재생,일시정지 이벤트
const play = document.querySelector('.video-play')
const pause = document.querySelector('.video-pause')
const video = document.querySelector('video')

pause.addEventListener('click',function(){
  pause.classList.add('click')
  play.classList.add('click')
  video.pause();
})

play.addEventListener('click',function(){
  pause.classList.remove('click')
  play.classList.remove('click')
  video.play();
})

// footer 데이터 가져오기
const navigationEl = document.querySelector('.navigations')
navigations.forEach(function(nav){
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function(map){
    mapList += /*html*/`
    <li><a href="${map.url}">${map.name}</li>
    `
  })

  mapEl.innerHTML= /*html*/`
  <h3>
    <span class="text">${nav.title}</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
  `

  navigationEl.append(mapEl)
})

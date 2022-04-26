import './style.css'

const siteTitle = 'My Router'

const routes: Record<string, {
  page: string;
  title: string;
  description: string;
}> = {
  404: {
    page: '/pages/404.html',
    title: '404 | ' + siteTitle,
    description: 'Page not found'
  },
  '/': {
    page: '/pages/home.html',
    title: 'Home | ' + siteTitle,
    description: 'Home Page'
  },
  '/about': {
    page: '/pages/about.html',
    title: 'About Us | ' + siteTitle,
    description: 'About Us'
  },
  '/services': {
    page: '/pages/services.html',
    title: 'Our Services | ' + siteTitle,
    description: 'Our Services'
  },
  '/contact': {
    page: '/pages/contact.html',
    title: 'Contact Us | ' + siteTitle,
    description: 'Contact Us'
  }
}

document.querySelectorAll('.link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    useRoute(e)
  })
})

const useRoute = (e: Event) => {
  e = e || window.event
  e.preventDefault()
  window.history.pushState({ page: window.location.pathname }, '', (e.target as any).href)
  renderPage()
}

const renderPage = async () => {
  const location = window.location.pathname
  const route = routes[location] || routes[404]
  const response = await fetch(route.page)
  const data = await response.text()
  document.querySelector('#root')!.innerHTML = data
  document.title = route.title
  document.querySelector('meta[name="description"]')!
    .setAttribute('content', route.description)
}
window.onpopstate = renderPage;

(window as any).useRoute = useRoute
renderPage()

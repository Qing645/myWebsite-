//控制网站标题
let routerTitle = null;
let siteTitle = null;
let blogTitle = null;
function setTitle() {
   if (!routerTitle && !siteTitle) {
      document.title = 'loading...'
   } else if (routerTitle && !siteTitle) {
      document.title = routerTitle
   } else if (!routerTitle && siteTitle) {
      document.title = siteTitle
   }
   else {
      if (blogTitle) {
         document.title = `${blogTitle}-${siteTitle}`;
         
      } else {
         document.title = `${routerTitle}-${siteTitle}`;
      }

   }
}
export default {
   setRouterTitle(title) {
      routerTitle = title;
      setTitle()
   },
   setSiteTitle(title) {
      siteTitle = title;
      setTitle()
   },
   setBlogTitle(title) {
      blogTitle = title;
      setTitle()
   }
}
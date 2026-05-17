
async function getRandomRoute() {
    const routes = JSON.parse(sessionStorage.getItem("allRoutes"));
    const routeNames = Object.keys(routes)

    const rng = Math.floor(Math.random() * routeNames.length)
    const newRouteName = routeNames[rng]

    const currentPage = window.location.href
    console.log("Current page:", currentPage)
    console.log("New route name:", newRouteName)
    if (currentPage.includes(newRouteName)) {
        return getRandomRoute()
    }

    const helper = !currentPage.includes("pages/") ? "pages/" : ""
    const newUrl = new URL(helper + "route.html", window.location.href);
    newUrl.searchParams.set("id", newRouteName);

    window.location.href = newUrl.href;
}
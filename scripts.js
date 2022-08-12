/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/","#new":"","#new-0":""}
const engine = "searx"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  searx: "https://searx.priv.pw/?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"719m4ZX2xl5rdqAH","label":"Social","bookmarks":[{"id":"rQdRoiVzWChRGHsP","label":"Youtube","url":"https://www.youtube.com/"},{"id":"gemQeRHpAsfitCN2","label":"Instagram","url":"https://instagram.com/"},{"id":"RXggCFqm4epa1U24","label":"Twitch","url":"https://twitch.tv/"},{"id":"o8mtlVu9Ect80PRi","label":"Reddit","url":"https://reddit.com/"}]},{"id":"IDXBeeXdr8dk8phx","label":"Anime","bookmarks":[{"id":"TDjS0PScdcUngDF2","label":"9Anime","url":"www.9anime.id"},{"id":"gNIgQVu74mWsnuZ2","label":"Rent a Girlfriend","url":"https://kanojo-okarishimasu.com/"},{"id":"qi0DX07N4gzbkWNE","label":"Nagatoro-San","url":"https://nagatoromanga.com/"},{"id":"nKR5AJCpjNksupaQ","label":"My Dress up Darling","url":"https://www.dress-updarling.com/"}]},{"id":"3Nfm1EY09CzEmMOY","label":"Other","bookmarks":[{"id":"Dj9hKDArZrYdk8yq","label":"Courvix","url":"https://webmail.courvix.com/mail/?_task=mail&_mbox=INBOX"},{"id":"DOdsEZ9qC20wuLea","label":"Gmail","url":"https://gmail.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()

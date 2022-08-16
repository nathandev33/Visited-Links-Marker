export default function getLinks() {
  const aTags = document.getElementsByTagName('a')
  for (const tag of aTags) {
    console.log(tag.innerHTML)
    // tag.style="color:yellow;"
  }
}

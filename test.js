async function test() {
  try {
    const qParam = `q=subject:fantasy`;
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${qParam}&startIndex=0&maxResults=10`);
    console.log(response.status);
    const data = await response.json();
    console.log(data.items ? data.items.length : 'no items');
    if (data.items) {
      console.log(data.items[0].volumeInfo.title);
    }
  } catch(e) {
    console.error(e);
  }
}
test();

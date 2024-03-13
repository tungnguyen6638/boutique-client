// Hàm lấy các URL để fetch
export function fetchUrl(functionality, params) {
  const serverDomain = "https://52.41.36.82";
  let url = serverDomain;
  switch (functionality) {
    case "GET_PRODUCTS":
      url += "/shop/products";
      break;
    case "GET_PRODUCT":
      url += `/shop/detail/${params}`;
      break;
    case "POST_LOGIN":
      url += "/auth/login";
      break;
    case "POST_SIGNUP":
      url += "/auth/signup";
      break;
    case "POST_ORDER":
      url += "/shop/order";
      break;
    case "FIND_ORDERS":
      url += `/shop/user-orders`;
      break;
    case "GET_ORDER":
      url += `/shop/order/${params}`;
      break;
    case "GET_CHAT_ROOM":
      url += `/support/chat-room/${params}`;
      break;
    case "IMAGE_URL":
      url += `/images/${params}`;
      break;

    default:
      break;
  }

  return url;
}

// Hàm hỗ trợ fetch data
export async function fetchData(requestContent) {
  try {
    const res = await fetch(requestContent.url, {
      method: requestContent.method ? requestContent.method : "GET",
      headers: requestContent.headers ? requestContent.headers : {},
      body: requestContent.body ? requestContent.body : null,
    });

    // Nếu res không ok thì sẽ trả về 1 Object có chứa message và biến hasError để xử lý error
    if (!res.ok) {
      return { message: res.statusText, hasError: true };
    } else {
      return await res.json();
    }
  } catch (error) {
    return { message: error.message, hasError: true };
  }
}

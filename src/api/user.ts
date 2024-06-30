import request from "../utils/request";
type Result = {
  username: String;
  password: String;
  title: String;
  success: boolean;
  data: Array<any>;
  id: any;
};

export const getLogin = (data?: object) => {
  return request<Result>(
    {
      method: "POST",
      url: '/login',
      data
    })
};

export const recordUser = (data: object) => {
  return request<Result>({
    method: 'POST',
    url: '/logActivity',
    data
  })
}

//点赞
export const likeActivityInfo = (data?: object) => {
  return request<Result>({
    method: 'POST',
    url: '/like',
    data
  })
}


export const addUserInfo = (data: object) => {
  return request<Result>({
    method: 'POST',
    url: '/register',
    data
  })
}

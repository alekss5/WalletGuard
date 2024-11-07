import axios from "axios";

const baseURL = "http://localhost:8080/";

const api = axios.create({
  baseURL,
});

export const putRegisterUser = async ({ name, lastName, age, salary, jobSector, email, password }) => {
  try {
    const response = await api.put("auth/", { name, lastName, age, salary, jobSector, email, password });
    return response;
  } catch (error) {
    console.log("error"+error);
    if (error.response) {
      throw error;
    } else if (error.request) {
      const err = new Error('No response from the server. Please try again later.');
      err.status = 503;
      throw err;
    } 
  }
};

export const postLoginUser = async ({ email, password }) => {
  try {
    const user = await api.post("auth/", { email, password });
    return user;
  } catch (e) {
    console.log(e.message);
  }
};

export const stripeSubscription = async ({ token, amount, currency, email }) => {
  try {
    const response = await api.post(
      "payment/subscribe",
      {
        email
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (e) {
    console.error("Payment error:", e.response ? e.response.data : e.message);
  }
};
export const stripeCancelSubscription = async ({ token, email }) => {
  try {
    const response = await api.post(
      "payment/cancel",
      {
        email
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (e) {
    console.error("Payment error:", e.response ? e.response.data : e.message);
  }
};

export const stripePayment = async ({ token, amount, currency, email }) => {
  try {
    const response = await api.post(
      "payment/",
      {
        amount,
        currency,
        email
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (e) {
    console.error("Payment error:", e.response ? e.response.data : e.message);
  }
};

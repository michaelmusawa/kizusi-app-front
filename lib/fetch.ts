import { useState, useEffect, useCallback } from "react";
import { PaymentData, RefundData } from "./definitions";

export const fetchAPI = async (url: string, options?: RequestInit) => {
  try {
    console.log(url);
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const useFetch = <T>(
  endpoint: string,
  initialOptions?: RequestInit,
  // eslint-disable-next-line prettier/prettier
  params?: Record<string, string>
) => {
  const [url, setUrl] = useState(() => {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return `${endpoint}${queryString}`;
  });
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (newOptions?: RequestInit) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchAPI(url, { ...options, ...newOptions });
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line prettier/prettier
    [url, options]
  );

  useEffect(() => {
    fetchData();
  }, [url, options, fetchData]);

  const refetch = (newOptions?: RequestInit) => {
    setOptions((prevOptions) => ({ ...prevOptions, ...newOptions }));
    fetchData(newOptions);
  };

  return { data, loading, error, refetch, setUrl };
};

export const initiatePayment = async (paymentData: PaymentData) => {
  try {
    const response = await fetchAPI("/(api)/payment", {
      method: "POST",
      body: JSON.stringify(paymentData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("The call back response url", response);
    // Redirect the user using Linking
    // if (response.redirect_url) {
    //   await Linking.openURL(response.redirect_url);
    // } else {
    //   throw new Error("Redirect URL not found in response");
    // }

    return response;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw error;
  }
};

export const initiateRefund = async (id: string, paymentData: RefundData) => {
  try {
    const response = await fetchAPI(`/(api)/booking/${id}`, {
      method: "POST",
      body: JSON.stringify(paymentData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("The refund response", response);
    return response;
  } catch (error) {
    console.error("Error cancelling booking:", error);
    throw error;
  }
};

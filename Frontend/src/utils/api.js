import axios from "axios";



export const fetchWebsiteStatus = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching website data:", error);
    return [];
  }
};
  
  export const fetchUptimeStats = () => {
    return [
      { name: "Jan", uptime: 99.9 },
      { name: "Feb", uptime: 99.5 },
      { name: "Mar", uptime: 99.8 },
      { name: "Apr", uptime: 99.7 },
      { name: "May", uptime: 98.9 }
    ];
  };
  
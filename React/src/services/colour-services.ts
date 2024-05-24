import { baseUrl } from "./api-config";
import { ColourResponse } from "./api-responses.interfaces";

export const getAllColours = async (): Promise<ColourResponse[]> => {
  const response = await fetch(baseUrl + "/colours");
  if (!response.ok) {
    throw new Error("Failed to fetch all colours. Please try again later");
  }

  return response.json();
};

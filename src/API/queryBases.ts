import { IBase } from "../types";

export const queryBases = async (): Promise<IBase[]> => {
  const response = await fetch(process.env.REACT_APP_API_URL + `/bases`);
  return (await response.json()) as IBase[];
};

export default queryBases;

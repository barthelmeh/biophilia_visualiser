import getInstance from "./SetAxiosHeaders";
import { apiUrl } from "@/constants";

function parseJsonToDataList(jsonString: string): DataCreate[] {
    try {
      // Parse the JSON string
      const parsedArray: unknown = JSON.parse(jsonString);
  
      // Type guard to check if parsedArray is actually an array of objects
      if (Array.isArray(parsedArray)) {
        // Map each item to ensure it conforms to the Data type
        return parsedArray.map(item => {
          if (typeof item === 'object' && item !== null && 'value' in item && 'time' in item) {
            return { value: item['value'] as number, time: item['time'] as string} as DataCreate;
          }
          throw new Error("Invalid item format"); // Handle invalid format if necessary
        });
      }
      
      throw new Error("Parsed data is not an array");
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return [];
    }
  }
  

const UploadSession = (form: SessionCreate, jsonContent: string, admin: Administrator, participant: Participant): Promise<any> => {
    return new Promise(function (resolve, reject) {
        const axios = getInstance(admin.token);

        // Load the data into a list from the JSON content
        let data: DataCreate[] = [];

        try {
            console.log(jsonContent);
            data = parseJsonToDataList(jsonContent);
        } catch (err) {
            // Unable to parse data as in incorrect format
            reject({ status: false, error: "Incorrect Format"});
        }

        if(data.length === 0) {
            reject({ status: false, error: "Incorrect Format"});
        }

        const createSession: SessionCreate = {...form, data}

        axios.post(`${apiUrl}/session`, createSession)
        .then((_) => {
            resolve({status: true});
        }, (error) => {
            console.log(error)
            reject({ status: false, error: error });
        });
    });
}

export default UploadSession;
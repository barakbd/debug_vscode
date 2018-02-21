interface AcquisitionCollectionInterface {
  acq_name: string;
  acq_id: 1;
  folders: {
    acq_folder: { [index: number]: any }; //folder_data
    // acq_folder_id: number;
    ws_folders: Array<{
      ws_name: { [index: number]: any }; //folder_data
    }>;
  };
}

interface Prompts {
  name: string;
  id: number;
  files: Array<{
    file_name: string;
    file_id: number;
  }>;
}

interface collaborations {
  folder_id: number,
  user_id: number,
  collaboration_id: number
}

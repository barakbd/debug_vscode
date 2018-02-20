interface AcquisitionCollectionInterface {
  name: string;
  id: 1;
  folders: {
    folder_name: string;
    folder_id: number;
    ws_folders: Array<{
      ws_folder_name: string;
      ws_folder_id: number;
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

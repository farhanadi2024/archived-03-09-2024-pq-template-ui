import { fetcher } from './fetcher';

const uploadFileWithExpired = async (file: File, expiredAt: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('expired_at', expiredAt);

  return fetcher<{ _id: string; filename: string }>('http://localhost:3001/api/submission/upload-file-with-expired', {
    method: 'POST',
    body: formData,
  });
};

const deleteFile = async (id: string) => {
  return fetcher('http://localhost:3001/api/submission/delete-file/' + id, {
    method: 'POST',
  });
};

const getFile = async (id: string) => {
  return fetcher<{
    _id: string;
    filename: string;
    file_path: string;
    expired_at: string;
  }>('http://localhost:3001/api/submission/get-file/document/' + id, {
    method: 'GET',
  });
};

const updateExpiredAt = async (id: string, expiredAt: string) => {
  return fetcher('http://localhost:3001/api/submission/preview-file', {
    method: 'POST',
    body: JSON.stringify({ expired_at: expiredAt, _id: id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
const DocumentService = {
  uploadFileWithExpired,
  deleteFile,
  getFile,
  updateExpiredAt,
};

export { DocumentService };

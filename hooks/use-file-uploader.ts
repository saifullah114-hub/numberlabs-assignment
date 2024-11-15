export function useFileUploader() {
  const triggerFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Handle file upload
        console.log('File selected:', file.name);
      }
    };
    input.click();
  };

  return { triggerFileUpload };
}
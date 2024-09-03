function shortenFilename(filename: string) {
  const extensionIndex = filename.lastIndexOf('.');
  const extension = filename.substring(extensionIndex);
  const baseName = filename.substring(0, extensionIndex);

  if (baseName.length > 12) {
    const shortenedBaseName = baseName.substring(0, 8) + '...';
    return shortenedBaseName + extension;
  }

  return filename;
}

export { shortenFilename };

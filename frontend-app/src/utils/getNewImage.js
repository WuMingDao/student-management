export function getNewImageUrl(file, setAvatarFile, setCurrentAvatar) {
  setAvatarFile(file);

  const newUrl = URL.createObjectURL(file);
  setCurrentAvatar(newUrl);
}

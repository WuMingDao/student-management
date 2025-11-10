export function getNewImageUrl({
  file,
  setAvatarFile,
  setCurrentAvatar,
}: {
  file: File;
  setAvatarFile: React.Dispatch<React.SetStateAction<File>>;
  setCurrentAvatar: React.Dispatch<React.SetStateAction<string>>;
}) {
  setAvatarFile(file);

  const newUrl = URL.createObjectURL(file);
  setCurrentAvatar(newUrl);
}

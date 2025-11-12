export function getNewImageUrl({
  file,
  setAvatarFile,
  setCurrentAvatar,
}: {
  file: File;
  setAvatarFile: React.Dispatch<React.SetStateAction<File | null>>;
  setCurrentAvatar: React.Dispatch<React.SetStateAction<string>>;
}) {
  setAvatarFile(file as File);

  const newUrl = URL.createObjectURL(file as File);
  setCurrentAvatar(newUrl);
}

export default function getDate(createdAt) {
  const day = new Date(createdAt).getDate().toString().padStart(2, "0");
  const month = (new Date(createdAt).getMonth() + 1)
    .toString()
    .padStart(2, "0");

  return `${day}/${month}`;
}

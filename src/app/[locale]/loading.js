import Icon from "@/components/Icons";

// app/loading.js
export default function Loading({ noPage }) {
  if (noPage) {
    return (
      <div className="flex w-full py-10 items-center justify-center">
        <Icon name="logo" size={50} />
      </div>
    );
  }
  return (
    <div className="flex w-full h-[100vh] bg-input items-center justify-center">
      <Icon name="logo" size={50} />
    </div>
  );
}

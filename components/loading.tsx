import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Image
        src="/loading-circle.svg"
        alt="Loading..."
        width={50}
        height={50}
      />
    </div>
  );
};

export default Loading;

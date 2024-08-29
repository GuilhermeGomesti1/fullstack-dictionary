import Image from "next/image";
import dicQuest from "../../../../public/images/dicquest.png";

export default function Footer() {
  return (
    <div className="flex flex-col mt-8">
      {/* Main Content */}
      <div className="flex-grow" />

      {/* Footer */}
      <footer className="bg-black text-white py-4">
        <div className="container mx-auto flex items-center justify-center ">
          <Image
            src={dicQuest}
            alt=""
            width={235}
            height={135}
            quality={100}
            placeholder="blur"
            loading="lazy"
            className="block"
          />
        </div>
      </footer>
    </div>
  );
}

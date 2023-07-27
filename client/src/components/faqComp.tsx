import Image from "next/image";

const FAQComp = (props: any) => {
  return (
    <div className="flex justify-between items-center bg-white w-[100%] lg:w-[60%] px-6 xl:px-8 py-2 xl:py-4 rounded-xl mb-2 xl:mb-6 mt-4 xl:mt-8">
      <div className="flex justify-start items-center">
        <div className="mr-10">
          <Image src={props.image} alt="" className="w-10 aspect-square" />
        </div>
        <div className="text-[#4E4E4E] text-center font-poppins text-[20px] xl:text-[30px] font-medium">
          How do I find the best guide for me?
        </div>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
    </div>
  );
};

export default FAQComp;

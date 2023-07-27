import Image from "next/image";

function HomeStats(props: any) {
  return (
    <div className="rounded-2xl border-2 border-gray-300 bg-transparent p-4 w-[320px]">
      <div className="flex flex-col justify-between items-center h-[400px]">
        <Image src={props.image} alt="" />
        <div className="flex flex-col justify-around items-center">
          <p className="text-center font-poppins text-8xl font-bold text-[#9A2542]">
            {props.lText}
          </p>

          {props.sText !== null ? (
            <p className="text-center font-poppins text-4xl font-semibold text-[#9A2542]">
              {props.sText}
            </p>
          ) : (
            <></>
          )}
        </div>
        <p className="text-center font-poppins text-lg font-normal text-[#4E4E4E]">
          {props.para}
        </p>
      </div>
    </div>
  );
}

export default HomeStats;

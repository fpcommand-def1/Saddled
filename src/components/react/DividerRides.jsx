import React from "react";

const DividerRides = ({ title }) => {
  return (
    <>
      <div className="flex items-center justify-center w-full mt-15 sm:mt-15 overflow-hidden">
        <hr className="items-center border-none w-1/8 h-[1px] bg-black hidden sm:block" />
        <p className="text-center text-2xl sm:text-4xl font-extrabold tracking-[.75rem] sm:tracking-[2rem] px-10">
          {title}
        </p>
        <hr className="items-center border-none w-1/8 h-[1px] bg-black ml-[-35px] hidden sm:block" />
      </div>
      <div className="flex items-center justify-center pt-5 sm:pt-10 mb-10 sm:mb-15">
        <img
          src="/images/logo/double_down_icon.svg"
          alt="down_icon"
          width={25}
          height={25}
        />
      </div>
    </>
  );
};

export default DividerRides;
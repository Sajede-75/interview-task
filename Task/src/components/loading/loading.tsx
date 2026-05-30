import React from "react";

export function Loading(){
    return(
        <div className="w-full h-fit flex flex-col justify-center m-auto mt-20 items-center ">
            <div className={"w-8 h-8 lg:w-12 lg:h-12 aspect-square border-4 border-transparent rounded-full animate-spin border-y-[#4c4c4c] border-x-[#e5e5e5]"}></div>
        </div>
    )
}